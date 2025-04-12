import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SyllabusResult {
  id: number;
  title: string;
  percentage: number;
  color: string;
}

interface SyllabusAnalysisProps {
  syllabusResults: SyllabusResult[];
}

const SyllabusAnalysis: React.FC<SyllabusAnalysisProps> = ({ syllabusResults }) => {
  // Map color names to Tailwind classes
  const getColorClass = (color: string): string => {
    const colorMap: Record<string, string> = {
      primary: "bg-primary",
      secondary: "bg-orange-500",
      danger: "bg-red-500",
      success: "bg-green-500"
    };
    
    const textColorMap: Record<string, string> = {
      primary: "text-primary",
      secondary: "text-orange-500",
      danger: "text-red-500",
      success: "text-green-500"
    };
    
    return {
      bg: colorMap[color] || "bg-blue-500",
      text: textColorMap[color] || "text-blue-500"
    };
  };
  
  return (
    <Card className="bg-white rounded-lg shadow">
      <CardContent className="p-6">
        <h3 className="text-base font-semibold mb-4">Syllabus Wise Analysis</h3>
        
        {syllabusResults.map((result) => (
          <div key={result.id} className="mb-6">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>{result.title}</span>
              <span className={getColorClass(result.color).text}>{result.percentage}%</span>
            </div>
            <div className="h-2 rounded bg-gray-200">
              <div 
                className={`h-full rounded ${getColorClass(result.color).bg}`} 
                style={{ width: `${result.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SyllabusAnalysis;
