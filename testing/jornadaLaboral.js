const { Builder, By, Key, until } = require("selenium-webdriver");

async function JornadaLaboral() {
	let driver = await new Builder().forBrowser("chrome").build();
	try {
        await driver.get("http://localhost:4200/inicio");
        try{
            await driver.findElement(By.className("mat-button-toggle-button")).click();
        }
    catch(Exception){
        console.log("Error");
    }    	
		
	} finally {
		await driver.quit();
		
	}
}

logIn().then(checkMenu)

function checkMenu(){
	if(await driver
	.findElement(By.id("mat-input-0")).getAttribute("display")==="none"){
		console.log("Success!!");
	} else {
		console.log("error");
	}
}