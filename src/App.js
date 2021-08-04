import "./_default/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Wallet from "./components/pages/Wallet";
import About from "./components/pages/About";
import Transaction from "./components/pages/Transaction";

import Header from "./components/common/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/wallets" component={Wallet} />
        <Route path="/wallet/:id" component={Transaction} />
        <Route path="/about" component={About} />
      </Router>
    </>
  );
}

export default App;
