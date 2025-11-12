import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trees, Sun, Heart } from "lucide-react";

const Offsets = () => {
  const [co2e, setCo2e] = useState(100);

  const trees = Math.ceil(co2e / 21);
  const solar = (co2e / 1197).toFixed(1);
  const donation = (co2e * 950).toFixed(0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Carbon Offsets</h1>
          <p className="text-muted-foreground">
            Calculate and implement neutralization strategies
          </p>
        </div>

        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Emissions</CardTitle>
            <CardDescription>
              Calculate offset requirements based on your carbon footprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="co2e">Carbon Emissions (tCO₂e)</Label>
                <Input
                  id="co2e"
                  type="number"
                  value={co2e}
                  onChange={(e) => setCo2e(Number(e.target.value))}
                  min="0"
                  step="0.1"
                />
              </div>
              <Button>Calculate</Button>
            </div>
          </CardContent>
        </Card>

        {/* Offset Options */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Tree Offset */}
          <Card className="border-emerald/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trees className="h-5 w-5 text-emerald" />
                  Tree Planting
                </CardTitle>
              </div>
              <CardDescription>
                Offset through afforestation projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-emerald/10 rounded-lg">
                <div className="text-4xl font-bold text-emerald mb-2">
                  {trees.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trees needed to offset {co2e} tCO₂e
                </p>
              </div>
              <div className="flex justify-center">
                <div className="text-6xl">🌳</div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Each tree absorbs approximately 21 kg of CO₂ per year
              </p>
              <Button className="w-full" variant="outline">
                Start Tree Project
              </Button>
            </CardContent>
          </Card>

          {/* Solar Offset */}
          <Card className="border-solar/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-solar" />
                  Solar Energy
                </CardTitle>
              </div>
              <CardDescription>
                Offset through solar installation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-solar/10 rounded-lg">
                <div className="text-4xl font-bold text-solar mb-2">
                  {solar} kW
                </div>
                <p className="text-sm text-muted-foreground">
                  Solar capacity needed for {co2e} tCO₂e
                </p>
              </div>
              <div className="flex justify-center">
                <div className="text-6xl">☀️</div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                1 kW solar offsets approximately 1,197 kg CO₂e annually
              </p>
              <Button className="w-full" variant="outline">
                Plan Solar Installation
              </Button>
            </CardContent>
          </Card>

          {/* NGO Donation */}
          <Card className="border-accent/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-accent" />
                  NGO Donation
                </CardTitle>
              </div>
              <CardDescription>
                Support verified carbon projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-accent/10 rounded-lg">
                <div className="text-4xl font-bold text-accent mb-2">
                  ₹{donation.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated donation for {co2e} tCO₂e
                </p>
              </div>
              <div className="flex justify-center">
                <div className="text-6xl">💚</div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Average rate: ₹950 per ton CO₂e through verified NGOs
              </p>
              <Button className="w-full" variant="outline">
                Find NGO Partners
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle>Offset Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              To achieve carbon neutrality for <span className="font-bold text-primary">{co2e} tCO₂e</span>, you can:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <Trees className="h-4 w-4 text-emerald" />
                Plant <span className="font-semibold">{trees.toLocaleString()} trees</span>
              </li>
              <li className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-solar" />
                Install <span className="font-semibold">{solar} kW solar capacity</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                Donate <span className="font-semibold">₹{donation.toLocaleString()}</span> to verified NGOs
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Offsets;
