import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Database, Activity, ShieldAlert, History } from "lucide-react";
import { mockIncidents } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function HistoricalSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filtered = mockIncidents.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || i.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Historical Search</h1>
        <p className="text-muted-foreground mt-1">Search through past incidents to find correlations and root causes.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by keyword, service, or root cause..." 
            className="pl-9 bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="P1">P1 Critical</SelectItem>
            <SelectItem value="P2">P2 High</SelectItem>
            <SelectItem value="P3">P3 Medium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((incident, i) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 10) * 0.05 }}
          >
            <Card className="bg-card border-border/40 hover:border-border transition-colors">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <Badge variant={incident.severity === 'P1' ? 'destructive' : incident.severity === 'P2' ? 'default' : 'secondary'} className={incident.severity === 'P2' ? 'bg-warning hover:bg-warning' : ''}>
                      {incident.severity}
                    </Badge>
                    <span className="text-sm font-mono text-muted-foreground">{incident.id}</span>
                    <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    <strong className="text-foreground">Root Cause:</strong> {incident.rootCause}
                  </p>
                </div>
                <div className="flex flex-wrap md:flex-col gap-4 text-sm text-muted-foreground min-w-[200px]">
                  <div className="flex items-center"><Database className="h-4 w-4 mr-2" /> {incident.service}</div>
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> {new Date(incident.date).toLocaleDateString()}</div>
                  <div className="flex items-center"><Activity className="h-4 w-4 mr-2" /> MTTR: {incident.mttr}m</div>
                  <div className="flex items-center text-primary font-medium">
                    <History className="h-4 w-4 mr-2" />
                    {Math.floor(Math.random() * 30 + 70)}% Similarity Match
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}