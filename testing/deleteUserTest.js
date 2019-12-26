/* Nodo personal -> Al intentar borrar un usuario debe
    salir un mensaje de confirmación que el usuario debe de
    aceptar/rechazar
*/

const { Builder, By, Key, until } = require("selenium-webdriver");

async function deleteUser() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:4200/login");
    await driver
      .findElement(By.id("mat-input-0"))
      .sendKeys("root", Key.TAB, "root");
    await driver.findElement(By.className("mat-button")).click();

    try {
      //await driver
        //.findElement(By.className("mat-button-toggle-button"))
        //.findElement(By.className("mat-icon-button mat-button-base ng-star-inserted"))
        //.click();
        await driver
            .wait(until.elementIsVisible(By.className("topbar"), 2000));

        await driver
            .findElement(By.className("mat-button-wrapper"))
            .click();
    } catch (Exception) {
      console.log(Exception);
    }
  } catch (err) {
      console.log("------------- Test failed: " + err);
  } finally {
    console.log("------------- Test finished");
    //await driver.quit();
  }
}

deleteUser();
