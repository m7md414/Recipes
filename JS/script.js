let allRecipes = [];
let recipeDetails = {};
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

async function getRecipes(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes;
    displayRecipes();
}
async function getRecipeDetails(id)
{
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await apiResponse.json();
    recipeDetails = recipeDetails.recipe
    displayRecipeDetails();
}

function displayRecipes() {
    box = ``;
    for (let i = 0; i < allRecipes.length; i++) {
        let correctID = "'"+allRecipes[i].recipe_id+"'";
        box += `
        <div class="col-md-4">
            <div class="recipe d-flex flex-wrap justify-content-center align-items-center">
                <img src="${allRecipes[i].image_url}" class="w-100" onclick="getRecipeDetails(${correctID})" alt="">
                <h4 class="text-black p-1 w-100">${allRecipes[i].title}</h4>
                <p class="text-black">${allRecipes[i].publisher}</p>
            </div>
        </div>
        `;
    }
    document.getElementById('recipesRow').innerHTML = box;
}
searchBtn.addEventListener('click',function(){
    getRecipes(searchInput.value);
})

function displayRecipeDetails() {

    let box2 = ``;

    for (let x of recipeDetails.ingredients) {
        box2 += `<li class="d-flex py-1 align-items-center font-weight-bolder"><span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>${x}</li>`;
    }
    let box = `
    <div class="recipeDetials d-flex flex-wrap align-items-center">
        <h2 class="color-mine py-1">${recipeDetails.title}</h2>
        <img src="${recipeDetails.image_url}" class="w-100" alt="">
        <ul class="fa-ul py-3">
            ${box2}
        </ul>
    </div>`;

    document.getElementById('recipeDetails').innerHTML = box;

}