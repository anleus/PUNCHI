const { Builder, By, Key, until } = require("selenium-webdriver");

async function Departamentos() {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        await driver.get("http://localhost:4200/login");
        await driver
            .findElement(By.id("mat-input-0"))
            .sendKeys("arnau", Key.TAB, "arnau");
            await driver
            .findElement(By.className("mat-button")).click();

        await driver
            .wait(until.elementIsVisible(By.className("topbar"), 2000));

        await driver
            .findElement(By.className("mat-button-wrapper"))
            .click();

        await driver
            .wait(until.elementIsVisible(By.className("mat-drawer-inner-container"), 2000));

        await driver
            .findElement(By.xpath("/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav/div/div/mat-nav-list/mat-list-item[3]/div"))
            .click();

        await driver
            .wait(until.elementIsVisible(By.className("btn btn-primary"), 2000));

        await driver
            .findElement(By.className("btn btn-primary"))
            .click();

        try {    
            await driver
                .wait(until.elementIsVisible(By.className("mat-form-field-infix"), 2000));

            await driver
                .findElement(By.id("mat-form-field-infix"))
                .sendKeys("Recursos humanos");
            await driver
                .findElement(By.className("mat-select-arrow-wrapper")).click();
            
            await driver
                .wait(until.elementIsVisible(By.xpath("/html/body/div[2]/div[2]/div/div/div/mat-option[1]/span"), 2000));

            await driver
                .findElement(By.xpath("/html/body/div[2]/div[2]/div/div/div/mat-option[1]/span"))
                .click();

            await driver
                .findElement(By.xpath("/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-personalizar-departamento/div[1]/div[3]/button"))
                .click(); 

            await driver
                .wait(until.elementIsVisible(By.xpath("/html/body/div[2]/div[2]/div/mat-dialog-container/confirmacion-edit-dep/div/button[2]/span"), 2000));
            var dobleCheck = await driver
                .findElement(By.xpath("/html/body/div[2]/div[2]/div/mat-dialog-container/confirmacion-edit-dep/div/button[2]/span"));
            var checkErrorNombre = await driver
                .findElement(By.xpath("/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-personalizar-departamento/div[1]/div[3]/button"));

            if (dobleCheck.getAttribute("disabled") == true) console.log("No aparece doble verificación");
            if (checkErrorNombre.getAttribute("disabled") == true) console.log("No aparece error al duplicar");
        }catch (err) {}
        
    }catch(error){
    }finally {
        await driver.quit();
    }
}