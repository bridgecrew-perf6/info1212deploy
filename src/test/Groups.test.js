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
  describe('executing test scenario on the website http://192.168.0.5:8081/', () => {
    let driver;
    driver = new webdriver().build();
         // func to get the cloud driver eslint disable next line no undef
    await driver.get('http://192.168.0.5:8081/',
        
      );
    }, 10000);
   
    afterAll(async () => {
      await driver.quit();
    }, 150000);
    
    test('it performs a validation of subtitle on the home page', async () => {
      await browser.get(url)
      const title = await browser.findElement(by.tagName('p')).getText()
      expect(title).toContain("Les tranches d'âges")
    })
   
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(title).toContain('6-9 ans')
    })

    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const subtitle = await browser.findElement(by.tagName('p')).getText()
        expect(subtitle).toContain('Benjamins & Benjamines')
    })

    test('it performs a validation of text on the home page', async () => {
        await browser.get(url)
        const text = await browser.findElement(by.tagName('p')).getText()
        expect(text).toContain('Je commence à mieux comprendre le monde qui m’entoure. Au Patro, je participe à des activités qui développent ma créativité. Mon animateur m’emmène dans des univers imaginaires. Je trouve ma place dans le groupe et j’apprends à respecter l’autre.')
    })
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(title).toContain('9-12 ans')
    })
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(subtitle).toContain('Chevaliers & Étincelles')
    })
    test('it performs a validation of text on the home page', async () => {
        await browser.get(url)
        const text = await browser.findElement(by.tagName('p')).getText()
        expect(text).toContain('Au Patro, j’ai ma bande de copains que j’aime retrouver tous les week-ends. Je joue autour de la solidarité  grâce à des jeux coopératifs. Je développe mes compétences.')
    })

    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(title).toContain('12-14 ans')
    })

    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const subtitle = await browser.findElement(by.tagName('p')).getText()
        expect(subtitle).toContain('Éclaireurs & Koalas')
    })
    test('it performs a validation of text on the home page', async () => {
        await browser.get(url)
        const text = await browser.findElement(by.tagName('p')).getText()
        expect(text).toContain('Mes animateurs favorisent l’expression au sein du groupe. Chacun se sent écouté et accepté. Mes animateurs me proposent de jeux plus complexes.')
    })
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(title).toContain('14-16 ans')
    })
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const subtitle = await browser.findElement(by.tagName('p')).getText()
        expect(subtitle).toContain('Conquérants & Alpines')
    })

    test('it performs a validation of text on the home page', async () => {
        await browser.get(url)
        const text = await browser.findElement(by.tagName('p')).getText()
        expect(text).toContain('Je m’ouvre aux autres et à la société. Mes animateurs me font vivre de nouvelles expériences grâce à des projets ouverts sur le monde. Je tisse des liens forts avec ma section.')
    })
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(title).toContain('16 +')
    })
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const subtitle = await browser.findElement(by.tagName('p')).getText()
        expect(subtitle).toContain('Grands & Grandes')
    })
    test('it performs a validation of text on the home page', async () => {
        await browser.get(url)
        const text = await browser.findElement(by.tagName('p')).getText()
        expect(text).toContain('Je commence à m’investir dans la vie du Patro tout en restant animé. Je crée des projets avec ma section et fais appel à la participation de tous en co-responsabilité. Je deviens vraiment un acteur accompagné par mes animateurs. Je peux me préparer à l’animation.')
    })
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const title = await browser.findElement(by.tagName('p')).getText()
        expect(title).toContain('À partir de 16 ans')
    })
    test('it performs a validation of sub-title on the home page', async () => {
        await browser.get(url)
        const subtitle = await browser.findElement(by.tagName('p')).getText()
        expect(subtitle).toContain('Animateurs & Animatrices')
    })
    test('it performs a validation of text on the home', async () => {
        await browser.get(url)
        const text = await browser.findElement(by.tagName('p')).getText()
        expect(text).toContain('Je deviens animateur. Je décide de m’engager à faire vivre le Mouvement. Je m’engage à faire équipe, à me former et à découvrir la structure du Mouvement.')
    })
