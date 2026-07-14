import { ProjectCard } from './project-card';

interface Portfolio {
  id: string;
  slug: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  websiteUrl: string;
  socialLinks: Record<string, string>;
  avatarUrl: string;
  sectionsConfig: {
    hero: boolean;
    about: boolean;
    projects: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    contact: boolean;
  };
  theme: {
    primaryColor: string;
    fontSize: string;
    layout: string;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    liveUrl: string;
    repoUrl: string;
    technologies: string[];
    startDate: string;
    endDate: string;
    featured: boolean;
  }>;
}

interface PublicPortfolioProps {
  portfolio: Portfolio;
}

export function PublicPortfolio({ portfolio }: PublicPortfolioProps) {
  const { sectionsConfig } = portfolio;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      {sectionsConfig.hero && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={portfolio.avatarUrl}
                  alt={portfolio.title}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{portfolio.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">{portfolio.headline}</p>
                <p className="text-muted-foreground">{portfolio.location}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {sectionsConfig.about && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="prose prose-lg max-w-none">
              <p>{portfolio.bio}</p>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {sectionsConfig.projects && portfolio.projects.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolio.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {sectionsConfig.skills && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {sectionsConfig.experience && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Experience</h2>
            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold">Senior Software Engineer</h3>
                <p className="text-muted-foreground">Tech Company • Jan 2022 - Present</p>
                <p className="mt-2">Led development of scalable web applications serving millions of users.</p>
              </div>
              <div className="border-l-2 border-primary pl-4 py-1">
                <h3 className="text-xl font-semibold">Software Developer</h3>
                <p className="text-muted-foreground">Startup Inc. • Mar 2020 - Dec 2021</p>
                <p className="mt-2">Developed and maintained full-stack applications using modern JavaScript frameworks.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {sectionsConfig.education && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Education</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Master of Science in Computer Science</h3>
                <p className="text-muted-foreground">University of Technology • 2018 - 2020</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Bachelor of Science in Software Engineering</h3>
                <p className="text-muted-foreground">State University • 2014 - 2018</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {sectionsConfig.contact && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Contact</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
                <p className="text-muted-foreground mb-4">
                  Interested in working together? Feel free to reach out!
                </p>
                <a 
                  href={`mailto:${portfolio.websiteUrl.replace('https://', '')}@example.com`} 
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Send Message
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Connect</h3>
                <div className="flex gap-4">
                  {portfolio.socialLinks.github && (
                    <a 
                      href={portfolio.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {portfolio.socialLinks.linkedin && (
                    <a 
                      href={portfolio.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {portfolio.socialLinks.twitter && (
                    <a 
                      href={portfolio.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}