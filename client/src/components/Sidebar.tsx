import React from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, Layers } from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [location] = useLocation();
  
  const menuItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5 mr-3" /> 
    },
    { 
      path: "/skill-test", 
      label: "Skill Test", 
      icon: <FileText className="h-5 w-5 mr-3" /> 
    },
    { 
      path: "/internship", 
      label: "Internship", 
      icon: <Layers className="h-5 w-5 mr-3" /> 
    }
  ];
  
  const getLinkClassName = (path: string) => {
    const baseClasses = "flex items-center px-4 py-3 hover:bg-gray-100";
    
    if (
      (path === "/" && location === "/") || 
      (path !== "/" && location.includes(path))
    ) {
      return `${baseClasses} bg-gray-100 text-primary`;
    }
    
    return `${baseClasses} text-gray-600`;
  };
  
  return (
    <>
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
            <div className="h-6 w-1.5 bg-black"></div>
            <div className="h-6 w-1.5 bg-black"></div>
            <div className="h-6 w-1.5 bg-black"></div>
          </div>
          <span className="ml-2 text-xl font-semibold">WhatBytes</span>
        </div>
      </div>
      <div className="py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path} 
                onClick={onClose}
                className={getLinkClassName(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
