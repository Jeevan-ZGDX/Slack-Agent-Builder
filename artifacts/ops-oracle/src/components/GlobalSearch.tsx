import { useEffect, useState } from "react";
import { Calculator, Calendar, CreditCard, Settings, Smile, User, Search, AlertTriangle, FileText, Database } from "lucide-react";
import { useLocation } from "wouter";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (path: string) => {
    setLocation(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search incidents, services, runbooks, or experts... (Cmd+K)" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Active Incidents">
          <CommandItem onSelect={() => runCommand('/war-rooms')}>
            <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
            <span>INC-2026-042: Checkout Service Degradation</span>
            <CommandShortcut>P1</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand('/war-rooms')}>
            <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
            <span>INC-2026-041: Payment Gateway Timeout</span>
            <CommandShortcut>P2</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Runbooks">
          <CommandItem onSelect={() => runCommand('/runbooks')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Redis Connection Pool Recovery</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand('/runbooks')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Database Replica Promotion</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Links">
          <CommandItem onSelect={() => runCommand('/')}>
            <Database className="mr-2 h-4 w-4" />
            <span>Operational Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand('/slack')}>
            <Search className="mr-2 h-4 w-4" />
            <span>Live Slack Workspace</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand('/experts')}>
            <User className="mr-2 h-4 w-4" />
            <span>Expert Discovery</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
