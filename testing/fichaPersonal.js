const { Builder, By, Key, until } = require("selenium-webdriver");

async function FichaPersonal() {
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
            .findElement(By.xpath("/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav/div/div/mat-nav-list/mat-list-item[2]/div/a/div"))
            .click();
        
        await driver
            .wait(until.elementIsVisible(By.xpath("/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/h1")), 2000);

        try {
            var ckeckNombre = await driver
                .findElement(By.xpath("/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[1]/div[1]/mat-form-field/div/div[1]/div/input"));
            
                if (ckeckNombre.getAttribute("disabled") == true) console.log("Campo nombre no accesible");
        }catch (err) {}

        try {
            var checkApellido = await driver
                .findElement(By.xpath("/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[1]/div[2]/mat-form-field/div/div[1]/div/input"));

            if (checkApellido.getAttribute("disabled") == true) console.log("Campo apellidos no accesible");
        }catch (err) {}

        try {
            var ckeckUser = await driver
                .findElement(By.xpath("/html/body/app-root//html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[5]/div[1]/mat-form-field/div/div[1]/div/input-nav/mat-sidenav-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[1]/div[1]/mat-form-field/div/div[1]/div/input"));
            
                if (ckeckUser.getAttribute("disabled") == true) console.log("Campo usuario no accesible");
        }catch (err) {}

        try {    
            var checkFecha = await driver
                .findElement(By.xpath("/html/body/app-root/main-nav/mat-/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[2]/div[1]/mat-form-field/div/div[1]/div[1]/input-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[1]/div[2]/mat-form-field/div/div[1]/div/input"));

            if (checkFecha.getAttribute("disabled") == true) console.log("Campo fecha no accesible");
        }catch (err) {}

        try {    
            var checkNuss = await driver
                .findElement(By.xpath("/html/body/app-root/main-nav//html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[6]/div[1]/mat-form-field/div/div[1]/div/input-/html/body/app-root/main-nav/mat-sidenav-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[2]/div[1]/mat-form-field/div/div[1]/div[1]/input-container/mat-sidenav-content/app-ficha-personal/div[3]/mat-card/form/div[1]/div[2]/mat-form-field/div/div[1]/div/input"));

            if (checkNuss.getAttribute("disabled") == true) console.log("Campo nuss no accesible");
        }catch (err) {}

    }catch {
    }finally {
        await driver.quit();
    }
}