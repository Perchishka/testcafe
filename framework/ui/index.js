import { LoginPage} from "./pages/LoginPage";
import { InputFieldsFragments} from "./fragments/InputFieldsFragments";

const uiApp = () => ({
    LoginPage: ()=> new LoginPage(),
    InputFields: () => new InputFieldsFragments,
})

export { uiApp }