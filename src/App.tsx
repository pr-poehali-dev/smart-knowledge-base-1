import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Modules from "@/pages/Modules";
import Regulations from "@/pages/Regulations";
import Analytics from "@/pages/Analytics";
import Certifications from "@/pages/Certifications";
import Employees from "@/pages/Employees";
import Widgets from "@/pages/Widgets";
import Pricing from "@/pages/Pricing";

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard onSectionChange={setActiveSection} />;
      case "modules":
        return <Modules />;
      case "regulations":
        return <Regulations />;
      case "analytics":
        return <Analytics />;
      case "certifications":
        return <Certifications />;
      case "employees":
        return <Employees />;
      case "widgets":
        return <Widgets />;
      case "pricing":
        return <Pricing />;
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </Layout>
  );
}
