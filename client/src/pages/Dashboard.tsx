import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      
      <div className="text-center py-10">
        <h2 className="text-lg font-semibold mb-4">Welcome to WhatBytes</h2>
        <p className="mb-6">View your skill test results by clicking the button below.</p>
        <Link href="/skill-test">
          <Button className="mx-auto">View Skill Test Results</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
