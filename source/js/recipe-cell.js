/**
 * Recipe card component that will be used to represent each of the users
 * recipes on the home page. Each time one is created, the name needs to be set.
 * Otherwise, the card will remain blank.
 */
class RecipeCell extends HTMLElement {
  /**
   * The constructor for defining how this component will be represented on
   * the page
   */
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    const span = document.createElement('span');
    span.className = 'recipe-name';

    const card = document.createElement('card');
    card.appendChild(span);

    const anchor = document.createElement('a');
    anchor.className = 'recipe-cell';
    //anchor.setAttribute('href', '../components/view.html');
    anchor.appendChild(card);

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../style/home.css');

    shadow.appendChild(link);
    shadow.appendChild(anchor);
  }

  /**
   * Override the set operator here to add a span object to the shadow dom, when
   * a name is set for our recipe.
   *
   * @param {String} recipeName should be a string representing the name of the
   *    recipe & should hbe less than a certain length as defined by other pages
   * */
  set recipeName(recipeName) {
    if (!recipeName) return;

    const span = this.shadowRoot.querySelector('span');

    span.innerHTML = recipeName;
  }


  set recipeData(data) {
    if (!data.name) {
      return;
    }
    
    const span = this.shadowRoot.querySelector('span');
    span.innerHTML = data.name;

    const card = this.shadowRoot.querySelector('card');
    card.index = data.id;

    card.addEventListener('click', function(event) {
      select_data_by_id(event.currentTarget.index);
      window.location.href = "view.html";
    });
  }

}

customElements.define('recipe-cell', RecipeCell);
