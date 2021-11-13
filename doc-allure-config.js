const DOC_ALLURE_CONFIG = {
    CLEAN_REPORT_DIR: false,
    COPY_HISTORY: true,
    RESULT_DIR: '/allure/allure-results',
    REPORT_DIR: '/allure/allure-report',
    META: {
        STORY_ID: 'STORY',
        TEST_ID: 'ID',
        SEVERITY: 'SEVERITY',
        TEST_RUN: 'TEST_RUN'
    },
    STORY_LABEL: 'JIRA Story Link',
    STORY_URL: '',
    TEST_LABEL: 'JIRA Test Link',
    TEST_URL: '',
    labels: {
        screenshotLabel: 'Screenshot',
        browserLabel: 'Browser',
        userAgentLabel: 'User Agent',
        allureStartMessage: 'Allure reporter started...',
        allureClosedMessage: 'Allure reporter closed...'
    }
};

module.exports = DOC_ALLURE_CONFIG;