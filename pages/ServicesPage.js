class ServicesPage {
  constructor(page) {
    this.page = page;
 }


  /**
   * Verify Service card are clickable
   * @param {*} serviceName 
   * @returns 
   */

  async verifyServicesAndClick(serviceName) {
    const card = this.page.locator('div[data-analytics-component="ServiceCard"] a').filter({ hasText: new RegExp(serviceName) }).first();

    const isVisible = await card.isVisible();
    const isEnabled = await card.isEnabled();
 const cardName = await card.textContent();
    if (isVisible && isEnabled) {
      const urlBefore = this.page.url();
      await card.click();
      await this.page.waitForLoadState('load');
      const urlAfter = this.page.url();
      console.log(`${cardName} Navigated to ${urlAfter}`);
      const navigated = urlBefore !== urlAfter;
      return { isVisible, isEnabled, navigated, urlAfter };
    }

    return { isVisible, isEnabled, navigated: false, urlAfter: null };
  }


    /**
 * Click on seeOverview
 */
  async clickOnSeeOverview() {
    await this.page.getByText("See Overview").click();
    console.log(`Clicked on See Overview`);
  }

}

module.exports = { ServicesPage };