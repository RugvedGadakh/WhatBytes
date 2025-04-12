import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  rank: z.coerce.number().min(1, "Rank must be at least 1"),
  percentile: z.coerce.number().min(0, "Percentile must be at least 0").max(100, "Percentile must be at most 100"),
  score: z.coerce.number().min(0, "Score must be at least 0").max(15, "Score must be at most 15"),
  userId: z.number().optional(),
  testId: z.number().optional()
});

interface UpdateScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: { rank: number; percentile: number; score: number }) => void;
  initialValues: {
    rank: number;
    percentile: number;
    score: number;
  };
}

const UpdateScoreModal: React.FC<UpdateScoreModalProps> = ({ 
  isOpen, 
  onClose,
  onSave,
  initialValues
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center">
            <div className="mr-3">
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" 
                alt="HTML5" 
                className="w-8 h-8"
              />
            </div>
            <DialogTitle className="text-xl font-semibold">Update scores</DialogTitle>
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center mb-2">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-medium">
                        1
                      </div>
                      <span className="text-sm font-medium">Update your Rank</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="percentile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center mb-2">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-medium">
                        2
                      </div>
                      <span className="text-sm font-medium">Update your Percentile</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center mb-2">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm font-medium">
                        3
                      </div>
                      <span className="text-sm font-medium">Update your Current Score (out of 15)</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                save
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateScoreModal;
