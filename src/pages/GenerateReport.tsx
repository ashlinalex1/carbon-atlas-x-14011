import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/DashboardLayout";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
type ReportType = 'monthly' | 'quarterly' | 'annual' | 'custom';
type ReportFormat = 'pdf' | 'csv' | 'excel';

const GenerateReport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('monthly');
  const [reportFormat, setReportFormat] = useState<ReportFormat>('pdf');
  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [reportName, setReportName] = useState('');

  const handleGenerate = async () => {
  if (!reportName.trim()) {
    toast({
      title: "Error",
      description: "Please enter a report name",
      variant: "destructive",
    });
    return;
  }

  if (startDate > endDate) {
    toast({
      title: "Error",
      description: "End date cannot be before start date",
      variant: "destructive",
    });
    return;
  }

  setIsGenerating(true);

  try {
    // Capture the dashboard content
    const dashboardElement = document.querySelector('.dashboard-content') as HTMLElement; // Adjust the selector as needed
    if (!dashboardElement) {
      throw new Error('Dashboard content not found');
    }

    // Convert the dashboard to an image
    // Convert the dashboard to an image
const canvas = await html2canvas(dashboardElement, {
  scale: 2, // Increase for better quality
  useCORS: true,
  allowTaint: true,
  logging: false,
});

// Create a new PDF
const pdf = new jsPDF('p', 'mm', 'a4');
const imgData = canvas.toDataURL('image/png');

// Get the image dimensions from the canvas
const imgWidth = canvas.width;
const imgHeight = canvas.height;

// Calculate dimensions to fit the PDF
const pdfWidth = pdf.internal.pageSize.getWidth();
const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

// Add the image to the PDF
pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

// Save the PDF
pdf.save(`${reportName.replace(/\s+/g, '_')}.pdf`);

    toast({
      title: "Success",
      description: "Your report has been downloaded successfully!",
    });

    // Navigate back to reports page after a short delay
    setTimeout(() => navigate('/reports'), 1500);
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast({
      title: "Error",
      description: "Failed to generate report. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsGenerating(false);
  }
};

  const handleReportTypeChange = (value: string) => {
    const newType = value as ReportType;
    setReportType(newType);
    
    // Set default date ranges based on report type
    const now = new Date();
    const newStartDate = new Date();
    
    if (newType === 'monthly') {
      newStartDate.setDate(1);
      setStartDate(newStartDate);
      setEndDate(now);
    } else if (newType === 'quarterly') {
      const currentMonth = now.getMonth();
      const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
      newStartDate.setMonth(quarterStartMonth, 1);
      setStartDate(newStartDate);
      setEndDate(now);
    } else if (newType === 'annual') {
      newStartDate.setMonth(0, 1);
      setStartDate(newStartDate);
      setEndDate(now);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Generate New Report</h1>
            <p className="text-muted-foreground">
              Customize and generate a new emissions report
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>
              Configure the parameters for your custom report
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  placeholder="e.g., Q1 2024 Emissions Report"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={handleReportTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                      disabled={reportType !== 'custom'}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={reportFormat} onValueChange={(value) => setReportFormat(value as ReportFormat)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF (Recommended)</SelectItem>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Report Preview</Label>
              <div className="rounded-md border p-4 bg-muted/20 min-h-[100px] flex items-center justify-center text-muted-foreground">
                {reportName ? (
                  <p className="text-center">
                    <span className="font-medium">{reportName}</span>
                    <br />
                    {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
                    <br />
                    <span className="text-sm">Format: {reportFormat.toUpperCase()}</span>
                  </p>
                ) : (
                  <p>Configure your report to see a preview</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin">↻</span>
                  Generating...
                </>
              ) : (
                'Generate Report'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GenerateReport;
