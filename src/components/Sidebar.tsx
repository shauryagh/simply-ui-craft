import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Heart, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Calendar, 
  MessageCircle,
  BarChart3,
  Users,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Mood Tracker', href: '/mood', icon: Heart },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Journal', href: '/journal', icon: BookOpen },
  { name: 'Sessions', href: '/sessions', icon: Calendar },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Insights', href: '/insights', icon: BarChart3 },
  { name: 'Chat Support', href: '/chat', icon: MessageCircle },
  { name: 'Mindfulness', href: '/mindfulness', icon: Sparkles },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-card/50 backdrop-blur-md transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-soft" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="p-4 border-t">
            <div className="rounded-lg bg-gradient-wellness p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Premium</span>
              </div>
              <p className="text-sm text-white/90 mb-3">
                Unlock advanced insights and personalized wellness plans
              </p>
              <button className="w-full rounded-md bg-white/20 py-2 text-sm font-medium hover:bg-white/30 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;