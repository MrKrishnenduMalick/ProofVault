# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-14

### Added
- Initial release of ProofVault
- Authentication system with Magic Link, Google OAuth, and GitHub OAuth
- Profile management with avatar and contact information
- Portfolio builder with customizable sections (Hero, About, Projects, Skills, Experience, Education, Contact)
- Project management with title, description, cover image, and technology tags
- Media library with Cloudflare R2 integration for image and document uploads
- Public portfolio sharing with customizable URL slugs
- Privacy-respecting analytics dashboard for portfolio owners
- Portfolio Health scoring system
- In-app and email notifications
- Search functionality within user's own content
- Responsive design for all device sizes
- WCAG 2.2 AA accessibility compliance
- Performance optimization meeting Lighthouse 95+ scores
- Security features including RLS, rate limiting, and CSP
- Comprehensive test suite with unit, integration, and E2E tests

### Changed
- Initial stable release of all MVP features
- Production-ready deployment configuration
- Complete documentation and release checklist

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- Implemented all security measures as per handbook requirements
- RLS enabled on all database tables
- Input validation and sanitization throughout the application
- Secure authentication and session management

## [0.1.0] - 2026-01-15

### Added
- Project initialization with Next.js, TypeScript, Tailwind CSS
- Basic folder structure following handbook specifications
- Prisma setup with PostgreSQL database
- Initial UI components using shadcn/ui
- Authentication foundation with Supabase
- Basic dashboard layout

[Unreleased]: https://github.com/proofvault/proofvault/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/proofvault/proofvault/releases/tag/v1.0.0
[0.1.0]: https://github.com/proofvault/proofvault/releases/tag/v0.1.0