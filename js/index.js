const loadPhone = async (searchText, isShowAll) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    useData(data.data, isShowAll);
}
// entry lavel show data
loadPhone("Find N");
loadPhone("Watch 2");
loadPhone("Galaxy S22 Ultra 5G");
loadPhone("Galaxy Watch4");  
loadPhone("Galaxy Z Flip 5G");
loadPhone("");





function useData(data, isShowAll){
    const cardSection = document.getElementById('card-area');
    const showAllBtn = document.getElementById('show-all-btn-section'); 
    if(data.length > 6 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }
    // if i need display only 6 phones
    // data = data.slice(0,6);
    if (!isShowAll) {
        data = data.slice(0,6);
    }
    

    data.forEach(obj => {
        // show data in page
        const newDiv = document.createElement('div');
        // add all class list
        newDiv.classList.add(
            'grid',
            'justify-items-center',
            'max-w-sm',
            'bg-white',
            'border',
            'border-gray-200',
            'rounded-lg',
            'shadow',
            'text-center',
            'mx-auto'
        );
        newDiv.innerHTML = `
        <a href="">
            <img class="rounded-t-lg py-7" src="${obj.image}"/>
        </a>
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold text-gray-900">${obj.phone_name}</h5>
            <p class="mb-3 font-normal text-gray-700">There are many variations of passages of available, but the majority have suffered</p>
            <h5 class="my-3 text-2xl font-bold">$999</h5>
            <button onclick="handelShowDetails('${obj.slug}')"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                Show Details
            </button>
        </div>
        `
        cardSection.appendChild(newDiv);
    });
    // data loding end
    dataToggelLider(false);
}




function searchPhone (isShowAll){
    // data was loding
    dataToggelLider(true);
    const cardSection = document.getElementById('card-area');
    cardSection.innerHTML = ``;
    const inputFild = document.getElementById('input-fild');
    const searchText = inputFild.value;
    // console.log(serchText);
    loadPhone(searchText, isShowAll);
}

function dataToggelLider (isLodding){
    const lodding = document.getElementById('toggle-lodder');
    if (isLodding) {
        lodding.classList.remove('hidden');
    }
    else{
        lodding.classList.add('hidden');
    }
}
function handelShowAll () {
    const isShowAll = true;
    searchPhone(isShowAll);
}

function handelShowDetails(id){
    loadPhoneDetails(id);
    // console.log(id);
    my_modal.showModal();
}

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // show data in modal
    showDataInModal(data)
    // console.log(data);
} 


const showDataInModal = (data) => {

    const brand = document.getElementById('modal-phone-brand');
    brand.innerText = `Brand : ${data.data.brand}`;
    
    const name = document.getElementById('modal-phone-name');
    name.innerText = ` Model Name : ${data.data.name}`;
    
    const releaseDate = document.getElementById('modal-phone-releaseDate');
    releaseDate.innerText = `${data.data.releaseDate}`;

    const description = document.getElementById('modal-phone-description');
    description.classList.add("text-[14px]", 'text-red-500')
    description.innerHTML= `
    <p class="my-2">Bluetooth : ${data.data.others?.Bluetooth || 'No Bluetooth available'}</p>
    <p class="my-2">USB : ${data.data?.others?.USB}</p>
    <p class="my-2 text-black">GPS : ${data.data?.others?.GPS || 'GPS Info Not available'}</p>
    <p class="my-2">Chip-set : ${data.data?.mainFeatures?.chipSet}</p>
    <p class="my-2">Display-size : ${data.data.mainFeatures.displaySize}</p>
    <p class="my-2">Memory-size : ${data.data.mainFeatures.memory}</p>
    <p class="my-2">Storage : ${data.data.mainFeatures.storage}</p>
    `
    // console.log();
}

// Add event listener for "Enter" keypress
document.getElementById('input-fild').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {  // Check if "Enter" is pressed
        searchPhone();  // Call the searchPhone function
    }
});