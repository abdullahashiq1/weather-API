const loadWeatherAPI = async()=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data =await res.json()
    displayWeather(data.data.tools)
}

const displayWeather = (weathers) =>{
    console.log(weathers)
    weathers.forEach(weather =>{
        console.log(weather)
    })
}

loadWeatherAPI()