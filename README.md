## NHL Stats Viewer
This is a web app aiming to show the progress of NHL players' individual stats graphically over time for both the regular season and the playoffs. 

The user can search for the player that interests them and the graphs will update to reflect the player's stats. The stats can also be viewed on a per game basis, and as projections over 82 games. 

Currently the app is limited to players included in active team rosters. Retired and LTIR players will not appear in the search. AHL players and prospects that have few games in the NHL might also not appear.

The data is fetched from the NHL API as documented in [this repo](https://gitlab.com/dword4/nhlapi/-/tree/master).

The charts are generated using the [Chart.js](https://github.com/chartjs/Chart.js) and [react-chartsjs-2](https://github.com/reactchartjs/react-chartjs-2) libraries.

The app is styled with [Chakra UI](https://github.com/chakra-ui/chakra-ui) and autocomplete goodness is brought to you by [Downshift](https://github.com/downshift-js/downshift).

## Installation
`npm install` the dependencies, and `npm run dev`.

## Link
https://nhl-stats-viewer.netlify.app

## Suggested Future Features
* Side navigation to jump to different sections
* Collapsible sections?
* Adding league averages to the graphs
* Compare two (or more?) players
* Some advanced stats (xGF, xGA)
* Searching for all players (including retired / LTIR)
