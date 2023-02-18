const axios = require('axios')
const fetch = require('node-fetch')
const linkfy = require('linkifyjs')
const fs = require('fs')

function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
}

function dataAtualFormatadaMod(addmes){
    if(!addmes) return dataAtualFormatada()
    if(isNaN(addmes)) return dataAtualFormatada()
    var data = new Date()
    data.setMonth(addmes + data.getMonth())
    dia = data.getDate().toString().padStart(2, '0')
    mes = (data.getMonth()+1).toString().padStart(2, '0')
    ano = data.getFullYear()
    return dia+"/"+mes+"/"+ano;
}
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})

const isUrl = (url) => {
    if(linkfy.find(url)[0]) return true
    return false
}

const allkeyslist = async () => {
    const databasekeyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
    const databasekeysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
    let limitadas = []
    let ilimitadas = []
    for(i = 0; i < databasekeyslimited.length; ++i) {
        limitadas.push(databasekeyslimited[i])
    }
    for(i = 0; i < databasekeysunlimited.length; ++i) {
        ilimitadas.push(databasekeysunlimited[i])
    }
    let all = {
        limitadas,
        ilimitadas
    }
    return all
}

function generateaccess() {
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    string_length = 20;
    randomstring = '';
    for ( i = 0; i < string_length; i++) {
        rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring
}

function genTokenFnf(length = 20) {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
            'abcdefghijklmnopqrstuvwxyz0123456789';
      
    for (let i = 1; i <= length; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
          
        pass += str.charAt(char)
    }
      
    return pass;
}
module.exports = { genTokenFnf, generateaccess, allkeyslist, dataAtualFormatada, dataAtualFormatadaMod, getBuffer, getRandom, fetchJson, isUrl }
