// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(120000);
  const blockFlodeskAssets = (route) => route.abort();
  await page.route("https://assets.flodesk.com/**", blockFlodeskAssets);
  for (const width of [320, 375, 390, 430]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/thank-you"]) {
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
  await page.unroute("https://assets.flodesk.com/**", blockFlodeskAssets);

  let submittedPayload;
  await page.route(
    "https://form.flodesk.com/forms/6ae077d675c737372cf4391c/submit",
    async (route) => {
      submittedPayload = JSON.parse(route.request().postData());
      await route.fulfill({
        status: 200,
        headers: {
          "access-control-allow-origin": "*",
          "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          status: "success",
          onSuccess: {
            mode: "redirect",
            redirectUrl: "http://127.0.0.1:3000/thank-you",
          },
        }),
      });
    },
  );

  await page.goto("http://127.0.0.1:3000");
  const field = (key) =>
    page.locator(`[data-consultation-input="${key}"]`);
  await field("fullName").waitFor({ timeout: 120000 });
  await page
    .getByRole("button", { name: "Book Free Consultation", exact: true })
    .click();
  await page
    .getByText("Please enter your full name.", { exact: true })
    .waitFor();
  assert.equal(
    await page.locator(":focus").getAttribute("data-consultation-input"),
    "fullName",
  );
  await field("fullName").fill("Pratikshya Sharma");
  await field("email").fill("invalid");
  await field("phone").fill("abc");
  await field("business").fill("Boutique");
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

  const form = page.locator('#flodesk-consultation-form form[data-ff-el="form"]');
  assert.equal(
    await form.getAttribute("action"),
    "https://form.flodesk.com/forms/6ae077d675c737372cf4391c/submit",
  );
  assert.equal(await form.getAttribute("method"), "post");
  assert.ok(await form.locator('input[name="csrf"]').inputValue());
  assert.equal(
    await page.locator('script[data-flodesk-universal="module"]').count(),
    1,
  );

  const expectedValues = {
    fullName: "Flodesk QA Test",
    email: "flodesk-qa@example.com",
    phone: "+9779800000000",
    business: "QA Boutique",
    url: "https://example.com",
    message: "Automated intercepted integration test",
  };
  for (const [key, value] of Object.entries(expectedValues)) {
    await field(key).fill(value);
  }

  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().endsWith("/submit") &&
        response.request().method() === "POST",
    ),
    page
      .getByRole("button", { name: "Book Free Consultation", exact: true })
      .click(),
  ]);

  assert.ok(submittedPayload, "The Flodesk submission was not intercepted");
  assert.ok(
    typeof submittedPayload.csrf === "string" &&
      submittedPayload.csrf.length > 32,
    "The rotating Flodesk CSRF token is missing",
  );
  const submittedValues = Object.values(submittedPayload);
  for (const value of Object.values(expectedValues)) {
    assert.ok(submittedValues.includes(value), `Missing submitted value: ${value}`);
  }
  assert.ok(
    Object.keys(submittedPayload).length > 12,
    "The randomized Flodesk decoy fields are missing",
  );
  for (const obsoleteName of [
    "firstName",
    "email",
    "fields.whatsappNumber",
    "fields.businessName",
    "fields.websieOrFacebookLink",
    "fields.askAnythinkYouWantToSay",
  ]) {
    assert.equal(
      Object.hasOwn(submittedPayload, obsoleteName),
      false,
      `Obsolete plain field name is still submitted: ${obsoleteName}`,
    );
  }

  await page.waitForURL("http://127.0.0.1:3000/thank-you");
  await page.getByRole("heading", { name: "Thank You!" }).waitFor();
  await page
    .getByText("Your consultation request has been received.", { exact: true })
    .waitFor();
  await page
    .getByText("Video will appear here once a Vimeo URL is added")
    .waitFor();
  assert.equal(await page.locator("iframe").count(), 0);
  const whatsappLinks = page.locator('a[href*="wa.me"]');
  assert.ok((await whatsappLinks.count()) <= 1);
  if ((await whatsappLinks.count()) === 1) {
    assert.match(await whatsappLinks.first().getAttribute("href"), /^https:\/\/wa\.me\/\d+/);
  }
  console.log(
    "PASS validation, focus, tokenized Flodesk payload, receipt, and integration placeholders",
  );
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
