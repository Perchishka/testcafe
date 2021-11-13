import {uiApp} from "../framework/ui";
import {credentials} from "../framework/config/Credentials";
import {t} from "testcafe";

fixture
    .meta({TEST_RUN: 'regression'})
    ('Login test suite').beforeEach(async t => {
    await uiApp().LoginPage().goTo();
    t.ctx.loginPage = uiApp().LoginPage();
    t.ctx.email = credentials.email;
    t.ctx.password = credentials.password;
    t.ctx.firstName = credentials.firstName;
    t.ctx.lastName = credentials.lastName;
    t.ctx.inputFieldsFragments = await uiApp().InputFields();
})

test.meta({
    ID: '1',
    SEVERITY: 'blocker',
    STORY: 'STORY-2'
})('Successful login', async () => {
    await t.ctx.inputFieldsFragments.fillEmailField(t.ctx.email);
    await t.ctx.inputFieldsFragments.fillPasswordField(t.ctx.password);
    const loginFlowPage = await t.ctx.loginPage.clickLoginButton();
    await t.expect(await loginFlowPage.getPageHeaderTitle()).eql('Login Flow');
    await t.expect(await loginFlowPage.getWelcomeHeader()).contains(t.ctx.firstName, 'string contains the expected substring');
    await t.expect(await loginFlowPage.getWelcomeHeader()).contains(t.ctx.lastName, 'string contains the expected substring');
});

test.meta({
    ID: '2',
    SEVERITY: 'normal',
    STORY: 'STORY-2'
})('Show password button check', async () => {
    await t.ctx.inputFieldsFragments.fillPasswordField(t.ctx.password);
    await t.ctx.loginPage.clickShowPasswordButton();
    await t.expect(await t.ctx.inputFieldsFragments.getPasswordFieldAttribute('value'))
        .eql(t.ctx.password);
});

test.meta({
    ID: '3',
    SEVERITY: 'normal',
    STORY: 'STORY-2'
})('Emty password field', async () => {
    await t.ctx.inputFieldsFragments.fillEmailField(t.ctx.email);
    await t.ctx.loginPage.clickLoginButton();
    const errorMessage = await t.ctx.inputFieldsFragments.getErrorMessagePassword();
    await t
        .expect(errorMessage)
        .eql('This field is required');
});

test.meta({
    ID: '4',
    SEVERITY: 'normal',
    STORY: 'STORY-2'
})('Wrong password', async () => {
    await t.ctx.inputFieldsFragments.fillEmailField(t.ctx.email);
    await t.ctx.loginPage.clickLoginButton();
    await t.expect(t.ctx.loginPage.wrongCredentialsAlert.exists).ok();
});

test.meta({
    ID: '5',
    SEVERITY: 'normal',
    STORY: 'STORY-2'
})('Empty email login', async () => {
    await t.ctx.inputFieldsFragments.fillPasswordField(t.ctx.password);
    await t.ctx.loginPage.clickLoginButton();
    const errorMessage = await t.ctx.inputFieldsFragments.getErrorMessageEmail();
    await t
        .expect(errorMessage)
        .eql('This field is required');
});
