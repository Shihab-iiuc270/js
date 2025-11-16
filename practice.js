const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById("resultsContainer");

searchButton.addEventListener("click",function(){
    var searchTerm =  searchInput.value.trim();
    if(searchTerm !=''){
        searchMeals(searchTerm);
    }
    else{
        alert('Please enter a search term!');
                // searchInput.focus();
                // return
    }
})

function searchMeals(searchTerm){

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((res)=>{
        if(!res.ok){
            const message = `Error : ${res.status}`;
            throw new Error(message);
        }
        else{
            return res.json();
        }
    })
    .then((data)=>{
       if(data.meals == null){
            alert("Not Found Any item")
       }
       else{
        displayMeals(data.meals);
       }
    })
    .catch((err)=>{
         console.error('Error:', err);

    })
}
 

function displayMeals(meals){
    if(meals.length == 0 || !meals){
        resultsContainer.innerHTML = 
     '<div class="no-results">No meals found. Try another search!</div>';
     return;
    }
     var mealsHTML = '';
            
            meals.forEach(function(meal) {
                mealsHTML += `
                    <div class="meal-card">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                        <div class="meal-info">
                            <div class="meal-name">${meal.strMeal}</div>
                            <div class="meal-category">${meal.strCategory}</div>
                            <div class="meal-area">${meal.strArea}</div>
                        </div>
                    </div>
                `;
            });
            
            // Add results count
            mealsHTML = '<div class="meals-grid">' + mealsHTML + '</div>' +
                       '<div style="text-align: center; margin-top: 20px; color: #666;">' +
                       'Found ' + meals.length + ' meal' + (meals.length !== 1 ? 's' : '') +
                       '</div>';
            
            resultsContainer.innerHTML = mealsHTML;
}