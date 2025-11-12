import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Leaf, Zap } from "lucide-react";

const Dashboard = () => {
  const kpis = [
    {
      title: "Total Emissions",
      value: "1,234.5",
      unit: "tCO₂e",
      change: -12,
      icon: Leaf,
      color: "text-emerald",
    },
    {
      title: "This Month",
      value: "98.3",
      unit: "tCO₂e",
      change: 5,
      icon: TrendingUp,
      color: "text-destructive",
    },
    {
      title: "Scope 1",
      value: "456.2",
      unit: "tCO₂e",
      change: -8,
      icon: Zap,
      color: "text-accent",
    },
    {
      title: "Scope 2",
      value: "778.3",
      unit: "tCO₂e",
      change: -15,
      icon: TrendingDown,
      color: "text-cyan",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Monitor your carbon footprint and track progress toward net-zero
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            const isPositive = kpi.change < 0;
            
            return (
              <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {kpi.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {kpi.value}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {kpi.unit}
                    </span>
                  </div>
                  <p
                    className={`text-xs ${
                      isPositive ? "text-emerald" : "text-destructive"
                    } flex items-center mt-1`}
                  >
                    {isPositive ? (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(kpi.change)}% from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Emission Trends</CardTitle>
              <CardDescription>
                Monthly carbon emissions over the past year
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Scope Breakdown</CardTitle>
              <CardDescription>
                Distribution by emission scope
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
              <p className="text-muted-foreground">Pie chart coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and actions taken
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Data uploaded", site: "Plant A", time: "2 hours ago" },
                { action: "Forecast generated", site: "All sites", time: "5 hours ago" },
                { action: "Recommendation implemented", site: "Plant B", time: "1 day ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.site}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
