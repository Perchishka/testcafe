import {t, Selector} from 'testcafe';
import {RegistrationPage} from "./RegistartionPage.ja";
import {urls} from "../../config/Urls";
import {LoginFlowPage} from "./LoginFlowPage";


class LoginPage {
    constructor() {
        this.registerButton = Selector('a[href="/new-account"]');
        this.title = Selector('title');
        this.accountCreatedAlert = Selector('div').withText('Your account has been created, you can now login here');
        this.wrongCredentialsAlert = Selector('div').withText('You\'ve entered a wrong email address and/or password');
        this.loginButton = Selector('[type="submit"]');
        this.showPasswordButton = Selector('[type="button"]');
    }

    async goTo() {
        await t.navigateTo(urls.bettyBlocks);
    }

    async clickRegisterButton() {
        await t.click(this.registerButton());
        return new RegistrationPage();
    }

    async clickShowPasswordButton() {
        await t.click(this.showPasswordButton());
    }

    async getTitle() {
        return await this.title.innerText;
    }

    async clickLoginButton() {
        await t.click(this.loginButton());
        return new LoginFlowPage();
    }
}

export {LoginPage};