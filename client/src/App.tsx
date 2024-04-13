import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Signin from "@/pages/Sign-in";
import Signup from "@/pages/Sign-up";
import NotFound from "@/components/404";
import PrivateRoute from "@/components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <main id="content" className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </main>
    </BrowserRouter>
  );
};

export default App;
