const axios = require('axios');
const fs = require('fs');
const request = require('request');
const path = require('path');

const baseURL = "https://api.lolicon.app/setu/v2";
const fileDr = '/Users/yangchen/downloads/mirai-console/data/net.mamoe.mirai-api-http/images'

async function download(url, dest) {
	/* Create an empty file where we can save data */
	const file = fs.createWriteStream(dest);

	/* Using Promises so that we can use the ASYNC AWAIT syntax */
	await new Promise((resolve, reject) => {
		request({
			/* Here you should specify the exact link to the file you are trying to download */
			uri: url,
			gzip: true,
		})
				.pipe(file)
				.on('finish', async () => {
					console.log(`The file is finished downloading.`);
					resolve();
				})
				.on('error', (error) => {
					reject(error);
				});
	})
			.catch((error) => {
				console.log(`Something happened: ${error}`);
			});
}

async function processCommand({ command }) {
	if (command === "ACG") {
		// query pic info from lolicon api
		// TODO: options support
		const { data } = await axios({
			baseURL,
			method: 'POST',
		})

		// download from pixiv api
		// TODO: multi-pic support
		// TODO: send pic info
		for (pic of data.data) {
			console.log(pic)
			const ext = pic.ext
			const title = pic.title
			const name = `${title}.${ext}`
			const url = pic.urls.original.replace("i.pixiv.cat", "pixivi.sakuralo.top")
			await download(url, path.join(fileDr, name))
			
			return [{type: 'Image', path: name}]
		}
	}
}

module.exports = {
	processCommand,
}