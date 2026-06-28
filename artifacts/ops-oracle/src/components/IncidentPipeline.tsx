import { useIncidentSimulation } from "@/lib/incidentSimulation";
import { CheckCircle2, Circle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function IncidentPipeline() {
  const { pipelineSteps } = useIncidentSimulation();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Detection Pipeline</h3>
      <div className="relative border-l border-border/50 ml-3 space-y-6">
        {pipelineSteps.map((step, index) => {
          const isActive = step.status === 'active';
          const isComplete = step.status === 'complete';
          const isPending = step.status === 'pending';

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: isPending ? 0.4 : 1, x: isActive ? 5 : 0 }}
              className={cn(
                "relative pl-6 transition-all duration-300",
                isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "absolute -left-[11px] top-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center bg-background",
                isActive ? "border-primary text-primary" : 
                isComplete ? "border-success text-success" : 
                "border-muted-foreground text-transparent"
              )}>
                {isComplete && <CheckCircle2 className="h-3 w-3" />}
                {isActive && <Loader2 className="h-3 w-3 animate-spin" />}
                {isPending && <Circle className="h-3 w-3" />}
              </div>
              
              <div className="flex flex-col">
                <span className={cn(
                  "text-sm font-semibold",
                  isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.name}
                </span>
                <AnimatePresence>
                  {(isActive || isComplete) && (
                    <motion.span 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-xs text-muted-foreground mt-1"
                    >
                      {step.description}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
