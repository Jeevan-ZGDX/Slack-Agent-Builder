import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure OpsOracle behavior and integrations.</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-card border-border/40">
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect external services to OpsOracle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
              <div>
                <Label className="text-base font-semibold">Datadog</Label>
                <p className="text-sm text-muted-foreground">Monitor metrics and APM signals.</p>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
              <div>
                <Label className="text-base font-semibold">PagerDuty</Label>
                <p className="text-sm text-muted-foreground">Sync schedules and trigger incidents.</p>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
              <div>
                <Label className="text-base font-semibold">Slack</Label>
                <p className="text-sm text-muted-foreground">War room provisioning and chatops.</p>
              </div>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/40">
          <CardHeader>
            <CardTitle>AI Detection Thresholds</CardTitle>
            <CardDescription>Adjust sensitivity for automated incident creation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>P1 Critical Confidence Threshold</Label>
                <span className="text-sm font-mono text-muted-foreground">95%</span>
              </div>
              <Slider defaultValue={[95]} max={100} step={1} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>P2 High Confidence Threshold</Label>
                <span className="text-sm font-mono text-muted-foreground">80%</span>
              </div>
              <Slider defaultValue={[80]} max={100} step={1} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/40">
          <CardHeader>
            <CardTitle>LLM Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Model</Label>
              <Input value="gpt-4-turbo" readOnly className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label>System Prompt Base</Label>
              <textarea className="w-full min-h-[100px] p-3 rounded-md bg-muted/50 border border-border text-sm font-mono text-muted-foreground resize-none" readOnly value="You are OpsOracle, an elite Site Reliability Engineer assistant..."></textarea>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}