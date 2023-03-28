let quoteKey = KEY.QUOTES;
let exerciseKey = KEY.EXCERCISE;
let foodKey = KEY.FOOD;
let caloriesBurned = 0;
let caloriesEaten = 0;

//DOM Variables
let exerciseSearchOutput = document.getElementById("exercises")
// let cardDiv = document.createElement("div");
// cardDiv.setAttribute("class","card");
// cardDiv.style.width = "18rem";
// let cardDivBody = document.createElement("div");
// cardDivBody.setAttribute("class","card-body");
// let cardName = document.createElement("h5");
// cardName.setAttribute("class","card-title");
// cardName.innerText = "yo"
// let cardLink = document.createElement("a");
// cardLink.innerText = "hi";
// cardLink.href = "#";
// cardLink.setAttribute("class","card-link")
// cardDivBody.append(cardName);
// cardDivBody.append(cardLink);
// cardDiv.append(cardDivBody);
// exerciseSearchOutput.append(cardDiv);


//fetch function
async function fetchFrom(url,opt){
    try{
        let data = await fetch(url,opt);
        return await data.json(); 
    } catch(error){
        console.log(error);
        return null;
    }
}

// Quote Segment || Self explanatory
let quoteSect = document.getElementById("quote");
let author = document.getElementById("author");
const quoteAuth = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${quoteKey}`,
		'X-RapidAPI-Host': 'motivational-quotes-quotable-api.p.rapidapi.com'
	}
};
async function quoteFunc(){
    url = `https://motivational-quotes-quotable-api.p.rapidapi.com/motivational_quotes`;
    let data = await fetchFrom(url, quoteAuth);
    quoteSect.innerText = data.quote;
    author.innerText = data.author;
}
// quoteFunc();

//Exercise Fetch
const exerciseAuth = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${exerciseKey}`,
		'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
	}
};

async function exerciseFunc(exercise){
    url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${exercise}`;
    //&duration=${duration}
    let data = await fetchFrom(url, exerciseAuth);
    data.forEach(exercise => {
        // let li = document.createElement("li");
        // li.innerText = exercise["name"];
        // exerciseSearchOutput.append(li);
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class","card");
        cardDiv.style.width = "18rem";
        let cardDivBody = document.createElement("div");
        cardDivBody.setAttribute("class","card-body");
        let cardName = document.createElement("h5");
        cardName.setAttribute("class","card-title");
        cardName.innerText = data[0]["name"];
        let cardLink = document.createElement("a");
        cardLink.innerText = "hi";
        cardLink.href = "#";
        cardLink.setAttribute("class","card-link")
        cardDivBody.append(cardName);
        cardDivBody.append(cardLink);
        cardDiv.append(cardDivBody);
        exerciseSearchOutput.append(cardDiv);
    })
   // exerciseSearchOutput.innerText = data[0]["name"];
    //console.log(data[0]["name"]);
}
document.querySelector("#search-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    exercise = e.target[0].value;
    //duration = 
    exerciseFunc(exercise);
    exerciseSearchOutput.innerText = "";
    // while (exerciseSearchOutput.firstChild) {
    //     exerciseSearchOutput.removeChild(exerciseSearchOutput.firstChild);
    //   }
})
// Searched Food Fetch
const foodAuth = {
    method: "GET",
    headers: {
        "x-app-id": "97dd140d",
        "x-app-key": `${foodKey}`
    }
}

let searchedFood; // Based off of the user input from form.
async function foodFunc(food){
    url = `https://trackapi.nutritionix.com/v2/search/instant?query=" ${food}`;
    let data = await fetchFrom(url, foodAuth);
    console.log(data);
    
}
foodFunc(searchedFood);



//////////////////////////////////////////////////////////////


