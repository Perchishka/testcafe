import {t, Selector } from 'testcafe';
import {RegistrationPage} from "./RegistartionPage.ja";
import {urls} from "../../config/Urls";


class LoginPage{
    constructor(){
        this.registerButton = Selector('a[href="/new-account"]');
        this.title = Selector ('title');
        this.accountCreatedAlert = Selector('div').withText('Your account has been created, you can now login here')
    }

    async goTo() {
        await t.navigateTo(urls.bettyBlocks);
    }

    async clickRegisterButton(){
        await t.click(this.registerButton());
        return new RegistrationPage();
    }

    async getTitle(){
        return await this.title.innerText;
    }
}

export { LoginPage };