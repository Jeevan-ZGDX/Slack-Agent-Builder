import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { IncidentSimulationProvider } from "./lib/incidentSimulation";

import Sidebar from "@/components/Sidebar";
import AIAssistant from "@/components/AIAssistant";
import GlobalSearch from "@/components/GlobalSearch";
import IncidentIntelligencePackage from "@/components/IncidentIntelligencePackage";

// Pages
import Dashboard from "@/pages/Dashboard";
import SlackWorkspace from "@/pages/SlackWorkspace";
import IncidentFeed from "@/pages/IncidentFeed";
import WarRooms from "@/pages/WarRooms";
import Runbooks from "@/pages/Runbooks";
import ExpertDiscovery from "@/pages/ExpertDiscovery";
import HistoricalSearch from "@/pages/HistoricalSearch";
import Timeline from "@/pages/Timeline";
import Postmortems from "@/pages/Postmortems";
import Analytics from "@/pages/Analytics";
import MCPTools from "@/pages/MCPTools";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto relative">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/slack" component={SlackWorkspace} />
          <Route path="/incidents" component={IncidentFeed} />
          <Route path="/war-rooms" component={WarRooms} />
          <Route path="/runbooks" component={Runbooks} />
          <Route path="/experts" component={ExpertDiscovery} />
          <Route path="/search" component={HistoricalSearch} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/postmortems" component={Postmortems} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/mcp-tools" component={MCPTools} />
          <Route path="/settings" component={Settings} />
          <Route component={() => (
            <div className="flex h-full items-center justify-center">
              <h1 className="text-2xl font-bold">404 Not Found</h1>
            </div>
          )} />
        </Switch>
      </main>
      <AIAssistant />
      <GlobalSearch />
      <IncidentIntelligencePackage />
    </div>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IncidentSimulationProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster theme="light" position="top-right" richColors />
        </TooltipProvider>
      </IncidentSimulationProvider>
    </QueryClientProvider>
  );
}

export default App;
