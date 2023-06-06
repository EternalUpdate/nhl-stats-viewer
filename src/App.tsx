import PlayerSeasonGraphsPage from "./pages/PlayerSeasonGraphsPage";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PlayerSeasonGraphsPage />} />
                <Route
                    path="/player/:playerID"
                    element={<PlayerSeasonGraphsPage />}
                />
            </Routes>
        </>
    );
}

export default App;
