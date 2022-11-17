class RecipeCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        
        const card = document.createElement('card');
        card.addEventListener('click', this.handleClick);

        const style_link = document.createElement('link');
        style_link.setAttribute('rel', 'stylesheet');
        style_link.setAttribute('href', './style/recipe-card.css'); 
        
        shadow.append(card);
        shadow.append(style_link);
    }

    set data(data) {
        if (!data) return;

        console.log("set recipe name to ", data);
        // this.recipe_name = recipe_name;
        const card = this.shadowRoot.querySelector('card');
        
        const recipe_label = document.createElement('h1');
        recipe_label.innerHTML = data;

        card.appendChild(recipe_label);
    }

    handleClick(event) {
        console.log('clicked ', this.recipe_name);
    }

}

customElements.define("recipe-card", RecipeCard);