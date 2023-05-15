## NHL Stats Viewer
This is a web app aiming to show the progress of NHL players' individual stats graphically over time. Currently the app is limited to players included in active team rosters. Retired and LTIR players will not appear in the search.

The data is fetched from the NHL API as documented in [this repo](https://gitlab.com/dword4/nhlapi/-/tree/master).

The charts are generated using the [Chart.js](https://github.com/chartjs/Chart.js) and [react-chartsjs-2](https://github.com/reactchartjs/react-chartjs-2) libraries.

The app is styled with [Chakra UI](https://github.com/chakra-ui/chakra-ui).

## Installation
`npm install` the dependencies, and `npm run dev`.

## Link
https://nhl-stats-viewer.netlify.app

## Future Features
* Support for playoffs data
* Adding league averages to the graphs
* Individual time average graphs (e.g. average even strength TOI per season)
* Compare two (or more?) players
* Some advanced stats (xGF, xGA)
* Offer search differentiation for players with same name
* Searching for all players (including retired / LTIR)
