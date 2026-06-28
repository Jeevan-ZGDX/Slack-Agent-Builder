import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIncidentSimulation } from "@/lib/incidentSimulation";
import IncidentPipeline from "./IncidentPipeline";
import BlastRadius from "./BlastRadius";
import { AlertTriangle, Server, Users, Activity, ExternalLink, Zap, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

export default function IncidentIntelligencePackage() {
  const { isSimulating, simulationStep, resetSimulation } = useIncidentSimulation();
  const [, setLocation] = useLocation();

  const isReady = simulationStep >= 8; // IIP Generation complete

  return (
    <Dialog open={isSimulating} onOpenChange={(open) => { if (!open) resetSimulation(); }}>
      <DialogContent className="max-w-[1000px] h-[85vh] p-0 gap-0 overflow-hidden bg-background border-border/50">
        <div className="flex h-full">
          {/* Left Panel: Pipeline */}
          <div className="w-72 border-r border-border/50 bg-card/50 p-6 flex flex-col">
            <div className="flex items-center space-x-2 mb-8">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">OpsOracle IIP</h2>
            </div>
            <ScrollArea className="flex-1 pr-4">
              <IncidentPipeline />
            </ScrollArea>
          </div>

          {/* Right Panel: Content */}
          <div className="flex-1 bg-background relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="destructive" className="animate-pulse">P1 Critical</Badge>
                    <Badge variant="outline" className="border-primary/50 text-primary">AI Synthesized</Badge>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">Checkout Service Degradation</h1>
                  <p className="text-muted-foreground mt-1 font-mono text-xs">INC-2026-042 • Triggered 2m ago</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-warning">94%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">AI Confidence</div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 p-6">
              <AnimatePresence mode="wait">
                {!isReady ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 py-20"
                  >
                    <Activity className="h-12 w-12 text-primary animate-pulse" />
                    <p className="text-lg">Compiling Incident Intelligence Package...</p>
                    <p className="text-sm">Correlating Datadog metrics, Sentry errors, and historical postmortems.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 pb-10"
                  >
                    {/* Executive Summary */}
                    <section className="space-y-3">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4" /> Root Cause Prediction
                      </h3>
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <p className="text-foreground leading-relaxed text-sm">
                          OpsOracle has identified a 94% probability that this incident is caused by <strong>Redis Connection Pool Exhaustion</strong> in the Checkout service, leading to cascading timeouts across the Payments API. This closely matches INC-2025-118 and INC-2025-084.
                        </p>
                      </div>
                    </section>

                    {/* Blast Radius */}
                    <section className="space-y-3">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
                        <Server className="mr-2 h-4 w-4" /> Blast Radius Analysis
                      </h3>
                      <BlastRadius />
                      <div className="flex gap-4 mt-2">
                        <div className="bg-card border border-border/50 rounded p-3 flex-1">
                          <div className="text-xs text-muted-foreground mb-1">Customer Impact</div>
                          <div className="font-bold text-foreground">High (~420 checkouts blocked)</div>
                        </div>
                        <div className="bg-card border border-border/50 rounded p-3 flex-1">
                          <div className="text-xs text-muted-foreground mb-1">Estimated MTTR</div>
                          <div className="font-bold text-foreground">18 minutes</div>
                        </div>
                      </div>
                    </section>

                    {/* Recommended Actions */}
                    <section className="space-y-3">
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Recommended Actions
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-card border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm">Execute Redis Pool Recovery Runbook</h4>
                            <p className="text-xs text-muted-foreground mt-1">Scale up connection pool limits dynamically via MCP.</p>
                          </div>
                          <Button size="sm" variant="secondary">View Runbook</Button>
                        </div>
                        <div className="flex items-center justify-between bg-card border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm">Page Suggested Experts</h4>
                            <p className="text-xs text-muted-foreground mt-1">Sarah Jenkins (SRE), Mike Torres (Backend)</p>
                          </div>
                          <Button size="sm" variant="secondary">Page Team</Button>
                        </div>
                      </div>
                    </section>

                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollArea>

            {/* Footer Actions */}
            {isReady && (
              <div className="p-4 border-t border-border/50 bg-card flex justify-end space-x-3">
                <Button variant="ghost" onClick={resetSimulation}>Acknowledge & Close</Button>
                <Button onClick={() => { resetSimulation(); setLocation('/slack'); }} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  Open War Room <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
