import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Upload as UploadIcon, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";

// 🌱 Static emission sources with emission factors (CO₂ per unit)
const emissionSources = [
  { id: "0570e733-d0bb-4ad5-8b00-85f355111734", name: "Paper", category: "Materials", unit: "kg", factor: 1.5 },
  { id: "109901a8-246c-4011-b654-45f23cba3c0c", name: "Air Travel - Domestic", category: "Transport", unit: "km", factor: 0.255 },
  { id: "1791593a-f30c-4c9d-a5a8-bb6fd58604f2", name: "Rail Travel", category: "Transport", unit: "km", factor: 0.041 },
  { id: "5a8154ab-fd90-45ce-943b-a406f5a98ae7", name: "Gasoline", category: "Transport", unit: "L", factor: 2.31 },
  { id: "68fa162a-fe52-4b77-b7c0-e6ca3b4fcad8", name: "Electricity", category: "Energy", unit: "kWh", factor: 0.85 },
  { id: "858bbca3-85e3-4a70-8b38-dee74803757c", name: "Air Travel - International", category: "Transport", unit: "km", factor: 0.195 },
  { id: "9539bbee-9d79-4493-b5e3-8fe11360a6c8", name: "Car Travel", category: "Transport", unit: "km", factor: 0.121 },
  { id: "d65cc0c9-e392-438e-8f76-5436a0a9fa45", name: "Waste - Landfill", category: "Waste", unit: "kg", factor: 1.0 },
  { id: "d8655941-5de1-4fd7-ad4c-8535f16293af", name: "Diesel", category: "Transport", unit: "L", factor: 2.68 },
  { id: "e39c0380-da24-40ed-af18-ab36ca4e3efc", name: "Plastic", category: "Materials", unit: "kg", factor: 6.0 },
  { id: "e64866ec-d6ae-4b1d-81d1-0110d4e1dbfa", name: "Natural Gas", category: "Energy", unit: "m³", factor: 2.03 },
];

const Upload = () => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    requiredDate: "",
    note: "",
    emissionType: "",
  });

  const predefinedData = [
    {
      label: "January 2024 - Plant A",
      value: `2024-01-15,Plant A,Electricity,kWh,1250
2024-01-15,Plant A,Diesel,L,350`,
    },
    {
      label: "December 2023 - Plant B",
      value: `2023-12-10,Plant B,Natural Gas,m³,500
2023-12-10,Plant B,Car Travel,km,120`,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, emissionType: value });
  };

  // 🧮 Calculate CO₂ emissions
  const calculateEmission = (sourceName: string, amount: number) => {
    const source = emissionSources.find((s) => s.name === sourceName);
    return source ? amount * source.factor : 0;
  };

  // 🚀 Handle File / Manual Upload
  const handleUpload = async () => {
    if (!uploadedFile && !selectedData && !formData.amount) {
      toast({
        title: "No data provided",
        description: "Please upload a file, select a dataset, or fill the manual form",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      let records: any[] = [];

      // ✅ Parse CSV/Excel Upload
      if (uploadedFile) {
        const text = await uploadedFile.text();
        const parsed = Papa.parse(text, { header: true });
        records = parsed.data.map((row: any) => ({
          id: uuidv4(),
          organization_id: "ORG-" + Math.floor(Math.random() * 1000),
          source_id: emissionSources.find((s) => s.name === row.source)?.id || "",
          user_id: uuidv4(),
          amount: parseFloat(row.amount),
          emission_kg_co2: calculateEmission(row.source, parseFloat(row.amount)),
          recorded_date: row.date || new Date().toISOString(),
          notes: row.note || "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
      }

      // ✅ Handle predefined data
      if (selectedData) {
        const lines = selectedData.split("\n");
        lines.forEach((line) => {
          const [date, org, source, unit, amount] = line.split(",");
          const src = emissionSources.find((s) => s.name.toLowerCase() === source.toLowerCase());
          if (src) {
            records.push({
              id: uuidv4(),
              organization_id: "ORG-" + Math.floor(Math.random() * 1000),
              source_id: src.id,
              user_id: uuidv4(),
              amount: parseFloat(amount),
              emission_kg_co2: parseFloat(amount) * src.factor,
              recorded_date: date,
              notes: org,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        });
      }

      // ✅ Manual Input
      if (formData.amount && formData.emissionType) {
        const src = emissionSources.find((s) => s.name === formData.emissionType);
        if (src) {
          records.push({
            id: uuidv4(),
            organization_id: uuidv4,
            source_id: src.id,
            user_id: uuidv4(),
            amount: parseFloat(formData.amount),
            emission_kg_co2: parseFloat(formData.amount) * src.factor,
            recorded_date: formData.requiredDate || new Date().toISOString(),
            notes: formData.note,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }

      // ✅ Insert into Supabase
      if (records.length > 0) {
        const { error } = await supabase.from("emissions_data").insert(records);
        if (error) throw error;
      }

      toast({
        title: "✅ Data added successfully!",
        description: `${records.length} records uploaded to Supabase.`,
      });

      setUploadedFile(null);
      setSelectedData("");
      setFormData({ amount: "", requiredDate: "", note: "", emissionType: "" });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Upload Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upload or Input Data</h1>
          <p className="text-muted-foreground">
            Upload CSV/Excel, select a predefined dataset, or input data manually
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Data Upload</CardTitle>
            <CardDescription>
              Drag & drop CSV/Excel file, select a dataset, or input values manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* 📂 File Upload */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file && (file.name.endsWith(".csv") || file.name.endsWith(".xlsx"))) {
                  setUploadedFile(file);
                } else {
                  toast({
                    title: "Invalid file type",
                    description: "Please upload CSV or Excel file",
                    variant: "destructive",
                  });
                }
              }}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-border"
              } ${uploadedFile ? "bg-emerald/5 border-emerald" : ""}`}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-emerald mx-auto" />
                  <p className="text-lg font-semibold">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
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
                  <p className="text-lg font-semibold mb-2">
                    Drop your file here or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="file-upload">
                    <Button asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>

            {/* 📊 Predefined Dataset */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Or Select Predefined Dataset</h3>
              <select
                className="w-full border border-border rounded-lg p-3"
                value={selectedData}
                onChange={(e) => setSelectedData(e.target.value)}
              >
                <option value="">-- Select a dataset --</option>
                {predefinedData.map((data, i) => (
                  <option key={i} value={data.value}>
                    {data.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 🧾 Manual Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Manual Input</CardTitle>
                <CardDescription>Enter data manually for a single record</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="requiredDate">Recorded Date</Label>
                  <Input
                    id="requiredDate"
                    name="requiredDate"
                    type="date"
                    value={formData.requiredDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="note">Notes</Label>
                  <Textarea
                    id="note"
                    name="note"
                    placeholder="Enter notes"
                    value={formData.note}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="emissionType">Emission Type</Label>
                  <Select value={formData.emissionType} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select emission type" />
                    </SelectTrigger>
                    <SelectContent>
                      {emissionSources.map((source) => (
                        <SelectItem key={source.id} value={source.name}>
                          {source.name} ({source.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 🧠 Action Buttons */}
            <div className="flex justify-end mt-4">
              <Button onClick={handleUpload} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Save to Supabase"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Upload;
