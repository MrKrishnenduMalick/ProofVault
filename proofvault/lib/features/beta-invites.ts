import { prisma } from '@/lib/prisma/client';
import crypto from 'crypto';

export interface BetaInvite {
  id: string;
  email: string;
  token: string;
  invitedByUserId?: string;
  claimedAt?: Date;
  claimedByUserId?: string;
  createdAt: Date;
  expiresAt: Date;
}

export class BetaInviteService {
  /**
   * Creates a new beta invite
   */
  static async createInvite(
    email: string,
    invitedByUserId?: string,
    expiresInDays: number = 7
  ): Promise<BetaInvite> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const invite = await prisma.beta_invites.create({
      data: {
        email,
        token,
        invitedByUserId,
        expiresAt,
      },
    });

    return invite;
  }

  /**
   * Claims a beta invite
   */
  static async claimInvite(token: string, userId: string): Promise<BetaInvite> {
    const invite = await prisma.beta_invites.findUnique({
      where: { token },
    });

    if (!invite) {
      throw new Error('Invalid invite token');
    }

    if (invite.claimedAt) {
      throw new Error('Invite already claimed');
    }

    if (invite.expiresAt < new Date()) {
      throw new Error('Invite has expired');
    }

    const updatedInvite = await prisma.beta_invites.update({
      where: { id: invite.id },
      data: {
        claimedAt: new Date(),
        claimedByUserId: userId,
      },
    });

    return updatedInvite;
  }

  /**
   * Verifies if an email is eligible for beta access
   */
  static async isEmailEligible(email: string): Promise<boolean> {
    // Check if user already has an account
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return true; // Existing users can access beta
    }

    // Check if user has a valid, unclaimed invite
    const invite = await prisma.beta_invites.findFirst({
      where: {
        email,
        claimedAt: null,
        expiresAt: { gte: new Date() },
      },
    });

    return !!invite;
  }

  /**
   * Gets invite statistics
   */
  static async getInviteStats(): Promise<{
    totalInvites: number;
    claimedInvites: number;
    pendingInvites: number;
    emails: string[];
  }> {
    const total = await prisma.beta_invites.count();
    const claimed = await prisma.beta_invites.count({
      where: { claimedAt: { not: null } },
    });
    const pending = await prisma.beta_invites.count({
      where: { claimedAt: null },
    });

    const emails = await prisma.beta_invites.findMany({
      select: { email: true },
      take: 100, // Limit for performance
    }).then(invites => invites.map(invite => invite.email));

    return {
      totalInvites: total,
      claimedInvites: claimed,
      pendingInvites: pending,
      emails,
    };
  }
}