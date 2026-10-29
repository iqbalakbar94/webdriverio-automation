import { LoginData } from '../../../../pageobjects/web/sauce-demo/auth/login.page'
import { AuthService } from '../../../../services/web/sauce-demo/auth.service'
import InventoryPage from '../../../../pageobjects/web/sauce-demo/product/inventory.page'
import CartPage from '../../../../pageobjects/web/sauce-demo/checkout/cart.page'
import CheckoutStepOnePage from '../../../../pageobjects/web/sauce-demo/checkout/checkout-step-one.page'
import CheckoutStepTwoPage from '../../../../pageobjects/web/sauce-demo/checkout/checkout-step-two.page'
import CheckoutCompletePage from '../../../../pageobjects/web/sauce-demo/checkout/checkout-complete.page'

describe('Scenario Test - Checkout Complete Page', () => {
    let loginFixtures: Record<string, LoginData>
    let checkoutStepOneFixtures: any
    before(async () => {
        const FixtureLoginData = await import(`../../../../fixtures/${process.env.ENV_NAME}/web/sauce-demo/login.json`)
        loginFixtures = FixtureLoginData || FixtureLoginData.default

        const FixtureCheckoutStepOne = await import(`../../../../fixtures/${process.env.ENV_NAME}/web/sauce-demo/checkout-step-one.json`)
        checkoutStepOneFixtures = FixtureCheckoutStepOne || FixtureCheckoutStepOne.default
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
        it('TC-SCC-001 : [Positive] Tampilan Checkout Complete', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await CheckoutStepOnePage.fillCheckoutStepOne(checkoutStepOneFixtures.validData)
            await CheckoutStepOnePage.clickContinueButton()
            await CheckoutStepTwoPage.clickFinishButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-complete.html'))
            await expect(CheckoutCompletePage.header.titleLabel).toHaveText('Swag Labs')
            await expect(CheckoutCompletePage.header.shoppingCartLink).toBeDisplayed()
            await expect(CheckoutCompletePage.header.sidebarMenuButton).toBeDisplayed()
            await expect(CheckoutCompletePage.titleLabel).toHaveText('Checkout: Complete!')
            await expect(CheckoutCompletePage.completeHeaderLabel).toHaveText('Thank you for your order!')
            await expect(CheckoutCompletePage.completeTextLabel).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
            await expect(CheckoutCompletePage.backHomeButton).toBeDisplayed()
            await expect(CheckoutCompletePage.generatePdfOrderButton).toBeDisplayed()
            await expect(CheckoutCompletePage.footer.socialXLink).toBeDisplayed()
            await expect(CheckoutCompletePage.footer.socialFacebookLink).toBeDisplayed()
            await expect(CheckoutCompletePage.footer.socialLinkedInLink).toBeDisplayed()
            await expect(CheckoutCompletePage.footer.footerLabel).toHaveText('© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
        })

        it('TC-SCC-002 : [Positive] Generate PDF Order', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await CheckoutStepOnePage.fillCheckoutStepOne(checkoutStepOneFixtures.validData)
            await CheckoutStepOnePage.clickContinueButton()
            await CheckoutStepTwoPage.clickFinishButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-complete.html'))
            await CheckoutCompletePage.clickGeneratePdfOrderButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-complete.html'))
        })

        it('TC-SCC-003 : [Positive] Kembali ke Inventory Page', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await CheckoutStepOnePage.fillCheckoutStepOne(checkoutStepOneFixtures.validData)
            await CheckoutStepOnePage.clickContinueButton()
            await CheckoutStepTwoPage.clickFinishButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-complete.html'))
            await CheckoutCompletePage.clickBackHomeButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
        })
    })
})