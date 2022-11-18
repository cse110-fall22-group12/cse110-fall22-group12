window.addEventListener("DOMContentLoaded" , init);

function init() {
    const recipe_card1 = document.createElement('recipe-cell');

    recipe_card1.recipe_name = "pasta 1";
    
    const list = document.getElementsByClassName('recipe-list')[0];



    list.appendChild(recipe_card1);
}

function create_sample_data() {
    
}