// @ts-check
import { test, expect } from '@playwright/test';
import { getOrderIds } from '../scraper-functions/scrapeIds.js';
import { getOrderInfos } from '../scraper-functions/scrapeOrderInfo.js';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test("Scrape IDS", async ({ page }) => {
  test.setTimeout(120000);

  const orderIDs = await getOrderIds(page);
  console.log(orderIDs);

});

test.only("Get each information", async ({ page }) => {
  test.setTimeout(120000);

  const orderIDs = await getOrderIds(page);
  const data = await getOrderInfos(page, orderIDs);

  console.log(JSON.stringify(data, null, 2));

});