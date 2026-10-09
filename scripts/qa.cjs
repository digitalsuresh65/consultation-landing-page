// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(120000);
  for (const width of [320, 375, 390, 430]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/thank-you?demo=1&name=Pratikshya"]) {
      await page.goto("http://127.0.0.1:3000" + route);
      await page.evaluate(() => document.fonts.ready);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `Overflow at ${width}: ${route}`,
      );
      console.log(`PASS ${width}px ${route}`);
    }
  }
  await page.goto("http://127.0.0.1:3000");
  await page
    .getByRole("button", { name: "Book Free Consultation", exact: true })
    .click();
  await page
    .getByText("Please enter your full name.", { exact: true })
    .waitFor();
  assert.equal(await page.locator(":focus").getAttribute("id"), "fullName");
  await page.getByLabel("Full Name").fill("Pratikshya Sharma");
  await page.getByLabel("Active Email").fill("invalid");
  await page.getByLabel("WhatsApp Number").fill("abc");
  await page.getByLabel("Business Name").fill("Boutique");
  await page
    .getByRole("button", { name: "Book Free Consultation", exact: true })
    .click();
  await page
    .getByText("Please enter a valid email address.", { exact: true })
    .waitFor();
  await page
    .getByText("Please enter a valid WhatsApp number (7–15 digits).", {
      exact: true,
    })
    .waitFor();
  await page.getByLabel("Active Email").fill("test@example.com");
  await page.getByLabel("WhatsApp Number").fill("+977 9800000000");
  await page
    .getByRole("button", { name: "Book Free Consultation", exact: true })
    .click();
  await page.waitForURL("**/thank-you?**");
  await page.getByRole("heading", { name: "Thank You, Pratikshya!" }).waitFor();
  await page
    .getByText("This is a simulated confirmation.", { exact: false })
    .waitFor();
  await page
    .getByText("Video will appear here once a Vimeo URL is added")
    .waitFor();
  assert.equal(await page.locator("iframe").count(), 0);
  assert.equal(await page.locator('a[href*="wa.me"]').count(), 0);
  console.log(
    "PASS validation, focus, redirect, personalization, honest demo receipt, integration placeholders",
  );
  await page.goto("http://127.0.0.1:3000/thank-you");
  await page
    .getByText("No consultation request has been submitted on this page.")
    .waitFor();
  await page.goto("http://127.0.0.1:3000");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.screenshot({ path: "/tmp/aa-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.screenshot({ path: "/tmp/aa-mobile.png", fullPage: true });
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
