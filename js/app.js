let cardLimit = 6;  // initialy card limit

const loadWeatherAPI = async( cardLimit)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data =await res.json()
    displayWeather(data.data.tools, cardLimit)
}

const displayWeather = (weathers, cardLimit) =>{
    const container = document.querySelector('#container');

    // only show six cards on UI 
    // weathers = weathers.slice(0, 6); 
    const showAll = document.getElementById('show-all');
    if(weathers.length> cardLimit){
        weathers = weathers.slice(0, cardLimit); 
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }

    weathers.forEach((weather)=>{
        // console.log(weather)
        
        const div = document.createElement('div');
        div.classList.add('show-card');
        div.innerHTML = `
            <div class="max-w-sm rounded overflow-hidden shadow-lg p-3 ">
                <img class="w-full rounded" src='${weather?.image}' alt="Sunset in the mountains">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Features</div>
                    <p class="text-gray-700 text-base">1. ${weather.features[0]}</p>
                    <p class="text-gray-700 text-base">2. ${weather.features[1]}</p>
                    <p class="text-gray-700 text-base">3. ${weather.features[2]}</p>
                </div>
                <hr>
                <div class="px-6 pt-4 pb-2">
                    <h3 class="font-bold text-2xl mb-3">${weather.name}</h3>
                    <span><i style="color: black;" class="fa-regular fa-calendar-days"></i>
                        ${weather.published_in}

                        <button onclick="loadDetails('${weather.id}')" class="float-right text-red-700 bg-white border-2 border-rose-300 focus:outline-none hover:bg-gray-100 focus:ring-4 
                        focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 
                        dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 
                        dark:focus:ring-gray-700" type="button">
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        </span>

                </div>
            </div>
        `
        container.appendChild(div)
       
    });
    // stop spinner 
    spinner(false);   
}

const showCard = (cardLimit)=>{
    loadWeatherAPI(cardLimit);
    // start spinner 
    spinner(true) 
}

document.getElementById('show-all').addEventListener('click', function(){
    if(cardLimit === 6){
        cardLimit = Infinity;   // show all cards
    }else{
        cardLimit = 6   // show six cards
    }
    showCard(cardLimit) 
    
})

// loader 
const spinner = isLoading =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('hidden')
    }else{
        loader.classList.add('hidden');
    }
}

// load details API 
const loadDetails =async id =>{
    console.log('Yes!', id)
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data);

}

loadWeatherAPI(cardLimit);  // initially load six cards



