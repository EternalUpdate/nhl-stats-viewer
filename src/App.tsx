import PlayerSeasonGraphsPage from "./pages/PlayerSeasonGraphsPage";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <HelmetProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/player/:playerID"
                        element={<PlayerSeasonGraphsPage />}
                    />
                </Routes>
            </HelmetProvider>
        </>
    );
}

export default App;
