const glazingOptions = [
    { name: "Keep original", priceAdaptation: 0.00 },
    { name: "Sugar milk", priceAdaptation: 0.00 },
    { name: "Vanilla milk", priceAdaptation: 0.50 },
    { name: "Double chocolate", priceAdaptation: 1.50 }
];

const packSizeOptions = [
    { size: 1, priceMultiplier: 1 },
    { size: 3, priceMultiplier: 3 },
    { size: 6, priceMultiplier: 5 },
    { size: 12, priceMultiplier: 10 }
];

const basePrice = 2.49;
const glazingSelect = document.getElementById('glazingSelect');
const packSizeSelect = document.getElementById('packSizeSelect');
const totalPriceElement = document.getElementById('totalPrice');

let selectedGlazingPrice = 0;
let selectedPackMultiplier = 1;

function populateOptions() {
    for (let i = 0; i < glazingOptions.length; i++) {
        let option = document.createElement('option');
        option.value = glazingOptions[i].priceAdaptation;
        option.textContent = glazingOptions[i].name;
        glazingSelect.appendChild(option);
    }
    for (let i = 0; i < packSizeOptions.length; i++) {
        let option = document.createElement('option');
        option.value = packSizeOptions[i].priceMultiplier;
        option.textContent = `Pack of ${packSizeOptions[i].size}`;
        packSizeSelect.appendChild(option);
    }
}

function glazingChange(element) {
    // w3 schools - parseFloat
    selectedGlazingPrice = parseFloat(element.value); 
    updatePrice();  
}

function packSizeChange(element) {
    selectedPackMultiplier = parseFloat(element.value);
    updatePrice();  
}

function updatePrice() {
    const totalPrice = (basePrice + selectedGlazingPrice) * selectedPackMultiplier;
    totalPriceElement.textContent = totalPrice.toFixed(2);  
}

populateOptions();
