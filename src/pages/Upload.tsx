import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      setUploadedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "✅ Data processed successfully!",
        description: "Emissions calculated and dashboard updated",
      });
      setUploadedFile(null);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upload Data</h1>
          <p className="text-muted-foreground">
            Upload your energy consumption, fuel usage, and travel data
          </p>
        </div>

        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Data Upload</CardTitle>
            <CardDescription>
              Drag and drop your CSV or Excel file, or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center transition-colors
                ${isDragging ? 'border-primary bg-primary/5' : 'border-border'}
                ${uploadedFile ? 'bg-emerald/5 border-emerald' : ''}
              `}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-emerald mx-auto" />
                  <div>
                    <p className="text-lg font-semibold">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleUpload} disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Upload & Process"}
                    </Button>
                    <Button variant="outline" onClick={() => setUploadedFile(null)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <UploadIcon className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-semibold mb-2">
                      Drop your file here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports CSV and Excel files up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Data Format Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Data Format Requirements</CardTitle>
            <CardDescription>
              Ensure your data follows this format for accurate processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Required Columns</p>
                  <p className="text-sm text-muted-foreground">
                    date, site_name, meter_type, unit, value
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">Supported Meter Types</p>
                  <p className="text-sm text-muted-foreground">
                    electricity, diesel, lpg, petrol, natural_gas, travel
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Example Format:</p>
                <pre className="text-xs text-muted-foreground overflow-x-auto">
{`date,site_name,meter_type,unit,value
2024-01-15,Plant A,electricity,kWh,1250
2024-01-15,Plant A,diesel,liters,350
2024-01-15,Plant B,natural_gas,m3,500`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>
              History of your data uploads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "jan_2024_data.csv", date: "2 hours ago", rows: 1234, status: "success" },
                { name: "dec_2023_data.xlsx", date: "1 day ago", rows: 2156, status: "success" },
                { name: "nov_2023_data.csv", date: "3 days ago", rows: 1987, status: "success" },
              ].map((upload, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{upload.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {upload.rows} rows • {upload.date}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
