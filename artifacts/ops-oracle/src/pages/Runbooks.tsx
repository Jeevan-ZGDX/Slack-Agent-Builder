import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Clock, Activity, ArrowRight, PlayCircle } from "lucide-react";
import { mockRunbooks } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function Runbooks() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockRunbooks.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Runbooks</h1>
          <p className="text-muted-foreground mt-1">Standard operating procedures for mitigation.</p>
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Create Runbook
        </Button>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search runbooks by title, service, or keywords..." 
          className="pl-9 bg-card h-12 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((runbook, i) => (
          <motion.div
            key={runbook.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="h-full"
          >
            <Card className="bg-card hover:border-primary/50 transition-colors h-full flex flex-col group cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {runbook.id}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Activity className="h-3 w-3 mr-1 text-success" />
                    {runbook.successRate}% success
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{runbook.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <CardDescription className="line-clamp-2 mb-4 text-sm">
                  {runbook.summary}
                </CardDescription>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="flex space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center"><PlayCircle className="h-3 w-3 mr-1" /> {runbook.steps} steps</span>
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> ~{runbook.estimatedTime}m</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}