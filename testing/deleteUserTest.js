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
      await driver.findElement(By.className("mat-icon-button")).click();

      await driver
        .findElement(
          By.xpath(
            "/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav/div/div/mat-nav-list/mat-list-item[4]/div/a/div"
          )
        )
        .click();

      await driver.wait(
        until.elementIsVisible(driver.findElement(By.className("topbar"))),
        2000
      );

      await driver
        .findElement(
          By.xpath(
            "/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-usuarios/div/mat-card/div/div[3]/div/table/tbody/tr[1]/td[4]/button[2]"
          )
        )
        .click();

      await driver.wait(
        until.elementIsVisible(driver.findElement(By.className("mat-dialog-title"))),
        2000
      );

      await driver
        .findElement(
          By.xpath(
            "/html/body/div/div[2]/div/mat-dialog-container/confirmacion-borrado/div/button[2]/span"
          )
        )
        .click();
    } catch (Exception) {
      console.log(Exception);
    }
  } catch (err) {
    console.log("------------- Test failed: " + err);
  } finally {
    console.log("------------- Test finished");
    await driver.quit();
  }
}

deleteUser();
