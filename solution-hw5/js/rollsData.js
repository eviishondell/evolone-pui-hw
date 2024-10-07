const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "../assets/products/original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "../assets/products/apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "../assets/products/raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "../assets/products/walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "../assets/products/double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "../assets/products/strawberry-cinnamon-roll.jpg"
    }    
};

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
