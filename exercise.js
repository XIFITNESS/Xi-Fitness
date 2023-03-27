async function fetchFrom(url,opt){
    try{
        let data = await await fetch(url,opt);
        return await data.json(); 
    } catch(error){
        console.log(error);
        return null;
    }
    
}
let exercise = "skiing" //This was an example, the real var will depend on user input//= "volleyball";
const exerciseAuth = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b7033af962msh5e6aefcc11f4288p181037jsn8d2e49ec14db',
		'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
	}
};
const exerciseApi = 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity='

// fetch(`${exerciseApi}${exercise}`, exerciseAuth)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
async function exercises(){
    url = 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=skiing';
    let data = await fetchFrom(url, exerciseAuth);
    console.log(data);
}
exercises();