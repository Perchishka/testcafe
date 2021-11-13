import {uiApp} from "../framework/ui";
import faker from 'faker';
import {credentials} from "../framework/config/Credentials";
import {t} from 'testcafe';

fixture
    .meta({TEST_RUN: 'regression'})
    ('Register a new account testSuite').beforeEach(async t => {
    await uiApp().LoginPage().goTo();
    t.ctx.firstName = faker.name.firstName();
    t.ctx.lastName = faker.name.lastName();
    t.ctx.email = faker.internet.email().toLowerCase();
    t.ctx.password = credentials.password;
    t.ctx.registrationPage = await uiApp().LoginPage().clickRegisterButton();
    t.ctx.inputFieldsFragments = await uiApp().InputFields();
})

test.meta({
    ID: '1',
    SEVERITY: 'blocker',
    STORY: 'STORY-1'
})('Successful registration', async () => {
    await t.ctx.inputFieldsFragments.fillFirstNameField(t.ctx.firstName);
    await t.ctx.inputFieldsFragments.fillLastNameField(t.ctx.lastName);
    await t.ctx.inputFieldsFragments.fillEmailField(t.ctx.email);
    await t.ctx.inputFieldsFragments.fillPasswordField(t.ctx.password);
    const redirectedLoginPage = await t.ctx.registrationPage.clickCreateAccountButton();
    await t.expect(redirectedLoginPage.accountCreatedAlert.exists).ok();
});

const validEmail = [
    {name: 'lowercase and capital leters in local part', email: 'Iri@mail.com'},
    {name: 'printable characters !#$%&\'*+-/=?^_`{|}~s in local part', email: 'iri_iri@mail.com'},
    {name: 'digits and dot in local part', email: 'abc.123@mail.com'},
    {name: 'top level domain in domain name', email: 'example@s.example'},
    {name: 'one letter local part', email: 'e@s.example'},
    {name: 'only capital letters in local part', email: 'ABC@s.example'},
]
validEmail.forEach(c => {
    test.meta({
        ID: '2',
        SEVERITY: 'normal',
        STORY: 'STORY-1'
    })(`Valid email address: ${c.name}`, async () => {
        await t.ctx.inputFieldsFragments.fillEmailField(c.email);
        await t.ctx.registrationPage.clickCreateAccountButton();
        await t.expect(await t.ctx.inputFieldsFragments.errorElementExist('email_address')).notOk();
    });
});

test.meta({
    ID: '3',
    SEVERITY: 'blocker',
    STORY: 'STORY-1'
})('All fields are empty', async () => {
    await t.ctx.registrationPage.clickCreateAccountButton();
    const errorMessage = 'This field is required';
    await t
        .expect(await t.ctx.inputFieldsFragments.getErrorMessagePassword())
        .eql(errorMessage)
        .expect(await t.ctx.inputFieldsFragments.getErrorMessageFirstName())
        .eql(errorMessage)
        .expect(await t.ctx.inputFieldsFragments.getErrorMessageLastName())
        .eql(errorMessage)
        .expect(await t.ctx.inputFieldsFragments.getErrorMessageEmail())
        .eql(errorMessage)
});

const invalidPassword = [
    {name: 'only capital letters', password: 'ABCDEFG12@'},
    {name: 'only lowercase letters', password: 'abcdefg12@'},
    {name: 'less than 8 symbols password', password: 'A1bFG'},
    {name: 'cyrillic symbols', password: 'ФывFввва1Ц%'},
    {name: 'without digits', password: 'Abcdefg@'},
]
invalidPassword.forEach(c => {
    test.meta({
        ID: '4',
        SEVERITY: 'normal',
        STORY: 'STORY-1'
    })(`Wrong password : ${c.name}`, async () => {
        await t.ctx.inputFieldsFragments.fillPasswordField(c.password);
        await t.ctx.registrationPage.clickCreateAccountButton();
        const errorMessage = await t.ctx.inputFieldsFragments.getErrorMessagePassword();
        await t
            .expect(errorMessage)
            .eql('Password must contain 8 characters, 1 lowercase character, 1 upper case character, and 1 digit');
    });
});

const invalidEmail = [
    {name: 'double dot in the middle of local part', email: 'John..Doe@example.com', error: 'Invalid value'},
    {name: 'quotes and double dot in local part', email: '"John..Doe"@example.com', error: 'No valid value provided'},
    {name: 'without @ symbol', email: 'email.com', error: 'No valid value provided'},
    {name: 'cyrillic symbols in local part', email: 'фыв@mail.com', error: 'No valid value provided'},
    {name: 'only digits in local part', email: '1111111111', error: 'No valid value provided'},
    {name: 'only special symbols in Local part', email: '!!!!!!!!!!!!', error: 'No valid value provided'},
    {name: 'dot in the beginning of local part', email: '.abcd@mail.com', error: 'No valid value provided'},
    {name: 'dot in the end of local part', email: 'abcd.@mail.com', error: 'No valid value provided'},
    {
        name: 'local part > 64 characters',
        email: '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
        error: 'No valid value provided'
    }
]
invalidEmail.forEach(c => {
    test.meta({
        ID: '5',
        SEVERITY: 'normal',
        STORY: 'STORY-1'
    })(`Wrong email : ${c.name}`, async () => {
        await t.ctx.inputFieldsFragments.fillEmailField(c.email);
        await t.ctx.registrationPage.clickCreateAccountButton();
        const errorMessage = await t.ctx.inputFieldsFragments.getErrorMessageEmail();
        await t
            .expect(errorMessage)
            .eql(c.error);
    });
});
