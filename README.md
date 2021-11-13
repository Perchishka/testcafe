
# Betty Blocks assignment 

## Authors and acknowledgment
Ekaterina Pertseva

## Project status
- [ ] In progress

##Set up project
1. Clone or download project.
2. In the project folder use command: npm install. 

## Run test cases and reporting commands
All test cases are located in the framework/tests package.

### To run tests locally:
1. Run test cases in chrome execute command: testcafe chrome --reporter allure tests
2. To generate Allure report execute command: allure generate allure/allure-results --clean -o allure/allure-report && allure open allure/allure-report

### CI/CD:
You can find CI/CD configuration in github/workflows/blank.yml file.
The workflow is triggered on push in 'develop' branch or pull request events but only for the main branch.

####You can check workflow result via GitHub pages.
####For example: https://perchishka.github.io/testcafe/29//#suites

## Documentation
Test cases / Bug Report can be found in Test_Cases_Bug_Report.docx file.



