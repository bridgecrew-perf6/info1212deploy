const script = require('jest');
const {Builder,By,Key,Util} = require('selenium-webdriver');
const { beforeAll } = require('@jest/globals');

 
const url = 'http://www.Google.com';
  
// declaring one test group, with common initialisation.
const getElementXpath = async (driver, xpath, timeout = 3000) => {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
   
   
  const getElementName = async (driver, name, timeout = 3000) => {
    const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
   
  const getElementId = async (driver, id, timeout = 3000) => {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
   
  // declaring the test group  This is our test case scenario that we will execute from our first test script. 
  describe('executing test scenario on the website www.selenium.dev', () => {
      
      let driver;
   
      driver = new webdriver().build();
   
      // func to get the cloud driver eslint disable next line no undef
      await driver.get(
        "http://192.168.0.5:8081/",
      );
    }, 10000);
   
    afterAll(async () => {
      await driver.quit();
    }, 15000);
    
    test('it performs a validation of title on the login page', async () => {
      await browser.get(url)
      const title = await browser.findElement(by.tagName('form')).getText()
      expect(title).toContain('login')
    })
   
    test('it performs a validation of connexion on the login page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('div')).getText()
        expect(title).toContain('Connexion')
    })

    test('it performs a validation of mail on the login page', async () => {
        await browser.get(url)
        const mail = await browser.findElement(by.tagName('label')).getText()
        expect(mail).toContain('Adresse e-mail')
    })

    test('it performs a validation of password on the login page', async () => {
        await browser.get(url)
        const password = await browser.findElement(by.tagName('label')).getText()
        expect(password).toContain('Mot de passe')
    })

    
