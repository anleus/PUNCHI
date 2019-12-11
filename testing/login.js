const { Builder, By, Key, until } = require("selenium-webdriver");

async function logIn() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:4200/login");
    await driver
      .findElement(By.id("mat-input-0"))
      .sendKeys("root", Key.TAB, "root");
    await driver.findElement(By.className("mat-button")).click();

    //User should be logged in

    let user = await driver
      .findElement(By.className("getLoggedUser"))
      .getText();

    if (user === "root") {
    }
  } catch (err) {
  } finally {
    await driver.quit();
  }
}

logIn(); 
