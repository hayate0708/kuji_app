import "App.css";
import Home from "components/Home";
import useHeader from "components/common/Header";
import { GlobalContext } from "contexts/GlobalContext";

function App() {
  const [Header, setTitle] = useHeader();
  return (
    <>
      <GlobalContext.Provider value={{ setTitle }}>
        <Header /> <Home />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
