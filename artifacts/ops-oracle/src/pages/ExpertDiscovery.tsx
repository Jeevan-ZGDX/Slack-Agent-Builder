import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Zap, CheckCircle2, Shield, AlertTriangle } from "lucide-react";
import { mockEngineers } from "@/lib/mockData";
import { useIncidentSimulation } from "@/lib/incidentSimulation";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpertDiscovery() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isSimulating } = useIncidentSimulation();

  const filtered = mockEngineers.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bring highly confident experts to top if simulating
  const displayEngineers = isSimulating 
    ? [...filtered].sort((a, b) => b.confidence - a.confidence)
    : filtered;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Expert Discovery</h1>
          <p className="text-muted-foreground mt-1">AI-driven responder recommendations.</p>
        </div>
      </div>

      {isSimulating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start space-x-4 mb-8"
        >
          <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary">Incident Context Analysis Active</h3>
            <p className="text-sm text-muted-foreground mt-1">
              OpsOracle has analyzed the current P1 Checkout incident and re-ranked experts based on historical resolution patterns involving Redis connection pool exhaustion.
            </p>
          </div>
        </motion.div>
      )}

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by name, department, or skill..." 
          className="pl-9 bg-card h-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayEngineers.slice(0, 12).map((engineer, i) => {
            const isTopRec = isSimulating && i < 2;
            return (
              <motion.div
                key={engineer.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <Card className={`h-full flex flex-col ${isTopRec ? 'border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative overflow-hidden' : 'bg-card border-border/40'}`}>
                  {isTopRec && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-bl flex items-center">
                      <Zap className="h-3 w-3 mr-1" /> Recommended Match
                    </div>
                  )}
                  <CardHeader className="flex flex-row items-start space-x-4 pb-4">
                    <Avatar className="h-12 w-12 border-2 border-background">
                      <AvatarFallback className={isTopRec ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                        {engineer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{engineer.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Shield className="h-3 w-3 mr-1" /> {engineer.dept}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={
                      engineer.availability === 'Available' ? 'text-success border-success/30' :
                      engineer.availability === 'On-Call' ? 'text-warning border-warning/30' :
                      'text-muted-foreground'
                    }>
                      {engineer.availability}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-background rounded p-2 text-center">
                        <div className="text-2xl font-bold text-foreground">{engineer.expertise}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Expertise Score</div>
                      </div>
                      <div className="bg-background rounded p-2 text-center">
                        <div className="text-2xl font-bold text-foreground">{engineer.pastIncidents}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Resolved</div>
                      </div>
                    </div>
                    
                    {isSimulating && (
                      <div className="mt-auto bg-background/50 rounded p-3 border border-border/50">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-muted-foreground">Relevance</span>
                          <span className="text-xs font-bold text-primary">{engineer.confidence}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {engineer.reason}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <Button variant={isTopRec ? "default" : "secondary"} className="w-full" size="sm">
                        {isTopRec ? "Page Immediately" : "View Profile"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}