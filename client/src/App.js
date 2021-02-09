import "./App.css";
import Home from "./components/Screens/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Screens
import Privateroute from "./components/Routes/privateRoute";
import { HomeScreen } from "./components/Screens/index";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* NAVBAR */}

      <Navbar></Navbar>

      {/* Body */}

      <Switch>
        <Privateroute exact path component={PrivateScreen}></Privateroute>
        <Route path="/" exact component={HomeScreen}></Route>
        <Route path="/Login" exact component={LoginScreen}></Route>
        <Route path="/Register" exact component={RegisterScreen}></Route>
      </Switch>

      {/* Footer */}

      <Footer></Footer>
    </Router>
  );
}

export default App;
