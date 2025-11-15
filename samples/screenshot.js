import { remoteBrowserPage } from "./connector.js";

(async () => {
    let { page, browser } = await remoteBrowserPage();

    console.log('Starting navigation');

    // Take screenshot
    await page.goto('https://www.lambdatest.com');
    await page.screenshot({ path: 'lambdatest.png' });
    console.log('Screenshot taken!')

    // Take full page screenshot
    await page.goto('https://www.lambdatest.com');
    await page.screenshot({ path: 'lambdatest_fullpage.png', fullPage:true });
    console.log('Full page screenshot taken!')

    // Take screenshot of specific area of the page
    await page.goto('https://www.lambdatest.com');
    await page.screenshot({ path: "area_snap.png", clip: { x: 0, y: 80, width: 600, height: 800 } })
    console.log('Screenshot of specific area taken!')

    // Take screenshot of specific element
    await page.goto('https://www.lambdatest.com/selenium-playground/table-pagination-demo');
    const div = await page.$('#table-id');
    await div.screenshot({ path: 'table.png' });
    console.log('Screenshot of specific element taken!')

    // Take screenshot of element with class name
    await page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    const divs = await page.$$('.h-35');
    for (let i = 0; i < divs.length; i++) {
        await divs[i].screenshot({ path: `element${i}.png` });
    }
    console.log('Screenshots of elements with class name taken!')

    // Generate PDF from page
    await page.goto('https://www.lambdatest.com');
    await page.pdf({ 
        path: 'lambdatest.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20px',
            right: '20px',
            bottom: '20px',
            left: '20px'
        }
    });
    console.log('PDF generated!')

    // set test status to passed
    await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: "Test Passed" } })}`);

    await browser.close();

    console.log('Browser closed.');
})();
