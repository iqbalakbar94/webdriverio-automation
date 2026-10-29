export class HeaderComponent {
    public get titleLabel() { return $('.app_logo') }
    public get sidebarMenuButton() { return $('#react-burger-menu-btn') }
    public get shoppingCartLink() { return $('[data-test="shopping-cart-link"]') }
    public get shoppingCartBadgeLabel() { return $('[data-test="shopping-cart-badge"]') }

    public async clickSidebarMenuButton() {
        await this.sidebarMenuButton.waitForClickable()
        await this.sidebarMenuButton.click()
    }
    public async clickShoppingCartLink() {
        await this.shoppingCartLink.waitForClickable()
        await this.shoppingCartLink.click()
    }
}