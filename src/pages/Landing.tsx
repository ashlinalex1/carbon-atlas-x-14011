import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
      description:
        "Accurately measure your organization's carbon emissions across all scopes.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80", // dashboard / analytics
    },
    {
      icon: TrendingUp,
      title: "AI Emission Forecast",
      description:
        "Predict future emissions with advanced AI-powered forecasting models.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // charts and trends
    },
    {
      icon: Lightbulb,
      title: "Smart Recommendations",
      description:
        "Get actionable insights to reduce emissions with ROI calculations.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80", // innovation / light bulb
    },
    {
      icon: Trees,
      title: "Tree & Solar Offsets",
      description:
        "Calculate and implement tree planting and solar energy offsets.",
      image:
        "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=1200&q=80", // solar panels
    },
    {
      icon: MapPin,
      title: "Geo Carbon Map",
      description:
        "Visualize carbon intensity across regions with interactive heatmaps.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", // map visualization
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description:
        "Track emissions in real-time with automated alerts and notifications.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // digital monitoring
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-28 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80"
            alt="CarbonX sustainability background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
        </div>

        <div className="relative container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Your Journey to Net-Zero Starts Here</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500"
          >
            Measure. Predict. Neutralize.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            CarbonX helps organizations track, forecast, and reduce their carbon
            footprint with AI-powered insights and actionable recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8"
            >
              <Link to="/dashboard">Try Demo</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Comprehensive Carbon Management
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to achieve net-zero emissions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-border/40 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-40 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground mb-16">
            Three simple steps to carbon neutrality
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Upload Data",
                desc: "Import your energy consumption, fuel usage, and travel data.",
                image:
                  "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1933",
              },
              {
                num: "2",
                title: "Analyze Emissions",
                desc: "AI-powered analysis provides insights and forecasts.",
                image:
                  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
              },
              {
                num: "3",
                title: "Take Action",
                desc: "Implement recommendations and offset remaining emissions.",
                image:
                  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
              },
            ].map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Number(step.num) * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 text-white text-center relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=1200&q=80"
          alt="Sustainable future"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Join 100+ organizations reducing their carbon footprint
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey to net-zero today with CarbonX
          </p>
          <Button
            size="lg"
            asChild
            className="text-lg px-8 bg-white text-emerald-700 hover:bg-gray-100"
          >
            <Link to="/register">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-background/80 backdrop-blur text-center text-muted-foreground">
        <p>© 2025 CarbonX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
