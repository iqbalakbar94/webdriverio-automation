import { HeaderComponent } from '../components/header.component'
import { SidebarComponent } from '../components/sidebar.component'
import { FooterComponent } from '../components/footer.component'

class InventoryItem {
    public header = new HeaderComponent
    public sidebar = new SidebarComponent
    public footer = new FooterComponent

    public get productNameLabel() { return $('[data-test="inventory-item-name"]') }
    public get productDescLabel() { return $('[data-test="inventory-item-desc"]') }
    public get productImage() { return $('img[data-test$="-img"]') }
    public get productPriceLabel() { return $('[data-test="inventory-item-price"]') }
    public get addToCartButton() { return $('[data-test="add-to-cart"]') }
    public get removeFromCartButton() { return $('[data-test="remove"]') }
    public get backToProductsButton() { return $('[data-test="back-to-products"]') }

    public async clickAddToCartButton() {
        await this.addToCartButton.click()
    }
    public async clickRemoveFromCartButton() {
        await this.removeFromCartButton.click()
    }
    public async clickBackToProductsButton() {
        await this.backToProductsButton.click()
    }
}
export default new InventoryItem