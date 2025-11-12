import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyReports: true,
    spikAlerts: true,
    milestones: false,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your organization and account preferences
          </p>
        </div>

        <Tabs defaultValue="organization" className="space-y-4">
          <TabsList>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="user">User Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="goals">Carbon Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="organization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>
                  Update your organization details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input id="region" defaultValue="India" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="e.g., Manufacturing" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@acme.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Sustainability Manager" />
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Change Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what updates you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailAlerts: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Get weekly emission summaries
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, weeklyReports: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Spike Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when emissions spike unexpectedly
                    </p>
                  </div>
                  <Switch
                    checked={notifications.spikAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, spikAlerts: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Milestone Celebrations</Label>
                    <p className="text-sm text-muted-foreground">
                      Celebrate when you reach reduction goals
                    </p>
                  </div>
                  <Switch
                    checked={notifications.milestones}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, milestones: checked })
                    }
                  />
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Reduction Targets</CardTitle>
                <CardDescription>
                  Set and track your net-zero goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetYear">Target Year for Net-Zero</Label>
                  <Input id="targetYear" type="number" defaultValue="2030" min="2024" max="2100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reductionPercent">Annual Reduction Target (%)</Label>
                  <Input id="reductionPercent" type="number" defaultValue="10" min="0" max="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baseline">Baseline Year</Label>
                  <Input id="baseline" type="number" defaultValue="2020" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="baselineEmissions">Baseline Emissions (tCO₂e)</Label>
                  <Input id="baselineEmissions" type="number" defaultValue="5000" />
                </div>
                <Button>Update Goals</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to 2030 Goal</span>
                      <span className="font-semibold text-primary">24.7%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "24.7%" }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Emissions</p>
                      <p className="text-2xl font-bold">1,234 tCO₂e</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Target Emissions</p>
                      <p className="text-2xl font-bold">0 tCO₂e</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
