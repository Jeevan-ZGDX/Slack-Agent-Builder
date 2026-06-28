import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Users, BookOpen, ArrowRight, MessageSquare, AlertTriangle } from "lucide-react";
import { useIncidentSimulation } from "@/lib/incidentSimulation";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function WarRooms() {
  const { isSimulating } = useIncidentSimulation();
  const [, setLocation] = useLocation();

  const rooms = [
    {
      id: "#incident-2026-payment-012",
      name: "Payment Gateway Timeout",
      severity: "P2",
      status: "Investigating",
      participants: 4,
      duration: "45m",
      service: "Payments"
    },
    {
      id: "#incident-2026-db-008",
      name: "Database CPU at 99%",
      severity: "P1",
      status: "Mitigating",
      participants: 6,
      duration: "1h 12m",
      service: "Database"
    }
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">War Rooms</h1>
          <p className="text-muted-foreground mt-1">Active incident collaboration channels.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isSimulating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full"
          >
            <Card className="border-destructive/50 bg-destructive/10 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive to-warning" />
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="destructive" className="animate-pulse">P1</Badge>
                  <Badge variant="outline" className="border-destructive/30 text-destructive">Active</Badge>
                </div>
                <CardTitle className="text-xl">Checkout Service Degradation</CardTitle>
                <CardDescription className="text-foreground font-mono text-xs mt-2 bg-background/50 p-1 rounded inline-block">
                  #incident-2026-checkout-001
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center"><Users className="h-4 w-4 mr-2" /> Participants</span>
                    <span className="font-medium text-foreground">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center"><AlertTriangle className="h-4 w-4 mr-2" /> Service</span>
                    <span className="font-medium text-foreground">Checkout</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center"><BookOpen className="h-4 w-4 mr-2" /> Runbook</span>
                    <span className="font-medium text-foreground truncate max-w-[120px]">Redis Pool Recovery</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => setLocation('/slack')}
                >
                  Join War Room <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {rooms.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="h-full"
          >
            <Card className="bg-card border-border/40 hover:border-border transition-colors h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={room.severity === 'P1' ? 'destructive' : 'default'} className={room.severity === 'P2' ? 'bg-warning hover:bg-warning text-warning-foreground' : ''}>
                    {room.severity}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">{room.status}</Badge>
                </div>
                <CardTitle className="text-xl">{room.name}</CardTitle>
                <CardDescription className="font-mono text-xs mt-2 bg-background p-1 rounded inline-block">
                  {room.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center"><Users className="h-4 w-4 mr-2" /> Participants</span>
                    <span className="font-medium text-foreground">{room.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-2" /> Duration</span>
                    <span className="font-medium text-foreground">{room.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center"><ShieldAlert className="h-4 w-4 mr-2" /> Service</span>
                    <span className="font-medium text-foreground">{room.service}</span>
                  </div>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => setLocation('/slack')}>
                  Join War Room
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}