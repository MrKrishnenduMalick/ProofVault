import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default async function TwitterImage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // In a real implementation, this would fetch the portfolio data
  // For now, we'll use placeholder data
  const portfolioTitle = 'John Doe - Software Developer';
  const portfolioHeadline = 'Building modern web applications';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
          padding: '30px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '85%',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: 15,
              lineHeight: 1.2,
            }}
          >
            {portfolioTitle}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#374151',
              marginBottom: 30,
            }}
          >
            {portfolioHeadline}
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: 8 }}>🔗</span>
            proofvault.com/u/{slug}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}