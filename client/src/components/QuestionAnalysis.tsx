import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionAnalysisProps {
  score: number;
  maxScore: number;
}

const QuestionAnalysis: React.FC<QuestionAnalysisProps> = ({ score, maxScore }) => {
  // Calculate percentage for the progress circle
  const percentage = (score / maxScore) * 100;
  // Calculate stroke-dashoffset (circumference - percentage of circumference)
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-6">
        <h3 className="text-base font-semibold mb-2">Question Analysis</h3>
        
        <div className="text-sm text-gray-600 mb-6">
          You scored {score} question correct out of {maxScore}. However it still needs some improvements
        </div>
        
        {/* Circular Progress */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#E6EFFF" 
                strokeWidth="10" 
              />
              
              {/* Progress circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#3D5FFF" 
                strokeWidth="10" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Score text in center */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-xs text-gray-500">/{maxScore}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionAnalysis;
