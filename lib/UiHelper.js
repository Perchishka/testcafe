import {Selector} from "testcafe";

const UiHelper = {

    isElementExist: async function(selector){
        return await Selector(selector).exists;
    }
}

export { UiHelper };