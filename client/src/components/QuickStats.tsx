import React from "react";
import { Trophy, FileText, CheckCircle } from "lucide-react";

interface QuickStatsProps {
  rank: number;
  percentile: number;
  score: number;
  maxScore: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({ rank, percentile, score, maxScore }) => {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-4">Quick Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Your Rank */}
        <div className="bg-gray-50 p-4 rounded flex items-center">
          <div className="bg-yellow-100 p-2 rounded-full mr-4">
            <Trophy className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <h4 className="text-2xl font-semibold">{rank}</h4>
            <p className="text-xs text-gray-500">YOUR RANK</p>
          </div>
        </div>
        
        {/* Percentile */}
        <div className="bg-gray-50 p-4 rounded flex items-center">
          <div className="bg-gray-200 p-2 rounded-full mr-4">
            <FileText className="h-6 w-6 text-gray-500" />
          </div>
          <div>
            <h4 className="text-2xl font-semibold">{percentile}%</h4>
            <p className="text-xs text-gray-500">PERCENTILE</p>
          </div>
        </div>
        
        {/* Correct Answers */}
        <div className="bg-gray-50 p-4 rounded flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h4 className="text-2xl font-semibold">{score} / {maxScore}</h4>
            <p className="text-xs text-gray-500">CORRECT ANSWERS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
