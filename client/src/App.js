import "./App.css";

import { CssBaseline, Container } from "@material-ui/core";
import Dashboard from "./Components/Dashboard/Dashboard";
import HeaderNavBar from "./Components/HeaderNavBar/HeaderNavBar";

function App() {
  var todayDate = new Date();
  var today =
    todayDate.getFullYear() +
    "-" +
    String(todayDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(todayDate.getDate()).padStart(2, "0");

  var nextWeek =
    todayDate.getFullYear() +
    "-" +
    String(todayDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(todayDate.getDate() + 2).padStart(2, "0");
  return (
    <div className="App">
      <HeaderNavBar />
      <CssBaseline />
      <Container maxWidth="lg" component="div" style={{ height: "100%" }}>
        <Dashboard today={today} nextWeek={nextWeek} />
      </Container>
    </div>
  );
}

export default App;
