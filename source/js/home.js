window.addEventListener('DOMContentLoaded', init);

function init() {
    console.log("DOM Initialized, Loading Recipe Cards");
    const card1 = document.createElement("recipe-card");
    
    card1.data = "rec1";

    console.log( card1);

    const main = document.querySelector("main");

    main.appendChild(card1);

}