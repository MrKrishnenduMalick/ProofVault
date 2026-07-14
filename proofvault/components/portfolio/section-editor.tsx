import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroSection } from './hero-section';
import { AboutSection } from './about-section';
import { SkillsSection } from './skills-section';
import { ExperienceSection } from './experience-section';
import { EducationSection } from './education-section';
import { ContactSection } from './contact-section';

interface SectionEditorProps {
  portfolio: any;
}

export function SectionEditor({ portfolio }: SectionEditorProps) {
  return (
    <Tabs defaultValue="hero" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="hero">Hero</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="hero">
        <HeroSection portfolio={portfolio} />
      </TabsContent>
      <TabsContent value="about">
        <AboutSection portfolio={portfolio} />
      </TabsContent>
      <TabsContent value="skills">
        <SkillsSection portfolio={portfolio} />
      </TabsContent>
      <TabsContent value="experience">
        <ExperienceSection portfolio={portfolio} />
      </TabsContent>
      <TabsContent value="education">
        <EducationSection portfolio={portfolio} />
      </TabsContent>
      <TabsContent value="contact">
        <ContactSection portfolio={portfolio} />
      </TabsContent>
    </Tabs>
  );
}