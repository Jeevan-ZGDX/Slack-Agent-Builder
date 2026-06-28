import { useState, useEffect, useRef } from "react";
import { Hash, Search, Bell, Settings, Plus, User, Zap, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useIncidentSimulation } from "@/lib/incidentSimulation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const channels = [
  { name: "alerts-prod", unread: true },
  { name: "pagerduty", unread: false },
  { name: "datadog", unread: false },
  { name: "sentry", unread: false },
  { name: "engineering", unread: false },
  { name: "incident-history", unread: false },
  { name: "general", unread: false },
];

export default function SlackWorkspace() {
  const { isSimulating, simulationStep } = useIncidentSimulation();
  const [messages, setMessages] = useState([
    { id: 1, user: "Datadog", avatar: "DD", time: "10:23 AM", content: "[Recovered] High CPU utilization on database-primary", type: "bot" },
    { id: 2, user: "Alex Kim", avatar: "AK", time: "10:25 AM", content: "Looks like the spike has passed. I'll keep an eye on it.", type: "human" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSimulating) {
      const simMessages = [
        { id: 101, user: "Datadog", avatar: "DD", time: "Now", content: "🚨 [Triggered] API Latency > 2s on checkout-service", type: "alert", delay: 0 },
        { id: 102, user: "PagerDuty", avatar: "PD", time: "Now", content: "P1 Incident assigned to @Sarah Jenkins: Checkout Service Degradation", type: "alert", delay: 1000 },
        { id: 103, user: "Sentry", avatar: "SN", time: "Now", content: "New issue: ConnectionPoolTimeoutException in checkout-api", type: "alert", delay: 2000 },
        { id: 104, user: "Sarah Jenkins", avatar: "SJ", time: "Now", content: "I'm on it. Looking at the Datadog dashboard now.", type: "human", delay: 4000 },
        { id: 105, user: "OpsOracle", avatar: "OO", time: "Now", content: "🔍 Analyzing incident... Found 3 similar historical incidents. Root cause is likely Redis Connection Pool Exhaustion.", type: "ai", delay: 6000 },
      ];

      simMessages.forEach(msg => {
        setTimeout(() => {
          setMessages(prev => [...prev, msg]);
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, msg.delay);
      });
    }
  }, [isSimulating]);

  return (
    <div className="flex h-full bg-[#1A1D21] text-[#D1D2D3] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[#19171D] border-r border-[#383838] flex flex-col flex-shrink-0">
        <div className="h-12 border-b border-[#383838] flex items-center px-4 font-bold text-white hover:bg-[#35373B] cursor-pointer transition-colors">
          Engineering Team
        </div>
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-[#8E8D91] text-xs font-semibold mb-2 group">
                <span>Channels</span>
                <Plus className="h-4 w-4 opacity-0 group-hover:opacity-100 cursor-pointer" />
              </div>
              <div className="space-y-0.5">
                {channels.map(c => (
                  <div key={c.name} className={cn(
                    "flex items-center px-2 py-1 rounded cursor-pointer transition-colors",
                    c.name === "alerts-prod" ? "bg-[#1164A3] text-white" : "hover:bg-[#35373B]",
                    c.unread && c.name !== "alerts-prod" ? "text-white font-bold" : ""
                  )}>
                    <Hash className="h-4 w-4 mr-2 opacity-70" />
                    <span className="truncate">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#1A1D21]">
        {/* Header */}
        <div className="h-14 border-b border-[#383838] flex items-center justify-between px-4">
          <div className="flex items-center font-bold text-white">
            <Hash className="h-5 w-5 mr-1 text-[#8E8D91]" />
            alerts-prod
          </div>
          <div className="flex items-center space-x-3 text-[#8E8D91]">
            <Search className="h-5 w-5 cursor-pointer hover:text-white" />
            <Bell className="h-5 w-5 cursor-pointer hover:text-white" />
            <Settings className="h-5 w-5 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-4" ref={scrollRef}>
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex space-x-3 group"
                >
                  <Avatar className="h-10 w-10 rounded">
                    <AvatarFallback className={cn(
                      "rounded text-white",
                      msg.type === 'alert' ? "bg-red-600" :
                      msg.type === 'ai' ? "bg-blue-600" :
                      msg.type === 'bot' ? "bg-purple-600" : "bg-emerald-600"
                    )}>{msg.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline space-x-2">
                      <span className={cn("font-bold", msg.type === 'ai' && "text-blue-400")}>{msg.user}</span>
                      <span className="text-xs text-[#8E8D91]">{msg.time}</span>
                    </div>
                    <div className="text-[15px] leading-relaxed mt-1">
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 pt-0">
          <div className="bg-[#222529] border border-[#565856] rounded-md focus-within:border-[#8E8D91] transition-colors p-2">
            <Input 
              placeholder="Message #alerts-prod" 
              className="border-0 bg-transparent focus-visible:ring-0 text-white placeholder:text-[#8E8D91]"
            />
            <div className="flex justify-between items-center mt-2 px-2">
              <div className="flex space-x-2 text-[#8E8D91]">
                <Zap className="h-4 w-4 cursor-pointer hover:text-white" />
                <AlertCircle className="h-4 w-4 cursor-pointer hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
