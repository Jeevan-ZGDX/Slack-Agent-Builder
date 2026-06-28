import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  MessageSquare, 
  ShieldAlert, 
  BookOpen, 
  Users, 
  Search, 
  Clock, 
  FileText, 
  BarChart2, 
  Wrench, 
  Settings,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Live Incident Feed", href: "/incidents", icon: AlertTriangle, badge: 3 },
  { name: "Live Slack Workspace", href: "/slack", icon: MessageSquare },
  { name: "War Rooms", href: "/war-rooms", icon: ShieldAlert, badge: 1 },
  { name: "Runbooks", href: "/runbooks", icon: BookOpen },
  { name: "Expert Discovery", href: "/experts", icon: Users },
  { name: "Historical Search", href: "/search", icon: Search },
  { name: "Incident Timeline", href: "/timeline", icon: Clock },
  { name: "Postmortems", href: "/postmortems", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "MCP Tools", href: "/mcp-tools", icon: Wrench },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 border-r border-border bg-sidebar flex-shrink-0 flex flex-col h-full">
      <div className="h-14 flex items-center px-4 border-b border-border">
        <Activity className="w-5 h-5 text-primary mr-2" />
        <span className="font-bold text-lg text-sidebar-foreground tracking-tight">OpsOracle</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <span className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group cursor-pointer",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}>
                  <item.icon className={cn(
                    "mr-3 flex-shrink-0 h-4 w-4",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
                  )} />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant={isActive ? "default" : "secondary"} className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
