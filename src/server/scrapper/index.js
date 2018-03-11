import puppeteer from 'puppeteer';
import path from 'path';

// Below is a badly written code, solely for testing & learning purpose.
const URL = 'https://www.traveloka.com/id/';
const InputSelector = `#desktopContentV3 > div > div:nth-child(2) > div > div._2IFa7._2v5F6 > div.k6aAp > div > div > div._3Hvrg > div:nth-child(1) > div._1rIpY._25Fug > div > div.spa0a._1Y0ye._3su3M.p7S_2 > input`;
const SearchButton = `#desktopContentV3 > div > div:nth-child(2) > div > div._2IFa7._2v5F6 > div.k6aAp > div > div > div._3Hvrg > div:nth-child(2) > div._9EFEI._25Fug._4o7CG > button`;
const JakartaPopup = `#desktopContentV3 > div > div:nth-child(2) > div > div._2IFa7._2v5F6 > div.k6aAp > div > div > div._3Hvrg > div:nth-child(1) > div._1rIpY._25Fug > div > div:nth-child(2) > div > div > div:nth-child(2) > div`;
const term = 'Jakarta';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(`Loading page ${URL}`);
  await page.goto(URL);

  console.log(`Page for ${URL} successfully loaded`);
  console.log(`Inputting ${term} to the input box`);
  await page.type(InputSelector, term);
  await page.waitFor(1000);

  const resp = await Promise.all([
    page.waitForNavigation(),
    page.click(JakartaPopup),
    page.click(SearchButton),
  ]);

  console.log(`Waiting 5 seconds for the result page`);
  await page.waitFor(5000);

  const prices = await page.$$eval('.tvat-primaryPrice', el => {
    return Array.from(el).map(pr => pr.innerHTML);
  });

  console.log('\n\nSuccess! ', prices);

  await browser.close();
})();
