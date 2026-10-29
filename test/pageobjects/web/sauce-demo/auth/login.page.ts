export interface LoginData {
  username: string
  password: string
}

class LoginPage {
  public get titleLabel() { return $('.login_logo') }
  public get usernameInput() { return $('[data-test="username"]') }
  public get passwordInput() { return $('[data-test="password"]') }
  public get loginButton() { return $('[data-test="login-button"]') }
  public get closeErrorButton() { return $('[data-test="error-button"]') }
  public get errorMessageLabel() { return $('[data-test="error"]') }

  public async openApp(url: string = process.env.BASE_URL_SAUCEDEMO || ''): Promise<void> {
    await browser.url(url)
    await this.usernameInput.waitForDisplayed()
  }

  public async login(data: LoginData): Promise<void> {
    await this.usernameInput.setValue(data.username)
    await this.passwordInput.setValue(data.password)
    await this.loginButton.click()
  }

  public async clickCloseErrorButton() { await this.closeErrorButton.click() }
}

export default new LoginPage()