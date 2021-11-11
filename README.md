
# Betty Blocks assignment 

## Authors and acknowledgment

- [ ] Ekaterina Pertseva

## Project status

- [ ] In progress

## Project structure

### Tools and Technologies:

TestCafe, Faker

### Project contains packages:

- framework.config
- framework.ui.pages
- lib
- tests

## Run and reporting commands
1. Run test cases in chrome execute command: testcafe chrome --reporter allure tests
2. To generate Allure report execute command: allure generate allure/allure-results --clean -o allure/allure-report && allure open allure/allure-report

## Tests

This framework contains end-to-end and functional test cases. All test cases are located in "tests" package. Test
framework can run test cases in the headless mode or not depends on OS. For OS=Windows there is a slowMo option for
visibility. It can be removed.


