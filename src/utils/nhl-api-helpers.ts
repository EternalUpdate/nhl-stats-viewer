/**
 * Returns an array of all the years the player has active stats in the NHL.
 * The array contains pairs of years [startYear, endYear].
 * 
 * @param json The JSON string form the NHL API
 * @returns an array of all the years the player has active stats in the NHL
 */
function getAllNHLYears(json: string): number[][] {
    const years: number[][] = [];
    const data = JSON.parse(json).stats[0].splits;

    for (const i in data) {
        const league: string = data[i].league.name;

        if (league == "National Hockey League") {
            const yearString: string = data[i].season;
            const yearPair: number[] = [];

            const yearStart: number = parseInt(yearString.substring(0, 4));
            const yearEnd: number = parseInt(yearString.substring(4));

            yearPair.push(yearStart);
            yearPair.push(yearEnd);

            years.push(yearPair);
        }
    }

    return years;
}

function getNHLGoalsPerYear(json: JSON): number[] {
    return [];
}

// test queries
const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("https://statsapi.web.nhl.com/api/v1/people/8476981/stats?stats=yearByYear", requestOptions)
    .then(response => response.text())
    .then((result) => { 
        console.log(getAllNHLYears(result));
        console.log(JSON.parse(result).stats[0].splits) 
    })
    .catch(error => console.log('error', error));