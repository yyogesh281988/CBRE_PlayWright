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
    const serviceTitles = {
      Invest: /Invest, Finance & Value/i,
      Plan: /Plan, Lease & Occupy/i,
      Design: /Design & Build/i,
      Manage: /Manage Properties & Portfolios/i,
      Transform: /Transform Business Outcomes/i,
    };
    const card = this.page.getByRole('link', { name: serviceTitles[serviceName] }).first();
    await card.waitFor({ state: 'visible', timeout: 10000 });

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
    await this.page.getByText('See Overview').waitFor({ state: 'visible', timeout: 10000 });
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load' }),
      this.page.getByText('See Overview').click(),
    ]);
    await this.page.getByRole('link', { name: /Invest, Finance & Value/i }).first().waitFor({ state: 'visible', timeout: 10000 });
    console.log(`Clicked on See Overview`);
  }

}

export { ServicesPage };