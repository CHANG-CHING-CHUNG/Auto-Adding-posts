const puppeteer = require('puppeteer');
const cron = require("node-cron");
console.log("Welcome!")
console.log("Do you often forget to add a post?")
console.log("Don't worry");
console.log("This script will help you to add a post at 20:30 every day.");
console.log("Script is running, Don't close the terminal");

(async () => {
	const browser = await puppeteer.launch( {
		headless: false,
		defaultViewport: {width: 600, height: 800},
		userDataDir: "./User Data"
	});
	const page = (await browser.pages())[0];
	await page.goto('https://learning.lidemy.com/reports');
	await page.waitForSelector('.ant-input');
	await browser.close();
})();

cron.schedule("30 23 * * *", () => {
	
	(async () => {
		console.log("Starting...")
		/* Initiate the Puppeteer browser */
		const browser = await puppeteer.launch( {
			headless: false,
			defaultViewport: {width: 600, height: 800},
			userDataDir: "./User Data"
		});
		const page = (await browser.pages())[0];
		await page.goto('https://learning.lidemy.com/reports');
		await page.waitForSelector('.ant-input');
		await page.waitFor(5000);
		await page.type('.ant-input', "自動卡測試");
		const submitBtn = await page.$$('button[type="button"]');
		await page.evaluate(btn =>
			btn.click(), submitBtn[1]
		);
		await page.waitFor(3000);
		console.log(`It's ${Date()}, New post added`);
		await browser.close();
	  })();
})
