import "./App.css";

import { CssBaseline, Container } from "@material-ui/core";
import Dashboard from "./Components/Dashboard/Dashboard";
import HeaderNavBar from "./Components/HeaderNavBar/HeaderNavBar";

function App() {
  return (
    <div className="App">
      <HeaderNavBar />
      <CssBaseline />
      <Container maxWidth="lg" component="div" style={{ height: "100%" }}>
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
