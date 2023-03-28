let quoteKey = KEY.QUOTES;
let exerciseKey = KEY.EXCERCISE;
let foodKey = KEY.FOOD;

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
let exercise;
const exerciseAuth = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${exerciseKey}`,
		'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
	}
};

async function exerciseFunc(){
    url = 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=skiing';
    let data = await fetchFrom(url, exerciseAuth);
    console.log(data);
}
exerciseFunc();

// Searched Food Fetch
const foodAuth = {
    method: "GET",
    headers: {
        "x-app-id": "97dd140d",
        "x-app-key": `${foodKey}`
    }
}

let searchedFood = 'chicken'; // Based off of the user input from form.
async function foodFunc(food){
    // url = `https://trackapi.nutritionix.com/v2/search/instant?query=" ${food}&detailed=true`;
    let data = await fetchFrom(url, foodAuth);
    console.log(data);
    /* for( foodItem in data.branded){
        let newResult = document.createElement('li')
        newResult.innerText = foodItem.food_name
        
    } */ 
}



//////////////////////////////////////////////////////////////


const foodList = document.querySelector('#food-result-list')
const li = document.createElement('li')

foodFunc(searchedFood);
