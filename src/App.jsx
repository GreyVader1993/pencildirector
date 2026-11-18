import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Three pages: Home (intro and about), Work (films and paintings), Contact (enquiry form).
// The other page components remain in src/pages for when they are needed again.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          {/* earlier URLs, sent to the matching page or section */}
          <Route path="/work/:slug" element={<Navigate to="/work" replace />} />
          <Route path="/art" element={<Navigate to="/work" replace />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route
            path="/experience"
            element={<Navigate to="/#about" replace />}
          />
          <Route
            path="/education"
            element={<Navigate to="/#about" replace />}
          />
          <Route
            path="/workshops"
            element={<Navigate to="/#about" replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
