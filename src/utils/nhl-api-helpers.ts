function getAllNHLYears(json: JSON): number[] {
    return [];
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
    .then(result => console.log(JSON.parse(result)))
    .catch(error => console.log('error', error));