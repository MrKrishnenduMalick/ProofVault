import { Card, CardContent } from '@/components/ui/card';

interface ProjectEngagementData {
  projectId: string;
  projectName: string;
  views: number;
  clicks: number;
  linkClicks: number;
}

interface ProjectEngagementProps {
  projectEngagement: ProjectEngagementData[];
}

export function ProjectEngagement({ projectEngagement }: ProjectEngagementProps) {
  return (
    <div className="space-y-4">
      {projectEngagement.map((project, index) => (
        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{project.projectName}</h4>
            <span className="text-sm text-muted-foreground">{project.views} views</span>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Clicks:</span> {project.clicks}
            </div>
            <div>
              <span className="text-muted-foreground">Links:</span> {project.linkClicks}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}