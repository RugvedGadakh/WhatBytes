import React from "react";

interface ComparisonGraphProps {
  percentile: number;
}

const ComparisonGraph: React.FC<ComparisonGraphProps> = ({ percentile }) => {
  // Calculate position for the percentile marker
  const percentilePosition = (percentile / 100) * 800;
  
  // Calculate label positions dynamically based on percentile
  const labelPosition = {
    left: `${Math.min(Math.max(percentile - 5, 0), 90)}%`,
  };
  
  // Compare with average
  const compareWithAverage = () => {
    const avgPercentile = 72;
    if (percentile > avgPercentile) {
      return `higher than the average percentile ${avgPercentile}%`;
    } else if (percentile < avgPercentile) {
      return `lower than the average percentile ${avgPercentile}%`;
    } else {
      return `equal to the average percentile ${avgPercentile}%`;
    }
  };
  
  return (
    <div>
      <h3 className="text-base font-semibold mb-2">Comparison Graph</h3>
      <p className="text-sm text-gray-600 mb-4">
        You scored {percentile}% percentile which is {compareWithAverage()} of all the engineers who took this assessment
      </p>
      
      <div className="h-52 border rounded p-4 relative bg-white">
        {/* SVG Graph */}
        <div className="absolute inset-0 p-4">
          <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
            {/* Horizontal lines */}
            <line x1="0" y1="0" x2="800" y2="0" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            
            {/* Vertical lines (25, 50, 75, 100 percentile) */}
            <line x1="200" y1="0" x2="200" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="400" y1="0" x2="400" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="600" y1="0" x2="600" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="800" y1="0" x2="800" y2="200" stroke="#f0f0f0" strokeWidth="1" />
            
            {/* Distribution curve */}
            <path 
              d="M0,180 C50,170 100,160 150,140 S250,100 350,90 S450,80 550,90 S650,120 750,145 S800,150 800,150" 
              fill="none" 
              stroke="#d0d0d0" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
            />
            
            {/* Your percentile marker */}
            <circle 
              cx={percentilePosition} 
              cy="150" 
              r="5" 
              fill="#3D5FFF" 
            />
            
            {/* Top percentile marker - fixed at 90% */}
            <circle cx="720" cy="100" r="5" fill="#3D5FFF" />
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
          
          {/* Top marker label */}
          <div className="absolute top-8 right-8 text-xs p-1 bg-white border rounded shadow">
            <div className="text-primary font-medium">90</div>
            <div className="text-gray-500">numberOfStudent : 4</div>
          </div>
          
          {/* Your percentile label - dynamically positioned */}
          <div 
            className="absolute text-xs p-1 bg-white border rounded shadow"
            style={{
              bottom: '75px',
              left: labelPosition.left
            }}
          >
            <div className="text-primary font-medium">{percentile}</div>
            <div className="text-gray-500">your percentile</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonGraph;
