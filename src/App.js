import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes-nav/Navigation";
import AppRoutes from "./routes-nav/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navigation />
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
