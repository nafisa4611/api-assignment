document.getElementById('error-msg').style.display = 'none'

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// const toggleSearchResult = displayStyle => {
//     document.getElementById('search-result').style.display = displayStyle;
// }

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleSpinner('block');
    // toggleSearchResult('none');
    
    // console.log(searchText);
    searchField.value = '';
    document.getElementById('error-msg').style.display = 'none'
    if (searchText === ''){
        document.getElementById('error-msg').style.display = 'block'
        toggleSpinner('none');
        // toggleSearchResult('block');
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then (res => res.json())
            .then (data => displaySearchResult(data.data))
    }
}
const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    if (phones.length === 0){
        document.getElementById('error-msg').style.display = 'block';
        toggleSpinner('none');

    }
    else if(phones.length >=10){
        phones = phones.slice(0, 10);
        phones.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML=`
            <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}<br>Catagory: ${phone.slug}</p>
            </div>
            <button onclick="loadPhoneDetails('${phone.slug}')">Show Details</button>
            </div>
            `;
            searchResult.appendChild(div);
        })
        toggleSpinner('none');
    }

    else{
        phones.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML=`
            <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}<br>Catagory: ${phone.slug}</p>
            </div>
            <button onclick="loadPhoneDetails('${phone.slug}')">Show Details</button>
        </div>
        `;
        searchResult.appendChild(div);
    })
    toggleSpinner('none');
    // toggleSearchResult('block');
    }
}
const loadPhoneDetails = id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then (res => res.json())
        .then (data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <h6>Storage:${phone.mainFeatures.storage}</h6>
        <h6>Chip-Set:${phone.mainFeatures.chipSet}</h6>
        <h6>Display Size:${phone.mainFeatures.displaySize}</h6>
        <h6>Sensor:${phone.mainFeatures.sensors}</h6>
        <h5>Release Date:${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</h5>
    </div>
    `
    phoneDetail.appendChild(div);
}