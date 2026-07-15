# ProofVault Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] All environment variables set in Koyeb (Part 13, §13.2)
- [ ] Database URL configured for production
- [ ] Supabase project configured with production settings
- [ ] R2 bucket configured for production
- [ ] External service keys (Stripe, Resend, PostHog, Sentry) configured
- [ ] OAuth provider configurations updated for production URLs

### Database
- [ ] `prisma migrate deploy` tested successfully against staging
- [ ] Migration scripts verified to be forward-only
- [ ] Database backup taken before deployment
- [ ] RLS policies verified on all tables

### Security
- [ ] SSL/TLS certificates valid and configured
- [ ] CSP headers configured and tested
- [ ] Rate limiting configured per endpoint class
- [ ] Authentication flows tested
- [ ] Authorization checks verified

### Performance
- [ ] Caching configured appropriately
- [ ] CDN settings verified
- [ ] Resource limits set appropriately
- [ ] Auto-scaling configured

## Deployment Process

### Deployment Steps
- [ ] Merge release branch to main
- [ ] CI/CD pipeline triggered automatically
- [ ] Build process completes successfully
- [ ] Automated tests pass in CI
- [ ] Database migrations run successfully
- [ ] Application deploys to production
- [ ] Health checks pass
- [ ] Smoke tests pass
- [ ] Traffic gradually shifted to new version

### Verification Steps
- [ ] Application responds to requests
- [ ] Health check endpoint returns 200 OK
- [ ] Key functionality tested manually
- [ ] Monitoring shows healthy metrics
- [ ] Error rates within expected range
- [ ] Performance metrics within acceptable range

## Post-Deployment

### Immediate Monitoring (First Hour)
- [ ] Application uptime monitored
- [ ] Error rates monitored
- [ ] Performance metrics monitored
- [ ] Database connection stability verified
- [ ] External service integrations verified

### Rollback Procedures
- [ ] Rollback plan documented and accessible
- [ ] Rollback can be executed within 15 minutes if needed
- [ ] Database rollback procedures documented (if migration was part of deployment)
- [ ] Team members know how to execute rollback

## Rollback Conditions
- [ ] Critical functionality broken
- [ ] Security vulnerability detected
- [ ] Performance significantly degraded
- [ ] Unexpected error rate spike
- [ ] Database connection failures
- [ ] Third-party service integration failures

## Rollback Execution
- [ ] Stop traffic to new version
- [ ] Revert to previous version
- [ ] Verify previous version is healthy
- [ ] Restore traffic to previous version
- [ ] Investigate and resolve issues in new version
- [ ] Plan for re-deployment when resolved