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
    
    test('it performs a validation of title on the profil page', async () => {
      await browser.get(url)
      const title = await browser.findElement(by.tagName('p')).getText()
      expect(title).toContain('Profil')
    })
   
    test('it performs a validation of modification on the profil page', async () => {
        await browser.get(url)
        const mod = await browser.findElement(by.tagName('span')).getText()
        expect(mod).toContain('Modifier')
    })

    test('it performs a validation of deletion on the profil page', async () => {
        await browser.get(url)
        const del = await browser.findElement(by.tagName('span')).getText()
        expect(del).toContain('Supprimer')
    })

    test('it performs a validation of deleted profil on the login profil', async () => {
        await browser.get(url)
        const del_profil = await browser.findElement(by.tagName('label')).getText()
        expect(del_profil).toContain('Supprimer mon profil')
    })
    test('it performs a validation of personnal data on the profil page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(title).toContain('Données personnelles')
      })
     
      test('it performs a validation of Name on the login page', async () => {
          await browser.get(url)
          const name = await browser.findElement(by.tagName('label')).getText()
          expect(name).toContain('Nom')
      })
  
      test('it performs a validation of first Name on the profil page', async () => {
          await browser.get(url)
          const first_name = await browser.findElement(by.tagName('label')).getText()
          expect(first_name).toContain('Prénom')
      })
  
      test('it performs a validation of date of birth on the profil page', async () => {
          await browser.get(url)
          const birth = await browser.findElement(by.tagName('label')).getText()
          expect(birth).toContain('Date de naissance')
      })
      test('it performs a validation of connection data on the profil page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(title).toContain('Données de connexion')
      })
     
      test('it performs a validation of mail on the profil page', async () => {
          await browser.get(url)
          const mail = await browser.findElement(by.tagName('label')).getText()
          expect(mail).toContain('Adresse-email')
      })
  
      test('it performs a validation of password on the profil page', async () => {
          await browser.get(url)
          const password = await browser.findElement(by.tagName('label')).getText()
          expect(password).toContain('Mot de passe')
      })
      
