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
    
    test('it performs a validation of title on the home page', async () => {
      await browser.get(url)
      const title = await browser.findElement(by.tagName('p')).getText()
      expect(title).toContain('Patro Saint-Jean Berchmans de Tamines')
    })
   
    test('it performs a validation of sub-title on the navbar', async () => {
        await browser.get(url)
        const inscrit = await browser.findElement(by.tagName('div')).getText()
        expect(inscrit).toContain('Inscriptions')
    })

    test('it performs a validation of sub-title on the navbar', async () => {
        await browser.get(url)
        const camp = await browser.findElement(by.tagName('div')).getText()
        expect(camp).toContain('Camp')
    })

    test('it performs a validation of sub-title on the navbar', async () => {
        await browser.get(url)
        const staff= await browser.findElement(by.tagName('div')).getText()
        expect(staff).toContain('Staff')
    })
    test('it performs a validation of sub-title on the navbar', async () => {
        await browser.get(url)
        const contact = await browser.findElement(by.tagName('div')).getText()
        expect(contact).toContain('Contact')
    })
    test('it performs a validation of sub-title on the navbar', async () => {
        await browser.get(url)
        const acc = await browser.findElement(by.tagName('div')).getText()
        expect(acc).toContain('Accueil')
    })
    
