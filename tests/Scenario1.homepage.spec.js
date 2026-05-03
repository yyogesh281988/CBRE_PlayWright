import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test.describe('CBRE Homepage Tests', () => {
  let homePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.gotoUrl();
    await homePage.acceptCookiesIfPresent();
  });

test('TC1: Verify home Page tile', async ({ page }) => {

expect(await homePage.getTitle()).toMatch('CBRE');


});


test('TC2: Verify home Page Navigation Menu', async ({ page }) => {

await homePage.verifyNaviagtionMenuItems();

});

});
