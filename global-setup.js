import { chromium } from '@playwright/test';

const URL = "https://www.rokomari.com/login";


export default async function globalSetup(email, password) {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
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
    // await browser.close();
}

