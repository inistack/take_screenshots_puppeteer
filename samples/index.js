import puppeteer from "puppeteer"

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage()
//   await page.goto("https://www.lambdatest.com/")
//   await page.screenshot({ path: "example3.png", clip: { x: 0, y: 70, width: 500, height: 700 } })

//  // Navigate the page to a URL
//   await page.goto('https://www.lambdatest.com/selenium-playground/');
//   await page.goto('https://www.lambdatest.com/selenium-playground/table-pagination-demo'); //snap table URL

await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo'); // snap demo form URL

//   let title = await page.title();

//   console.log(title)

  // select Ajax Submit form Element
//   await page.evaluate(() => {
//     const element = document.querySelector('h1');
//     element.screenshot({ path: 'element.png' });

//   });const element = document.querySelector('h1');

    // const element = await page.$('h1');
    // const div = await page.$('div.w-full.px-15.smtablet\\:mt-20'); // select table div

    const divs = await page.$$('.border.border-gray-550.w-full.h-35.rounded.px-10');

    for (let i = 0; i < divs.length; i++) {
        await divs[i].screenshot({ path: `element${i}.png` });
    }

//     if (divs.length > 0) {
//     const input = divs[0];
//     await input.screenshot({ path: 'donate-button.png' });
//   } else {
//     console.log('No elements with the class .donate-button were found.');
//   }

    // await div.screenshot({ path: 'element.png' });

    // await element.screenshot({ path: 'element.png' });


   
  await browser.close()
})();
