
let quoteKey = KEY.QUOTES;
let exerciseKey = KEY.EXCERCISE;
let foodKey = KEY.FOOD;

// Quote Segment || Self explanitory
const quoteAuth = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${quoteKey}`,
		'X-RapidAPI-Host': 'motivational-quotes-quotable-api.p.rapidapi.com'
	}
};
const quoteApi = `https://motivational-quotes-quotable-api.p.rapidapi.com/motivational_quotes?api-key=${quoteKey}`;
fetch(`${quoteApi}`,quoteAuth)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));



// Exercise Fetch
// let exercise //This was an example, the real var will depend on user input//= "volleyball";
// const exerciseAuth = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': `${exerciseKey}`,
// 		'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
// 	}
// };
// const exerciseApi = 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=skiing'

// fetch(`${exerciseApi}${exercise}`, exerciseAuth)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

/*
    Will return sum like this. We can use this to divide the calorie/h count by duration (for calories per minute) and then multiply it by total minutes logged by user.
    [
        {
            "name": "Playing volleyball",
            "calories_per_hour": 217,
            "duration_minutes": 60,
            "total_calories": 217
        },
        {
            "name": "Water volleyball",
            "calories_per_hour": 217,
            "duration_minutes": 60,
            "total_calories": 217
        }
    ]
*/


// Searched Food Fetch
const foodAuth = {
    method: "GET",
    headers: {
        "x-app-id": "97dd140d",
        "x-app-key": `${foodKey}`
    }
}

const foodApi = 'https://trackapi.nutritionix.com/v2/search/instant?query="';
let searchedFood; // Based off of the user input from form.

fetch(`${foodApi}${searchedFood}`, foodAuth)
    .then((res) => res.json())
    .then((data) => console.log(data))
