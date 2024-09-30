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


let cartButton = [];
let originalPrice = 0;

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
        option.textContent = `Pack of ${pack.size}`;
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
const addToCartButton = document.querySelector(".add-to-cart");
addToCartButton.addEventListener("click", addToCart);

document.addEventListener("DOMContentLoaded", refreshPd);
