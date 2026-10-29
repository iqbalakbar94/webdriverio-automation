import { HeaderComponent } from '../components/header.component'
import { SidebarComponent } from '../components/sidebar.component'
import { FooterComponent } from '../components/footer.component'

export interface CheckoutStepOneData {
    firstName: string
    lastName: string
    postalCode: string
}

class CheckoutStepOnePage {
    public header = new HeaderComponent
    public sidebar = new SidebarComponent
    public footer = new FooterComponent

    public get titleCheckoutStepOneLabel() { return $('[data-test="title"]') }
    public get firstNameInput() { return $('[data-test="firstName"]') }
    public get lastNameInput() { return $('[data-test="lastName"]') }
    public get postalCodeInput() { return $('[data-test="postalCode"]') }
    public get cancelButton() { return $('[data-test="cancel"]') }
    public get continueButton() { return $('[data-test="continue"]') }
    public get errorMessageLabel() { return $('[data-test="error"]') }

    public async fillCheckoutStepOne(data: CheckoutStepOneData) {
        await this.firstNameInput.setValue(data.firstName)
        await this.lastNameInput.setValue(data.lastName)
        await this.postalCodeInput.setValue(data.postalCode)
    }

    public async clickCancelButton() {
        await this.cancelButton.waitForClickable()
        await this.cancelButton.click()
    }
    public async clickContinueButton() {
        await this.continueButton.waitForClickable()
        await this.continueButton.click()
    }
}

export default new CheckoutStepOnePage