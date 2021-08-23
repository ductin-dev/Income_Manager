import "./_default/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home";
import Wallet from "./components/pages/Wallet";
import About from "./components/pages/About";
import Game from "./components/pages/Game";

import Header from "./components/common/Header";
import { AuthContextProvider } from "./services/Auth";
import Footer from "./components/common/Footer";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />

        <Switch>
          <div style={{ marginTop: 80, padding: 15 }}>
            <Route path="/wallets" component={Wallet} />
            <Route path="/about" component={About} />
            <Route path="/game" component={Game} />
            <Route exact path="/" component={Home} />
          </div>
        </Switch>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
