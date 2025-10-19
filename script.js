const query = "chicken";
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
  .then((res) => res.json())
  .then((data) => {
    displayResults(data.meals);
  })
  .catch((err) => console.error(err));

document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("search").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      displayResults(data.meals);
    })
    .catch((err) => console.error(err));
});

function displayResults(meals) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" width="200">
      <button onclick="getDetails(${meal.idMeal})">View Details</button>
    `;
    resultsDiv.appendChild(mealDiv);
  });
}

function getDetails(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      const detailsDiv = document.getElementById("recipeDetails");
      detailsDiv.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" width="300">
        <p><b>Category:</b> ${meal.strCategory}</p>
        <p><b>Area:</b> ${meal.strArea}</p>
        <h3>Ingredients:</h3>
        <ul>
          ${getIngredients(meal)
            .map((ing) => `<li>${ing}</li>`)
            .join("")}
        </ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
      `;
    });
}

// Helper function to extract ingredients
function getIngredients(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else break;
  }
  return ingredients;
}
