import LoginPage, { LoginData } from '../../../pageobjects/mobile/wdio-demo/login.page'

describe('WDIO Demo App - Mobile Native Login Tests', () => {
  let loginFixtures: Record<string, LoginData>

  before(async () => {
    const fixtureData = await import(`../../../fixtures/${process.env.ENV_NAME}/mobile/wdio-demo/login.json`)
    loginFixtures = fixtureData || fixtureData.default
  })

  beforeEach(async () => {
    await LoginPage.navigateToLoginMenu()
  })

  describe('Positive Case - Login', () => {
    it('TC-LWD-001 : [Positive] Valid Login Default', async () => {
      await LoginPage.login(loginFixtures.validUserDefault)

      await expect(LoginPage.alertTitle).toBeDisplayed()
      await expect(LoginPage.alertTitle).toHaveText('Success')

      await LoginPage.dismissSuccessAlert()
    })

    it('TC-LWD-002 : [Positive] Valid Login Custom', async () => {
      await LoginPage.login(loginFixtures.validUserCustom)

      await expect(LoginPage.alertTitle).toBeDisplayed()
      await expect(LoginPage.alertTitle).toHaveText('Success')

      await LoginPage.dismissSuccessAlert()
    })

    it('TC : [Positive] Valid signup', async () => {
      await LoginPage.login(loginFixtures.validUserDefault)

    })
  })

  describe('Negative Case - Login', () => {
    it('TC-LWD-003 : [Negative] Email Kosong', async () => {
      const invalidLoginData: LoginData = {
        ...loginFixtures.validUserDefault,
        email: ''
      }
      await LoginPage.login(invalidLoginData)

      await expect(LoginPage.errorEmail).toHaveText('Please enter a valid email address')
      await expect(LoginPage.errorPassword).not.toBeDisplayed()
    })

    it('TC-LWD-004 : [Negative] Password Kosong', async () => {
      const invalidLoginData: LoginData = {
        ...loginFixtures.validUserDefault,
        password: ''
      }
      await LoginPage.login(invalidLoginData)
      await expect(LoginPage.errorPassword).toHaveText('Please enter at least 8 characters')
      await expect(LoginPage.errorEmail).not.toBeDisplayed()
    })

    it('TC-LWD-005 : [Negative] Email dan Password Kosong', async () => {
      const invalidLoginData: LoginData = {
        email: '',
        password: ''
      }
      await LoginPage.login(invalidLoginData)
      await expect(LoginPage.errorEmail).toHaveText('Please enter a valid email address')
      await expect(LoginPage.errorPassword).toHaveText('Please enter at least 8 characters')
    })
  })
})