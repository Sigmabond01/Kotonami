import "./index.css";
import { Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { appRoutes } from "./routes";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {appRoutes}
      </Routes>
    </AnimatePresence>
  );
}

export default App;
