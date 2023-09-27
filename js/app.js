let cardLimit = 6;  // initialy card limit

const loadAIAPI = async( cardLimit)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data =await res.json()
    displayAI(data.data.tools, cardLimit)
}

const displayAI = (allAPIs, cardLimit) =>{
    const container = document.querySelector('#container');

    // only show six cards on UI 
    // allAPIs = allAPIs.slice(0, 6); 
    const showAll = document.getElementById('show-all');
    if(allAPIs.length> cardLimit){
        allAPIs = allAPIs.slice(0, cardLimit); 
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }

    allAPIs.forEach((api)=>{
        // console.log(api)
        
        const div = document.createElement('div');
        div.classList.add('show-card');
        div.innerHTML = `
            <div class="max-w-sm rounded overflow-hidden shadow-lg p-3 ">
                <img class="w-full rounded" src='${api?.image}' alt="Sunset in the mountains">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Features</div>
                    <p class="text-gray-700 text-base">1. ${api.features[0]}</p>
                    <p class="text-gray-700 text-base">2. ${api.features[1]}</p>
                    <p class="text-gray-700 text-base">3. ${api.features[2]}</p>
                </div>
                <hr>
                <div class="px-6 pt-4 pb-2">
                    <h3 class="font-bold text-2xl mb-3">${api.name}</h3>
                    <span><i style="color: black;" class="fa-regular fa-calendar-days"></i>
                        ${api.published_in}
                    </span>

                    <button onclick="detailsAI.showModal(); loadDetails('${api.id}')" class="btn float-right text-red-700 bg-white border-2 border-rose-300 px-5 py-2"  type="button">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                </div>
            </div>
        `
        container.appendChild(div)
       
    });
    // stop spinner 
    spinner(false);   
}

const showCard = (cardLimit)=>{
    loadAIAPI(cardLimit);
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
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetail(data.data);

}

const displayDetail = (detail)=>{
    console.log(detail)
    // 
    const modalLeft = document.getElementById('modal-left');
    modalLeft.innerHTML = `
        <h3 class="font-bold text-lg">${detail.description}</h3>
        
    `
}


loadAIAPI(cardLimit);  // initially load six cards



