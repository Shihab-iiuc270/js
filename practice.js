const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const resultsContainer = document.getElementById('resultsContainer');
        const selectedMealDisplay = document.getElementById('selectedMealDisplay');

        // Add event listener for search button
        searchButton.addEventListener("click", function(){
            var searchTerm = searchInput.value.trim();
            if(searchTerm !== ''){
                searchMeals(searchTerm);
            } else {
                alert('Please enter a search term!');
            }
        });

        // Add event listener for Enter key in search input
        // searchInput.addEventListener("keypress", function(event) {
        //     if (event.key === "Enter") {
        //         var searchTerm = searchInput.value.trim();
        //         if(searchTerm !== ''){
        //             searchMeals(searchTerm);
        //         } else {
        //             alert('Please enter a search term!');
        //         }
        //     }
        // });

        // Function to search for meals
        function searchMeals(searchTerm){
            // Show loading state
            // resultsContainer.innerHTML = '<div class="loading">Searching for meals...</div>';
            
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then((res)=>{
                if(!res.ok){
                    const message = `Error : ${res.status}`;
                    throw new Error(message);
                } else {
                    return res.json();
                }
            })
            .then((data)=>{
               if(data.meals == null){
                 resultsContainer.innerHTML = '<div class="no-results">No meals found. Try another search!</div>';
                 return;
               } else {
                displayMeals(data.meals);
               }
            })
            .catch((err)=>{
                 console.error('Error:', err);
                 resultsContainer.innerHTML = '<div class="error">Failed to fetch meals. Please check your connection and try again.</div>';
            })
        }

        // Function to display meals in grid
        function displayMeals(meals){
            resultsContainer.innerHTML = '';
            
            meals.forEach((meal)=>{
                const div = document.createElement("div");
                div.classList.add("meal-card");
                div.innerHTML =`
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                    <p class="meal-name">${meal.strMeal}</p>
                        <button class="view-recipe-btn" onclick="showMealDetails('${meal.idMeal}')">
                            👁️ View Item Details
                        </button>
                `;
                resultsContainer.appendChild(div);
            });
        }

        // Function to show meal details
        function showMealDetails(mealId) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network error');
                    }
                    return response.json();
                })
                .then((data)=>{
                    const meal = data.meals[0]; 
                    displaySelectedMeal(meal);
                })
                .catch(function(error) {
                    alert('Error loading meal details: ' + error.message);
                });
        }

        // Function to display selected meal
       function displaySelectedMeal(meal) {
    // Clear previous meal details first
    selectedMealDisplay.innerHTML = '';
    
    // Create ingredients list (without measures)
    let ingredientsHTML = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal['strIngredient' + i];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsHTML += `<li>${ingredient}</li>`;
        }
    }
    
    const div = document.createElement("div");
    div.classList.add("selected-meal-card");
    div.innerHTML = `
        <div class="selected-meal-content">
            <h1 class="selected-meal-header">${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="selected-meal-image">
        </div>
        <div class="selected-meal-details">
            <h2>Ingredients</h2>
            <ul>${ingredientsHTML}</ul>
            <button class="close-btn" onclick="closeMealDisplay()">Close</button>
        </div>
    `;
    
    selectedMealDisplay.appendChild(div);
    selectedMealDisplay.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
 function closeMealDisplay() {
            selectedMealDisplay.style.display = 'none';
            currentSelectedMeal = null;
 }
        // Function to close meal display
        // function closeMealDisplay() {
        //     selectedMealDisplay.style.display = 'none';
        // }

        // // Load some initial meals on page load
        // window.addEventListener('load', function() {
        //     searchMeals('chicken');
        // });