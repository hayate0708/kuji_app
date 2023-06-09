import "App.css";
import { Routes, Route } from "react-router-dom";
import Home from "components/Home";
import MaintenancePage from "components/MaintenancePage";
import useHeader from "components/common/Header";
import { GlobalContext } from "contexts/GlobalContext";
import useNotification from "components/common/Notification";

function App() {
  const [Header, setTitle] = useHeader();
  const [Notification, setDialog] = useNotification();

  return (
    <>
      <GlobalContext.Provider value={{ setTitle, setDialog }}>
        <Header />
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
