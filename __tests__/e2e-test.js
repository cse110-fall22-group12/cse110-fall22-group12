describe('Basic user flow for adding a new recipe', () => {
    beforeAll(async() => {
        await page.goto('https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/index.html');
    });
    
    it('Initial Splash page - Click to go to home page', async() => {
        // check what page we are on by getting page title
        const pagename = await page.title();
        expect(pagename).toBe('Splash Page'); // change main branch
        await page.click('img');
        const newpagename = await page.title();
        expect(newpagename).toBe('Home Page');
    }, 10000);

    it('Initial Home Page - Check for 3 recipe items', async () => {
        await page.goto('https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/home.html');
        console.log('checking for 3 recipe cells');
        const numRecipes = await page.$$eval('recipe-cell', (recipeItems) => {
            return recipeItems.length;
        });
        expect(numRecipes).toBe(3);
    }, 10000);
    
    it('On Home Page - Check the add recipe button', async () => {
        await page.goto('https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/home.html');
        await page.click('img');
        const newpagename = await page.title();
        expect(newpagename).toBe('Edit Page');
    }, 10000);
    
    it('On Edit Page - Check if we can add a new recipe', async () => {
        await page.goto('https://cse110-fall22-group12.github.io/cse110-fall22-group12/components/edit.html');
        // add a recipe name
        await page.$eval('#edit-name', el => el.value = 'UI test');
        // add ingredient
        await page.$eval('#edit-ingredients', el => el.value = 'UI test ingredient');
        // add step
        await page.$eval('#edit-steps', el => el.value = "UI test steps");
        // add notes
        await page.$eval('#edit-notes', el => el.value = "UI test notes");
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
        // on the view page, check if the recipe has the correct content in
        // ingredients, steps, and notes
        //await page.waitForSelector(newrecipe);
        //await page.click(newrecipe);
        // await page.evaluate(()=> {document.querySelectorAll('recipe-cell')[0].click();});
        // await page.$$eval('recipe-cell', elements => elements[3].click());

        // const recipeCell = await page.$x("//*[@id='stage']/div/recipe-cell[1]//a/card/span");
        // if (recipeCell.length > 0) {
        //     await recipeCell[0].click();
        // }       
        // else {
        //     throw new Error("Link not found");
        // }
        const newPageName3 = await page.title();
        expect(newPageName3).toBe('View Page');  

    });
    

    // it('Clicking the home button should go to the view page', async () =>{
    //     console.log('Go to view page');
    //     // await page.goto('../source/components/view.html');
    //     await page.click('view-page-home-button');
    //     let homeTitle = await page.title();
    //     expect(homeTitle).toBe('Home Page');
    // });

});
