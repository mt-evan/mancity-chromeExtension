const apiKey = 'APIKEY goes here';
const teamId = 50; // man city's team ID in the API

const matchTableElement = document.getElementById("matchTable");

// function to create a match tile
function createMatchTile(data) {
    const matchTile = document.createElement('div');
    matchTile.classList.add("card", "mb-3");

    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");

    const homeTeamDiv = document.createElement('div');
    homeTeamDiv.classList.add("row", "justify-content-center", "mb-2");
    homeTeamDiv.innerHTML = `
        <div class="col-6">
            <img src="${data.teams.home.logo}" class="img-fluid" alt="Home Team Logo">
        </div>
        <div class="col-6">
            <p class="text-center">${data.teams.home.name}</p>
        </div>
    `;

    const awayTeamDiv = document.createElement('div');
    awayTeamDiv.classList.add("row", "justify-content-center", "mb-2");
    awayTeamDiv.innerHTML = `
        <div class="col-6">
            <img src="${data.teams.away.logo}" class="img-fluid" alt="Away Team Logo">
        </div>
        <div class="col-6">
            <p class="text-center">${data.teams.away.name}</p>
        </div>
    `;

    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add("row", "justify-content-center", "mb-2");
    scoreDiv.innerHTML = `
        <div class="col-12">
            <p class="text-center">${data.goals.home} - ${data.goals.away}</p>
        </div>
    `;

    cardBody.appendChild(homeTeamDiv);
    cardBody.appendChild(awayTeamDiv);
    cardBody.appendChild(scoreDiv);

    matchTile.appendChild(cardBody);
    return matchTile;
}

// fetching data from the API
fetch(`https://v3.football.api-sports.io/fixtures?team=${teamId}&last=3`, {
    headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": apiKey
    }
})
.then(response => response.json())
.then(data => {
    const matchesList = data.response;

    // create match tiles for recent matches
    for (let i = 0; i < matchesList.length; i++) {
        const match = matchesList[i];
        const matchTile = createMatchTile(match);
        matchTableElement.appendChild(matchTile);
    }
})
.catch(err => {
    console.error('Error fetching data:', err);
});



/*
// mock code for when API is down or daily limit is reached
document.addEventListener("DOMContentLoaded", function() {
    const dummyMatches = [
        {
            teams: {
                home: {
                    logo: "https://dummyimage.com/100x100/000/fff&text=Home",
                    name: "Home Team A"
                },
                away: {
                    logo: "https://dummyimage.com/100x100/000/fff&text=Away",
                    name: "Away Team B"
                }
            },
            goals: {
                home: 3,
                away: 1
            }
        },
        {
            teams: {
                home: {
                    logo: "https://dummyimage.com/100x100/000/fff&text=Home",
                    name: "Home Team C"
                },
                away: {
                    logo: "https://dummyimage.com/100x100/000/fff&text=Away",
                    name: "Away Team D"
                }
            },
            goals: {
                home: 2,
                away: 2
            }
        },
        {
            teams: {
                home: {
                    logo: "https://dummyimage.com/100x100/000/fff&text=Home",
                    name: "Home Team E"
                },
                away: {
                    logo: "https://dummyimage.com/100x100/000/fff&text=Away",
                    name: "Away Team F"
                }
            },
            goals: {
                home: 0,
                away: 1
            }
        }
    ];

    const matchTableElement = document.getElementById("matchTable");

    // function to create a match tile
    function createMatchTile(data) {
        const matchTile = document.createElement('div');
        matchTile.classList.add("card", "mb-3");

        const cardBody = document.createElement('div');
        cardBody.classList.add("card-body");

        const homeTeamDiv = document.createElement('div');
        homeTeamDiv.classList.add("row", "justify-content-center", "mb-2");
        homeTeamDiv.innerHTML = `
            <div class="col-6">
                <img src="${data.teams.home.logo}" class="img-fluid" alt="Home Team Logo">
            </div>
            <div class="col-6">
                <p class="text-center">${data.teams.home.name}</p>
            </div>
        `;

        const awayTeamDiv = document.createElement('div');
        awayTeamDiv.classList.add("row", "justify-content-center", "mb-2");
        awayTeamDiv.innerHTML = `
            <div class="col-6">
                <img src="${data.teams.away.logo}" class="img-fluid" alt="Away Team Logo">
            </div>
            <div class="col-6">
                <p class="text-center">${data.teams.away.name}</p>
            </div>
        `;

        const scoreDiv = document.createElement('div');
        scoreDiv.classList.add("row", "justify-content-center", "mb-2");
        scoreDiv.innerHTML = `
            <div class="col-12">
                <p class="text-center">${data.goals.home} - ${data.goals.away}</p>
            </div>
        `;

        cardBody.appendChild(homeTeamDiv);
        cardBody.appendChild(awayTeamDiv);
        cardBody.appendChild(scoreDiv);

        matchTile.appendChild(cardBody);
        return matchTile;
    }

    // loop through dummy data to create match tiles
    dummyMatches.forEach(match => {
        const matchTile = createMatchTile(match);
        matchTableElement.appendChild(matchTile);
    });
});
*/