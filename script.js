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

async function exerciseFunc(exercise,duration){
    if(duration){
        url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${exercise}&duration=${duration}`;
    } else{
        url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${exercise}`;
    }
    
    //
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
        cardName.innerText = exercise["name"];
        //form
        // let cardForm = document.createElement("form");
        // cardForm.setAttribute("id","duration-form");
        // let cardInput = document.createElement("input");
        // cardInput.setAttribute("type","number");
        // cardInput.setAttribute("name","durationTime");
        // cardInput.setAttribute("placeholder","insert minutes worked out");
        let cardButton = document.createElement("button");
        // cardButton.setAttribute("type","submit");
        cardButton.innerText = "Select";
        // cardForm.append(cardInput);
        //
    //     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    // <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
            console.log("yerrrrr");
            caloriesBurned += exercise["total_calories"];
            console.log(caloriesBurned);
        })


        
        // cardDivBody.append(cardForm);
        cardDiv.append(cardDivBody);
        exerciseSearchOutput.append(cardDiv);
        // console.log(data[0]["total_calories"])

        // cardForm.addEventListener("submit",(f)=>{
        //     f.preventDefault();
        //     duration = f.target[0].value;
        //     console.log(duration);
        //     console.log(data);
        //     durationFunc();
            // let urls = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${exercise}`
            // fetch(urls, exerciseAuth).then(response => response.json())
            // .then(data => console.log(data))
            // .catch(error => console.log(error))
        // })
    })
}
   // exerciseSearchOutput.innerText = data[0]["name"];
    //console.log(data[0]["name"]);
    let exercises = "";
document.querySelector("#search-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    exercises = e.target[0].value;
    let duration = e.target[1].value;
    exerciseFunc(exercises,duration);
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

let searchedFood = 'chicken'; // Based off of the user input from form.
async function foodFunc(food){
    url = `https://trackapi.nutritionix.com/v2/search/instant?query=" ${food}&detailed=true`;
    let data = await fetchFrom(url, foodAuth);
    console.log(data);
    for (const foodItem of data.branded) {
        const newLi = document.createElement('li');
        const newImg = document.createElement('img');
        const newLink = document.createElement('p');
        newLink.innerText = foodItem.food_name;
        newLink.classList = 'food-result-text'
        newImg.src = foodItem.photo.thumb
        newImg.classList = 'food-img'
        newLi.classList = 'food-result'
        newLi.append(newLink,newImg)
        foodList.appendChild(newLi);
        
      } 
}

document.querySelector('#food-form').addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("does this work??")
    searchedFood = e.target[0].value;
    foodFunc(searchedFood);
    document.querySelector('#food-search-textbox').innerText = ''
})



//////////////////////////////////////////////////////////////


const foodList = document.querySelector('#food-result-list')
const li = document.createElement('li')
