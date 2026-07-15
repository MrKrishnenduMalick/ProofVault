# Contributing to ProofVault

Thank you for your interest in contributing to ProofVault! We welcome contributions from the community and are grateful for your efforts to improve the platform.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Access to a Supabase project for development
- Cloudflare R2 bucket for development

### Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/proofvault.git`
3. Navigate to the project directory: `cd proofvault`
4. Install dependencies: `npm install`
5. Copy `.env.example` to `.env` and fill in the required values
6. Run database migrations: `npx prisma migrate dev`
7. Start the development server: `npm run dev`

### Development Workflow

1. Create a new branch for your feature/bug fix: `git checkout -b feature/my-feature`
2. Make your changes
3. Write tests for your changes
4. Run the test suite: `npm run test`
5. Ensure your code follows the project's style: `npm run lint`
6. Commit your changes using conventional commits format
7. Push to your fork: `git push origin feature/my-feature`
8. Create a pull request to the main repository

## Pull Request Guidelines

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages
- Include a clear description of what the PR does and why
- Reference any related issues
- Include tests for new functionality
- Update documentation as needed
- Ensure all tests pass
- Keep PRs focused on a single concern when possible

## Code Style

- Use TypeScript strict mode
- Follow the existing code formatting (enforced by Prettier)
- Write clear, descriptive variable and function names
- Add JSDoc comments for exported functions and complex logic
- Follow the architecture patterns outlined in the handbook

## Testing

- Write unit tests for business logic
- Write integration tests for API endpoints
- Write E2E tests for critical user journeys
- Maintain high test coverage (>90% for critical business logic)
- Test edge cases and error conditions

## Architecture Guidelines

Please refer to the [Engineering Handbook](handbook/) for detailed architecture guidelines:

- UI never queries the database directly
- Route Handlers contain no business logic
- Only Prisma touches the database
- Every table has RLS enabled
- No module imports another module's internals
- Follow the folder structure as defined in Part 3, §3.3

## Reporting Issues

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Environment information (browser, OS, version)
- Any relevant screenshots or error messages

## Community

- Join our Discord server (coming soon)
- Follow us on Twitter for updates
- Check out our blog for technical posts

## Questions?

If you have any questions about contributing, feel free to open an issue or reach out to the team at [hello@proofvault.com](mailto:hello@proofvault.com).

Thank you for contributing to ProofVault!