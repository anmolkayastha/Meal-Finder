console.log("running app...");

// DOM Elements
const submit = document.getElementById('submit');
const search = document.getElementById('search');
const random = document.getElementById('random');
const searchBtn = document.getElementById('search-button');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const singleMealEl = document.getElementById('single-meal');


function searchMeal(e)
{
    e.preventDefault();

    singleMealEl.value = '';

    // Get the input term
    const searchTerm = search.value;
    console.log("Looking for: ", searchTerm);

    // If there is search term, the if blocks runs
    if(searchTerm.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          resultHeading.innerHTML = `<h2>Search results for '${searchTerm}':</h2>`;

          if (data.meals === null) {
            resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
          } else {
            mealsEl.innerHTML = data.meals
              .map(
                meal => `
              <div class="meal d-flex flex-column align-items-center text-center border rounded border-secondary col-2 p-1 m-2">
                <img class="w-100 "src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3 class="mt-2">${meal.strMeal}</h3>
                </div>
              </div>
            `
              )
              .join('');
          }
        });
    }
    else{
        // alert("Please enter a meal   to search");
        showAlert();
    }

    // Clear input
    search.value = '';
}

function showAlert(){
  const div = document.createElement('div');
  div.className = "alert text-danger border border-danger p-1";
  div.appendChild(document.createTextNode("Please enter a valid input"));
  const formGroup = document.querySelector('#form-group');
  const emptyDiv = document.querySelector('#empty-div');
  // Insert alert
  formGroup.insertBefore(div, emptyDiv);
 
  // Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 2000);

}

submit.addEventListener('submit', searchMeal);