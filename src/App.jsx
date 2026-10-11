import Navbar from "./components/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import Technology from "./sections/Technology.jsx";
import Products from "./sections/Products.jsx";
import Comparison from "./sections/Comparison.jsx";
import Specifications from "./sections/Specifications.jsx";
import Closing from "./sections/Closing.jsx";
import SystemLoader from "./components/SystemLoader.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import "./styles/global.css";

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  return (
    <>
      <SystemLoader />
      <Navbar />
      <main>
        <Hero />
        <Technology />
        <Products />
        <Comparison />
        <Specifications />
        <Closing />
      </main>
    </>
  );
}

export default App;
