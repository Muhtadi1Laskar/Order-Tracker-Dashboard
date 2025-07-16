export const login = async (page, email, password) => {
    const URL = "https://www.rokomari.com/login";
    const emailLocator = page.getByPlaceholder('Email or phone');
    const nextBtnLocator = page.getByRole('button', { name: 'Next' });
    const passwordLocator = page.getByPlaceholder('Password');
    const loginBtnLocator = page.getByRole('button', { name: 'Login' });

    await page.goto(URL);
    await emailLocator.waitFor({ state: "visible" });
    await emailLocator.type(email);
    await nextBtnLocator.click();
    await passwordLocator.fill(password);
    await loginBtnLocator.click();
}
