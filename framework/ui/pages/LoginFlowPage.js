import {Selector} from 'testcafe';


class LoginFlowPage {
    constructor() {
        this.welcomeHeader = Selector('div>h3');
        this.pageHeaderTitle = Selector('.MuiToolbar-root h6');
    }

    async getWelcomeHeader() {
        return await this.welcomeHeader.innerText;
    }

    async getPageHeaderTitle() {
        return await this.pageHeaderTitle.innerText;
    }
}

export {LoginFlowPage};