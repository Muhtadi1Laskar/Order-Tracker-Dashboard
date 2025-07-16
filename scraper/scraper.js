import { chromium } from "@playwright/test";
import { getOrderIds } from "../scraper-functions/scrapeIds.js";
import { getOrderInfos } from "../scraper-functions/scrapeOrderInfo.js";

const URL = "https://www.rokomari.com/login";
const email = "laskar90muhtadi@gmail.com";
const password = "foundation90";

const login = async (page, email, password) => {
    const emailLocator = page.getByPlaceholder('Email or phone');
    const nextBtnLocator = page.getByRole('button', { name: 'Next' });
    const passwordLocator = page.getByPlaceholder('Password');
    const loginBtnLocator = page.getByRole('button', { name: 'Login' });

    await page.goto(URL);
    await emailLocator.waitFor({ state: "visible" });
    await emailLocator.fill(email);
    await nextBtnLocator.click();
    await passwordLocator.fill(password);
    await loginBtnLocator.click();
    await page.context().storageState({ path: './storage/storageState.json' });
}

const scraper = async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await login(page, email, password);

    const ids = await getOrderIds(page);
    const data = await getOrderInfos(page, ids);

    console.log(JSON.stringify(data, null, 2));
    if (!data) {
        console.log("Failed to parse the data");
        return false;
    }
    console.log("Successfully parsed you book stats");

    await browser.close();
    return true;
}

scraper().then(res => {
    console.log(res);
})