  import { DashboardLayout } from "@/components/DashboardLayout";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { MapPin } from "lucide-react";
  import React, { Suspense, lazy } from "react";

  const GeoEmissionMap = lazy(() => import("@/components/GeoEmissionMap"));


  const MapPage = () => {
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Emission Map</h1>
              <p className="text-muted-foreground">Visualize carbon emissions across regions</p>
            </div>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Emissions Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <Suspense fallback={<div className="flex items-center justify-center h-full">Loading map...</div>}>
                    <GeoEmissionMap />
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Emissions Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionData.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-muted">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{region.region}</h3>
                          <p className="text-sm text-muted-foreground">{region.sites} monitoring sites</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={getIntensityColor(region.intensity)}>
                          {region.intensity} intensity
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium">{region.emissions} kgCO₂e</p>
                          <p className="text-xs text-muted-foreground">Total emissions</p>
                        </div>
                      </div>
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

export default MapPage;