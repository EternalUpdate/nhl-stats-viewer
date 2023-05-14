import "./App.css";
import SingleStatPlayerLineChart from "./components/SingleStatPlayerLineChart";
import "./utils/nhl-api-helpers";

function App() {
    return (
        <>
            <h1>Hi =)</h1>
            <SingleStatPlayerLineChart playerID={8476981} statType="goals" />
        </>
    );
}

export default App;
