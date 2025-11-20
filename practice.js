        document.getElementById("searchButton").addEventListener("click", function(){
            const searchInput = document.getElementById('searchInput').value;

            if(searchInput != ''){
                searchMeals(searchInput);
            } else {
                alert('Please enter a search term!');
            }
        });

     
        function searchMeals(searchInput){
            const resultsContainer = document.getElementById('resultsContainer');

            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
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
                alert('No meals found. Try another search!');
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

        function displayMeals(meals){
            resultsContainer.innerHTML = '';
            
            meals.forEach((meal)=>{
                const div = document.createElement("div");
                div.classList.add("meal-card");
                div.innerHTML =`
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                    <p class="meal-name">${meal.strMeal}</p>
                        <button class="view-recipe-btn" onclick="showMealDetails('${meal.idMeal}')">
                            View Ingredients
                        </button>
                `;
                resultsContainer.appendChild(div);
            });
        }

        function showMealDetails(mealId) {
            const selectedMealDisplay = document.getElementById('selectedMealDisplay');

            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(function(res) {
                    if (!res.ok) {
                        throw new Error('Network error');
                    }
                    return res.json();
                })
                .then((data)=>{
                    const meal = data.meals[0]; 
                    displaySelectedMeal(meal);
                })
                .catch((err) => {
                    alert('Error loading meal details');
                });
        }

       function displaySelectedMeal(meal) {
    selectedMealDisplay.innerHTML = '';
    
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
}
 function closeMealDisplay() {
            selectedMealDisplay.style.display = 'none';
            currentSelectedMeal = null;
 }
       