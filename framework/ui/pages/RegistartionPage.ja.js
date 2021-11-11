import {t, Selector } from 'testcafe';
import {LoginPage} from "./LoginPage";


class RegistrationPage {

    constructor(){
        this.inputField = (inputField) => Selector(`input[name="${inputField}"]`);
        this.createAccountButton = Selector('[type="submit"]');
        this.errorMessage = (inputField) => Selector(`input[name="${inputField}"]`).parent(0).sibling('p');

    }

    async clickCreateAccountButton(){
        await t.click(this.createAccountButton);
        return new LoginPage();
    }

    async fillFirstNameField(firstName){
        await  t.typeText(this.inputField('first_name'), firstName);

    }

    async fillLastNameField(lastName){
        await  t.typeText(this.inputField('last_name'), lastName);
    }

    async fillEmailField(email){
        await  t.typeText(this.inputField('email_address'), email);
    }

    async fillPasswordField(password){
        await  t.typeText(this.inputField('password'), password);
    }

    async getErrorMessage(field){
       return  await this.errorMessage(field).innerText;
    }

    async getErrorMessagePassword(){
        return  await this.getErrorMessage('password');
    }

    async getErrorMessageEmail(){
        return  await this.getErrorMessage('email_address');
    }

    async getErrorMessageFirstName(){
        return  await this.getErrorMessage('first_name');
    }
    async getErrorMessageLastName(){
        return  await this.getErrorMessage('last_name');
    }



}

export { RegistrationPage };