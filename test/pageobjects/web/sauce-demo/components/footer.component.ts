import { $ } from '@wdio/globals'

export class FooterComponent {
    public get socialXLink() { return $('[data-test="social-x"]') }
    public get socialFacebookLink() { return $('[data-test="social-facebook"]') }
    public get socialLinkedInLink() { return $('[data-test="social-linkedin"]') }
    public get footerLabel() { return $('[data-test="footer-copy"]') }

    public async clickSocialXLink() {
        await this.socialXLink.waitForClickable()
        await this.socialXLink.click()
    }
    public async clickSocialFacebookLink() {
        await this.socialFacebookLink.waitForClickable()
        await this.socialFacebookLink.click()
    }
    public async clickSocialLinkedInLink() {
        await this.socialLinkedInLink.waitForClickable()
        await this.socialLinkedInLink.click()
    }
}