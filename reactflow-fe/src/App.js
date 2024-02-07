import "./App.css";
import { Dashboard } from "./page";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import { DarkmodeProvider } from "./context/DarkmodeContext";


function App() {
  return (
    <>
    <DarkmodeProvider>
    <Dashboard />
    </DarkmodeProvider>
    </>
  )

}

export default App;
