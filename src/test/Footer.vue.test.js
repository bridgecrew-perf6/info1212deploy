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
    
    test('it performs a validation of mail on the footer', async () => {
      await browser.get(url)
      const mail = await browser.findElement(by.tagName('a')).getText()
      expect(mail).toContain('florent.rousseau@student.uclouvain.be')
    })
   
    test('it performs a validation of mail on the footer', async () => {
        await browser.get(url)
        const mail= await browser.findElement(by.tagName('a')).getText()
        expect(mail).toContain('didia.josefechado@student.uclouvain.be')
    })

    test('it performs a validation of mail on the footer', async () => {
        await browser.get(url)
        const mail = await browser.findElement(by.tagName('a')).getText()
        expect(mail).toContain('nathalie.herrera@student.uclouvain.be')
    })

    test('it performs a validation of link on the footer', async () => {
        await browser.get(url)
        const link = await browser.findElement(by.tagName('a')).getText()
        expect(link).toContain('https://joinup.ec.europa.eu/collection/eupl"')
    })
    test('it performs a validation of bit bucket link on the footer', async () => {
        await browser.get(url)
        const link = await browser.findElement(by.tagName('a')).getText()
        expect(link).toContain('https://bitbucket.org/florousseau/workspace/projects/LINFO1212/')
    })
    test('it performs a validation of link of the course on the footer', async () => {
        await browser.get(url)
        const link = await browser.findElement(by.tagName('a')).getText()
        expect(link).toContain('https://uclouvain.be/cours-2021-linfo1212')
    })
    test('it performs a validation of link of the faculty on the footer', async () => {
        await browser.get(url)
        const link = await browser.findElement(by.tagName('a')).getText()
        expect(link).toContain('https://uclouvain.be/fr/facultes/epl')
    })
    test('it performs a validation of link of bulma on the footer', async () => {
        await browser.get(url)
        const link = await browser.findElement(by.tagName('a')).getText()
        expect(link).toContain('https://bulma.io')
    })