'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

export function FeedbackModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [feedbackType, setFeedbackType] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, this would send feedback to an API
      // For now, we're just showing a success message
      console.log('Feedback submitted:', { feedbackType, comment });

      toast({
        title: 'Thank You!',
        description: 'Your feedback has been received and will help us improve ProofVault.',
      });

      // Reset form and close modal
      setFeedbackType('');
      setComment('');
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve ProofVault by sharing your thoughts and suggestions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Feedback Type</Label>
            <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <RadioGroupItem value="bug" id="bug" className="peer sr-only" />
                <Label 
                  htmlFor="bug" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                >
                  Bug Report
                </Label>
              </div>
              <div>
                <RadioGroupItem value="feature" id="feature" className="peer sr-only" />
                <Label 
                  htmlFor="feature" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                >
                  Feature Request
                </Label>
              </div>
              <div>
                <RadioGroupItem value="improvement" id="improvement" className="peer sr-only" />
                <Label 
                  htmlFor="improvement" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                >
                  Improvement
                </Label>
              </div>
              <div>
                <RadioGroupItem value="compliment" id="compliment" className="peer sr-only" />
                <Label 
                  htmlFor="compliment" 
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                >
                  Compliment
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="comment">Your Feedback</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Please describe your feedback in detail..."
              required
              className="mt-1"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}