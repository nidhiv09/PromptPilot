import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import PromptStudio from "./pages/PromptStudio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/studio" element={<PromptStudio />} />
    </Routes>
  );
}

export default App;