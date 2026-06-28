import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { mockIncidents } from "@/lib/mockData";
import { useIncidentSimulation } from "@/lib/incidentSimulation";
import { motion, AnimatePresence } from "framer-motion";

export default function IncidentFeed() {
  const { isSimulating } = useIncidentSimulation();
  const [searchTerm, setSearchTerm] = useState("");

  const activeIncidents = mockIncidents.filter(i => i.status !== "Resolved" && i.status !== "Postmortem");
  const filtered = activeIncidents.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Live Incident Feed</h1>
        <p className="text-muted-foreground mt-1">Real-time view of ongoing operational issues.</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search active incidents..." 
            className="pl-9 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted">
          <Filter className="h-3 w-3 mr-2" />
          Filter
        </Badge>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {isSimulating && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-destructive/50 bg-destructive/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-destructive animate-pulse" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive" className="animate-pulse">P1</Badge>
                      <CardTitle className="text-lg text-destructive-foreground">Checkout Service Degradation</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <CardDescription className="text-foreground mt-2">
                    Connection pool exhaustion leading to cascading timeouts in the checkout pipeline.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                    <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Just now</div>
                    <div className="flex items-center"><strong>Service:</strong> <span className="ml-1 text-foreground">Checkout</span></div>
                    <div className="flex items-center"><strong>Responders:</strong> <span className="ml-1 text-foreground">Sarah J., OpsOracle (AI)</span></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {filtered.map((incident, i) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:border-border/80 transition-colors border-border/40 bg-card/50">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <Badge variant={incident.severity === 'P1' ? 'destructive' : incident.severity === 'P2' ? 'default' : 'secondary'} className={incident.severity === 'P2' ? 'bg-warning hover:bg-warning' : ''}>
                        {incident.severity}
                      </Badge>
                      <CardTitle className="text-lg">{incident.title}</CardTitle>
                    </div>
                    <Badge variant="outline">
                      {incident.status === 'Active' ? <AlertTriangle className="h-3 w-3 mr-1 text-warning" /> : <Clock className="h-3 w-3 mr-1 text-muted-foreground" />}
                      {incident.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                    <div className="flex items-center"><strong>ID:</strong> <span className="ml-1">{incident.id}</span></div>
                    <div className="flex items-center"><strong>Service:</strong> <span className="ml-1">{incident.service}</span></div>
                    <div className="flex items-center"><strong>Responders:</strong> <span className="ml-1">{incident.engineers.join(', ')}</span></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filtered.length === 0 && !isSimulating && (
          <div className="text-center py-12 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active incidents found.</p>
          </div>
        )}
      </div>
    </div>
  );
}