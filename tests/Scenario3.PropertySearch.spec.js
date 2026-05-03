import { test, expect } from '@playwright/test';
import { FindProperty } from '../pages/FindProperty.js';
import { HomePage } from '../pages/homePage.js';


test.describe('Scenario 3: Property Search Functionality', () => {
let homePage;
  let propertySearch;


  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    propertySearch=new FindProperty(page)
    await homePage.gotoUrl();
    await homePage.acceptCookiesIfPresent();
    await homePage.clickMenuItem('Find a Property');
    await propertySearch.clickOnSearchProperty();
  });



  test('TC01 - Verify Search for Property', async ({ page }) => {

    await propertySearch.searchForLocation('Aberdeen, UK');
    
    await propertySearch.selectTransactionType('For-Sale');
    await propertySearch.selectPropertyType('Industrial');
    await propertySearch.clickOnSearch();
    await propertySearch.verifyResultList('Aberdeen');
  });


});
