import { cn } from "@/lib/utils";

export default function BlastRadius() {
  const nodes = [
    { id: 'CDN', label: 'CDN', x: 50, y: 10, status: 'healthy' },
    { id: 'Gateway', label: 'API Gateway', x: 50, y: 30, status: 'healthy' },
    { id: 'Auth', label: 'Auth', x: 20, y: 50, status: 'healthy' },
    { id: 'Checkout', label: 'Checkout', x: 50, y: 50, status: 'critical' },
    { id: 'Recommendations', label: 'Recommendations', x: 80, y: 50, status: 'healthy' },
    { id: 'Payments', label: 'Payments', x: 30, y: 70, status: 'impacted' },
    { id: 'Inventory', label: 'Inventory', x: 70, y: 70, status: 'healthy' },
    { id: 'Database', label: 'Database', x: 50, y: 90, status: 'critical' },
  ];

  const edges = [
    { from: 'CDN', to: 'Gateway' },
    { from: 'Gateway', to: 'Auth' },
    { from: 'Gateway', to: 'Checkout' },
    { from: 'Gateway', to: 'Recommendations' },
    { from: 'Checkout', to: 'Payments' },
    { from: 'Checkout', to: 'Inventory' },
    { from: 'Checkout', to: 'Database' },
    { from: 'Auth', to: 'Database' },
    { from: 'Inventory', to: 'Database' },
  ];

  return (
    <div className="relative w-full h-[300px] bg-background/50 rounded-lg border border-border/50 overflow-hidden font-sans">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from)!;
          const toNode = nodes.find(n => n.id === edge.to)!;
          
          const isCriticalPath = 
            (fromNode.status === 'critical' || fromNode.status === 'impacted') && 
            (toNode.status === 'critical' || toNode.status === 'impacted');

          return (
            <line
              key={i}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={isCriticalPath ? "hsl(var(--destructive))" : "hsl(var(--muted-foreground))"}
              strokeWidth={isCriticalPath ? 2 : 1}
              strokeDasharray={isCriticalPath ? "none" : "4 4"}
              opacity={0.5}
            />
          );
        })}
      </svg>
      
      {nodes.map(node => (
        <div
          key={node.id}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md text-xs font-semibold border flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer",
            node.status === 'critical' ? "bg-destructive/20 border-destructive text-destructive-foreground animate-pulse" :
            node.status === 'impacted' ? "bg-warning/20 border-warning text-warning-foreground" :
            "bg-card border-border/50 text-muted-foreground"
          )}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}
