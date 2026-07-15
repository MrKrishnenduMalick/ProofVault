import { NextResponse } from 'next/server';
import { performHealthCheck, HealthCheckResult } from '@/lib/health-check';

export async function GET(request: Request) {
  try {
    const healthCheckResult: HealthCheckResult = await performHealthCheck();
    
    const status = healthCheckResult.status === 'healthy' ? 200 : 503;
    
    return NextResponse.json(
      {
        success: healthCheckResult.status === 'healthy',
        status: status,
        message: `Health check ${healthCheckResult.status}`,
        data: healthCheckResult,
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status }
    );
  } catch (error: any) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        success: false,
        status: 503,
        message: 'Health check failed',
        data: {
          status: 'unhealthy',
          checks: {
            database: false,
            storage: false,
            externalServices: {},
          },
          timestamp: new Date().toISOString(),
        },
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}