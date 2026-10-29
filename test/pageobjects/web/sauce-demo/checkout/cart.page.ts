import { HeaderComponent } from '../components/header.component'
import { SidebarComponent } from '../components/sidebar.component'
import { FooterComponent } from '../components/footer.component'

class CartPage {
    header = new HeaderComponent
    sidebar = new SidebarComponent
    footer = new FooterComponent

    public get productQuantityLabel() { return $$('[data-test="item-quantity"]') }
    public get productNamesLink() { return $$('[data-test$="-title-link"]') }
    public get productNamesLabel() { return $$('[data-test="inventory-item-name"]') }
    public get productDescLabel() { return $$('[data-test="inventory-item-desc"]') }
    public get productPricesLabel() { return $$('[data-test="inventory-item-price"]') }
    public get removeFromCartButton() { return $$('[data-test^="remove-"]') }
    public get continueShoppingButton() { return $('[data-test="continue-shopping"]') }
    public get checkoutButton() { return $('[data-test="checkout"]') }

    public async getAllProductNamesLabel() {
        const productNameElements = await this.productNamesLabel
        return productNameElements.map(el => el.getText())
    }

    public async getAllProductDescLabel() {
        const productDescElements = await this.productDescLabel
        return productDescElements.map(el => el.getText())
    }

    public async getAllProductPricesLabel() {
        const productPriceElements = await this.productPricesLabel
        return productPriceElements.map(el => el.getText())
    }

    public async getAllProductPrices() {
        const productPriceElements = await this.productPricesLabel
        const priceTexts = await productPriceElements.map(el => el.getText())
        return priceTexts.map(el => parseFloat(el.replace('$', '')))
    }

    public async clickRemoveFromCartButton(index: number = 0): Promise<void> {
        await this.removeFromCartButton[index].click()
    }
    public async clickContinueShoppingButton() {
        await this.continueShoppingButton.waitForClickable()
        await this.continueShoppingButton.click()
    }

    public async clickCheckoutButton() {
        await this.checkoutButton.click()
    }
}

export default new CartPage