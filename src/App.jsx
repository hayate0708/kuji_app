import "App.css";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "contexts/GlobalContext";
import Home from "components/Home";
import MaintenancePage from "components/MaintenancePage";
import useHeader from "components/common/Header";

function App() {
  const [Header, setTitle] = useHeader();

  return (
    <>
      <GlobalContext.Provider value={{ setTitle }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
