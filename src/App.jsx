import "App.css";
import { Routes, Route } from "react-router-dom";

// CONTEXT
import { GlobalContext } from "contexts/GlobalContext";

// COMPONENT
import Home from "./components/home/Home";
import MaintenancePage from "./components/maintenancepage/MaintenancePage";
import useHeader from "./components/common/Header";

function App() {
  const [Header, setTitle] = useHeader();

  return (
    <GlobalContext.Provider value={{ setTitle }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
