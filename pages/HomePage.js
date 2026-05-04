class HomePage{
    constructor(page)
    {
        this.page=page;
        this.acceptCookiesBtn = page.locator('button:has-text("Accept All Cookies"), #onetrust-accept-btn-handler');
        this.allMenuItems = page.getByRole('menuitem');
    }

    async gotoUrl()
    {
        await this.page.goto('https://www.cbre.co.uk/');
        await this.page.waitForLoadState('networkidle');
        // Wait for menu items to load, as they might be loaded via JS
        await this.page.waitForFunction(() => {
            const menuItems = document.querySelectorAll('[role="menuitem"]');
            return menuItems.length > 0;
        }, { timeout: 10000 });
    }

    async acceptCookiesIfPresent() {
    try {
      await this.acceptCookiesBtn.waitFor({ timeout: 5000 });
      await this.acceptCookiesBtn.click();
      console.log('Cookie banner accepted');
    } catch {
      console.log('No cookie banner found — skipping');
    }
  }

/**
 * Click on Navigation Menu options
 * @param {*} menuName 
 */
  async clickMenuItem(menuName) {
    const menuItem = this.page.getByRole('menuitem', { name: menuName, exact: false });
    await menuItem.click();
    console.log(`Clicked menu item: "${menuName}"`);
  }


 /**
  * Verify Navigation Menu
  */ 
async verifyNaviagtionMenuItems() {
    const results = [];

    const count = await this.allMenuItems.count();
    console.log(`\Total menu items found: ${count}`);

    for (let i = 0; i < count; i++) {
      const menuItem = this.allMenuItems.nth(i);
      const menuText = (await menuItem.textContent()).trim();
       console.log(`Checking menu item: "${menuText}"`);
       const isVisible = await menuItem.isVisible();
       console.log(`"${menuText}"  is Visible  : ${isVisible ? 'Yes' : 'No'}`);
    }
}
/**
 * 
 * @returns Page tile
 */
async getTitle() {
    return this.page.title();
  }

}export { HomePage };