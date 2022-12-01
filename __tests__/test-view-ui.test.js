it('Clicking the home button should go to the home page', async() =>{
    console.log('Go to view page');
    await page.goto('file:///Users/winnieshe/Desktop/cse110-fall22-group12/source/components/view.html');
    await page.click('view-page-home-button');

    let homeTitle = await page.title();
    expect(homeTitle).toBe('Home Page');
});

it('Clicking the edit button should go to the home page', async() =>{
    console.log('Go to view page');
    await page.goto('../source/components/view.html');
    await page.click('view-page-edit-button');

    let editTitle = await page.title();
    expect(homeTitle).toBe('Edit Page');
});




