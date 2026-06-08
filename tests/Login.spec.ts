import{test,expect}from '@playwright/test'
import jsdata from 'fs'
test("Login the page using JSON",async({page})=>
{
    const Jdata = JSON.parse(jsdata.readFileSync('./ElementsData/Applocators.json'));
    await page.goto(Jdata.URL);
    await page.locator(Jdata.XUN).fill("playwright");
    await page.locator(Jdata.XPWD).fill("playwright");
    await page.locator(Jdata.XSUB).click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveTitle("OrangeHRM"); //PreCondition
    await page.locator(Jdata.XPIM).hover();
    await page.waitForTimeout(1000);
    await page.locator(Jdata.XADD).click();
    await page.waitForTimeout(2000);
    const F = page.frameLocator(Jdata.XFRAME);
    await F.locator(Jdata.XID).fill("676756");
    await page.waitForTimeout(6000);



})