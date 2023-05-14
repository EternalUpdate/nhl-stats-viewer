## NHL Stats Viewer
This is a web app aiming to show the progress of NHL players' individual stats graphically over time. 

The data is fetched from the NHL API as documented in [this repo](https://gitlab.com/dword4/nhlapi/-/tree/master).

The charts are generated using the [Chart.js](https://github.com/chartjs/Chart.js) and [react-chartsjs-2](https://github.com/reactchartjs/react-chartjs-2) libraries.

The app is styled with [Chakra UI](https://github.com/chakra-ui/chakra-ui).

## Installation
`npm install` the dependencies, and `npm run dev`.

## Link
https://nhl-stats-viewer.netlify.app

## Future Features
* Offer search differentiation for players with same name
* Adding league averages to the graphs
* Individual time average graphs
* Compare two (or more?) players
* Some advanced stats (xGF, xGA)
