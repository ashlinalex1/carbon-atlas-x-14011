import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();

  const reports = [
    {
      title: "January 2024 Emission Report",
      date: "2024-02-01",
      emissions: 1234.5,
      actions: 3,
      size: "2.4 MB",
    },
    {
      title: "December 2023 Emission Report",
      date: "2024-01-01",
      emissions: 1189.3,
      actions: 2,
      size: "2.1 MB",
    },
    {
      title: "Q4 2023 Quarterly Report",
      date: "2024-01-15",
      emissions: 3678.9,
      actions: 8,
      size: "5.8 MB",
    },
    {
      title: "November 2023 Emission Report",
      date: "2023-12-01",
      emissions: 1345.6,
      actions: 4,
      size: "2.3 MB",
    },
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Report generation started",
      description: "Your report will be ready in a few moments",
    });
  };

  const handleDownload = (title: string) => {
    toast({
      title: "Downloading report",
      description: `${title} is being downloaded`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports</h1>
            <p className="text-muted-foreground">
              Generate and download emission summary reports
            </p>
          </div>
          <Button onClick={handleGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        {/* Report Types */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Report</CardTitle>
              <CardDescription>
                Comprehensive monthly emission summary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Total emissions by scope</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Site-wise breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Trend analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Actions taken</span>
                </li>
              </ul>
              <Button className="w-full mt-4" variant="outline" onClick={handleGenerateReport}>
                Generate Monthly
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quarterly Report</CardTitle>
              <CardDescription>
                Detailed quarterly analysis and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>3-month trend analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Goal progress tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>ROI of actions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Executive summary</span>
                </li>
              </ul>
              <Button className="w-full mt-4" variant="outline" onClick={handleGenerateReport}>
                Generate Quarterly
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Annual Report</CardTitle>
              <CardDescription>
                Complete year-end ESG report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Full year overview</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>ESG compliance data</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Offset projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald" />
                  <span>Sustainability goals</span>
                </li>
              </ul>
              <Button className="w-full mt-4" variant="outline" onClick={handleGenerateReport}>
                Generate Annual
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Previously generated emission reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{report.title}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.date).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{report.emissions} tCO₂e</span>
                        <span>•</span>
                        <span>{report.actions} actions</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(report.title)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Report Preview</CardTitle>
            <CardDescription>
              Sample sections included in emission reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold">Executive Summary</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Total emissions and trend analysis</li>
                  <li>• Key achievements and milestones</li>
                  <li>• Progress toward net-zero goals</li>
                  <li>• High-level recommendations</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Detailed Breakdown</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Scope 1, 2, 3 emissions data</li>
                  <li>• Site-wise and category analysis</li>
                  <li>• Month-over-month comparisons</li>
                  <li>• Emission factors used</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Actions & Impact</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Implemented reduction strategies</li>
                  <li>• Measured CO₂e savings</li>
                  <li>• ROI and payback periods</li>
                  <li>• Future action recommendations</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Visualizations</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Trend charts and graphs</li>
                  <li>• Geographic heatmaps</li>
                  <li>• Category pie charts</li>
                  <li>• Forecast projections</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
