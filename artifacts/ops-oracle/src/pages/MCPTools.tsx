import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function MCPTools() {
  const tools = [
    { name: "search_incident_history", desc: "Vector search across past postmortems and alerts", status: "Ready", lastRun: "2m ago" },
    { name: "get_runbook", desc: "Retrieve standard operating procedures by service", status: "Active", lastRun: "Just now" },
    { name: "get_expert_responders", desc: "Query on-call schedules and past resolution data", status: "Ready", lastRun: "1h ago" },
    { name: "assess_blast_radius", desc: "Analyze dependency graphs for downstream impact", status: "Ready", lastRun: "5m ago" },
    { name: "create_war_room", desc: "Provision Slack channels and invite relevant personnel", status: "Ready", lastRun: "3h ago" },
    { name: "generate_postmortem", desc: "Compile timeline and generate initial draft", status: "Ready", lastRun: "1d ago" },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">MCP Tools</h1>
        <p className="text-muted-foreground mt-1">Model Context Protocol tool executions and logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tools.map((tool, i) => (
          <motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card border-border/40 hover:border-border transition-colors h-full flex flex-col overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base font-mono text-primary">{tool.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className={tool.status === 'Active' ? 'border-primary/50 text-primary animate-pulse' : 'text-success border-success/30'}>
                    {tool.status}
                  </Badge>
                </div>
                <CardDescription>{tool.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col mt-4 bg-muted/30 p-4 border-t border-border/40">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Execution Log</span>
                  <span>Last run: {tool.lastRun}</span>
                </div>
                <div className="bg-background rounded p-3 font-mono text-xs text-muted-foreground space-y-1 overflow-hidden">
                  <div className="text-foreground">{`> Execute ${tool.name}({ "context": "P1" })`}</div>
                  <div className="text-warning">Processing parameters...</div>
                  <div className="flex items-center text-success"><CheckCircle2 className="h-3 w-3 mr-1" /> Success. Returned 1,423 bytes.</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}