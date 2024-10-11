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

// Initialize shoppingCart by loading from local storage, or as an empty array if none exists
let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// let cartButton = [];
let originalPrice = 0;
let total = 0;

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

  const selectedGlazeDescription = glazeDropdown.options[glazeDropdown.selectedIndex].text;
  const selectedPackSize = packDropdown.options[packDropdown.selectedIndex].text;

  const selectedGlazePrice = Number(glazeDropdown.options[glazeDropdown.selectedIndex].dataset.price);
  const selectedPackIncrease = Number(packDropdown.options[packDropdown.selectedIndex].dataset.increase);

  const finalPrice = (originalPrice + selectedGlazePrice) * selectedPackIncrease;

  // Create a new instance of Roll
  const newRoll = new Roll(rollType, selectedGlazeDescription, selectedPackSize, finalPrice);

  // Add to shoppingCart instead of cartButton
  shoppingCart.push(newRoll);
  saveCartToLocalStorage();  // Save the updated cart to local storage
  recalculateTotal();
  console.log("Added to cart:", newRoll);
  console.log("Current Cart:", shoppingCart);  // Log shoppingCart, not cartButton
  createElement(newRoll);
}


document.addEventListener("DOMContentLoaded", refreshPd);


// HW5
function addNewRoll(rollType, selectedGlazeDescription, selectedPackSize, basePrice) {
  let glazePrice = 0; // Initialize glazePrice to a default value
  
  // Calculate glaze price based on selected glaze description
  if (selectedGlazeDescription === "Original" || selectedGlazeDescription === "Sugar Milk") {
    glazePrice = 0; // No additional cost for Original or Sugar milk
  } else if (selectedGlazeDescription === "Vanilla Milk") {
    glazePrice = 0.5; // Additional cost for Vanilla milk
  } else if (selectedGlazeDescription === "Double chocolate") {
    glazePrice = 1.5; // Additional cost for Double chocolate
  } else {
    console.error(`Unexpected glaze description: ${selectedGlazeDescription}`);
  }
  
  const adjustedBasePrice = basePrice + glazePrice; // Add glaze price to base price

  let finalPrice;
  // Calculate final price based on selected pack size
  if (selectedPackSize === 1 || selectedPackSize === 3) {
    finalPrice = adjustedBasePrice * selectedPackSize;
  } else if (selectedPackSize === 6) {
    finalPrice = adjustedBasePrice * (selectedPackSize - 1);
  } else if (selectedPackSize === 12) {
    finalPrice = adjustedBasePrice * (selectedPackSize - 2);
  } else {
    console.error(`Unexpected pack size: ${selectedPackSize}`);
    finalPrice = 0; 
  }

  // Create a new Roll instance
  const newRoll = new Roll(rollType, selectedGlazeDescription, selectedPackSize, finalPrice);
  total += finalPrice; // Add the finalPrice directly to total
  shoppingCart.push(newRoll); // Push the new roll into the cart
  return newRoll; // Return the created roll object
}

function createElement(newRoll) {
  const template = document.querySelector('#cart-template');
  
  if (!template) {
    console.error("Template not found!");
    return;
  } else {
    console.log("Template found:", template);  // Add this line
  }

  const clone = template.content.cloneNode(true);
  newRoll.element = clone.querySelector('.product-container');

  if (!newRoll.element) {
    console.error("Element not found in cloned template!");
    return;
  }

  const btnDelete = newRoll.element.querySelector('.remove');
  if (!btnDelete) {
    console.error("Remove button not found in cloned element!");
  } else {
    btnDelete.addEventListener('click', () => {
      deleteRoll(newRoll);
    });
  }

  const rollListElement = document.querySelector('.cart-page-container');
  if (rollListElement) {
    rollListElement.prepend(newRoll.element);  // Insert the cloned element into the DOM
  } else {
    console.error("Cart page container not found!");
  }

  updateElement(newRoll);
}




function updateElement(newRoll) {
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

// function deleteRoll(newRoll) {
//   newRoll.element.remove();
//   shoppingCart.pop(newRoll);
//   total -= newRoll.basePrice;
//   updateElement(newRoll);
//   // saveCartToLocalStorage();
// }
function deleteRoll(newRoll) {
  // Find the index of the roll to remove from the cart array
  const index = shoppingCart.findIndex(roll =>
    roll.type === newRoll.type &&
    roll.glazing === newRoll.glazing &&
    roll.size === newRoll.size &&
    roll.basePrice === newRoll.basePrice
  );

  if (index !== -1) {
    // Remove the roll from the cart array
    shoppingCart.splice(index, 1);

    // Remove the element from the DOM
    newRoll.element.remove();

    // Save the updated cart to local storage
    saveCartToLocalStorage();

    // Recalculate the total price
    recalculateTotal();

    // Print the updated cart to the console
    console.log('Cart after removing item:', shoppingCart);
  } else {
    console.error('Item not found in cart.');
  }
}

function recalculateTotal() {
  total = 0;  // Reset total to 0

  // Loop through the shoppingCart array and sum the base prices
  for (const roll of shoppingCart) {
    total += roll.basePrice;
  }

  // Update the total price display in the DOM
  const totalPriceElement = document.querySelector('.checkout-cost');
  totalPriceElement.innerText = "$" + total.toFixed(2); // Ensure 2 decimal places
}


function saveCartToLocalStorage() {
  const cartJSON = JSON.stringify(shoppingCart);
  localStorage.setItem('shoppingCart', cartJSON);
  console.log('Cart saved to local storage:', cartJSON);

    // Now print the current contents of the cart from local storage
    const savedCart = localStorage.getItem('shoppingCart');
    console.log('Current cart contents in local storage:', JSON.parse(savedCart));
}

function loadCartFromLocalStorage() {
  const cartJSON = localStorage.getItem('shoppingCart');
  if (cartJSON) {
    shoppingCart = JSON.parse(cartJSON);
    console.log('Loaded cart from local storage:', shoppingCart);

    // Repopulate the cart with the items from storage
    for (const newRoll of shoppingCart) {
      createElement(newRoll);  // Render each roll on the page
    }
    recalculateTotal();
  } else {
    console.log("No cart found in local storage.");
  }
  
}


document.addEventListener('DOMContentLoaded', function () {
  const addToCartButton = document.querySelector('.add-to-cart');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', addToCart);
    console.log("Add to Cart button found and event listener added");
  } 
});

document.addEventListener('DOMContentLoaded', function () {
  loadCartFromLocalStorage();  // Load and render cart items from local storage
});