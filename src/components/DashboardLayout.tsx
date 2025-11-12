import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Upload,
  BarChart3,
  TrendingUp,
  Lightbulb,
  Trees,
  MapPin,
  FileText,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarLinks = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/upload", label: "Upload Data", icon: Upload },
  { to: "/emissions", label: "Emissions", icon: BarChart3 },
  { to: "/forecast", label: "Forecast", icon: TrendingUp },
  { to: "/actions", label: "Actions", icon: Lightbulb },
  { to: "/offsets", label: "Offsets", icon: Trees },
  { to: "/map", label: "Geo Map", icon: MapPin },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-border bg-card flex-col fixed left-0 top-16 bottom-0 overflow-y-auto">
          <div className="p-6 flex-1">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">
              Dashboard
            </h2>
            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* User Info & Logout */}
          <div className="p-6 border-t border-border">
            <div className="mb-3">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Logged in</p>
            </div>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              L
            </Button> */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
