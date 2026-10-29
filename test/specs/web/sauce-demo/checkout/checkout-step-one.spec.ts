import { LoginData } from '../../../../pageobjects/web/sauce-demo/auth/login.page'
import { AuthService } from '../../../../services/web/sauce-demo/auth.service'
import { GenerateRandomValueUtils } from '../../../../utils/generate-random-value'
import InventoryPage from '../../../../pageobjects/web/sauce-demo/product/inventory.page'
import CartPage from '../../../../pageobjects/web/sauce-demo/checkout/cart.page'
import CheckoutStepOne from '../../../../pageobjects/web/sauce-demo/checkout/checkout-step-one.page'

describe('Scenario Test - Checkout Step One Page', () => {
    let checkoutStepOneFixtures: any
    let loginFixtures: Record<string, LoginData>

    before(async () => {
        const fixtureData = await import(`../../../../fixtures/${process.env.ENV_NAME}/web/sauce-demo/checkout-step-one.json`)
        checkoutStepOneFixtures = fixtureData || fixtureData.default

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
        it('TC-SCO-001 : [Positive] Tampilan Checkout Step One Page', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))
            await expect(CheckoutStepOne.header.titleLabel).toHaveText('Swag Labs')
            await expect(CheckoutStepOne.header.sidebarMenuButton).toBeDisplayed()
            await expect(CheckoutStepOne.header.shoppingCartLink).toBeDisplayed()
            await expect(CheckoutStepOne.header.shoppingCartBadgeLabel).toHaveText('1')
            await expect(CheckoutStepOne.titleCheckoutStepOneLabel).toHaveText('Checkout: Your Information')
            await expect(CheckoutStepOne.firstNameInput).toHaveAttribute('placeholder', 'First Name')
            await expect(CheckoutStepOne.lastNameInput).toHaveAttribute('placeholder', 'Last Name')
            await expect(CheckoutStepOne.postalCodeInput).toHaveAttribute('placeholder', 'Zip/Postal Code')
            await expect(CheckoutStepOne.cancelButton).toBeDisplayed()
            await expect(CheckoutStepOne.continueButton).toBeDisplayed()
            await expect(CheckoutStepOne.footer.socialXLink).toBeDisplayed()
            await expect(CheckoutStepOne.footer.socialFacebookLink).toBeDisplayed()
            await expect(CheckoutStepOne.footer.socialLinkedInLink).toBeDisplayed()
            await expect(CheckoutStepOne.footer.footerLabel).toHaveText('© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
        })

        it('TC-SCO-002 : [Positive] Checkout Step One dengan data customer valid', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))

            const validCheckoutStepOneData = {
                ...checkoutStepOneFixtures.validData,
                firstName: GenerateRandomValueUtils.getFirstNameValue(),
                lastName: GenerateRandomValueUtils.getLastNameValue(),
                postalCode: GenerateRandomValueUtils.getPostalCodeValue()
            }
            await CheckoutStepOne.fillCheckoutStepOne(validCheckoutStepOneData)
            await CheckoutStepOne.clickContinueButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-two.html'))
        })

        it('TC-SCO-007 : [Positive] Batalkan proses Checkout Step One', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))

            const validCheckoutStepOneData = checkoutStepOneFixtures.validData
            await CheckoutStepOne.fillCheckoutStepOne(validCheckoutStepOneData)
            await CheckoutStepOne.clickCancelButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/cart.html'))
        })
    })

    describe('Negative Case', () => {
        it('TC-SCO-003 : [Negative] Kosongkan field First Name', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))

            const invalidCheckoutStepOneData = {
                ...checkoutStepOneFixtures.validData,
                firstName: ''
            }
            await CheckoutStepOne.fillCheckoutStepOne(invalidCheckoutStepOneData)
            await CheckoutStepOne.clickContinueButton()
            await expect(CheckoutStepOne.errorMessageLabel).toHaveText('Error: First Name is required')
        })

        it('TC-SCO-004 : [Negative] Kosongkan field Last Name', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))

            const invalidCheckoutStepOneData = {
                ...checkoutStepOneFixtures.validData,
                lastName: ''
            }
            await CheckoutStepOne.fillCheckoutStepOne(invalidCheckoutStepOneData)
            await CheckoutStepOne.clickContinueButton()
            await expect(CheckoutStepOne.errorMessageLabel).toHaveText('Error: Last Name is required')
        })

        it('TC-SCO-005 : [Negative] Kosongkan field Zip / Postal Code', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))

            const invalidCheckoutStepOneData = {
                ...checkoutStepOneFixtures.validData,
                postalCode: ''
            }
            await CheckoutStepOne.fillCheckoutStepOne(invalidCheckoutStepOneData)
            await CheckoutStepOne.clickContinueButton()
            await expect(CheckoutStepOne.errorMessageLabel).toHaveText('Error: Postal Code is required')
        })

        it('TC-SCO-006 : [Negative] Kosongkan semua field', async () => {
            await InventoryPage.clickAddToCartButton(0)
            await InventoryPage.header.clickShoppingCartLink()
            await CartPage.clickCheckoutButton()
            await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-one.html'))

            const invalidCheckoutStepOneData = {
                ...checkoutStepOneFixtures.validData,
                firstName: '',
                lastName: '',
                postalCode: ''
            }
            await CheckoutStepOne.fillCheckoutStepOne(invalidCheckoutStepOneData)
            await CheckoutStepOne.clickContinueButton()
            await expect(CheckoutStepOne.errorMessageLabel).toHaveText('Error: First Name is required')
        })
    })
})