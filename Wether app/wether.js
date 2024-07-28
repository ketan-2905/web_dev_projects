const BASE_URL="https://api.openweathermap.org/data/2.5/weather?q=";
const BASE_URL1="&appid=37540484ab3b7c90ef27804178554342&units=metric";

const searchBar=document.querySelector("input");
const searcuButton=document.querySelector("button");
const wetherImg=document.querySelector(".img");
const cityName=document.querySelector(".city-name");
const wetherTemp=document.querySelector(".wether-tem");
const wetherHumadity=document.querySelector(".hfont");
const wetherWind=document.querySelector(".wfont");

async function  load(){
    const URL=`${BASE_URL}bengaluru${BASE_URL1}`;
    let getData= await fetch(URL);
    let data= await getData.json();
    wetherdata(data.name,data.main.temp,data.main.humidity,data.wind.speed);
}

load();


const wetherdata=(cityname , temp , humadity , windspeed) =>{
    cityName.innerHTML=cityname;
    wetherTemp.innerHTML=Math.round(temp) + " °C";
    wetherHumadity.innerHTML= humadity + "%";
    wetherWind.innerHTML=windspeed + " Km/hr";
   

}


searcuButton.addEventListener("click", async (evt) =>{
    evt.preventDefault();
let cityName=searchBar.value;
if(cityName === "" && cityName === " " )
{
    alert("Please Enter a city name")
}
else{
    const URL=`${BASE_URL}${cityName}${BASE_URL1}`;
    let getData= await fetch(URL);
    let data= await getData.json();
     console.log(data," ",data.weather[0].main);
    // console.log(data.name," ",data.main.temp," ",data.main.humidity," ",data.weather[0].main," ",data.wind.speed)
    //data.weather[0].main
     wetherdata(data.name,data.main.temp,data.main.humidity,data.wind.speed);

}
})