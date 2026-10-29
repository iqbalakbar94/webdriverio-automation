import { HeaderComponent } from '../components/header.component'
import { SidebarComponent } from '../components/sidebar.component'
import { FooterComponent } from '../components/footer.component'

class CheckoutCompletePage {
    public header = new HeaderComponent
    public sidebar = new SidebarComponent
    public footer = new FooterComponent

    public get titleLabel() { return $('[data-test="title"]') }
    public get completeHeaderLabel() { return $('[data-test="complete-header"]') }
    public get completeTextLabel() { return $('[data-test="complete-text"]') }
    public get backHomeButton() { return $('[data-test="back-to-products"]') }
    public get generatePdfOrderButton() { return $('[data-test="generate-pdf-order"]') }

    public async clickBackHomeButton() {
        await this.backHomeButton.waitForClickable()
        await this.backHomeButton.click()
    }

    public async clickGeneratePdfOrderButton() {
        await this.generatePdfOrderButton.waitForClickable()
        await this.generatePdfOrderButton.click()
    }
}

export default new CheckoutCompletePage