import './_default/App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./components/pages/Home";

function App() {
    return (
        <Router>
            <Route
                path="/"
                component={Home}
            />
        </Router>

    );
}

export default App;
