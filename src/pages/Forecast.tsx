import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const Forecast = () => {
  const [timeRange, setTimeRange] = useState("3-months");

  const forecastData = {
    current: 1234.5,
    predicted: 1308.2,
    change: 5.97,
    confidence: 87,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Emission Forecast</h1>
            <p className="text-muted-foreground">
              AI-powered predictions of future carbon emissions
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="3-months">3 Months</SelectItem>
                <SelectItem value="6-months">6 Months</SelectItem>
                <SelectItem value="1-year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>Generate Forecast</Button>
          </div>
        </div>

        {/* Forecast Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Emissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {forecastData.current.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground ml-2">tCO₂e</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Predicted Emissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {forecastData.predicted.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground ml-2">tCO₂e</span>
              </div>
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +{forecastData.change}% increase predicted
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Forecast Confidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {forecastData.confidence}%
              </div>
              <div className="mt-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald transition-all"
                    style={{ width: `${forecastData.confidence}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forecast Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Emission Trend & Prediction</CardTitle>
            <CardDescription>
              Historical data (solid) and predicted values (dashed)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg relative overflow-hidden">
              {/* Simulated chart visualization */}
              <div className="absolute inset-0 p-8">
                <div className="h-full border-l border-b border-border relative">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="absolute left-0 right-0 border-t border-border/30"
                      style={{ bottom: `${i * 25}%` }}
                    />
                  ))}
                  
                  {/* Y-axis labels */}
                  <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
                    <span>2000</span>
                    <span>1500</span>
                    <span>1000</span>
                    <span>500</span>
                    <span>0</span>
                  </div>

                  {/* Legend */}
                  <div className="absolute top-4 right-4 flex gap-6 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-0.5 w-8 bg-gradient-to-r from-emerald to-cyan" />
                      <span>Historical</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-0.5 w-8 border-t-2 border-dashed border-destructive" />
                      <span>Predicted</span>
                    </div>
                  </div>

                  {/* Simulated line path */}
                  <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M 0,70 L 20,65 L 40,60 L 60,55 L 70,50"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="0.5"
                      className="drop-shadow-lg"
                    />
                    <path
                      d="M 70,50 L 80,52 L 90,56 L 100,60"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--emerald))" />
                        <stop offset="100%" stopColor="hsl(var(--cyan))" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* X-axis labels */}
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Key Findings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                <TrendingUp className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Predicted 6% increase</p>
                  <p className="text-sm text-muted-foreground">
                    Emissions expected to rise over the next 3 months if no action is taken
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Peak expected in May</p>
                  <p className="text-sm text-muted-foreground">
                    Seasonal factors indicate highest emissions during summer months
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                <TrendingDown className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Potential for reduction</p>
                  <p className="text-sm text-muted-foreground">
                    Implementing recommended actions could reduce forecast by 15%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contributing Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Electricity Demand</span>
                  <span className="text-sm text-destructive">+8%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive w-[80%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Fuel Consumption</span>
                  <span className="text-sm text-destructive">+4%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-solar w-[60%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Travel Activity</span>
                  <span className="text-sm text-emerald">-2%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald w-[30%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Seasonal Effects</span>
                  <span className="text-sm text-destructive">+5%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[70%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Take Action Now</h3>
                <p className="text-sm text-muted-foreground">
                  View recommended actions to reduce predicted emissions
                </p>
              </div>
              <Button>View Recommendations</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Forecast;
