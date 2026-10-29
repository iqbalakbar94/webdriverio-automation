import LoginPage, { LoginData } from '../../../pageobjects/web/sauce-demo/auth/login.page'
import { HeaderComponent } from '../../../pageobjects/web/sauce-demo/components/header.component'
import { SidebarComponent } from '../../../pageobjects/web/sauce-demo/components/sidebar.component'

export class AuthService {
    private static header = new HeaderComponent()
    private static sidebar = new SidebarComponent()
    
    public static async login(data: LoginData) {
        await LoginPage.openApp()
        await LoginPage.login(data)
    }
    
    public static async logout() {
        await AuthService.header.clickSidebarMenuButton()
        await AuthService.sidebar.clickLogoutSidebarLink()
    }
}