class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
  }
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
// const rollType = params.get("roll");
const rollType = queryString.split('-').slice(1).join('-'); // Extract everything after 'roll-' //prior cs knowledge

let shoppingCart = [];
let cartButton = [];
let originalPrice = 0;
let total = 0;
// Function to refresh product details
function refreshPd() {
  const rollData = rolls[rollType];

  // change rollImage to random name
  if (rollData) {
    const rollImage = document.querySelector(".original-image");

    rollImage.src = rollData.imageFile;

    const priceElement = document.querySelector("#totalPrice");
    originalPrice = rollData.basePrice;
    priceElement.textContent = `$${originalPrice.toFixed(2)}`;

    const bunText = document.querySelector(".original-bun-text h2");

    bunText.textContent = `${rollType} cinnamon roll`;
    populateOptions();
  }
}
  
function populateOptions() {
    const glazingSelect = document.getElementById('glazingSelect');
    const packSizeSelect = document.getElementById('packSizeSelect');

    glazingSelect.innerHTML = ""; // Clear existing options
    packSizeSelect.innerHTML = ""; // Clear existing options

    glazingOptions.forEach((glaze) => {
        let option = document.createElement('option');
        option.value = glaze.priceAdaptation;
        option.textContent = glaze.name;
        option.setAttribute("data-price", glaze.priceAdaptation); // Set data-price attribute
        glazingSelect.appendChild(option);
    });

    packSizeOptions.forEach((pack) => {
        let option = document.createElement('option');
        option.value = pack.priceMultiplier;
        option.textContent = pack.size;
        option.setAttribute("data-increase", pack.priceMultiplier); // Set data-increase attribute
        packSizeSelect.appendChild(option);
    });

    glazingSelect.addEventListener("change", updatePrice);
    packSizeSelect.addEventListener("change", updatePrice);
}


function updatePrice() {
    const glazeDropdown = document.getElementById("glazingSelect");
    const packDropdown = document.getElementById("packSizeSelect");
  
    const selectedGlazePrice = Number(
      glazeDropdown.options[glazeDropdown.selectedIndex].getAttribute("data-price")
    );
    const selectedPackIncrease = Number(
      packDropdown.options[packDropdown.selectedIndex].getAttribute("data-increase")
    );
  
    console.log("Selected Glaze Price:", selectedGlazePrice);
    console.log("Selected Pack Increase:", selectedPackIncrease);
  
    const finalPrice = (originalPrice + selectedGlazePrice) * selectedPackIncrease;
  
    const priceElement = document.querySelector("#totalPrice");
    priceElement.textContent = `$${finalPrice.toFixed(2)}`;
  }
  

// Function to add selected roll to cart
function addToCart() {
    const glazeDropdown = document.getElementById("glazingSelect");
    const packDropdown = document.getElementById("packSizeSelect");

  const selectedGlazeDescription =
    glazeDropdown.options[glazeDropdown.selectedIndex].text;
  const selectedPackSize =
    packDropdown.options[packDropdown.selectedIndex].text;

  // Get the price directly from the data attributes
  const selectedGlazePrice = Number(
    glazeDropdown.options[glazeDropdown.selectedIndex].dataset.price
  );
  const selectedPackIncrease = Number(
    packDropdown.options[packDropdown.selectedIndex].dataset.increase
  );

  // Calculate the final price
  const finalPrice =
    (originalPrice + selectedGlazePrice) * selectedPackIncrease;

  // Create a new instance of Roll
  const newRoll = new Roll(
    rollType,
    selectedGlazeDescription,
    selectedPackSize,
    finalPrice
  );

  // Add to cart
  cartButton.push(newRoll);

  console.log("Added to cart:", newRoll);
  console.log("Current Cart:", cartButton);
}

// Add event listener to the "Add to Cart" button with the class
// const addToCartButton = document.querySelector(".add-to-cart");
// addToCartButton.addEventListener("click", addToCart);

document.addEventListener("DOMContentLoaded", refreshPd);





// HW5
function addNewRoll(rollType,selectedGlazeDescription,selectedPackSize,finalPrice) {
  const newRoll = new Roll(rollType,selectedGlazeDescription,selectedPackSize,finalPrice);
  console.log(total)
  total += newRoll.basePrice;
  shoppingCart.push(newRoll)
  return newRoll
}

// ask
function createElement(newRoll) {
  const template = document.querySelector('#cart-template');
  const clone = template.content.cloneNode(true);
  newRoll.element = clone.querySelector('.product-container');

  const btnDelete = newRoll.element.querySelector('.remove');
  console.log(btnDelete);
  btnDelete.addEventListener('click', () => {
    deleteRoll(newRoll);
  });

  const rollListElement = document.querySelector('.cart-page-container');
  rollListElement.prepend(newRoll.element);

  updateElement(newRoll);
}
console.log(total);
function updateElement(newRoll) {
    // get the HTML elements that need updating
    const rollImageElement = newRoll.element.querySelector('.original-image');
    const rollTypeElement = newRoll.element.querySelector('.product-name');
    const rollGlazeElement = newRoll.element.querySelector('.glazing-type');
    const rollPackElement = newRoll.element.querySelector('.pack-size');
    const rollPriceElement = newRoll.element.querySelector('.last-price');
    const totalPriceElement = document.querySelector('.checkout-cost');

    rollImageElement.src = "../assets/products/" + newRoll.type.toLowerCase() + "-cinnamon-roll.jpg"
    rollTypeElement.innerText = newRoll.type + " Cinnamon Roll";
    rollGlazeElement.innerText = newRoll.glazing;
    rollPackElement.innerText = "Pack Size: " + newRoll.size;
    rollPriceElement.innerText = "$" + newRoll.basePrice.toFixed(2);
    totalPriceElement.innerText = "$" + total.toFixed(2); 
}

function deleteRoll(newRoll) {

  // remove the notecard DOM object from the UI
  newRoll.element.remove();
  // remove the actual Notecard object from our set of notecards
  shoppingCart.pop(newRoll);
  total -= newRoll.basePrice;
  updateElement(newRoll);
}

const originalRoll = addNewRoll("Original", "Sugar Milk", 1, 2.49)
const walnutRoll = addNewRoll("Walnut", "Vanilla Milk", 12, 39.90);
const raisinRoll = addNewRoll("Raisin", "Sugar Milk", 3, 8.97);
const appleRoll = addNewRoll("Apple", "Original", 3, 10.47);


for (const newRoll of shoppingCart) {
  console.log(newRoll);
  createElement(newRoll);
}