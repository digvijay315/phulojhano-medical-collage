const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const pagesDir = path.join(srcDir, 'pages');
const routesDir = path.join(srcDir, 'routes');

// Ensure pages dir exists
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// 1. Refactor pages
const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('.jsx') && f !== '__root.jsx');
for (const file of routeFiles) {
  let content = fs.readFileSync(path.join(routesDir, file), 'utf-8');
  
  // Remove createFileRoute import
  content = content.replace(/import\s+{\s*createFileRoute\s*}\s+from\s+["']@tanstack\/react-router["'];?\n/, '');
  
  // Replace export const Route = ...
  // Find component name
  const match = content.match(/component:\s*([A-Za-z0-9_]+),?\s*}\);/);
  const componentName = match ? match[1] : 'Component';

  content = content.replace(/export const Route = createFileRoute\([^)]+\)\([^)]+\);?\n?/, '');
  
  // Add export default to component
  content = content.replace(new RegExp(`function ${componentName}\\(`), `export default function ${componentName}(`);
  
  // Fix Link imports if any
  content = content.replace(/from\s+["']@tanstack\/react-router["']/g, 'from "react-router-dom"');
  
  // Change hash={...} in Links to standard paths. Actually in react-router-dom, hash is in `to` prop or we can just keep hash={} since react-router-dom Link doesn't have `hash` prop directly, we'll replace to="/path" hash="id" with to="/path#id"
  // Example: <Link to="/administration" hash={p.id} -> <Link to={`/administration#${p.id}`}
  content = content.replace(/to=(["'])([^"']+)["']\s+hash=\{([^}]+)\}/g, 'to={`$2#${$3}`}');
  content = content.replace(/to=\{([^}]+)\}\s+hash=\{([^}]+)\}/g, 'to={`${$1}#${$2}`}');
  
  const pageName = componentName + '.jsx';
  fs.writeFileSync(path.join(pagesDir, pageName), content);
}

// 2. Main App.jsx
const appJsxContent = `import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Administration from "./pages/Administration";
import Contact from "./pages/Contact";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import Recruitment from "./pages/Recruitment";
import Stipends from "./pages/Stipends";
import Students from "./pages/Students";
import Tenders from "./pages/Tenders";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/stipends" element={<Stipends />} />
            <Route path="/students" element={<Students />} />
            <Route path="/tender" element={<Tenders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}`;
fs.writeFileSync(path.join(srcDir, 'App.jsx'), appJsxContent);

// 3. Main.jsx
const mainJsxContent = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import App from './App.jsx'
import './styles.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)`;
fs.writeFileSync(path.join(srcDir, 'main.jsx'), mainJsxContent);

// 4. Header.jsx
let headerContent = fs.readFileSync(path.join(srcDir, 'components', 'Header.jsx'), 'utf-8');
headerContent = headerContent.replace(/from\s+["']@tanstack\/react-router["']/g, 'from "react-router-dom"');
fs.writeFileSync(path.join(srcDir, 'components', 'Header.jsx'), headerContent);

// 5. Footer.jsx
let footerContent = fs.readFileSync(path.join(srcDir, 'components', 'Footer.jsx'), 'utf-8');
footerContent = footerContent.replace(/from\s+["']@tanstack\/react-router["']/g, 'from "react-router-dom"');
fs.writeFileSync(path.join(srcDir, 'components', 'Footer.jsx'), footerContent);

// 6. Vite config
let viteConfig = fs.readFileSync(path.join(__dirname, 'vite.config.js'), 'utf-8');
viteConfig = viteConfig.replace(/import\s+{\s*TanStackRouterVite\s*}\s+from\s+["']@tanstack\/router-plugin\/vite["'];?\n/, '');
viteConfig = viteConfig.replace(/TanStackRouterVite\(\),?\s*/, '');
fs.writeFileSync(path.join(__dirname, 'vite.config.js'), viteConfig);

// 7. Remove routes dir and generated tree
fs.rmSync(routesDir, { recursive: true, force: true });
const genTreePath = path.join(srcDir, 'routeTree.gen.ts');
if (fs.existsSync(genTreePath)) {
  fs.rmSync(genTreePath);
}

console.log("Migration complete!");
