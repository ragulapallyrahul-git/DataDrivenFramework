import{test,expect}from '@playwright/test'
import jsdata from 'fs'
import MyExcel from 'xlsx'

function readEmpData(filepath: string , sheetname:string)
{
    const WB  = MyExcel.readFile(filepath);
    const ws = WB.Sheets[sheetname];
    const dataA = MyExcel.utils.sheet_to_json(ws , {header : 1});
    return dataA;
}

test("Adding one employee Details",async({page})=>
{
   const Jdata = JSON.parse(jsdata.readFileSync('./ElementsData/Applocators.json'));
   const Credentials : any = readEmpData('./ElementsData/EmpData.xlsx','LoginData');
   const EmpD : any = readEmpData('./ElementsData/EmpData.xlsx','EmpInfo');
   await page.goto(Jdata.URL);
   await page.locator(Jdata.XUN).fill(Credentials[1][0]);
   await page.locator(Jdata.XPWD).fill(Credentials[1][1]);
   await page.locator(Jdata.XSUB).click();
   await page.waitForTimeout(1000);
   await expect(page).toHaveTitle("OrangeHRM");//Pre condition
   await page.locator(Jdata.XPIM).hover();
   await page.waitForTimeout(1000);
   await page.locator(Jdata.XADD).click();
   await page.waitForTimeout(2000);
   const F = page.frameLocator(Jdata.XFRAME);
   await F.locator(Jdata.XID).fill(EmpD[1][0].toString());
   await F.locator(Jdata.XLAST).fill(EmpD[1][1]);
   await F.locator(Jdata.XFIRST).fill(EmpD[1][2]);
   await F.locator(Jdata.XMIDDLE).fill(EmpD[1][3]);
   await F.locator(Jdata.XNICK).fill(EmpD[1][4]);
   await page.waitForTimeout(2000);
   await F.locator(Jdata.XPHOTO).setInputFiles("./EmpPhotos/Rahul.jpg");
   await page.screenshot({path: "./Evidences/"+EmpD[1][1]+"AfterUploading.jpg"});
   await page.waitForTimeout(2000);
   await F.locator(Jdata.XSAVE).click();
   await page.waitForTimeout(6000);
   await F.locator(Jdata.XBACK).click();
   await page.waitForTimeout(6000);

})
