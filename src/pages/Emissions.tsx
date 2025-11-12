import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter } from "lucide-react";

const Emissions = () => {
  const emissionData = [
    { site: "Plant A", scope1: 234.5, scope2: 456.2, scope3: 123.4, total: 814.1 },
    { site: "Plant B", scope1: 189.3, scope2: 312.8, scope3: 98.7, total: 600.8 },
    { site: "Office HQ", scope1: 45.2, scope2: 156.3, scope3: 67.8, total: 269.3 },
    { site: "Warehouse", scope1: 78.9, scope2: 145.6, scope3: 45.2, total: 269.7 },
  ];

  const categoryData = [
    { category: "Electricity", value: 778.3, percentage: 39.7, color: "bg-accent" },
    { category: "Diesel", value: 456.2, percentage: 23.3, color: "bg-destructive" },
    { category: "Natural Gas", value: 345.6, percentage: 17.6, color: "bg-solar" },
    { category: "Travel", value: 234.5, percentage: 12.0, color: "bg-cyan" },
    { category: "Other", value: 145.3, percentage: 7.4, color: "bg-muted" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Emission Summary</h1>
            <p className="text-muted-foreground">
              Detailed breakdown of carbon emissions by scope and category
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Select defaultValue="all-sites">
                  <SelectTrigger>
                    <SelectValue placeholder="Select site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-sites">All Sites</SelectItem>
                    <SelectItem value="plant-a">Plant A</SelectItem>
                    <SelectItem value="plant-b">Plant B</SelectItem>
                    <SelectItem value="office">Office HQ</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <Select defaultValue="all-scopes">
                  <SelectTrigger>
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-scopes">All Scopes</SelectItem>
                    <SelectItem value="scope-1">Scope 1</SelectItem>
                    <SelectItem value="scope-2">Scope 2</SelectItem>
                    <SelectItem value="scope-3">Scope 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <Select defaultValue="last-month">
                  <SelectTrigger>
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,953.9 <span className="text-sm font-normal">tCO₂e</span></div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scope 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">547.9 <span className="text-sm font-normal">tCO₂e</span></div>
              <p className="text-xs text-emerald mt-1">↓ 8% vs last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scope 2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,070.9 <span className="text-sm font-normal">tCO₂e</span></div>
              <p className="text-xs text-emerald mt-1">↓ 12% vs last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Scope 3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">335.1 <span className="text-sm font-normal">tCO₂e</span></div>
              <p className="text-xs text-destructive mt-1">↑ 3% vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Emissions by Site</CardTitle>
              <CardDescription>Breakdown per location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emissionData.map((site) => {
                  const maxTotal = Math.max(...emissionData.map(s => s.total));
                  const percentage = (site.total / maxTotal) * 100;
                  
                  return (
                    <div key={site.site}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{site.site}</span>
                        <span className="text-sm text-muted-foreground">{site.total} tCO₂e</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald to-cyan transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>Emissions by source type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryData.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`h-3 w-3 rounded-full ${cat.color}`} />
                      <span className="text-sm font-medium">{cat.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{cat.value} tCO₂e</span>
                      <span className="text-sm font-semibold min-w-[3rem] text-right">{cat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Emissions Data</CardTitle>
            <CardDescription>Complete breakdown by site and scope</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold">Site</th>
                    <th className="text-right p-3 font-semibold">Scope 1</th>
                    <th className="text-right p-3 font-semibold">Scope 2</th>
                    <th className="text-right p-3 font-semibold">Scope 3</th>
                    <th className="text-right p-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {emissionData.map((row) => (
                    <tr key={row.site} className="border-b border-border/50 hover:bg-accent/5">
                      <td className="p-3 font-medium">{row.site}</td>
                      <td className="p-3 text-right text-muted-foreground">{row.scope1} tCO₂e</td>
                      <td className="p-3 text-right text-muted-foreground">{row.scope2} tCO₂e</td>
                      <td className="p-3 text-right text-muted-foreground">{row.scope3} tCO₂e</td>
                      <td className="p-3 text-right font-semibold">{row.total} tCO₂e</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border font-bold">
                    <td className="p-3">Total</td>
                    <td className="p-3 text-right">547.9 tCO₂e</td>
                    <td className="p-3 text-right">1,070.9 tCO₂e</td>
                    <td className="p-3 text-right">335.1 tCO₂e</td>
                    <td className="p-3 text-right text-primary">1,953.9 tCO₂e</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Emissions;
