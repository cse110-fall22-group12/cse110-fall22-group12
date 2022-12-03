import {
  select_data_by_id,
} from './data.js';

/**
 * Recipe card component that will be used to represent each of the users
 * recipes on the home page. Each time one is created, the name needs to be set.
 * Otherwise, the card will remain blank.
 */
class Recipe_Cell extends HTMLElement {
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
    anchor.className = 'recipe-cell-link';
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
   * @param {Object} data should be an object represeting the recipe & should
   * be less than a certain length as defined by other pages. The Schema for a
   * recipe object looks like:
   * {
   *    id: 0,
   *    ingredients: "some ingredients",
   *    name: "mushroom killer",
   *    notes: "some notes",
   *    steps: "some preparation"
   * }
   * */
  set recipe_data(data) {
    if (!data.name) {
      return;
    }

    const span = this.shadowRoot.querySelector('span');
    span.innerHTML = data.name;

    const card = this.shadowRoot.querySelector('card');
    card.index = data.id;

    card.addEventListener('click', function(event) {
      select_data_by_id(event.currentTarget.index);
      window.location.href = 'view.html';
    });
  }
}

customElements.define('recipe-cell', Recipe_Cell);
