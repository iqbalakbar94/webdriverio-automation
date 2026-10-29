import { LoginData } from '../../../../pageobjects/web/sauce-demo/auth/login.page'
import { AuthService } from '../../../../services/web/sauce-demo/auth.service'
import InventoryPage from '../../../../pageobjects/web/sauce-demo/product/inventory.page'
import InventoryItemPage from '../../../../pageobjects/web/sauce-demo/product/inventory-item.page'
import inventoryPage from '../../../../pageobjects/web/sauce-demo/product/inventory.page'
import inventoryItemPage from '../../../../pageobjects/web/sauce-demo/product/inventory-item.page'

describe('Scenario Test - Sauce Demo - Inventory Item Page', () => {
    let loginFixtures: Record<string, LoginData>

    before(async () => {
        const fixtureLoginData = await import(`../../../../fixtures/${process.env.ENV_NAME}/web/sauce-demo/login.json`)
        loginFixtures = fixtureLoginData || fixtureLoginData.default
    })

    beforeEach(async () => {
        await AuthService.login(loginFixtures.standardUser)
        await browser.execute(() => {
            window.localStorage.clear()
            window.sessionStorage.clear()
        })
        await browser.refresh()
    })

    afterEach(async () => {
        await AuthService.logout()
    })

    describe('Positive Case', () => {
        it('TC-SII-001 - [Positive] Tampilan page Inventory Item', async () => {
            await InventoryPage.clickProductNamesLink(0)
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory-item.html'))
            await expect(InventoryItemPage.header.titleLabel).toHaveText('Swag Labs')
            await expect(InventoryItemPage.header.sidebarMenuButton).toBeDisplayed()
            await expect(InventoryItemPage.header.shoppingCartLink).toBeDisplayed()
            await expect(InventoryItemPage.productNameLabel).toBeDisplayed()
            await expect(InventoryItemPage.productDescLabel).toBeDisplayed()
            await expect(InventoryItemPage.productImage).toBeDisplayed()
            await expect(InventoryItemPage.productPriceLabel).toBeDisplayed()
            await expect(InventoryItemPage.addToCartButton).toBeDisplayed()
            await expect(InventoryItemPage.backToProductsButton).toBeDisplayed()
            await expect(InventoryItemPage.footer.socialXLink).toBeDisplayed()
            await expect(InventoryItemPage.footer.socialFacebookLink).toBeDisplayed()
            await expect(InventoryItemPage.footer.socialLinkedInLink).toBeDisplayed()
            await expect(InventoryItemPage.footer.footerLabel).toHaveText('© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
        })

        it('TC-SII-002 - [Positive] Masuk ke page Inventory Item melalui name link pada page Inventory', async () => {
            const actualProductNamesLabel = await InventoryPage.getAllProductNamesLabel()
            const actualProductDescLabel = await InventoryPage.getAllProductDescLabel()
            const actualProductImages = await InventoryPage.getAllProductImages()
            const actualProductPricesLabel = await InventoryPage.getAllProductPricesLabel()

            await InventoryPage.clickProductNamesLink(0)
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory-item.html'))
            await expect(InventoryItemPage.productNameLabel).toHaveText(actualProductNamesLabel[0])
            await expect(InventoryItemPage.productDescLabel).toHaveText(actualProductDescLabel[0])
            expect(await InventoryItemPage.productImage.getAttribute('src')).toEqual(actualProductImages[0])
            await expect(InventoryItemPage.productPriceLabel).toHaveText(actualProductPricesLabel[0])
            await expect(InventoryItemPage.addToCartButton).toBeDisplayed()
        })

        it('TC-SII-003 - [Positive] Masuk ke page Inventory Item melalui image link pada page Inventory', async () => {
            const actualProductNamesLabel = await inventoryPage.getAllProductNamesLabel()
            const actualProductDescLabel = await InventoryPage.getAllProductDescLabel()
            const actualProductImages = await InventoryPage.getAllProductImages()
            const actualProductPricesLabel = await InventoryPage.getAllProductPricesLabel()

            await InventoryPage.clickProductImagesLink(0)
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory-item.html'))
            await expect(inventoryItemPage.productNameLabel).toHaveText(actualProductNamesLabel[0])
            await expect(InventoryItemPage.productDescLabel).toHaveText(actualProductDescLabel[0])
            expect(await InventoryItemPage.productImage.getAttribute('src')).toEqual(actualProductImages[0])
            await expect(InventoryItemPage.productPriceLabel).toHaveText(actualProductPricesLabel[0])
            await expect(InventoryItemPage.addToCartButton).toBeDisplayed()
        })

        it('TC-SII-004 - [Positive] Masuk ke page Inventory Item dengan kondisi product tersebut sudah ada di keranjang', async () => {
            const actualProductNamesLabel = await InventoryPage.getAllProductNamesLabel()
            const actualProductDescLabel = await InventoryPage.getAllProductDescLabel()
            const actualProductImages = await InventoryPage.getAllProductImages()
            const actualProductPricesLabel = await InventoryPage.getAllProductPricesLabel()

            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.clickProductNamesLink(0)
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory-item.html'))
            await expect(InventoryItemPage.productNameLabel).toHaveText(actualProductNamesLabel[0])
            await expect(InventoryItemPage.productDescLabel).toHaveText(actualProductDescLabel[0])
            expect(await InventoryItemPage.productImage.getAttribute('src')).toEqual(actualProductImages[0])
            await expect(InventoryItemPage.productPriceLabel).toHaveText(actualProductPricesLabel[0])
            await expect(InventoryItemPage.addToCartButton).not.toBeDisplayed()
            await expect(InventoryItemPage.removeFromCartButton).toBeDisplayed()
            await expect(InventoryItemPage.header.shoppingCartBadgeLabel).toHaveText('1')
        })

        it('TC-SII-005 - [Positive] Menambahkan product ke keranjang dan menghapus product dari keranjang', async () => {
            await InventoryPage.clickProductNamesLink(0)
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory-item.html'))
            await expect(InventoryItemPage.addToCartButton).toBeDisplayed()

            await InventoryItemPage.clickAddToCartButton()
            await expect(InventoryItemPage.addToCartButton).not.toBeDisplayed()
            await expect(InventoryItemPage.removeFromCartButton).toBeDisplayed()
            await expect(InventoryItemPage.header.shoppingCartBadgeLabel).toHaveText('1')

            await InventoryItemPage.clickRemoveFromCartButton()
            await expect(InventoryItemPage.removeFromCartButton).not.toBeDisplayed()
            await expect(InventoryItemPage.addToCartButton).toBeDisplayed()
            await expect(InventoryItemPage.header.shoppingCartBadgeLabel).not.toBeExisting()
        })

        it('TC-SII-006 - [Positive] Kembali ke page inventory', async () => {
            await InventoryPage.clickProductNamesLink(0)
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory-item.html'))
            await expect(InventoryItemPage.backToProductsButton).toBeDisplayed()

            await InventoryItemPage.clickBackToProductsButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
        })
    })
})