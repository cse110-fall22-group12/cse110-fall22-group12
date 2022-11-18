class RecipeCell extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const span = document.createElement('span');
        span.className = 'recipe-name';
                
        const card = document.createElement('card');
        card.appendChild(span);

        const anchor = document.createElement('a');
        anchor.className = 'recipe-cell'
        anchor.setAttribute('href', '../components/view.html');
        anchor.appendChild(card);

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', '../style/home.css');

        shadow.appendChild(link);
        shadow.appendChild(anchor);
    }

    set recipe_name(recipe_name) {
        if (!recipe_name) return;

        const span = this.shadowRoot.querySelector('span');

        span.innerHTML = recipe_name;
    }
}

customElements.define('recipe-cell', RecipeCell);