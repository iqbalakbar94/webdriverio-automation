import { $ } from '@wdio/globals'

export interface LoginData {
  email: string
  password: string
}

class LoginPage {
  public get navLoginPage() { return $('~Login') }
  public get loginContainerButton() { return $('~button-login-container') }
  public get signupContainerButton() { return $('~button-signup-container') }
  public get emailInput() { return $('~input-email') }
  public get passwordInput() { return $('~input-password') }
  public get repeatPasswordInput() { return $('~input-repeat-password') }
  public get loginButton() { return $('~button-LOGIN') }
  public get biometrixButton() { return $('~button-biometric') }
  public get signupButton() { return $('~button-SIGN UP') }

  public get emailErrorMessage() { return $('//android.widget.TextView[@text="Please enter a valid email address"]') }
  public get passwordErrorMessage() { return $('//android.widget.TextView[@text="Please enter at least 8 characters"]') }

  public get successAlertTitle() { return $('//*[@resource-id="android:id/alertTitle" or @text="Success"]') }
  public get successAlertBtn() { return $('//*[@resource-id="android:id/button1" or @text="OK"]') }

  public async navigateToLoginMenu(): Promise<void> {
    await this.navLoginPage.waitForDisplayed()
    await this.navLoginPage.click()
    await this.emailInput.waitForDisplayed()
  }

  public async login(data: LoginData): Promise<void> {
    if (data.email !== undefined) {
      await this.emailInput.setValue(data.email)
    }

    if (data.password !== undefined) {
      await this.passwordInput.setValue(data.password)
    }

    if (await driver.isKeyboardShown()) {
      await driver.hideKeyboard()
    }

    await this.loginButton.click()
  }

  public async signup(email: string, password: string, repeatPassword: string): Promise<void> {
    await this.emailInput.setValue(email)
    await this.passwordInput.setValue(password)
    await this.repeatPasswordInput.setValue(repeatPassword)
  }

  public async dismissSuccessAlert(): Promise<void> {
    try {
      if (await driver.isAlertOpen()) {
        await driver.acceptAlert()
        return
      }
    } catch (error) { }
    if (await this.successAlertBtn.isDisplayed()) {
      await this.successAlertBtn.click()
    }
  }

  // === Action Assertion ===
  public get errorEmail() { return this.emailErrorMessage }
  public get errorPassword() { return this.passwordErrorMessage }
  public get alertTitle() { return this.successAlertTitle }
}

export default new LoginPage()