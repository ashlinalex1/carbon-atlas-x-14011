import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Leaf, Zap, Factory, Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface EmissionsData {
  id: string;
  emission_kg_co2: number;
  recorded_date: string;
  emission_sources: {
    name: string;
    category: string;
  };
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [emissionsData, setEmissionsData] = useState<EmissionsData[]>([]);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [previousMonth, setPreviousMonth] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all emissions data
      const { data: emissions, error } = await supabase
  .from('emissions_data')
  .select(`
    id,
    emission_kg_co2,
    recorded_date,
    emission_sources!emissions_data_source_id_fkey (
      name,
      category
    )
  `)
  .order('recorded_date', { ascending: true });

      if (error) {
        console.error('Error fetching emissions:', error);
        return;
      }

      setEmissionsData(emissions || []);

      // Calculate total emissions (in tonnes)
      const total = (emissions || []).reduce((sum, record) => sum + Number(record.emission_kg_co2), 0) / 1000;
      setTotalEmissions(total);

      // Calculate monthly data
      const monthlyMap = new Map<string, number>();
      (emissions || []).forEach(record => {
        const date = new Date(record.recorded_date);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const current = monthlyMap.get(monthYear) || 0;
        monthlyMap.set(monthYear, current + Number(record.emission_kg_co2) / 1000);
      });

      const monthlyArray = Array.from(monthlyMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([monthYear, value]) => {
          const [year, month] = monthYear.split('-');
          const date = new Date(parseInt(year), parseInt(month) - 1);
          return {
            month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            emissions: parseFloat(value.toFixed(2))
          };
        });

      setMonthlyData(monthlyArray);

      // Calculate current and previous month
      if (monthlyArray.length >= 2) {
        setCurrentMonth(monthlyArray[monthlyArray.length - 1].emissions);
        setPreviousMonth(monthlyArray[monthlyArray.length - 2].emissions);
      } else if (monthlyArray.length === 1) {
        setCurrentMonth(monthlyArray[0].emissions);
      }

      // Calculate category breakdown
      const categoryMap = new Map<string, number>();
      (emissions || []).forEach(record => {
        const category = record.emission_sources.category;
        const current = categoryMap.get(category) || 0;
        categoryMap.set(category, current + Number(record.emission_kg_co2) / 1000);
      });

      const categoryArray = Array.from(categoryMap.entries()).map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2))
      }));

      setCategoryData(categoryArray);
    } catch (error) {
      console.error('Error in fetchDashboardData:', error);
    } finally {
      setLoading(false);
    }
  };

  const monthChange = previousMonth > 0 
    ? ((currentMonth - previousMonth) / previousMonth) * 100 
    : 0;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const kpis = [
    {
      title: "Total Emissions",
      value: totalEmissions.toFixed(1),
      unit: "tCO₂e",
      change: -12,
      icon: Leaf,
      color: "text-emerald-500",
    },
    {
      title: "This Month",
      value: currentMonth.toFixed(1),
      unit: "tCO₂e",
      change: parseFloat(monthChange.toFixed(1)),
      icon: currentMonth > previousMonth ? TrendingUp : TrendingDown,
      color: currentMonth > previousMonth ? "text-red-500" : "text-emerald-500",
    },
    {
      title: "Energy",
      value: (categoryData.find(c => c.name === 'Energy')?.value || 0).toFixed(1),
      unit: "tCO₂e",
      change: -8,
      icon: Zap,
      color: "text-yellow-500",
    },
    {
      title: "Transport",
      value: (categoryData.find(c => c.name === 'Transport')?.value || 0).toFixed(1),
      unit: "tCO₂e",
      change: -15,
      icon: Plane,
      color: "text-blue-500",
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Monitor your carbon footprint and track progress toward net-zero
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-3 w-28" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
                      isPositive ? "text-emerald-500" : "text-red-500"
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

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Emission Trends</CardTitle>
              <CardDescription>
                Monthly carbon emissions over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="month" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      label={{ value: 'tCO₂e', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="emissions" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                      name="Emissions (tCO₂e)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">No emissions data yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>
                Distribution by emission category
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">No category data yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Emissions Records</CardTitle>
            <CardDescription>
              Latest emissions data entries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emissionsData.slice(-5).reverse().map((record) => (
                <div key={record.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{record.emission_sources.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.emission_sources.category} • {(Number(record.emission_kg_co2) / 1000).toFixed(2)} tCO₂e
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(record.recorded_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {emissionsData.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No emissions data recorded yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
