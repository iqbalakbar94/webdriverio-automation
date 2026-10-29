import { LoginData } from '../../../../pageobjects/web/sauce-demo/auth/login.page'
import { AuthService } from '../../../../services/web/sauce-demo/auth.service'
import InventoryPage from '../../../../pageobjects/web/sauce-demo/product/inventory.page'

describe('Scenario Test - Sauce Demo - Inventory Page', () => {
    let inventoryFixtures: any
    let loginFixtures: Record<string, LoginData>

    before(async () => {
        const fixtureData = await import(`../../../../fixtures/${process.env.ENV_NAME}/web/sauce-demo/inventory.json`)
        inventoryFixtures = fixtureData || fixtureData.default

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

    describe('Scenario Test - Positive Case', () => {
        it('TC-SIN-001 - [Positive] Tampilan page Inventory', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
            await expect(InventoryPage.header.titleLabel).toHaveText('Swag Labs')
            await expect(InventoryPage.header.sidebarMenuButton).toBeDisplayed()
            await expect(InventoryPage.header.shoppingCartLink).toBeDisplayed()
            await expect(InventoryPage.sortProductSelect).toBeDisplayed()
            await expect(await InventoryPage.inventoryItems).toHaveLength(6)
            await expect(InventoryPage.productNamesLabel).toBeDisplayed()
            await expect(InventoryPage.productDescLabel).toBeDisplayed()
            await expect(InventoryPage.productImages).toBeDisplayed()
            await expect(InventoryPage.productPricesLabel).toBeDisplayed()
            await expect(InventoryPage.addToCartButton).toBeDisplayed()
        })

        it('TC-SIN-002 - [Positive] Sort product berdasarkan nama product (ascending)', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

            const sortProductByNameAsc = inventoryFixtures.sortProduct.sortByNameAsc
            await InventoryPage.selectSortProductByValue(sortProductByNameAsc)

            const actualProductNamesLabel = await InventoryPage.getAllProductNamesLabel()
            const expectedProductNames = [...actualProductNamesLabel].sort((a, b) => a.localeCompare(b))
            expect(actualProductNamesLabel).toEqual(expectedProductNames)
        })

        it('TC-SIN-003 - [Positive] Sort product berdasarkan nama product (descending)', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

            const sortProductByNameDesc = inventoryFixtures.sortProduct.sortByNameDesc
            await InventoryPage.selectSortProductByValue(sortProductByNameDesc)

            const actualProductNamesLabel = await InventoryPage.getAllProductNamesLabel()
            const expectedProductNames = [...actualProductNamesLabel].sort((a, b) => b.localeCompare(a))
            expect(actualProductNamesLabel).toEqual(expectedProductNames)
        })

        it('TC-SIN-004 - [Positive] Sort product berdasarkan harga product (ascending)', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

            const sortProductByPriceAsc = inventoryFixtures.sortProduct.sortByPriceAsc
            await InventoryPage.selectSortProductByValue(sortProductByPriceAsc)

            const actualProductPricesLabel = await InventoryPage.getAllProductPrices()
            const expectedProductPrices = [...actualProductPricesLabel].sort((a, b) => a - b)
            expect(actualProductPricesLabel).toEqual(expectedProductPrices)
        })

        it('TC-SIN-005 - [Positive] Sort product berdasarkan harga product (descending)', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

            const sortProductByPriceDesc = inventoryFixtures.sortProduct.sortByPriceDesc
            await InventoryPage.selectSortProductByValue(sortProductByPriceDesc)

            const actualProductPricesLabel = await InventoryPage.getAllProductPrices()
            const expectedProductPrices = [...actualProductPricesLabel].sort((a, b) => b - a)
            expect(actualProductPricesLabel).toEqual(expectedProductPrices)
        })

        it('TC-SIN-006 - [Positive] Menambahkan 1 product ke keranjang', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

            await InventoryPage.clickAddToCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('1')
        })

        it('TC-SIN-007 - [Positive] Menambahkan 2 product ke keranjang', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

            await InventoryPage.clickAddToCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('1')

            await InventoryPage.clickAddToCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('2')
        })

        it('TC-SIN-008 - [Positive] Menghapus 1 dari 2 product yang sudah ada di keranjang', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

            await InventoryPage.clickAddToCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('1')

            await InventoryPage.clickAddToCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('2')

            await InventoryPage.clickRemoveFromCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('1')
        })

        it('TC-SIN-009 - [Positive] Menghapus semua product yang sudah ada di keranjang', async () => {
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))

            await InventoryPage.clickAddToCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('1')

            await InventoryPage.clickAddToCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('2')

            await InventoryPage.clickRemoveFromCartButton(1)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).toHaveText('1')

            await InventoryPage.clickRemoveFromCartButton(0)
            await expect(InventoryPage.header.shoppingCartBadgeLabel).not.toBeExisting()
        })
    })
})