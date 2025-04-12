import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

interface User {
  id: number;
  username: string;
  displayName: string;
  avatar?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/me'],
  });
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} fixed inset-0 z-40 md:hidden`}>
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative w-64 bg-white shadow-lg h-full">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:block md:w-64 bg-white shadow-md">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white p-4 border-b flex justify-between items-center sticky top-0 z-10">
          <div className="block md:hidden">
            <button 
              className="p-2" 
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex items-center ml-auto">
            {isLoading ? (
              <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={`${user.displayName}'s profile`} 
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    {user.displayName.charAt(0)}
                  </div>
                )}
                <span className="hidden md:inline font-medium">{user.displayName}</span>
              </div>
            ) : null}
          </div>
        </header>
        
        {/* Main content area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
