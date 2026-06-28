import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockIncidents } from "@/lib/mockData";
import { FileText, Download, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Postmortems() {
  const postmortems = mockIncidents.filter(i => i.status === "Postmortem" || i.status === "Resolved").slice(0, 10);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Postmortems</h1>
          <p className="text-muted-foreground mt-1">Auto-generated learning documents from past incidents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postmortems.map((pm, i) => (
          <motion.div
            key={pm.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-card hover:border-primary/50 transition-colors border-border/40 group flex flex-col h-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className={pm.status === 'Postmortem' ? 'text-primary border-primary/30' : 'text-muted-foreground'}>
                    {pm.status === 'Postmortem' ? 'Draft' : 'Published'}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(pm.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{pm.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-4 text-sm text-muted-foreground flex-1">
                  <div>
                    <strong className="text-foreground block mb-1">Executive Summary</strong>
                    <span className="line-clamp-2">A {pm.severity} incident affecting {pm.service} caused by {pm.rootCause.toLowerCase()} Impacted operations for {pm.mttr} minutes.</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center"><AlertTriangle className="h-4 w-4 mr-1" /> {pm.severity}</span>
                    <span className="flex items-center"><FileText className="h-4 w-4 mr-1" /> 4 Action Items</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                  <Button variant="secondary" size="sm">Read Document</Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Download className="h-4 w-4 mr-2" /> Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}