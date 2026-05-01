const {expect} = require('@playwright/test');
class FindProperty {
  constructor(page) {
    this.page = page;

    this.searchInput = page.locator('input[placeholder="Search properties by area or postcode"]').first();

    this.searchButton = page.locator('[data-test="search-button"]');

    this.transactionType = page.locator('#aspect-selector-section');

    this.propertyType = page.locator('#path-selector-section');

    this.resultItemsAdress = page.locator('#propertyList #addressLine2 span');
    



  }

   /**
   * Enter in Search Field
   */
  async searchForLocation(location) {
  await this.searchInput.fill(location);
  try{
  await this.page.locator('ul.geosuggest__suggests').waitFor({ state: 'visible', timeout: 10000 });
  console.log(`Suggestions appeared`);

  const suggestion = this.page.locator('li.geosuggest-item').filter({ hasText: new RegExp(location, 'i') }).first();
    await suggestion.click();  
}catch(error)
  {}
  
}

   /**
   * Click on SearchButton
   */
  async clickOnSearch() {
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

 
/**
   * Select Transaction Type drop  down
   */
  async selectTransactionType(optionText) {
    console.log(`Selecting transaction type: "${optionText}"`);

    await this.transactionType.click();
   const dataTestValue = `transaction-type-${optionText.toLowerCase()}`;
    const option = this.page.locator(`[data-test="${dataTestValue}"]`);
    await option.click();
    console.log(`Option "${optionText}" selected`);
  }


  /**
   * Select Property Type drop  down
   */
  async selectPropertyType(optionText) {
    console.log(`Selecting Property type: "${optionText}"`);

    await this.propertyType.click();
   const dataTestValue = `property-type-${optionText.toLowerCase()}`;
    const option = this.page.locator(`[data-test="${dataTestValue}"]`);
    await option.click();
    console.log(`Option "${optionText}" selected`);
  }

   /**
 * Verify Result List
 */
  async verifyResultList(addressText) {
     let matchFound = false;
    for (let list of await this.resultItemsAdress.all()) {
        await list.scrollIntoViewIfNeeded();
            const text = await list.textContent();
            console.log(`Address: "${text}"`);

        if (text.includes(addressText)) {
            matchFound = true;
            console.log(` Search Address Match found : "${text}"`);
        }
  }

  expect(matchFound, `No result contained "${addressText}"`).toBe(true);
}


  /**
 * Click on SearchProperty from navigation sub menu
 */
  async clickOnSearchProperty() {
    await this.page.getByText("Search Properties").click();
    console.log(`Clicked on Search Property`);
  }
}

module.exports = { FindProperty };
