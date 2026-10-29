import { LoginData } from '../../../../pageobjects/web/sauce-demo/auth/login.page'
import { AuthService } from '../../../../services/web/sauce-demo/auth.service'
import InventoryPage from '../../../../pageobjects/web/sauce-demo/product/inventory.page'
import CartPage from '../../../../pageobjects/web/sauce-demo/checkout/cart.page'
import CheckoutStepOnePage from '../../../../pageobjects/web/sauce-demo/checkout/checkout-step-one.page'
import CheckoutStepTwoPage from '../../../../pageobjects/web/sauce-demo/checkout/checkout-step-two.page'

describe('Scenario Test - Checkout Step Two', () => {
  let loginFixtures: Record<string, LoginData>
  let checkoutStepOneFixtures: any

  before(async () => {
    const fixtureLoginData = await import(`../../../../fixtures/${process.env.ENV_NAME}/web/sauce-demo/login.json`)
    loginFixtures = fixtureLoginData || fixtureLoginData.default
    const fixtureCheckoutStepOne = await import(`../../../../fixtures/${process.env.ENV_NAME}/web/sauce-demo/checkout-step-one.json`)
    checkoutStepOneFixtures = fixtureCheckoutStepOne || fixtureCheckoutStepOne.default
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
    it('TC-SCT-001 : [Positive] Tampilan Checkout Step Two Page', async () => {
      const actualProductNamesLabel = await CartPage.getAllProductNamesLabel()
      const actualProductDescLabel = await CartPage.getAllProductDescLabel()
      const actualProductPricesLabel = await CartPage.getAllProductPricesLabel()
      await InventoryPage.clickAddToCartButton(5)
      await InventoryPage.clickAddToCartButton(4)
      await InventoryPage.clickAddToCartButton(3)
      await InventoryPage.clickAddToCartButton(2)
      await InventoryPage.clickAddToCartButton(1)
      await InventoryPage.clickAddToCartButton(0)
      await InventoryPage.header.clickShoppingCartLink()
      await CartPage.clickCheckoutButton()
      await CheckoutStepOnePage.fillCheckoutStepOne(checkoutStepOneFixtures.validData)
      await CheckoutStepOnePage.clickContinueButton()
      await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-two.html'))
      await expect(CheckoutStepTwoPage.header.titleLabel).toHaveText('Swag Labs')
      await expect(CheckoutStepTwoPage.header.shoppingCartLink).toBeDisplayed()
      await expect(CheckoutStepTwoPage.header.sidebarMenuButton).toBeDisplayed()
      await expect(CheckoutStepTwoPage.titleLabel).toHaveText('Checkout: Overview')
      await expect(CheckoutStepTwoPage.productQuantityLabel[0]).toHaveText('1')
      await expect(CheckoutStepTwoPage.productNamesLabel[0]).toHaveText(actualProductNamesLabel[5])
      await expect(CheckoutStepTwoPage.productNamesLabel[1]).toHaveText(actualProductNamesLabel[4])
      await expect(CheckoutStepTwoPage.productNamesLabel[2]).toHaveText(actualProductNamesLabel[3])
      await expect(CheckoutStepTwoPage.productNamesLabel[3]).toHaveText(actualProductNamesLabel[2])
      await expect(CheckoutStepTwoPage.productNamesLabel[4]).toHaveText(actualProductNamesLabel[1])
      await expect(CheckoutStepTwoPage.productNamesLabel[5]).toHaveText(actualProductNamesLabel[0])
      await expect(CheckoutStepTwoPage.productDescLabel[0]).toHaveText(actualProductDescLabel[5])
      await expect(CheckoutStepTwoPage.productDescLabel[1]).toHaveText(actualProductDescLabel[4])
      await expect(CheckoutStepTwoPage.productDescLabel[2]).toHaveText(actualProductDescLabel[3])
      await expect(CheckoutStepTwoPage.productDescLabel[3]).toHaveText(actualProductDescLabel[2])
      await expect(CheckoutStepTwoPage.productDescLabel[4]).toHaveText(actualProductDescLabel[1])
      await expect(CheckoutStepTwoPage.productDescLabel[5]).toHaveText(actualProductDescLabel[0])
      await expect(CheckoutStepTwoPage.productPricesLabel[0]).toHaveText(actualProductPricesLabel[5])
      await expect(CheckoutStepTwoPage.productPricesLabel[1]).toHaveText(actualProductPricesLabel[4])
      await expect(CheckoutStepTwoPage.productPricesLabel[2]).toHaveText(actualProductPricesLabel[3])
      await expect(CheckoutStepTwoPage.productPricesLabel[3]).toHaveText(actualProductPricesLabel[2])
      await expect(CheckoutStepTwoPage.productPricesLabel[4]).toHaveText(actualProductPricesLabel[1])
      await expect(CheckoutStepTwoPage.productPricesLabel[5]).toHaveText(actualProductPricesLabel[0])
      await expect(CheckoutStepTwoPage.paymentInfoLabel).toBeDisplayed()
      await expect(CheckoutStepTwoPage.paymentInfoValueLabel).toHaveText('SauceCard #31337')
      await expect(CheckoutStepTwoPage.shippingInfoLabel).toBeDisplayed()
      await expect(CheckoutStepTwoPage.shippingInfoValueLabel).toHaveText('Free Pony Express Delivery!')
      await expect(CheckoutStepTwoPage.priceTotalLabel).toBeDisplayed()

      const actualProductPrices = await CheckoutStepTwoPage.getAllProductPrices()
      let subTotalSum = 0
      for (const price of actualProductPrices) {
        subTotalSum += price
      }
      const expectedSubTotalNum = Number(subTotalSum.toFixed(2))
      const expectedSubTotalStr = expectedSubTotalNum.toFixed(2)
      const actualSubTotal = await CheckoutStepTwoPage.subTotalLabel.getText()
      await expect(actualSubTotal).toEqual(`Item total: $${expectedSubTotalStr}`)

      const expectedTaxNum = Number((expectedSubTotalNum * 0.08).toFixed(2))
      const expectedTaxStr = expectedTaxNum.toFixed(2)
      const actualTax = await CheckoutStepTwoPage.taxLabel.getText()
      await expect(actualTax).toEqual(`Tax: $${expectedTaxStr}`)

      const expectedTotalNum = Number((expectedSubTotalNum + expectedTaxNum).toFixed(2))
      const expectedTotalStr = expectedTotalNum.toFixed(2)
      const actualTotal = await CheckoutStepTwoPage.totalLabel.getText()
      await expect(actualTotal).toEqual(`Total: $${expectedTotalStr}`)

      await expect(CheckoutStepTwoPage.footer.socialXLink).toBeDisplayed()
      await expect(CheckoutStepTwoPage.footer.socialFacebookLink).toBeDisplayed()
      await expect(CheckoutStepTwoPage.footer.socialLinkedInLink).toBeDisplayed()
      await expect(CheckoutStepTwoPage.footer.footerLabel).toHaveText('© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
    })

    it('TC-SCT-002 : [Positive] Checkout Step Two', async () => {
      await InventoryPage.clickAddToCartButton(0)
      await InventoryPage.header.clickShoppingCartLink()
      await CartPage.clickCheckoutButton()
      await CheckoutStepOnePage.fillCheckoutStepOne(checkoutStepOneFixtures.validData)
      await CheckoutStepOnePage.clickContinueButton()
      await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-two.html'))
      await CheckoutStepTwoPage.clickFinishButton()
      await expect(browser).toHaveUrl(expect.stringContaining('/checkout-complete.html'))
    })

    it('TC-SCT-003 : [Positive] Batalkan proses Checkout Step Two', async () => {
      await InventoryPage.clickAddToCartButton(0)
      await InventoryPage.header.clickShoppingCartLink()
      await CartPage.clickCheckoutButton()
      await CheckoutStepOnePage.fillCheckoutStepOne(checkoutStepOneFixtures.validData)
      await CheckoutStepOnePage.clickContinueButton()
      await expect(browser).toHaveUrl(expect.stringContaining('/checkout-step-two.html'))
      await CheckoutStepTwoPage.clickCancelButton()
      await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
    })
  })
})