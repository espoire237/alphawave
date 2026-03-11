import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/layout/Footer";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PortfolioPostPage from "./pages/PortfolioPostPage";
import ScrollTop from "./components/features/ScrollTop";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ margin: 0, padding: 0, width: "100%" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioPostPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />{" "}
        </Routes>
      </main>
      <Footer />
      <ScrollTop/>
    </>
  );
}

export default App;
