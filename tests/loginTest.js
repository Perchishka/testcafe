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


})

test.meta({
    ID: '1',
    SEVERITY: 'blocker',
    STORY: 'STORY-1'
})('Successful registration', async () => {
    const registrationPage = await uiApp().LoginPage().clickRegisterButton();
    await registrationPage.fillFirstNameField(t.ctx.firstName);
    await registrationPage.fillLastNameField(t.ctx.lastName);
    await registrationPage.fillEmailField(t.ctx.email);
    await registrationPage.fillPasswordField(t.ctx.password);
    const redirectedLoginPage = await registrationPage.clickCreateAccountButton();
    await t.expect(redirectedLoginPage.accountCreatedAlert.exists).ok();

});

test.meta({
    ID: '2',
    SEVERITY: 'blocker',
    STORY: 'STORY-1'
})('All fields are empty', async () => {
    const registrationPage = await uiApp().LoginPage().clickRegisterButton();
    await registrationPage.clickCreateAccountButton();
    const errorMessage = 'This field is required';
    await t
        .expect(await registrationPage.getErrorMessagePassword())
        .eql(errorMessage)
        .expect(await registrationPage.getErrorMessageFirstName())
        .eql(errorMessage)
        .expect(await registrationPage.getErrorMessageLastName())
        .eql(errorMessage)
        .expect(await registrationPage.getErrorMessageEmail())
        .eql(errorMessage)

});


const invalidPassword = [
    {name: 'only capital letters', password: 'ABCDEFG12@'},
    {name: 'only lowercase letters', password: 'abcdefg12@'},
    {name: '3 symbols password', password: 'abc'},
    {name: 'cyrillic symbols', password: 'Фывввва1Ц%'},
    {name: 'only numbers', password: '1111111111'},
    {name: 'only special symbols', password: '!!!!!!!!!!!!'},
]
for (const c of invalidPassword) {
    test.meta({
        ID: '3',
        SEVERITY: 'blocker',
        STORY: 'STORY-1'
    })(`Wrong password : ${c.name}`, async () => {
        const registrationPage = await uiApp().LoginPage().clickRegisterButton();
        await registrationPage.fillFirstNameField(t.ctx.firstName);
        await registrationPage.fillLastNameField(t.ctx.lastName);
        await registrationPage.fillEmailField(t.ctx.email);
        await registrationPage.fillPasswordField(c.password);
        await registrationPage.clickCreateAccountButton();
        const errorMessage = await registrationPage.getErrorMessage('password');
        await t
            .expect(errorMessage)
            .eql('Password must contain 8 characters, 1 lowercase character, 1 upper case character, and 1 digit');

    });
}

const invalidEmail = [
    {name: 'double dot in email in Local-part', email: 'John..Doe@example.com', error: 'Invalid value'},
    {name: 'quotes and double dot in Local-part', email: '"John..Doe"@example.com', error: 'No valid value provided'},
    {name: 'without @ symbol', email: 'email.com', error: 'No valid value provided'},
    {name: 'cyrillic symbols in Local-part', email: 'фыв@mail.com', error: 'No valid value provided'},
    {name: 'only numbers in Local part', email: '1111111111', error: 'No valid value provided'},
    {name: 'only special symbols in Local-part', email: '!!!!!!!!!!!!', error: 'No valid value provided'},
]
for (const c of invalidEmail) {
    test.meta({
        ID: '4',
        SEVERITY: 'blocker',
        STORY: 'STORY-1'
    })(`Wrong email : ${c.name}`, async () => {
        const registrationPage = await uiApp().LoginPage().clickRegisterButton();
        await registrationPage.fillFirstNameField(t.ctx.firstName);
        await registrationPage.fillLastNameField(t.ctx.lastName);
        await registrationPage.fillPasswordField(t.ctx.password);
        await registrationPage.fillEmailField(c.email);
        await registrationPage.clickCreateAccountButton();
        const errorMessage = await registrationPage.getErrorMessageEmail();
        await t
            .expect(errorMessage)
            .eql(c.error);

    });
}