import "./_default/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Wallet from "./components/pages/Wallet";
import About from "./components/pages/About";
import Game from "./components/pages/Game";
import Transaction from "./components/pages/Transaction/Transaction";

import Header from "./components/common/Header";
import { AuthContextProvider } from "./services/Auth";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <div style={{ marginTop: 80 }}>
          <Route exact path="/" component={Home} />
          <Route path="/wallets" component={Wallet} />
          <Route path="/about" component={About} />
          <Route path="/game" component={Game} />
          <Route path="/wallet/:id" component={Transaction} />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
