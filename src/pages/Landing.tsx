import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  Lightbulb,
  Trees,
  MapPin,
  Zap,
  ArrowRight,
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Carbon Footprint Calculator",
      description: "Accurately measure your organization's carbon emissions across all scopes.",
    },
    {
      icon: TrendingUp,
      title: "AI Emission Forecast",
      description: "Predict future emissions with advanced AI-powered forecasting models.",
    },
    {
      icon: Lightbulb,
      title: "Smart Recommendations",
      description: "Get actionable insights to reduce emissions with ROI calculations.",
    },
    {
      icon: Trees,
      title: "Tree & Solar Offsets",
      description: "Calculate and implement tree planting and solar energy offsets.",
    },
    {
      icon: MapPin,
      title: "Geo Carbon Map",
      description: "Visualize carbon intensity across regions with interactive heatmaps.",
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Track emissions in real-time with automated alerts and notifications.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Your Journey to Net-Zero Starts Here</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald via-cyan to-emerald">
            Measure. Predict. Neutralize.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            CarbonX helps organizations track, forecast, and reduce their carbon footprint with AI-powered insights and actionable recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link to="/dashboard">Try Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Carbon Management</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to achieve net-zero emissions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to carbon neutrality
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Data</h3>
              <p className="text-muted-foreground">
                Import your energy consumption, fuel usage, and travel data
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-accent/10 text-accent flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze Emissions</h3>
              <p className="text-muted-foreground">
                AI-powered analysis provides insights and forecasts
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-emerald/10 text-emerald flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-muted-foreground">
                Implement recommendations and offset remaining emissions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join 100+ organizations reducing their carbon footprint
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your journey to net-zero today with CarbonX
          </p>
          <Button size="lg" asChild className="text-lg px-8">
            <Link to="/register">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>© 2024 CarbonX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
