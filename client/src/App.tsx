import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "@/components/Header";

import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Signin from "@/pages/Sign-in";
import Signup from "@/pages/Sign-up";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
