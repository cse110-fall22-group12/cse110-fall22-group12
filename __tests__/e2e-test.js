// noshroom website end2end testing

describe('Basic user flow for adding a new recipe', () => {
  beforeAll(async () => {
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/index.html'
    );
  });

  // Initial Splash page - Click to go to home page
  it('Initial Splash page - Click to go to home page', async () => {
    // check what page we are on by getting page title
    const pagename = await page.title();
    expect(pagename).toBe('Splash Page'); // change main branch
    await page.click('img');
    const newpagename = await page.title();
    expect(newpagename).toBe('Home Page');
  }, 10000);

  // Initial Home Page - Check for default 3 recipe items
  it('Initial Home Page - Check for default 3 recipe items', async () => {
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/home.html'
    );
    const numRecipes = await page.$$eval('recipe-cell', (recipeItems) => {
      return recipeItems.length;
    });
    expect(numRecipes).toBe(1);
  }, 10000);

  // On Home Page - Check the add recipe button
  it('On Home Page - Check the add recipe button', async () => {
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/home.html'
    );
    await page.click('img');
    const newpagename = await page.title();
    expect(newpagename).toBe('Edit Page');
  }, 10000);

  // On Edit Page - Check if we can add a new recipe and have contents estabalished on all pages
  it('On Edit Page - Check if we can add a new recipe and have contents estabalished on all pages', async () => {
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/edit.html'
    );
    // add a recipe name
    await page.$eval('#edit-name', (el) => (el.value = 'UI test'));
    // add ingredient
    await page.$eval(
      '#edit-ingredients',
      (el) => (el.value = 'UI test ingredient')
    );
    // add step
    await page.$eval('#edit-steps', (el) => (el.value = 'UI test steps'));
    // add notes
    await page.$eval('#edit-notes', (el) => (el.value = 'UI test notes'));
    // hit save button
    await page.click('#edit-save');
    // should go back to the home page
    let newPageName2 = await page.title();
    expect(newPageName2).toBe('Home Page');
    // on the home page, check if the latest recipe have the correct name
    const recipes = await page.$$('recipe-cell');
    let newrecipe = recipes[recipes.length - 1];
    let shadow = await newrecipe.getProperty('shadowRoot');
    let span = await shadow.$('span');
    let innertext = await span.getProperty('innerText');
    let value = await innertext.jsonValue();
    expect(value).toBe('UI test');
    // check recipe cards number correct
    const numRecipes = await page.$$eval('recipe-cell', (recipeItems) => {
      return recipeItems.length;
    });
    expect(numRecipes).toBe(4);
    // on the view page, check if the recipe has the correct content in
    // ingredients, steps, and notes
    await page.evaluate(() => {
      document.querySelectorAll('recipe-cell')[0].click();
    });
    await page.$$eval('recipe-cell', (elements) => elements[3].click());
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/view.html'
    );
    // go to view page, check if contents are correct
    const newPageName3 = await page.title();
    expect(newPageName3).toBe('View Page');
    const recipename = await page.evaluate(
      () => document.querySelector('.recipe-name').innerText
    );
    expect(recipename).toBe('UI test');
    const ingredient = await page.evaluate(
      () => document.querySelector('#recipe-ingredients').innerText
    );
    expect(ingredient).toBe('UI test ingredient');
    const step = await page.evaluate(
      () => document.querySelector('#recipe-preparation').innerText
    );
    expect(step).toBe('UI test steps');
    const notes = await page.evaluate(
      () => document.querySelector('#recipe-notes').innerText
    );
    expect(notes).toBe('UI test notes');
  });

  // On View Page - Check if home button and edit button function correctly
  it('On View Page - Check if home button and edit button function correctly', async () => {
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/view.html'
    );
    // test if home button leads back to home page
    const ingredient = await page.evaluate(
      () => document.querySelector('#recipe-ingredients').innerText
    );
    expect(ingredient).toBe('UI test ingredient');
    await page.click('#view-page-home-button');
    let newPageName4 = await page.title();
    expect(newPageName4).toBe('Home Page');
    await page.goBack();
    // after checking the home button function, go back to view page
    newPageName4 = await page.title();
    expect(newPageName4).toBe('View Page');
    // check the edit function on view page
    await page.click('#view-page-edit-button');
    newPageName4 = await page.title();
    expect(newPageName4).toBe('Edit Page');
    // modify name to new name
    await page.$eval('#edit-name', (el) => (el.value = 'new UI test'));
    await page.click('#edit-back');
    // check the edit back button on edit page
    newPageName4 = await page.title();
    expect(newPageName4).toBe('View Page');
    const recipename = await page.evaluate(
      () => document.querySelector('.recipe-name').innerText
    );
    expect(recipename).toBe('UI test');

    // modify name to new name
    await page.click('#view-page-edit-button');
    await page.$eval('#edit-name', (el) => (el.value = 'new UI test'));
    await page.click('#edit-save');
    // check the edit back button on edit page
    newPageName4 = await page.title();
    expect(newPageName4).toBe('View Page');
    const updatedrecipename = await page.evaluate(
      () => document.querySelector('.recipe-name').innerText
    );
    expect(updatedrecipename).toBe('new UI test');
  });

  // On View Page - Check if the alertbox has correct content
  it('On View Page - Check if the alertbox has correct content', async () => {
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/view.html'
    );
    // check prompt text
    await page.click('#view-page-delete-button');
    const warning = await page.$('#view-delete-box');
    const form = await warning.$('form');
    const container = await form.$('.view-delete-container');
    const textcontainer = await container.$('.view-delete-text');
    const textvalue = await textcontainer.evaluate((el) => el.textContent);
    // check button text
    expect(textvalue).toBe('Are you sure you want to delete?');
    const buttons = await form.$('.view-delete-choose');
    const nobutton = await buttons.$('#view-no-delete-button');
    const yesbutton = await buttons.$('#view-yes-delete-button');
    const novalue = await nobutton.evaluate((el) => el.innerText);
    const yesvalue = await yesbutton.evaluate((el) => el.innerText);
    expect(novalue).toBe('No, Go Back');
    expect(yesvalue).toBe('Yes, Delete');
  });

  // On View Page - Check if the alertbox function is correct
  it('On View Page - Check if the alertbox function is correct', async () => {
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/view.html'
    );
    // check no button functionality
    await page.click('#view-page-delete-button');
    await page.click('#view-no-delete-button');
    const pagename = await page.title();
    expect(pagename).toBe('View Page');
    // check yes button functionality
    await page.click('#view-page-delete-button');
    await page.click('#view-yes-delete-button');
    const pagename2 = await page.title();
    expect(pagename2).toBe('Home Page');
    // check recipe number
    const numRecipes = await page.$$eval('recipe-cell', (recipeItems) => {
      return recipeItems.length;
    });
    expect(numRecipes).toBe(3);
  });

  // On Edit Page - Check if the alertbox function is correct
  it('On Edit Page - Check if the alertbox function is correct', async () => {
    await page.goto(
      'https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/home.html'
    );
    await page.click('img');
    await page.click('#edit-save');
    // check prompt text
    const warning = await page.$('#edit-button-box');
    const form = await warning.$('form');
    const container = await form.$('.edit-container');
    const textcontainer = await container.$('.edit-text');
    const textvalue = await textcontainer.evaluate((el) => el.innerText);
    expect(textvalue).toBe(
      'Please fill out the following required fields: Recipe Name'
    );
    // check button text
    const button = await form.$('.edit-choose');
    const okbutton = await button.$('#ok-edit-button');
    const okvalue = await okbutton.evaluate((el) => el.innerText);
    expect(okvalue).toBe('OK');
  });
});
