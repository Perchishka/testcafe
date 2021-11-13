import {t, Selector} from 'testcafe';
import {LoginPage} from "./LoginPage";


class RegistrationPage {

    constructor() {
        this.createAccountButton = Selector('[type="submit"]');
    }

    async clickCreateAccountButton() {
        await t.click(this.createAccountButton);
        return new LoginPage();
    }
}

export {RegistrationPage};