import { HeaderComponent } from '../components/header.component'
import { SidebarComponent } from '../components/sidebar.component'
import { FooterComponent } from '../components/footer.component'

class CheckoutStepTwoPage {
    public header = new HeaderComponent
    public sidebar = new SidebarComponent
    public footer = new FooterComponent

    public get titleLabel() { return $('[data-test="title"]') }
    public get productQuantityLabel() { return $$('[data-test="item-quantity"]') }
    public get productNamesLink() { return $$('[data-test$="title-link"]') }
    public get productNamesLabel() { return $$('[data-test="inventory-item-name"]') }
    public get productDescLabel() { return $$('[data-test="inventory-item-desc"]') }
    public get productPricesLabel() { return $$('[data-test="inventory-item-price"]') }
    public get paymentInfoLabel() { return $('[data-test="payment-info-label"]') }
    public get paymentInfoValueLabel() { return $('[data-test="payment-info-value"]') }
    public get shippingInfoLabel() { return $('[data-test="shipping-info-label"]') }
    public get shippingInfoValueLabel() { return $('[data-test="shipping-info-value"]') }
    public get priceTotalLabel() { return $('[data-test="total-info-label"]') }
    public get subTotalLabel() { return $('[data-test="subtotal-label"]') }
    public get taxLabel() { return $('[data-test="tax-label"]') }
    public get totalLabel() { return $('[data-test="total-label"]') }
    public get cancelButton() { return $('[data-test="cancel"]') }
    public get finishButton() { return $('[data-test="finish"]') }

    public async getAllProductPrices() {
        const productPriceElements = await this.productPricesLabel
        const priceTexts = await productPriceElements.map(el => el.getText())
        return priceTexts.map(el => parseFloat(el.replace('$', '')))
    }

    public async clickCancelButton() {
        await this.cancelButton.waitForClickable()
        await this.cancelButton.click()
    }

    public async clickFinishButton() {
        await this.finishButton.waitForClickable()
        await this.finishButton.click()
    }
}

export default new CheckoutStepTwoPage