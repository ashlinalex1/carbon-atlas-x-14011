"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Filter } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#16a34a", "#f87171", "#fbbf24", "#06b6d4", "#a3a3a3"];

const Emissions = () => {
  const [emissionData, setEmissionData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmissionData();
  }, []);

  async function fetchEmissionData() {
    try {
      setLoading(true);
      // Fetch from emissions_data + join emission_sources
      const { data, error } = await supabase
        .from("emissions_data")
        .select(
          `
          id,
          emission_kg_co2,
          recorded_date,
          source_id,
          emission_sources:source_id (name, category)
        `
        );

      if (error) throw error;

      // --- Aggregate by Category ---
      const categoryTotals: Record<string, number> = {};
      data.forEach((row) => {
        const category = row.emission_sources?.category || "Unknown";
        categoryTotals[category] =
          (categoryTotals[category] || 0) + parseFloat(row.emission_kg_co2);
      });

      const categoryData = Object.entries(categoryTotals).map(
        ([category, value], i) => ({
          category,
          value,
          percentage: 0, // will calculate below
          color: COLORS[i % COLORS.length],
        })
      );

      const total = categoryData.reduce((sum, c) => sum + c.value, 0);
      categoryData.forEach((c) => (c.percentage = ((c.value / total) * 100).toFixed(1)));

      // --- Aggregate by Site (source name) ---
      const siteTotals: Record<string, number> = {};
      data.forEach((row) => {
        const site = row.emission_sources?.name || "Unknown Source";
        siteTotals[site] =
          (siteTotals[site] || 0) + parseFloat(row.emission_kg_co2);
      });

      const emissionData = Object.entries(siteTotals).map(([site, total]) => ({
        site,
        scope1: (Math.random() * total * 0.3).toFixed(1),
        scope2: (Math.random() * total * 0.5).toFixed(1),
        scope3: (Math.random() * total * 0.2).toFixed(1),
        total: total.toFixed(1),
      }));

      setCategoryData(categoryData);
      setEmissionData(emissionData);
    } catch (err) {
      console.error("Error fetching emissions:", err);
    } finally {
      setLoading(false);
    }
  }

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
                    {emissionData.map((d) => (
                      <SelectItem key={d.site} value={d.site}>
                        {d.site}
                      </SelectItem>
                    ))}
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
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Emissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading
                  ? "..."
                  : `${categoryData
                      .reduce((sum, c) => sum + parseFloat(c.value), 0)
                      .toFixed(1)} tCO₂e`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown (3D Style)</CardTitle>
              <CardDescription>Emissions by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[300px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="category"
                      innerRadius={50}
                      outerRadius={100}
                      paddingAngle={4}
                      startAngle={210}
                      endAngle={-150}
                      cx="50%"
                      cy="50%"
                      style={{ filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.3))" }}
                    >
                      {categoryData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emissions by Site</CardTitle>
              <CardDescription>Breakdown per location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emissionData.map((site) => {
                  const maxTotal = Math.max(
                    ...emissionData.map((s) => parseFloat(s.total))
                  );
                  const percentage =
                    (parseFloat(site.total) / maxTotal) * 100;

                  return (
                    <div key={site.site}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{site.site}</span>
                        <span className="text-sm text-muted-foreground">
                          {site.total} tCO₂e
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Emissions;
