let quoteKey = KEY.QUOTES;
let exerciseKey = KEY.EXCERCISE;
let foodKey = KEY.FOOD;
let totalCalories = 0;
//let calories = totalCalories;
//let caloriesLeft = 0;

//DOM Variables
let exerciseSearchOutput = document.getElementById("exercises")
const foodList = document.querySelector('#food-result-list');
let foodLinks = document.querySelectorAll(".food-link");
let exerciseLinks = document.querySelectorAll(".exercise-link")
const displayCalories = document.getElementsByClassName('calorie-count');

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
/////////////////////////// WEIGHT AREA \\\\\\\\\\\\\\\\\\\\\\\\\\\
let calorieForm = document.querySelector(".hw-form-div");
let weight, height, age, bmr = 0;
let totalCal = 0;

calorieForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    height = Number(e.target[0].value[0] + "." + String(e.target[0].value).substring(1)) * 30.48;
    weight = Number(e.target[2].value) * 0.45359237; //4
    age = Number(e.target[1].value);
    if(e.target[2].value === "on"){
        //male
        bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    } else if (e.target[3].value === "on"){
        //female
        bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    }
    // document.querySelector("#left-hw-button").addEventListener("click",(e)=>{
    if(e.submitter.id === "left-hw-button"){
        totalCalories = Math.ceil(bmr + 600);
    }
    // document.querySelector("#right-hw-button").addEventListener("click",(e)=>{
    if(e.submitter.id === "right-hw-button"){    
        totalCalories = Math.ceil(bmr - 400);
    }
    if(totalCalories < 1200){
        totalCalories = 1200;
    }
    for(d of displayCalories){
        d.innerText = totalCalories;
    }
    calorieForm.innerText = `Your Calorie Goal is ${totalCalories}`;
})
/////////////////////////// QUOTE AREA \\\\\\\\\\\\\\\\\\\\\\\\\\\

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
quoteFunc();


/////////////////////////// EXERCISE AREA \\\\\\\\\\\\\\\\\\\\\\\\\\\
const exerciseAuth = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${exerciseKey}`,
        'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
    }
};
async function exerciseFunc(exercise,duration){
    if(duration){
        url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${exercise}&duration=${duration}`;
    } else{
        url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${exercise}`;
    }
    
    //
    let data = await fetchFrom(url, exerciseAuth);
        data.forEach(exercise => {
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class","card");
        cardDiv.style.width = "18rem";
        let cardDivBody = document.createElement("div");
        cardDivBody.setAttribute("class","card-body");
        let cardName = document.createElement("h5");
        cardName.setAttribute("class","card-title");
        cardName.innerText = exercise["name"];
        let cardButton = document.createElement("button");
        cardButton.innerText = "Select";
        let h6 = document.createElement("h6");
        h6.setAttribute("class","card-subtitle");
        let cardP = document.createElement("p");
        let cardP2 = document.createElement("p");
        `Calories burned per hour: ${[0]["calories_per_hour"]}`
        h6.innerText = `Calories burned per hour: ${exercise["calories_per_hour"]}`;
        cardP.innerText = `Total calories burned: ${exercise["total_calories"]}`;
        cardP2.innerText = `Duration minutes: ${exercise["duration_minutes"]}`;
        cardDivBody.append(cardName);
        cardDivBody.append(h6);
        cardDivBody.append(cardP);
        cardDivBody.append(cardP2);
        cardDivBody.append(cardButton);
        cardButton.addEventListener("click",(e)=>{
            totalCalories = totalCalories + exercise["total_calories"];
            for(d of displayCalories){
                d.innerText = totalCalories;
            }
            console.log(totalCalories);
        })

        cardDiv.append(cardDivBody);
        exerciseSearchOutput.append(cardDiv);

    })
}

    let exercises = "";
document.querySelector("#search-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    exercises = e.target[0].value;
    let duration = e.target[1].value;
    exerciseFunc(exercises,duration);
    exerciseSearchOutput.innerText = "";
})


/////////////////////////// FOOD AREA \\\\\\\\\\\\\\\\\\\\\\\\\\\

let food_list = {}

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
    url = `https://trackapi.nutritionix.com/v2/search/instant?query=" ${food}&detailed=true`;
    let data = await fetchFrom(url, foodAuth);
    console.log(data)
    for (const foodItem of data.branded) {
        const newLi = document.createElement('li');
        const newImg = document.createElement('img');
        const newLink = document.createElement('p');
        newLink.innerText = foodItem.food_name;
        newLink.classList = 'food-result-text';
        const cardButton = document.createElement("button");
        cardButton.innerText = "Select";
        cardButton.value = foodItem.nf_calories
        newImg.src = foodItem.photo.thumb;
        newImg.classList = 'food-img';
        newLi.classList = 'food-result';
        cardButton.addEventListener('click', (e) =>{
            totalCalories -= Number(cardButton.value)
            for(d of displayCalories){
                d.innerText = totalCalories;
                food_list[foodItem.food_name] = newImg;
                window.alert(`${foodItem.food_name} added. to calorie count`)
            }
        })

        newLi.append(newLink,cardButton,newImg);
        foodList.appendChild(newLi);
    } 
    console.log(food_list)
}

