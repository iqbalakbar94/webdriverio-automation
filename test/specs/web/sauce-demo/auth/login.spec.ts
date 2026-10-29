import LoginPage, { LoginData } from '../../../../pageobjects/web/sauce-demo/auth/login.page'
import { AuthService } from '../../../../services/web/sauce-demo/auth.service'

describe('Scenario Test - Sauce Demo - Login Page', () => {
  let loginFixtures: Record<string, LoginData>

  before(async () => {
    const fixtureData = await import(`../../../../fixtures/${process.env.ENV_NAME}/web/sauce-demo/login.json`)
    loginFixtures = fixtureData || fixtureData.default //JSON.parse(JSON.stringify(fixtureData))
  })

  beforeEach(async () => {
    await LoginPage.openApp()
  })

  describe('Positive Case', () => {
    it('TC-SLO-001 : [Positive] Tampilan page Login', async () => {
      await expect(browser).toHaveUrl(`${process.env.BASE_URL_SAUCEDEMO}`)
      await expect.soft(LoginPage.titleLabel).toHaveText('Swag Labs')
      await expect.soft(LoginPage.usernameInput).toHaveAttribute('placeholder', 'Username')
      await expect.soft(LoginPage.passwordInput).toHaveAttribute('placeholder', 'Password')
      await expect.soft(LoginPage.loginButton).toHaveAttribute('value', 'Login')
      expect.assertSoftFailures()
    })

    it('TC-SLO-002 : [Positive] Login valid dengan user standard_user', async () => {
      const validLoginData = loginFixtures.standardUser
      await LoginPage.login(validLoginData)

      await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
      await AuthService.logout()
    })

    it('TC-SLO-004 : [Positive] Login valid dengan user problem_user', async () => {
      const validLoginData = loginFixtures.problemUser
      await LoginPage.login(validLoginData)

      await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
      await AuthService.logout()
    })

    it('TC-SLO-005 : [Positive] Login valid dengan user performance_glitch_user', async () => {
      const validLoginData = loginFixtures.performanceGlitchUser
      await LoginPage.login(validLoginData)

      await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
      await AuthService.logout()
    })

    it('TC-SLO-006 : [Positive] Login valid dengan user error_user', async () => {
      const validLoginData = loginFixtures.errorUser
      await LoginPage.login(validLoginData)

      await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
      await AuthService.logout()
    })

    it('TC-SLO-007 : [Positive] Login valid dengan user visual_user', async () => {
      const validLoginData = loginFixtures.visualUser
      await LoginPage.login(validLoginData)

      await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'))
      await AuthService.logout()
    })
  })

  describe('Negative Case', () => {
    it('TC-SLO-003 : [Negative] Login valid dengan user locked_out_user', async () => {
      const invalidLoginData: LoginData = loginFixtures.lockedOutUser
      await LoginPage.login(invalidLoginData)

      await expect(LoginPage.errorMessageLabel).toHaveText('Epic sadface: Sorry, this user has been locked out.')
      await LoginPage.clickCloseErrorButton()
    })

    it('TC-SLO-008 : [Negative] Username tidak terdaftar', async () => {
      const invalidLoginData: LoginData = {
        ...loginFixtures.standardUser,
        username: 'invalidusername'
      }
      await LoginPage.login(invalidLoginData)

      await expect(LoginPage.errorMessageLabel).toHaveText('Epic sadface: Username and password do not match any user in this service')
      await LoginPage.clickCloseErrorButton()
    })

    it('TC-SLO-009 : [Negative] Password tidak sesuai', async () => {
      const invalidLoginData: LoginData = {
        ...loginFixtures.standardUser,
        password: 'invalidpassword'
      }
      await LoginPage.login(invalidLoginData)

      await expect(LoginPage.errorMessageLabel).toHaveText('Epic sadface: Username and password do not match any user in this service')
      await LoginPage.clickCloseErrorButton()
    })

    it('TC-SLO-010 : [Negative] Username kosong', async () => {
      const invalidLoginData: LoginData = {
        ...loginFixtures.standardUser,
        username: ''
      }
      await LoginPage.login(invalidLoginData)

      await expect(LoginPage.errorMessageLabel).toHaveText('Epic sadface: Username is required')
      await LoginPage.clickCloseErrorButton()
    })

    it('TC-SLO-011 : [Negative] Password Kosong', async () => {
      const invalidLoginData: LoginData = {
        ...loginFixtures.standardUser,
        password: ''
      }
      await LoginPage.login(invalidLoginData)

      await expect(LoginPage.errorMessageLabel).toHaveText('Epic sadface: Password is required')
      await LoginPage.clickCloseErrorButton()
    })

    it('TC-SLO-012 : [Negative] Username dan Password Kosong', async () => {
      const invalidLoginData: LoginData = {
        username: '',
        password: ''
      }
      await LoginPage.login(invalidLoginData)

      await expect(LoginPage.errorMessageLabel).toHaveText('Epic sadface: Username is required')
      await LoginPage.clickCloseErrorButton()
    })
  })
})