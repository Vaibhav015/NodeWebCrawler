const http = require('http');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
const downloadPage = (url='http://linkingnodes.com') => {
	console.log('downloading', url)
	const fetchPage = (url, callback) => {
		http.get(url, (response) => {
			let buff=''
			response.on('data',(chunk) => {
				buff += chunk
			})
			response.on('end', ()=>{
				callback(null, buff)
			})

		}).on('error', (error)=>{
			console.error('Got error: ${error.message}')
			callback(error)
		})
	}
	const folderName = uuidv1()
	fs.mkdirSync(folderName)
	fetchPage(url, (error, data)=>{
		if(error) return console.log(error)
			fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)
		fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data)
		console.log('downloading is done in new folder', folderName)
	})
}
downloadPage(process.argv[2])