document.querySelector('#food-form').addEventListener("submit", (e)=>{
    document.querySelector('#food-result-list')
    e.preventDefault();
    if(document.querySelector('#food-result-list').hasChildNodes()){
        document.querySelector('#food-result-list').innerText = ''
    }
    searchedFood = e.target[0].value;
    foodFunc(searchedFood);
    //document.querySelector('#food-search-textbox').value = ''
})


foodLinks.forEach(link =>{
    link.addEventListener("click",(e)=>{
    exerciseSearchOutput.innerText = "";
    document.querySelector('#food-search-textbox').value = ''
})
})

exerciseLinks.forEach(link => {
link.addEventListener("click",(e)=>{
    document.querySelector('#food-result-list').innerText = '';
    document.querySelector('#searchEx').value = '';
    document.querySelector('#durationTime').value = '';
})
})
document.querySelector('#searchEx').addEventListener("click",(e)=>{
    document.querySelector('#searchEx').value = '';
    //document.querySelector('#searchEx').placeholder = '';
})
document.querySelector('#durationTime').addEventListener("click",(e)=>{
    document.querySelector('#durationTime').value = '';
    //document.querySelector('#durationTime').placeholder = '';
})
document.querySelector('#food-search-textbox').addEventListener("click", (e)=>{
    document.querySelector('#food-search-textbox').value = '';
    //document.querySelector('#food-search-textbox').placeholder = '';
})

//////////////////////////////////////////////////////////////


const ytAuth = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b7033af962msh5e6aefcc11f4288p181037jsn8d2e49ec14db',
		'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
	}
};

let vidArray

const vidArea = document.getElementById('vid-area')

async function getYoutubeVideos() {
    try {
      const response = await fetch('https://youtube-search-results.p.rapidapi.com/youtube-search/?q=fitness+meditation', ytAuth);
      const data = await response.json();
        vidArray = data.items;
      console.log(vidArray);
    } catch (err) {
      console.error(err);
    }

    for(video of vidArray){
        const newVid = document.createElement('a');
        const newImg = document.createElement('img');
        const newTitle = document.createElement('p');
        newTitle.innerText = video.title;
        newVid.href = video.url
        // newTitle.classList = 'food-result-text';
        const cardButton = document.createElement("button");
        // cardButton.innerText = "Select";
        // cardButton.value = foodItem.nf_calories
        newImg.src = video.bestThumbnail.url;
        newImg.classList = 'thumbnail';
        newVid.classList = 'vid-result';
        // cardButton.addEventListener('click', (e) =>{
        //     totalCalories -= Number(cardButton.value)
        //     for(d of displayCalories){
        //         d.innerText = totalCalories;
        //         food_list[foodItem.food_name] = newImg;
        //     }
        // })

        newVid.append(newImg, newTitle);
        console.log(newVid)
        vidArea.appendChild(newVid);
    }

}

getYoutubeVideos()