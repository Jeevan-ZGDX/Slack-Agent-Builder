import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type PipelineStep = {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'complete';
  description: string;
};

export type IncidentSimulationContextType = {
  isSimulating: boolean;
  simulationStep: number;
  pipelineSteps: PipelineStep[];
  startSimulation: () => void;
  resetSimulation: () => void;
};

const defaultSteps: PipelineStep[] = [
  { id: 'detect', name: 'Signal Detection', status: 'pending', description: 'Monitoring Datadog & Sentry streams...' },
  { id: 'classify', name: 'Classification', status: 'pending', description: 'Categorizing incident severity...' },
  { id: 'history', name: 'Historical Search', status: 'pending', description: 'Finding similar past incidents...' },
  { id: 'correlate', name: 'Correlation', status: 'pending', description: 'Correlating alerts across services...' },
  { id: 'blast', name: 'Blast Radius', status: 'pending', description: 'Analyzing dependency graph impact...' },
  { id: 'experts', name: 'Expert Discovery', status: 'pending', description: 'Identifying on-call experts...' },
  { id: 'runbook', name: 'Runbook Retrieval', status: 'pending', description: 'Fetching relevant mitigation steps...' },
  { id: 'warroom', name: 'War Room Creation', status: 'pending', description: 'Provisioning Slack channel...' },
  { id: 'iip', name: 'IIP Generation', status: 'pending', description: 'Compiling Intelligence Package...' },
];

const IncidentSimulationContext = createContext<IncidentSimulationContextType | null>(null);

export function IncidentSimulationProvider({ children }: { children: React.ReactNode }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>(defaultSteps);

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(0);
    setPipelineSteps(defaultSteps.map(s => ({ ...s, status: 'pending' })));
    
    toast.error('🚨 Incident Detected: Checkout Service Degradation');
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(0);
    setPipelineSteps(defaultSteps);
  };

  useEffect(() => {
    if (!isSimulating) return;
    
    if (simulationStep < pipelineSteps.length) {
      const timer = setTimeout(() => {
        setPipelineSteps(prev => {
          const next = [...prev];
          if (simulationStep > 0) {
            next[simulationStep - 1].status = 'complete';
          }
          if (simulationStep < next.length) {
            next[simulationStep].status = 'active';
          }
          return next;
        });

        // Trigger side effects for specific steps
        if (simulationStep === 2) toast.info('🔍 Correlating with history...');
        if (simulationStep === 5) toast.success('👥 Experts discovered');
        if (simulationStep === 7) toast.success('🏠 War Room #incident-2026-checkout-001 created');
        if (simulationStep === 8) toast.success('📦 Incident Intelligence Package Ready');

        setSimulationStep(s => s + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // Finish
      setPipelineSteps(prev => {
        const next = [...prev];
        if (next.length > 0) {
          next[next.length - 1].status = 'complete';
        }
        return next;
      });
    }
  }, [isSimulating, simulationStep, pipelineSteps.length]);

  return (
    <IncidentSimulationContext.Provider
      value={{
        isSimulating,
        simulationStep,
        pipelineSteps,
        startSimulation,
        resetSimulation,
      }}
    >
      {children}
    </IncidentSimulationContext.Provider>
  );
}

export function useIncidentSimulation() {
  const context = useContext(IncidentSimulationContext);
  if (!context) {
    throw new Error('useIncidentSimulation must be used within an IncidentSimulationProvider');
  }
  return context;
}
