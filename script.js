
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
const quoteAuth = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b7033af962msh5e6aefcc11f4288p181037jsn8d2e49ec14db',
		'X-RapidAPI-Host': 'motivational-quotes-quotable-api.p.rapidapi.com'
	}
};
async function quoteFunc(){
    url = `https://motivational-quotes-quotable-api.p.rapidapi.com/motivational_quotes?api-key=${quoteKey}`;
    let data = await fetchFrom(url, quoteAuth);
    console.log(data);
}
quoteFunc();

//Exercise Fetch
let exercise //This was an example, the real var will depend on user input//= "volleyball";
const exerciseAuth = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${exerciseKey}`,
		'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
	}
};

async function exercises(){
    url = 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=skiing';
    let data = await fetchFrom(url, exerciseAuth);
    console.log(data);
}
exercises();

// Searched Food Fetch
const foodAuth = {
    method: "GET",
    headers: {
        "x-app-id": "97dd140d",
        "x-app-key": `${foodKey}`
    }
}

<<<<<<< HEAD
const foodApi = 'https://trackapi.nutritionix.com/v2/search/instant?query="';
let searchedFood = "chicken"; // Based off of the user input from form.

fetch(`${foodApi}${searchedFood}`, foodAuth)
    

function fetchFoodData(searchedFood) {
    // while (!searchedFood) {
    //   await new Promise(resolve => setTimeout(resolve, 100));
    // }
     fetch(`${foodApi}${searchedFood}`, foodAuth)
    .then((res) => res.json())
    .then((data) => console.log(data))
}
// console.log(!searchedFood)
fetchFoodData(searchedFood)
=======
let searchedFood; // Based off of the user input from form.
async function foodFunc(){
    url = 'https://trackapi.nutritionix.com/v2/search/instant?query="';
    let data = await fetchFrom(url, foodAuth);
    console.log(data);
}
foodFunc();
>>>>>>> 18184d5d073a7b56cc7ed258d2648b918315a54e
