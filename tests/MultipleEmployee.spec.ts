import{test,expect}from '@playwright/test'
import jsdata from 'fs'
import MyExcel from 'xlsx'
test.describe("Test Scenario of Adding Multiple Employees",()=>
{
  let page;
  let context: any;

function readEmpData(filepath: string , sheetname:string) //function for handling excel data
{
    const WB  = MyExcel.readFile(filepath);
    const ws = WB.Sheets[sheetname];
    const dataA = MyExcel.utils.sheet_to_json(ws , {header : 1});
    return dataA;
}
 test.beforeAll("Launch my Orange HRM Application",async({browser})=>
{
    test.setTimeout(900000);
    context = await browser.newContext();
    page = await context.newPage();
    console.log("---Browser launched Successfully--");
}) //Ending beforeAll

test("TestCase on Adding Multiple employee Details",async({page})=>
{
    test.setTimeout(900000);
   const Jdata = JSON.parse(jsdata.readFileSync('./ElementsData/Applocators.json'));
   const Credentials : any = readEmpData('./ElementsData/EmpData.xlsx','LoginData');
   const EmpD : any = readEmpData('./ElementsData/EmpData.xlsx','EmpInfo');
   await page.goto(Jdata.URL);
   await page.locator(Jdata.XUN).fill(Credentials[1][0]);
   await page.locator(Jdata.XPWD).fill(Credentials[1][1]);
   await page.locator(Jdata.XSUB).click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveTitle("OrangeHRM");//Pre condition
   for(let r=1; r < EmpD.length; r++)
   {
   await page.locator(Jdata.XPIM).hover();
   await page.waitForTimeout(1000);
   await page.locator(Jdata.XADD).click();
   await page.waitForTimeout(2000);
   const F = page.frameLocator(Jdata.XFRAME);
   await F.locator(Jdata.XID).fill(EmpD[r][0].toString());
   await F.locator(Jdata.XLAST).fill(EmpD[r][1]);
   await F.locator(Jdata.XFIRST).fill(EmpD[r][2]);
   await F.locator(Jdata.XMIDDLE).fill(EmpD[r][3]);
   await F.locator(Jdata.XNICK).fill(EmpD[r][4]);
   await page.waitForTimeout(2000);
   await F.locator(Jdata.XPHOTO).setInputFiles("./EmpPhotos/"+EmpD[r][1]+".jpg");
   await page.waitForTimeout(2000);
   await page.screenshot({path: "./Evidences/"+EmpD[r][1]+"--BeforeSave.jpg"});
   await F.locator(Jdata.XSAVE).click();
   await page.waitForTimeout(7000);
   await page.screenshot({path: "./Evidences/"+EmpD[r][1]+"--AfterSave.jpg"});
   await F.locator(Jdata.XBACK).click();
   await page.waitForTimeout(6000);
   await page.screenshot({path: "./Evidences/"+EmpD[r][1]+"--AfterAdded.jpg"});
   console.log("The Emp"+ EmpD[r][1] + "added Successfully");
} //for loop ends here
})// ending testcase
   test.afterAll("Closing the browser",async()=>
{
  await context.close();
  console.log("The Testcase Executed Successfully");
})

}) //ended test describe(scenario)
