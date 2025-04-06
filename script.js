// Sample restaurant data
const restaurants = [
    {
        name: "Domino's Pizza",
        cuisine: "Pizza, Fast Food",
        image: "images/restaurants/dominos.jpg",
        rating: 4.2,
        deliveryTime: "30 min",
        price: "₹200 for two",
        offer: "50% OFF up to ₹100"
    },
    {
        name: "Biryani Blues",
        cuisine: "Biryani, North Indian",
        image: "images/restaurants/biryani-blues.jpg",
        rating: 4.5,
        deliveryTime: "25 min",
        price: "₹350 for two",
        offer: "FREE delivery"
    },
    {
        name: "The Burger Joint",
        cuisine: "American, Burgers",
        image: "images/restaurants/burger-joint.jpg",
        rating: 4.3,
        deliveryTime: "35 min",
        price: "₹300 for two",
        offer: "20% OFF"
    },
    {
        name: "Wang's Chinese",
        cuisine: "Chinese, Asian",
        image: "images/restaurants/chinese.jpg",
        rating: 3.9,
        deliveryTime: "40 min",
        price: "₹250 for two",
        offer: null
    },
    {
        name: "South Express",
        cuisine: "South Indian, Dosa",
        image: "images/restaurants/south-indian.jpg",
        rating: 4.6,
        deliveryTime: "20 min",
        price: "₹150 for two",
        offer: "Buy 1 Get 1 Free"
    },
    {
        name: "Royal Darbar",
        cuisine: "Mughlai, North Indian",
        image: "images/restaurants/mughlai.jpg",
        rating: 4.0,
        deliveryTime: "45 min",
        price: "₹400 for two",
        offer: null
    },
    {
        name: "Fresh Desserts",
        cuisine: "Desserts, Ice Cream",
        image: "images/restaurants/desserts.jpg",
        rating: 4.7,
        deliveryTime: "15 min",
        price: "₹200 for two",
        offer: "30% OFF"
    },
    {
        name: "Healthy Bites",
        cuisine: "Salads, Healthy Food",
        image: "images/restaurants/healthy.jpg",
        rating: 4.1,
        deliveryTime: "25 min",
        price: "₹300 for two",
        offer: null
    }
];

// Function to create restaurant cards
function createRestaurantCards() {
    const restaurantGrid = document.getElementById('restaurantGrid');
    restaurantGrid.innerHTML = '';

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card fade-in';

        const hasOffer = restaurant.offer !== null;
        let ratingClass = restaurant.rating >= 4.0 ? "" : "low";
        
        card.innerHTML = `
            <div class="restaurant-img">
                <img src="${restaurant.image}" alt="${restaurant.name}">
                ${hasOffer ? `<div class="offer-label">${restaurant.offer}</div>` : ''}
            </div>
            <div class="restaurant-info">
                <h3 class="restaurant-name">${restaurant.name}</h3>
                <p class="cuisine">${restaurant.cuisine}</p>
                <div class="restaurant-meta">
                    <span class="rating ${ratingClass}">${restaurant.rating} <i class="material-icons">star</i></span>
                    <span class="time">${restaurant.deliveryTime}</span>
                    <span class="price">${restaurant.price}</span>
                </div>
            </div>
        `;

        restaurantGrid.appendChild(card);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createRestaurantCards();
    
    // Filter button click functionality
    const filterButtons = document.querySelectorAll('.filter-options button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Sort restaurants based on filter
            const filterType = button.textContent;
            let sortedRestaurants = [...restaurants];
            
            if (filterType === 'Rating') {
                sortedRestaurants.sort((a, b) => b.rating - a.rating);
            } else if (filterType === 'Delivery Time') {
                sortedRestaurants.sort((a, b) => {
                    const timeA = parseInt(a.deliveryTime);
                    const timeB = parseInt(b.deliveryTime);
                    return timeA - timeB;
                });
            } else if (filterType === 'Cost: Low to High') {
                sortedRestaurants.sort((a, b) => {
                    const priceA = parseInt(a.price.match(/\d+/)[0]);
                    const priceB = parseInt(b.price.match(/\d+/)[0]);
                    return priceA - priceB;
                });
            } else if (filterType === 'Cost: High to Low') {
                sortedRestaurants.sort((a, b) => {
                    const priceA = parseInt(a.price.match(/\d+/)[0]);
                    const priceB = parseInt(b.price.match(/\d+/)[0]);
                    return priceB - priceA;
                });
            }
            
            // Update the restaurant grid with sorted data
            restaurants.splice(0, restaurants.length, ...sortedRestaurants);
            createRestaurantCards();
        });
    });
    
    // Search bar functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRestaurants = restaurants.filter(restaurant => {
            return restaurant.name.toLowerCase().includes(searchTerm) || 
                   restaurant.cuisine.toLowerCase().includes(searchTerm);
        });
        
        const restaurantGrid = document.getElementById('restaurantGrid');
        restaurantGrid.innerHTML = '';
        
        if (filteredRestaurants.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <p>No restaurants match your search criteria.</p>
                <p>Try something different or check for spelling errors.</p>
            `;
            restaurantGrid.appendChild(noResults);
            return;
        }
        
        filteredRestaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'restaurant-card fade-in';
            
            const hasOffer = restaurant.offer !== null;
            let ratingClass = restaurant.rating >= 4.0 ? "" : "low";
            
            card.innerHTML = `
                <div class="restaurant-img">
                    <img src="${restaurant.image}" alt="${restaurant.name}">
                    ${hasOffer ? `<div class="offer-label">${restaurant.offer}</div>` : ''}
                </div>
                <div class="restaurant-info">
                    <h3 class="restaurant-name">${restaurant.name}</h3>
                    <p class="cuisine">${restaurant.cuisine}</p>
                    <div class="restaurant-meta">
                        <span class="rating ${ratingClass}">${restaurant.rating} <i class="material-icons">star</i></span>
                        <span class="time">${restaurant.deliveryTime}</span>
                        <span class="price">${restaurant.price}</span>
                    </div>
                </div>
            `;
            
            restaurantGrid.appendChild(card);
        });
    });
    
    // Veg switch toggle
    const vegSwitch = document.getElementById('vegSwitch');
    vegSwitch.addEventListener('change', () => {
        // In a real app, this would filter restaurants to show only veg options
        alert('Veg-only filter ' + (vegSwitch.checked ? 'enabled' : 'disabled'));
    });
    
    // Location selector
    const locationSelect = document.getElementById('location');
    locationSelect.addEventListener('change', () => {
        if (locationSelect.value) {
            alert(`Location changed to ${locationSelect.options[locationSelect.selectedIndex].text}`);
            // In a real app, this would update the restaurant listings based on location
        }
    });
});