import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldAlert, GitCommit, Search, CheckCircle2, Zap } from "lucide-react";
import { useIncidentSimulation } from "@/lib/incidentSimulation";
import { motion, AnimatePresence } from "framer-motion";

export default function Timeline() {
  const { isSimulating, pipelineSteps } = useIncidentSimulation();

  const standardEvents = [
    { time: "09:12 AM", type: "system", title: "API Gateway Deploy v2.1.4", desc: "Automated deployment completed successfully." },
    { time: "08:45 AM", type: "alert", title: "High CPU on DB-Read-Replica-2", desc: "CPU utilization exceeded 85% for 5 minutes." },
    { time: "08:15 AM", type: "resolve", title: "Resolved: Queue Processing Delay", desc: "Worker nodes scaled up." },
  ];

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Incident Timeline</h1>
        <p className="text-muted-foreground mt-1">Chronological event stream across all monitored services.</p>
      </div>

      <div className="relative border-l border-border/50 ml-6 pl-8 space-y-8 mt-8">
        <AnimatePresence>
          {isSimulating && pipelineSteps.filter(s => s.status !== 'pending').map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -left-[45px] top-1 h-6 w-6 rounded-full border-2 border-background bg-primary flex items-center justify-center ring-4 ring-background">
                {step.status === 'complete' ? <CheckCircle2 className="h-4 w-4 text-primary-foreground" /> : <Activity className="h-3 w-3 text-primary-foreground animate-spin" />}
              </div>
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant="outline" className="text-primary border-primary/30">Just Now</Badge>
                    <span className="font-semibold text-primary">OpsOracle AI</span>
                  </div>
                  <h4 className="text-foreground font-medium">{step.name}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {standardEvents.map((event, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[45px] top-1 h-6 w-6 rounded-full border-2 border-background bg-card flex items-center justify-center">
              {event.type === 'alert' ? <ShieldAlert className="h-3 w-3 text-warning" /> :
               event.type === 'system' ? <GitCommit className="h-3 w-3 text-muted-foreground" /> :
               <CheckCircle2 className="h-3 w-3 text-success" />}
            </div>
            <div className="mb-1 text-sm text-muted-foreground">{event.time}</div>
            <div className="bg-card border border-border/40 rounded-lg p-4">
              <h4 className="text-foreground font-medium">{event.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}