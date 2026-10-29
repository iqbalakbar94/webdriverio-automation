import { HeaderComponent } from '../components/header.component'
import { SidebarComponent } from '../components/sidebar.component'
import { FooterComponent } from '../components/footer.component'

class InventoryPage {
    public header = new HeaderComponent
    public sidebar = new SidebarComponent
    public footer = new FooterComponent

    public get sortProductSelect() { return $('[data-test="product-sort-container"]') }
    public get inventoryItems() { return $$('[data-test="inventory-item"]') }
    public get productNamesLink() { return $$('[data-test$="-title-link"]') }
    public get productNamesLabel() { return $$('[data-test="inventory-item-name"]') }
    public get productDescLabel() { return $$('[data-test="inventory-item-desc"]') }
    public get productImages() { return $$('img[data-test$="img"]') }
    public get productImagesLink() { return $$('a[data-test$="-img-link"]') }
    public get productPricesLabel() { return $$('[data-test="inventory-item-price"]') }
    public get addToCartButton() { return $$('button[data-test^="add-to-cart-"]') }
    public get removeFromCartButton() { return $$('button[data-test^="remove-"]') }

    public async selectSortProductByValue(optionValue: string): Promise<void> {
        await this.sortProductSelect.waitForDisplayed()
        await this.sortProductSelect.click()
        await this.sortProductSelect.selectByAttribute('value', optionValue)
    }

    public async getAllProductNamesLink(): Promise<string[]> {
        const productNameLinkElements = await this.productNamesLink
        return productNameLinkElements.map(el => el.getText())
    }

    public async getAllProductNamesLabel(): Promise<string[]> {
        const productNameLabelElements = await this.productNamesLabel
        return productNameLabelElements.map(el => el.getText())
    }

    public async getAllProductDescLabel(): Promise<string[]> {
        const productDescElements = await this.productDescLabel
        return productDescElements.map(el => el.getText())
    }

    public async getAllProductImages(): Promise<any> {
        const productImageElements = await this.productImages
        return productImageElements.map(el => el.getAttribute('src'))
    }

    public async getAllProductPricesLabel(): Promise<string[]> {
        const productPriceElements = await this.productPricesLabel
        return productPriceElements.map(el => el.getText())
    }

    public async getAllProductPrices(): Promise<number[]> {
        const productPriceElements = await this.productPricesLabel
        const priceTexts = await productPriceElements.map(el => el.getText())
        return priceTexts.map(el => parseFloat(el.replace('$', '')))
    }

    public async clickAddToCartButton(index: number = 0): Promise<void> {
        const addToCartElements = await this.addToCartButton
        await addToCartElements[index].click()
    }

    public async clickRemoveFromCartButton(index: number = 0): Promise<void> {
        const removeFromCartElements = await this.removeFromCartButton
        await removeFromCartElements[index].click()
    }

    public async clickProductNamesLink(index: number = 0): Promise<void> {
        const productNameSelected = await this.productNamesLink
        await productNameSelected[index].click()
    }

    public async clickProductImagesLink(index: number = 0) {
        const productImageLinkSelected = await this.productImagesLink
        await productImageLinkSelected[index].click()
    }
}

export default new InventoryPage()