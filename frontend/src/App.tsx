import { Toaster } from "sonner";
import "./App.css";
import HealthForm from "./HealthForm/HealthForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Toaster richColors />
      <HealthForm />
    </>
  );
}

export default App;
