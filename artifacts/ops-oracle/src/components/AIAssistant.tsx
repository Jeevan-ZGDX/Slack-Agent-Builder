import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, X, MessageSquare, Send, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'I am OpsOracle. I can help analyze metrics, retrieve runbooks, or query past incidents. How can I assist?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Analyzing your request... I found 3 related incidents from last month. Would you like me to summarize the root causes?' 
      }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 w-96 z-50 shadow-2xl"
          >
            <Card className="border-primary/30 shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-card/95 backdrop-blur overflow-hidden flex flex-col h-[500px]">
              <CardHeader className="p-4 border-b border-border/50 bg-card/50 flex flex-row items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/20 p-1.5 rounded-md">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base font-bold">OpsOracle Assistant</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted border border-border/50 text-foreground'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-3 border-t border-border/50 bg-card">
                <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
                  <BadgeAction text="Predict cause" />
                  <BadgeAction text="Summarize incident" />
                  <BadgeAction text="Find runbook" />
                </div>
                <div className="relative">
                  <Input 
                    placeholder="Ask OpsOracle..." 
                    className="pr-10 bg-muted/50 border-border/50"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute right-1 top-1 h-7 w-7 text-primary hover:text-primary hover:bg-primary/10"
                    onClick={handleSend}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-50 border border-primary-foreground/10"
      >
        <Zap className="h-6 w-6" />
      </motion.button>
    </>
  );
}

function BadgeAction({ text }: { text: string }) {
  return (
    <button className="whitespace-nowrap text-xs bg-muted hover:bg-muted/80 text-muted-foreground border border-border/50 rounded-full px-3 py-1 transition-colors">
      {text}
    </button>
  );
}
