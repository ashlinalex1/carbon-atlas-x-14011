import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const Map = () => {
  const regionData = [
    { region: "Maharashtra", emissions: 456.2, sites: 3, intensity: "high" },
    { region: "Karnataka", emissions: 234.5, sites: 2, intensity: "medium" },
    { region: "Tamil Nadu", emissions: 189.3, sites: 2, intensity: "medium" },
    { region: "Gujarat", emissions: 145.8, sites: 1, intensity: "low" },
    { region: "Delhi NCR", emissions: 98.7, sites: 1, intensity: "low" },
  ];

  const getIntensityColor = (intensity: string) => {
    const colors = {
      high: "bg-destructive/20 border-destructive text-destructive",
      medium: "bg-solar/20 border-solar text-solar",
      low: "bg-emerald/20 border-emerald text-emerald",
    };
    return colors[intensity as keyof typeof colors] || colors.medium;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Geo Carbon Map</h1>
            <p className="text-muted-foreground">
              Geographic visualization of carbon intensity across regions
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="all-scopes">
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-scopes">All Scopes</SelectItem>
                <SelectItem value="scope-1">Scope 1</SelectItem>
                <SelectItem value="scope-2">Scope 2</SelectItem>
                <SelectItem value="scope-3">Scope 3</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="last-month">
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Map Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>India Carbon Intensity Heatmap</CardTitle>
            <CardDescription>
              Interactive map showing emission density by region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simplified India map representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-2xl h-full p-8">
                  {/* Map placeholder with region markers */}
                  <div className="relative w-full h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapPin className="h-16 w-16 text-primary mx-auto" />
                      <div>
                        <p className="text-lg font-semibold mb-2">Interactive Map Coming Soon</p>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Geographic heatmap visualization will display carbon intensity across India with interactive tooltips and regional breakdowns
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sample region indicators */}
                  <div className="absolute top-1/4 right-1/3 flex flex-col items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-destructive/30 border-2 border-destructive animate-pulse" />
                    <Badge className={getIntensityColor("high")}>High</Badge>
                  </div>
                  
                  <div className="absolute bottom-1/3 left-1/4 flex flex-col items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-solar/30 border-2 border-solar animate-pulse delay-75" />
                    <Badge className={getIntensityColor("medium")}>Medium</Badge>
                  </div>
                  
                  <div className="absolute top-1/3 left-1/2 flex flex-col items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-emerald/30 border-2 border-emerald animate-pulse delay-150" />
                    <Badge className={getIntensityColor("low")}>Low</Badge>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border">
                <p className="text-xs font-semibold mb-3">Carbon Intensity</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald" />
                    <span className="text-xs">Low (&lt;200 tCO₂e)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-solar" />
                    <span className="text-xs">Medium (200-400 tCO₂e)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive" />
                    <span className="text-xs">High (&gt;400 tCO₂e)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Emissions Breakdown</CardTitle>
            <CardDescription>
              Detailed emissions data by geographic region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionData.map((region) => (
                <div key={region.region} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold">{region.region}</p>
                        <Badge variant="outline" className={getIntensityColor(region.intensity)}>
                          {region.intensity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {region.sites} site{region.sites > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{region.emissions}</p>
                    <p className="text-xs text-muted-foreground">tCO₂e</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Emission Sources */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Highest Emission Sites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Plant A, Mumbai", emissions: 234.5, region: "Maharashtra" },
                  { name: "Plant B, Bangalore", emissions: 189.3, region: "Karnataka" },
                  { name: "Office HQ, Pune", emissions: 156.7, region: "Maharashtra" },
                ].map((site, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{site.name}</p>
                      <p className="text-xs text-muted-foreground">{site.region}</p>
                    </div>
                    <p className="font-semibold">{site.emissions} tCO₂e</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Performing Sites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Warehouse, Delhi", emissions: 45.2, region: "Delhi NCR" },
                  { name: "Office, Ahmedabad", emissions: 67.8, region: "Gujarat" },
                  { name: "Plant C, Chennai", emissions: 89.4, region: "Tamil Nadu" },
                ].map((site, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{site.name}</p>
                      <p className="text-xs text-muted-foreground">{site.region}</p>
                    </div>
                    <p className="font-semibold text-emerald">{site.emissions} tCO₂e</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Map;
