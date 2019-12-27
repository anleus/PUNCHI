const { Builder, By, Key, until } = require("selenium-webdriver");

async function crearUser() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        driver.get("http://localhost:4200/login");
        driver
            .findElement(By.id("mat-input-0"))
            .sendKeys("root", Key.TAB, "root");
         driver
            .findElement(By.className("mat-button")).click();
         driver.get('http://localhost:4200/usuarios');
         driver
            .findElement(".btn",
                () => checkNotRoot(),
                () => console.log("TEST FAILED: Not accessible as root")
            )
    }catch {
    }finally {
        await driver.quit();
    }
}

function checkNotRoot()
{
    driver.get("http://localhost:4200/login");
        driver
            .findElement(By.id("mat-input-0"))
            .sendKeys("stella", Key.TAB, "stella");
         driver
            .findElement(By.className("mat-button")).click();
         driver.get('http://localhost:4200/usuarios');
         driver
            .findElement(".btn",
                () => console.log("TEST FAILED: accessible as other role"),
                () => console.log("TEST SUCCESS")
            )
}
crearUser();