/* Global Variables */
const baseUrl= "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=79a7168e8a1d3bf0efea721e58325f88";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//add event on generate button
document.getElementById('generate').addEventListener('click', performAction);

//callbackfunction
function performAction(e){
    const myZip = document.getElementById('zip').value;
    const answer = document.getElementById('feelings').value;

    getWeather(baseUrl,myZip,apiKey)
    .then(function(data){
        // Add data
        console.log(data);
        postData('/add', {date:newDate, temp: data.main.temp, content:answer} );
      })
      .then(
        updateUI()
      )

}


//function to get weather from API
const getWeather = async (url,zip,key)=>{

    const response = await fetch(url+zip+key)
    try{
        const weatherInfo = await response.json();
        console.log(weatherInfo);
        return weatherInfo;

    }catch(error){
        console.log("error",error);
    }

}

//post All Data to the server
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const res = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data)
    });
      try {
        const newData = await res.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }



//updatin UI 
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log(allData);
      document.getElementById('date').innerHTML = `Today is ${allData.date}`;
      document.getElementById('temp').innerHTML = `Temp is ${allData.temp} fahrenheit`;
      document.getElementById('content').innerHTML = `I'm feeling ${allData.content} today` ;
  
    }catch(error){
      console.log("error", error);
    }
  }