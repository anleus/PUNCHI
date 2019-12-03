const { Builder, By, Key, until } = require("selenium-webdriver");

async function logIn() {
	let driver = await new Builder().forBrowser("chrome").build();
	try {
		await driver.get("http://localhost:4200/login");
		await driver
			.findElement(By.id("mat-input-0"))
			.sendKeys("root", Key.TAB, "roots");
		await driver.findElement(By.className("mat-button")).click();

		//User should be logged in

		let user = await driver
			.findElement(By.className("getLoggedUser"))
			.getText();

		if (user === "root") {
			console.log("Success!!");
		} else {
			console.log("error");
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