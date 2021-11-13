import {Selector, t} from "testcafe";
import {UiHelper} from "../../../lib/UiHelper";


class InputFieldsFragments {
    constructor() {
        this.inputField = (inputField) => Selector(`input[name="${inputField}"]`);
        this.errorMessage = (inputField) => Selector(`input[name="${inputField}"]`).parent(0).sibling('p');

    }

    async fillFirstNameField(firstName) {
        await t.typeText(this.inputField('first_name'), firstName);
    }

    async errorElementExist(fieldName) {
        const selector = await this.errorMessage(fieldName);
        return await UiHelper.isElementExist(selector);
    }

    async getPasswordFieldAttribute(attribute) {
        return await this.inputField('password').getAttribute(attribute);
    }

    async fillLastNameField(lastName) {
        await t.typeText(this.inputField('last_name'), lastName);
    }

    async fillEmailField(email) {
        await t.typeText(this.inputField('email_address'), email);
    }

    async fillPasswordField(password) {
        await t.typeText(this.inputField('password'), password);
    }

    async getErrorMessageText(field) {
        return await this.errorMessage(field).innerText;
    }

    async getErrorMessagePassword() {
        return await this.getErrorMessageText('password');
    }

    async getErrorMessageEmail() {
        return await this.getErrorMessageText('email_address');
    }

    async getErrorMessageFirstName() {
        return await this.getErrorMessageText('first_name');
    }

    async getErrorMessageLastName() {
        return await this.getErrorMessageText('last_name');
    }

}

export {InputFieldsFragments};