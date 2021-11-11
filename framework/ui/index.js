import { LoginPage} from "./pages/LoginPage";

const uiApp = () => ({
    LoginPage: ()=> new LoginPage(),
})

export { uiApp }