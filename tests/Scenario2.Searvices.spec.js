import { test, expect } from '@playwright/test';
import { ServicesPage } from '../pages/servicesPage.js';
import { HomePage } from '../pages/homePage.js';

test.describe('CBRE Services Page Tests', () => {

  let homePage;
  let servicePage;


  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    servicePage=new ServicesPage(page)
    await homePage.gotoUrl();
    await homePage.acceptCookiesIfPresent();
    await homePage.clickMenuItem('Services');
    await servicePage.clickOnSeeOverview();
  });


  test('SC01 - All service categories are visible and navigate to sub-pages', async ({ page }) => {
    const serviceNames = ['Invest', 'Plan', 'Design', 'Manage', 'Transform'];

    for (const name of serviceNames) {
      const result = await servicePage.verifyServicesAndClick(name);

      expect(result.isVisible,  `"${name}" card should be visible`).toBe(true);
      expect(result.isEnabled,  `"${name}" card should be enabled`).toBe(true);
      expect(result.navigated,  `"${name}" card should navigate away`).toBe(true);

      await page.goto('https://www.cbre.co.uk/services');
      await page.waitForLoadState('load');
    }

  });

});