'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, User, Briefcase, Image, Eye } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: OnboardingStep[] = [
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your name, headline, and bio to personalize your portfolio',
      icon: <User className="h-5 w-5" />,
      completed: false,
    },
    {
      id: 'project',
      title: 'Add Your First Project',
      description: 'Share a project with title, description, and images',
      icon: <Briefcase className="h-5 w-5" />,
      completed: false,
    },
    {
      id: 'media',
      title: 'Upload Media',
      description: 'Add images and documents to enhance your projects',
      icon: <Image className="h-5 w-5" />,
      completed: false,
    },
    {
      id: 'publish',
      title: 'Publish Your Portfolio',
      description: 'Make your portfolio live and shareable with the world',
      icon: <Eye className="h-5 w-5" />,
      completed: false,
    },
  ];

  const progress = ((currentStep) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Setup</CardTitle>
        <CardDescription>
          Get your portfolio ready in just a few steps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-6" />
        
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              {steps[currentStep].icon}
            </div>
            <div>
              <h3 className="font-medium">{steps[currentStep].title}</h3>
              <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium mb-2">Recommended Action:</h4>
            <p className="text-sm">
              {currentStep === 0 && "Navigate to your profile settings and fill in your details."}
              {currentStep === 1 && "Go to the projects section and create your first project."}
              {currentStep === 2 && "Upload relevant images or documents for your projects."}
              {currentStep === 3 && "Visit your portfolio settings and click publish."}
            </p>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={nextStep}>
              {currentStep === steps.length - 1 ? 'Finish' : 'Continue'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}