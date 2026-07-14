'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { portfolioUpdateSchema } from '@/lib/validation/portfolio-schemas';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { SectionEditor } from './section-editor';
import { useToast } from '@/hooks/use-toast';

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
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
  createdAt: string;
  updatedAt: string;
}

interface PortfolioFormProps {
  portfolio: Portfolio;
}

export function PortfolioForm({ portfolio }: PortfolioFormProps) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const form = useForm({
    resolver: zodResolver(portfolioUpdateSchema),
    defaultValues: {
      slug: portfolio.slug,
      sectionsConfig: portfolio.sectionsConfig,
      theme: portfolio.theme,
    },
  });

  async function onSubmit(values: any) {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/v1/portfolios/${portfolio.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Portfolio updated successfully',
        });
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to update portfolio',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update portfolio',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublish() {
    setIsPublishing(true);
    try {
      const response = await fetch(`/api/v1/portfolios/${portfolio.id}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Portfolio published successfully',
        });
        // Update local state to reflect published status
        form.setValue('status', 'published');
      } else {
        toast({
          title: 'Error',
          description: result.message || 'Failed to publish portfolio',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to publish portfolio',
        variant: 'destructive',
      });
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio URL Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your-name-portfolio"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={portfolio.status === 'published'} // Disable slug editing when published
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end">
              <div className="flex-1">
                <FormLabel>Status</FormLabel>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    portfolio.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {portfolio.status === 'draft' && (
                <Button 
                  type="button" 
                  className="ml-4"
                  onClick={handlePublish}
                  disabled={isPublishing}
                >
                  {isPublishing ? 'Publishing...' : 'Publish'}
                </Button>
              )}
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Section Visibility</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="sectionsConfig.hero"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Hero Section</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Main introduction section
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionsConfig.about"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">About Section</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Personal information and bio
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionsConfig.skills"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Skills Section</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Technical and soft skills
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionsConfig.experience"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Experience Section</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Work history and roles
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionsConfig.education"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Education Section</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Academic background
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sectionsConfig.contact"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Contact Section</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Contact information and links
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Theme Settings</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="theme.primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="theme.fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Size</FormLabel>
                    <FormControl>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="small">Small</option>
                        <option value="base">Base</option>
                        <option value="large">Large</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="theme.layout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Layout</FormLabel>
                    <FormControl>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="default">Default</option>
                        <option value="compact">Compact</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}