import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingDown, Clock, DollarSign, CheckCircle2, Circle } from "lucide-react";

const Actions = () => {
  const [implementedActions, setImplementedActions] = useState<string[]>([]);

  const recommendations = [
    {
      id: "1",
      action: "Shift 15% load to off-peak hours",
      category: "Energy Efficiency",
      co2Saved: 8.2,
      roiMonths: 4,
      confidence: "high",
      details: "Implement load shifting for non-critical operations to off-peak hours (10 PM - 6 AM) when grid carbon intensity is lower.",
    },
    {
      id: "2",
      action: "Switch diesel to biogas",
      category: "Fuel Switching",
      co2Saved: 12.5,
      roiMonths: 14,
      confidence: "medium",
      details: "Replace diesel generators with biogas alternatives for backup power and heating applications.",
    },
    {
      id: "3",
      action: "Retrofit LED lighting",
      category: "Energy Efficiency",
      co2Saved: 6.3,
      roiMonths: 10,
      confidence: "high",
      details: "Replace conventional lighting with LED systems across all facilities. Expected 60% reduction in lighting energy use.",
    },
    {
      id: "4",
      action: "Install solar panels (50 kW)",
      category: "Renewable Energy",
      co2Saved: 45.2,
      roiMonths: 36,
      confidence: "high",
      details: "Rooftop solar installation on Plant A warehouse. Estimated 70% self-consumption rate with grid export capability.",
    },
    {
      id: "5",
      action: "Optimize HVAC schedules",
      category: "Energy Efficiency",
      co2Saved: 4.8,
      roiMonths: 3,
      confidence: "high",
      details: "Smart scheduling based on occupancy patterns and temperature setpoint optimization. Quick win with minimal investment.",
    },
    {
      id: "6",
      action: "Electric vehicle fleet transition",
      category: "Transportation",
      co2Saved: 18.7,
      roiMonths: 48,
      confidence: "medium",
      details: "Phase out 30% of diesel vehicles and replace with electric alternatives over 2 years.",
    },
  ];

  const toggleImplemented = (id: string) => {
    setImplementedActions(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const totalSavings = recommendations
    .filter(r => implementedActions.includes(r.id))
    .reduce((sum, r) => sum + r.co2Saved, 0);

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: "bg-emerald/10 text-emerald border-emerald/20",
      medium: "bg-solar/10 text-solar border-solar/20",
      low: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return colors[confidence as keyof typeof colors] || colors.medium;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Smart Recommendations</h1>
            <p className="text-muted-foreground">
              AI-powered reduction strategies with ROI calculations
            </p>
          </div>
          <Button>Download Action Plan</Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Potential Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                95.7 <span className="text-sm font-normal">tCO₂e/year</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Actions Identified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recommendations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Implemented
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald">
                {implementedActions.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Realized Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald">
                {totalSavings.toFixed(1)} <span className="text-sm font-normal">tCO₂e</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {recommendations.map((rec) => {
            const isImplemented = implementedActions.includes(rec.id);
            
            return (
              <Card key={rec.id} className={isImplemented ? "border-emerald/50 bg-emerald/5" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Lightbulb className={`h-5 w-5 ${isImplemented ? "text-emerald" : "text-primary"}`} />
                        <CardTitle className="text-lg">{rec.action}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {rec.category}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getConfidenceBadge(rec.confidence)}`}>
                          {rec.confidence} confidence
                        </Badge>
                      </div>
                      <CardDescription>{rec.details}</CardDescription>
                    </div>
                    <Button
                      variant={isImplemented ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleImplemented(rec.id)}
                      className="flex-shrink-0"
                    >
                      {isImplemented ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Implemented
                        </>
                      ) : (
                        <>
                          <Circle className="h-4 w-4 mr-2" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald/10 flex items-center justify-center">
                        <TrendingDown className="h-5 w-5 text-emerald" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{rec.co2Saved}</p>
                        <p className="text-xs text-muted-foreground">tCO₂e saved/year</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{rec.roiMonths}</p>
                        <p className="text-xs text-muted-foreground">months ROI</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-solar/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-solar" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {(rec.co2Saved * 950).toFixed(0)}
                        </p>
                        <p className="text-xs text-muted-foreground">₹ saved/year</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Impact Summary */}
        {implementedActions.length > 0 && (
          <Card className="bg-gradient-to-br from-emerald/10 to-cyan/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald" />
                Implementation Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Reduction</p>
                  <p className="text-3xl font-bold text-emerald">
                    {totalSavings.toFixed(1)} tCO₂e
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Percentage of Goal</p>
                  <p className="text-3xl font-bold text-primary">
                    {((totalSavings / 95.7) * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Equivalent to</p>
                  <p className="text-3xl font-bold text-accent">
                    {Math.ceil(totalSavings / 21)} 🌳
                  </p>
                  <p className="text-xs text-muted-foreground">trees planted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Actions;
