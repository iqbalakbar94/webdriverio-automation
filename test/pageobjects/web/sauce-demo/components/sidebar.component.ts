export class SidebarComponent {
    public get allItemsSidebarLink() { return $('[data-test="inventory-sidebar-link"]') }
    public get dynamicCatalogSidebarLink() { return $('[data-test="dynamic-catalog-sidebar-link"]') }
    public get lazyLoadSidebarLink() { return $('[data-test="dynamic-catalog-lazy-load-link"]') }
    public get spinnerSidebarLink() { return $('[data-test="dynamic-catalog-spinner-link"]') }
    public get sliderSidebarLink() { return $('[data-test="dynamic-catalog-slider-link"]') }
    public get aboutSidebarLink() { return $('data-test="about-sidebar-link"') }
    public get logoutSidebarLink() { return $('[data-test="logout-sidebar-link"]') }
    public get resetAppStateSidebarLink() { return $('[data-test="reset-sidebar-link"]') }

    public async clickAllItemsSidebarLink() {
        await this.allItemsSidebarLink.waitForClickable()
        await this.allItemsSidebarLink.click()
    }
    public async clickDynamicCatalogSidebarLink() {
        await this.dynamicCatalogSidebarLink.waitForClickable()
        await this.dynamicCatalogSidebarLink.click()
    }
    public async clickLazyLoadSidebarLink() {
        await this.lazyLoadSidebarLink.waitForClickable()
        await this.lazyLoadSidebarLink.click()
    }
    public async clickSpinnerSidebarLink() {
        await this.spinnerSidebarLink.waitForClickable()
        await this.spinnerSidebarLink.click()
    }
    public async clickSliderSidebarLink() {
        await this.sliderSidebarLink.waitForClickable()
        await this.sliderSidebarLink.click()
    }
    public async clickAboutSidebarLink() {
        await this.aboutSidebarLink.waitForClickable()
        await this.aboutSidebarLink.click()
    }
    public async clickLogoutSidebarLink() {
        await this.logoutSidebarLink.waitForClickable()
        await this.logoutSidebarLink.click()
    }
    public async clickResetAppStateSidebarLink() {
        await this.resetAppStateSidebarLink.waitForClickable()
        await this.resetAppStateSidebarLink.click()
    }
}