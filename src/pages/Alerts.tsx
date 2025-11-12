import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, CheckCircle2, Lightbulb, Bell, X } from "lucide-react";
import { useState } from "react";

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "spike",
      severity: "high",
      title: "Emissions spike detected at Plant A",
      message: "Emissions rose 12% this month compared to last month. Investigate potential causes.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "milestone",
      severity: "info",
      title: "Congratulations! Quarterly goal achieved",
      message: "You reduced emissions by 5% this quarter. Keep up the great work!",
      time: "1 day ago",
      read: false,
    },
    {
      id: "3",
      type: "suggestion",
      severity: "medium",
      title: "New recommendation available",
      message: "Install solar panels to save 1.2 tCO₂e/year. ROI in 36 months.",
      time: "2 days ago",
      read: true,
    },
    {
      id: "4",
      type: "spike",
      severity: "medium",
      title: "Increased diesel consumption",
      message: "Plant B diesel usage up 8% this week. Check generator efficiency.",
      time: "3 days ago",
      read: true,
    },
    {
      id: "5",
      type: "milestone",
      severity: "info",
      title: "1000 tCO₂e milestone reached",
      message: "Total emissions reduced by 1000 tCO₂e since program start.",
      time: "1 week ago",
      read: true,
    },
  ]);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "spike":
        return <AlertTriangle className="h-5 w-5" />;
      case "milestone":
        return <CheckCircle2 className="h-5 w-5" />;
      case "suggestion":
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 border-destructive/20 text-destructive";
      case "medium":
        return "bg-solar/10 border-solar/20 text-solar";
      case "info":
        return "bg-emerald/10 border-emerald/20 text-emerald";
      default:
        return "bg-accent/10 border-accent/20 text-accent";
    }
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications & Alerts</h1>
            <p className="text-muted-foreground">
              Stay informed about emission changes and milestones
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {unreadCount} unread
            </Badge>
          )}
        </div>

        {/* Alert Categories */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-lg">Spike Alerts</CardTitle>
                  <CardDescription className="text-xs">Unusual emission increases</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {alerts.filter(a => a.type === "spike").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald" />
                </div>
                <div>
                  <CardTitle className="text-lg">Milestones</CardTitle>
                  <CardDescription className="text-xs">Goals achieved</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {alerts.filter(a => a.type === "milestone").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Suggestions</CardTitle>
                  <CardDescription className="text-xs">Reduction ideas</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {alerts.filter(a => a.type === "suggestion").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle>All Alerts</CardTitle>
            <CardDescription>
              Recent notifications and system alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`
                    flex items-start gap-4 p-4 border rounded-lg transition-colors
                    ${alert.read ? 'border-border bg-background' : 'border-primary/20 bg-primary/5'}
                  `}
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getSeverityColor(alert.severity)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{alert.title}</p>
                          {!alert.read && (
                            <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
                              New
                            </Badge>
                          )}
                          <Badge variant="outline" className={`text-xs ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dismissAlert(alert.id)}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {!alert.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(alert.id)}
                        className="mt-2"
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {alerts.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">No alerts</p>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! New alerts will appear here.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Preferences</CardTitle>
            <CardDescription>
              Configure which alerts you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Emission Spike Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Notify when emissions increase unexpectedly
                  </p>
                </div>
                <Badge className={getSeverityColor("high")}>Enabled</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Milestone Celebrations</p>
                  <p className="text-sm text-muted-foreground">
                    Celebrate when you reach reduction goals
                  </p>
                </div>
                <Badge className={getSeverityColor("info")}>Enabled</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Smart Suggestions</p>
                  <p className="text-sm text-muted-foreground">
                    Receive AI-powered reduction recommendations
                  </p>
                </div>
                <Badge className={getSeverityColor("medium")}>Enabled</Badge>
              </div>
            </div>
            <Button className="mt-6">Manage Alert Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
