const express = require('express')
const bodyParser = require('body-parser');
const canvas = require('discord-canvas')
const fetch = require('node-fetch')
const googleIt = require('google-it')
const { fakerBr } = require('js-brasil')
const Quotes = require("randomquote-api");
const Lunicode = require('lunicode')
const fileupload = require('express-fileupload')
const lyrics = require("music-lyrics"); 
const webp = require('webp-converter')
const uber = require('uberduck-api')
const DIG = require("discord-image-generation");
const porn = require('@justalk/pornhub-api')
const canvacord = require("canvacord");
const textpro = require('./lib/textpro')
const { Swiftcord } = require("swiftcord");
const cord = new Swiftcord();
const tf = require('@tensorflow/tfjs-node')
const linkfy = require('linkifyjs')
const cron = require('node-cron')
const youtube = require('scrape-youtube')
const {Maker} = require('imagemaker.js')
const covid = require('novelcovid');
const { rastrearEncomendas, consultarCep } = require('correios-brasil')
const NekosLife = require('nekos.life')
const HMfull = require('hmfull')
const { uberduck } = require('./lib/uberduck')
const { Youtube } = require('ytdownloader.js')
const geo = require('node-open-geocoder')
const cheerio = require('cheerio')
const gm = require('gm').subClass({imageMagick: true})
const axios = require('axios').default
const neko = new NekosLife()
const FormData = require('form-data')
const LolisLife = require('lolis.life')
const loli = new LolisLife()
const util = require('util')
const execute = util.promisify(require('child_process').exec)
const PORT = process.env.PORT || 80;
const fs = require('fs')
const translate = require('translatte')
const app = express()
const fml = require('random-fmls');
const gplay = require('google-play-scraper')
const tinyurl = require('tinyurl');
const gis = require('g-i-s');
const nsfw = require('nsfwjs')
const tiktok = require('@pterko/tiktok-scraper')
const facedetect = require('./lib/facedetect')
const ejectamong = require('./lib/among/among')
const ytdown = require('./lib/yt')
const { CanvasTextWrapper } = require('canvas-text-wrapper');
const GIFEncoder = require('gifencoder');
const { createCanvas, registerFont, loadImage } = require('canvas');
const ezgifz = require('./lib/ezgif')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://brizas-api:brizaloka-api@cluster0.i0ula.mongodb.net/apikeys?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const { getInfoPhone, searchPhone } = require('./lib/tudocelular')
const { instagramDownloader } = require('./lib/instagram');
const { getUrlTiktok } = require('./lib/tiktok');

function fmtMSS(s){
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    return result
}
app.use(fileupload())
app.use(bodyParser.urlencoded({ extended: true }));
var host = process.env.HOST || `http://localhost:${PORT}`
var getvideoid = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var supremeapikey = 370769
const usedApi = new Set()
const isUsedApi = (ip) => !!usedApi.has(ip)
const addUsedApi = (ip) => {
    usedApi.add()
    setTimeout(() => usedApi.delete(ip), 2000)
}

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
async function updaterequest() {
    const getcount = await client.db('CountRequest').collection('req_count').find({}).toArray()
    await fs.writeFileSync('./database/req_count.json', JSON.stringify(getcount, null, 2) + '\n')
    const atual_count = JSON.parse(fs.readFileSync('./database/req_count.json'))
    client.db('CountRequest').collection('req_count').updateMany( {
        request_totais: atual_count[0].request_totais,
    }, { $set: { request_totais: atual_count[0].request_totais += 1, }
    })
    fs.writeFileSync('./database/req_count.json', JSON.stringify(atual_count, null, 2) + '\n')
}
async function ipcheck(ip) {
    if(!isUsedApi(ip)) {
        addUsedApi(ip)
        return true
    } else return false
}
async function checkapikey(apikey) {
    const databasekeyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
    const databasekeysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
    const listapikeyslimited = []
    const listapikeysunlimited = []
    for(i = 0; i < databasekeyslimited.length ; ++i) {
        listapikeyslimited.push(databasekeyslimited[i].info.apikey)
    }
    for(i = 0; i< databasekeysunlimited.length ; ++i) {
        listapikeysunlimited.push(databasekeysunlimited[i].info.apikey)
    }
    if(listapikeysunlimited.indexOf(apikey) >= 0) {
        await updaterequest()
        return true
    } else if(listapikeyslimited.indexOf(apikey) >= 0) {
        n = listapikeyslimited.indexOf(apikey)
        if(databasekeyslimited[n].info.request_rest <= 0) return false
        await client.db('apikeyslimited').collection('apikeyslimited').updateMany({
            info: {
                usuario: databasekeyslimited[n].info.usuario,
                apikey: databasekeyslimited[n].info.apikey,
                limit_request: databasekeyslimited[n].info.limit_request,
                request_rest: databasekeyslimited[n].info.request_rest
            },
            data: databasekeyslimited[n].data
        },{ $set : {
            info: {
                usuario: databasekeyslimited[n].info.usuario,
                apikey: databasekeyslimited[n].info.apikey,
                limit_request: databasekeyslimited[n].info.limit_request,
                request_rest: databasekeyslimited[n].info.request_rest - 1 
            },
            data: databasekeyslimited[n].data
        }})
        databasekeyslimited[n].info.request_rest -= 1 
        fs.writeFileSync('./database/apikeyslimited.json', JSON.stringify(databasekeyslimited, null, 2) + '\n')
        await updaterequest()
        return true
    }
    return false
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
app.use('/css', express.static('css'))
app.use('/site_src', express.static('site_src'))


async function starts() {
    await client.connect()
    async function botstoreapi(){
        app.get('/admin/addbot', async(req, res) => {
            if(req.query.apikey != supremeapikey) return
            res.header("Content-Type",'text/html');
            res.send(fs.readFileSync('./addbot.html'))
        })
        app.get('/brizasapp/botstore', async (req, res) => {
            res.header("Content-Type",'application/json');
            const botstorejson = JSON.parse(fs.readFileSync('./database/botstore.json'))
            res.send(JSON.stringify(botstorejson, null, 2) +'\n')
        })
        app.post('/brizasapp/config/addbot', async (req, res) => {
            let dados = req.body
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(dados.apikey != supremeapikey) return res.send(JSON.stringify({resposta:'Apikey incorreta', status:403}, null, 2)+ '\n')
            if(!dados.bot_name) return res.send(JSON.stringify({resposta:'Insira o nome do bot', status:403}, null, 2)+ '\n')
            if(!dados.creator) return res.send(JSON.stringify({resposta:'Insira o nome do criador', status:403}, null, 2)+ '\n')
            if(!dados.github) return res.send(JSON.stringify({resposta:'Insira o link do github do bot', status:403}, null, 2)+ '\n')
            if(!dados.plataform) return res.send(JSON.stringify({resposta:'Insira a plataforma que o bot funciona', status:403}, null, 2)+ '\n')
            if(!dados.logo_url) return res.send(JSON.stringify({resposta:'Insira a url da logo do bot', status:403}, null, 2)+ '\n')
            if(!dados.cmd) return res.send(JSON.stringify({resposta:'Insira os comandos pra instalar o bot', status:403}, null, 2)+ '\n')
            if(!dados.support) return res.send(JSON.stringify({resposta:'Insira que dispositivo o bot suporta', status:403}, null, 2)+ '\n')
            if(!dados.num_bot) return res.send(JSON.stringify({resposta:'Insira o número oficial do bot', status:403}, null, 2)+ '\n')
            if(!dados.idioma) return res.send(JSON.stringify({resposta:'Insira o idioma do bot', status:403}, null, 2)+ '\n')
            if(!dados.editable) return res.send(JSON.stringify({resposta:'Insira se o bot é editável', status:403}, null, 2)+ '\n')
            if(!dados.size) return res.send(JSON.stringify({resposta:'Insira o tamanho do bot', status:403}, null, 2)+ '\n')
            if(!dados.language) return res.send(JSON.stringify({resposta:'Insira a linguagem de programação do bot', status:403}, null, 2)+ '\n')
            try {
                const botstorejson = JSON.parse(fs.readFileSync('./database/botstore.json'))
                let json_data = {
                    bot_name: dados.bot_name,
                    creator: dados.creator,
                    support: dados.support,
                    github_bot: dados.github,
                    idioma: dados.idioma,
                    num_bot: dados.num_bot,
                    plataform: dados.plataform,
                    url_logo: dados.logo_url,
                    command: dados.cmd,
                    editable: dados.editable,
                    size: dados.size,
                    language: dados.language

                }
                botstorejson.push(json_data)
                await client.db('BotStore').collection('BotStore').insertOne(json_data)
                fs.writeFileSync('./database/botstore.json', JSON.stringify(botstorejson, null, 2) +'\n')
                res.send(JSON.stringify({
                    resposta: 'Bot adicionado com sucesso na bot store!',
                    infos: json_data,
                    status: 200
                }, null, 2) + '\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Não foi possivel adicionar o bot',
                    status:404
                }, null, 2) + '\n')
            }
        })
        app.get('/brizasapp/config/rmbot', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(dados.apikey != supremeapikey) return res.send(JSON.stringify({resposta:'Apikey incorreta', status:403}, null, 2)+ '\n')
            if(!dados.bot_name) return res.send(JSON.stringify({resposta:'Insira o nome do criador', status:403}, null, 2)+ '\n')
            try {
                const botstorejson = JSON.parse(fs.readFileSync('./database/botstore.json'))
                const bot_name = []
                for(i = 0; i < botstorejson.length; ++i) bot_name.push(botstorejson[i].bot_name)
                var pos = bot_name.indexOf(dados.bot_name)
                if(pos < 0) return res.send(JSON.stringify({resposta:'Não foi encontrado nenhum bot com esse nome', status:403}, null, 2)+ '\n')
                let json_data = {
                    bot_name: botstorejson[pos].bot_name,
                    creator: botstorejson[pos].creator,
                    support: botstorejson[pos].support,
                    num_bot: botstorejson[pos].num_bot,
                    github_bot: botstorejson[pos].github_bot,
                    idioma: botstorejson[pos].idioma,
                    plataform: botstorejson[pos].plataform,
                    url_logo: botstorejson[pos].url_logo,
                    command: botstorejson[pos].command,
                    editable: botstorejson[pos].editable,
                    size: botstorejson[pos].size,
                    language: botstorejson[pos].language
                }
                await client.db('BotStore').collection('BotStore').deleteMany(json_data)
                await res.send(JSON.stringify({
                    resposta: 'Apikey removida com sucesso!',
                    infos: json_data
                }, null, 2) + '\n')
                botstorejson.splice(pos, 1)
                fs.writeFileSync('./database/botstore.json', JSON.stringify(botstorejson, null, 2) +'\n')
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Não foi possivel adicionar uma apikey'
                }, null, 2) + '\n')
            }
        })
    }
    async function imitadorapi() {
        app.get('/imitar/negobam', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Fale o texto que deseja', status:403}, null, 2)+ '\n')
            try {
                buff_audio = await uberduck('nego-bam', dados.text)
                res.header("Content-Type",'audio/wav');
                await res.send(buff_audio)
            } catch {
                res.send(JSON.stringify({resposta: 'Falha ao gerar audio', status:404}, null, 2))
            }
        })
        app.get('/imitar/leoncio', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Fale o texto que deseja', status:403}, null, 2)+ '\n')
            try {
                buff_audio = await uberduck('wally-walrus-br', dados.text)
                res.header("Content-Type",'audio/wav');
                await res.send(buff_audio)
            } catch {
                res.send(JSON.stringify({resposta: 'Falha ao gerar audio', status:404}, null, 2))
            }
        })
        app.get('/imitar/chapolin', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Fale o texto que deseja', status:403}, null, 2)+ '\n')
            try {
                buff_audio = await uberduck('chapolin-br', dados.text)
                res.header("Content-Type",'audio/wav');
                await res.send(buff_audio)
            } catch {
                res.send(JSON.stringify({resposta: 'Falha ao gerar audio', status:404}, null, 2))
            }
        })
        app.get('/imitar/eminem', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Fale o texto que deseja', status:403}, null, 2)+ '\n')
            try {
                buff_audio = await uberduck('eminem', dados.text)
                res.header("Content-Type",'audio/wav');
                await res.send(buff_audio)
            } catch {
                res.send(JSON.stringify({resposta: 'Falha ao gerar audio', status:404}, null, 2))
            }
        })
        app.get('/imitar/orochinho', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Fale o texto que deseja', status:403}, null, 2)+ '\n')
            try {
                buff_audio = await uberduck('orochinho', dados.text)
                res.header("Content-Type",'audio/wav');
                await res.send(buff_audio)
            } catch {
                res.send(JSON.stringify({resposta: 'Falha ao gerar audio', status:404}, null, 2))
            }
        })
        app.get('/imitar/ibere', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Fale o texto que deseja', status:403}, null, 2)+ '\n')
            try {
                buff_audio = await uberduck('ibere', dados.text)
                res.header("Content-Type",'audio/wav');
                await res.send(buff_audio)
            } catch {
                res.send(JSON.stringify({resposta: 'Falha ao gerar audio', status:404}, null, 2))
            }
        })
    }
    async function conversorapi() {
        app.get('/conversor/gifopt', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                axios.get(`https://ezgif.com/optimize?url=${dados.img}`).then(({ data }) => {
                    const $ = cheerio.load(data)
                    const bodyFormThen = new FormData()
                    const file = $('input[name="file"]').attr('value')
                    const token = $('input[name="token"]').attr('value')
                    const convert = $('input[name="file"]').attr('value')
                    const gotdata = {
                        file: file,
                        token: token,
                        convert: convert
                    }
                    bodyFormThen.append('file', gotdata.file)
                    bodyFormThen.append('token', gotdata.token)
                    bodyFormThen.append('convert', gotdata.convert)
                    axios({
                        method: 'post',
                        url: 'https://ezgif.com/optimize/' + gotdata.file,
                        data: bodyFormThen,
                        headers: {
                                'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                        }
                    }).then(({ data }) => {
                        const $ = cheerio.load(data)
                        const result = 'https:' + $('div#output > p.outfile > img').attr('src')
                        const oldsize = $('p.filestats > strong')[0].children[0].data
                        const newsize = $('p.filestats > strong')[1].children[0].data
                        const optporcent = $('p.filestats > span')[1].children[0].data.includes('%') ? $('p.filestats > span')[1].children[0].data : '0%'
                        const jsonres = {
                            url: result,
                            old_size: oldsize,
                            new_size: newsize,
                            porcent_opt: optporcent
                        }
                        res.send(JSON.stringify(jsonres, null, 2) + '\n')
                    })
                })
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/jpgopt', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                axios.get(`https://ezgif.com/optijpeg?url=${dados.img}`).then(({ data }) => {
                    const $ = cheerio.load(data)
                    const bodyFormThen = new FormData()
                    const file = $('input[name="file"]').attr('value')
                    const token = $('input[name="token"]').attr('value')
                    const convert = $('input[name="file"]').attr('value')
                    const gotdata = {
                        file: file,
                        token: token,
                        convert: convert
                    }
                    bodyFormThen.append('file', gotdata.file)
                    bodyFormThen.append('token', gotdata.token)
                    bodyFormThen.append('convert', gotdata.convert)
                    axios({
                        method: 'post',
                        url: 'https://ezgif.com/optijpeg/' + gotdata.file,
                        data: bodyFormThen,
                        headers: {
                                'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                        }
                    }).then(({ data }) => {
                        const $ = cheerio.load(data)
                        const result = 'https:' + $('div#output > p.outfile > img').attr('src')
                        const oldsize = $('p.filestats > strong')[0].children[0].data
                        const newsize = $('p.filestats > strong')[1].children[0].data
                        const optporcent = $('p.filestats > span')[1].children[0].data.includes('%') ? $('p.filestats > span')[1].children[0].data : '0%'
                        const jsonres = {
                            url: result,
                            old_size: oldsize,
                            new_size: newsize,
                            porcent_opt: optporcent
                        }
                        res.send(JSON.stringify(jsonres, null, 2) + '\n')
                    })
                })
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/pngopt', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                axios.get(`https://ezgif.com/optipng?url=${dados.img}`).then(({ data }) => {
                    const $ = cheerio.load(data)
                    const bodyFormThen = new FormData()
                    const file = $('input[name="file"]').attr('value')
                    const token = $('input[name="token"]').attr('value')
                    const convert = $('input[name="file"]').attr('value')
                    const gotdata = {
                        file: file,
                        token: token,
                        convert: convert
                    }
                    bodyFormThen.append('file', gotdata.file)
                    bodyFormThen.append('token', gotdata.token)
                    bodyFormThen.append('convert', gotdata.convert)
                    axios({
                        method: 'post',
                        url: 'https://ezgif.com/optipng/' + gotdata.file,
                        data: bodyFormThen,
                        headers: {
                                'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                        }
                    }).then(({ data }) => {
                        const $ = cheerio.load(data)
                        const result = 'https:' + $('div#output > p.outfile > img').attr('src')
                        const oldsize = $('p.filestats > strong')[0].children[0].data
                        const newsize = $('p.filestats > strong')[1].children[0].data
                        const optporcent = $('p.filestats > span')[1].children[0].data
                        const jsonres = {
                            url: result,
                            old_size: oldsize,
                            new_size: newsize,
                            porcent_opt: optporcent
                        }
                        res.send(JSON.stringify(jsonres, null, 2) + '\n')
                    })
                })
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/svgtojpg', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/jpg');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/svg-to-jpg/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/svgtopng', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/png');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/svg-to-png/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/jpgtopng', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/png');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/jpg-to-png/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/pngtojpg', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/jpg');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/png-to-jpg/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/giftowebp', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/gif-to-webp/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/webptogif', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/gif');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/webp-to-gif/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/webptomp4', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'video/mp4');
                buff = await getBuffer((await ezgifz.ezgifvid('https://ezgif.com/webp-to-mp4/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/mp4towebp', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url do video para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/video-to-webp/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/pngtowebp', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/png-to-webp/', dados.img)))
                res.send(buff)
            } catch {
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/jpgtowebp', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                buff = await getBuffer((await ezgifz.ezgifimg('https://ezgif.com/jpg-to-webp/', dados.img)))
                res.send(buff)
            } catch {
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/conversor/giftomp4', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para converter', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'video/mp4');
                buff = await getBuffer((await ezgifz.ezgifvid('https://ezgif.com/gif-to-mp4/', dados.img)))
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
    }
    async function registerapi() {
        app.post('/apikey/change', async (req, res) => {
            let dados = req.body
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({success: false, resposta: 'Diga a sua apikey atual'}, null, 2) +'\n')
            if(dados.apikey == 'brizaloka') return res.send(JSON.stringify({success: false, resposta: 'Essa apikey não está disponível para a mudança'}))
            if(!dados.newapikey) return res.send(JSON.stringify({success: false, resposta: 'Diga a apikey que deseja mudar'}, null, 2) +'\n')
            if(!dados.newapikey == 'SUAKEY') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'sua key') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'suakey') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'SUA KEY') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.user) return res.send(JSON.stringify({success: false, resposta: 'Diga seu nome de usuário'}, null, 2) +'\n')
            const keyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const keysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            const users_un = []
            const users_lim = []
            var is_not_register = true
            for(let obj of keysunlimited) {
                users_un.push(obj.info.usuario)
            }
            for(let obj of keyslimited) {
                users_lim.push(obj.info.usuario)
            }
            if(users_un.indexOf(dados.user) >= 0) is_not_register = false
            if(users_lim.indexOf(dados.user) >= 0) is_not_register = false 
            if(is_not_register) return res.send(JSON.stringify({success: false, resposta: 'Usuário não encontrado'}, null, 2 ) + '\n')
            var un_ind = users_un.indexOf(dados.user)
            var lim_ind = users_lim.indexOf(dados.user)
            try {
                if(un_ind >= 0) {
                    var obj = keysunlimited[un_ind]
                    if(keysunlimited[un_ind].info.apikey != dados.apikey) return res.send(JSON.stringify({success: false, resposta: 'Apikey não é do usuário'}, null, 2) + '\n')
                    if(keysunlimited[un_ind].info.apikey == dados.newapikey) return res.send(JSON.stringify({success: false, resposta: 'Apikey nova possui o mesmo nome que a atual'}, null, 2) + '\n')
                    await client.db('apikeys').collection('apikeys').updateMany({
                        info: {
                            usuario: keysunlimited[un_ind].info.usuario,
                            apikey: dados.apikey
                        }
                    }, {
                        $set: {
                            info: {
                                usuario: keysunlimited[un_ind].info.usuario,
                                apikey: dados.newapikey
                            }
                        }
                    })
                    keysunlimited[un_ind].info.apikey = dados.newapikey
                    fs.writeFileSync('./database/apikeys.json', JSON.stringify(keysunlimited, null, 2) + '\n')
                    res.send(JSON.stringify({success: true, resposta: 'Apikey alterada com sucesso!'}))
                } else if(lim_ind >= 0) {
                    var obj = keyslimited[lim_ind]
                    if(obj.info.apikey != dados.apikey) return res.send(JSON.stringify({success: false, resposta: 'Apikey não é do usuário'}, null, 2) + '\n')
                    if(obj.info.apikey == dados.newapikey) return res.send(JSON.stringify({success: false, resposta: 'Apikey nova possui o mesmo nome que a atual'}, null, 2) + '\n')
                    await client.db('apikeyslimited').collection('apikeyslimited').updateMany({
                        info: {
                            usuario: keyslimited[lim_ind].info.usuario,
                            apikey: dados.apikey,
                            limit_request: keyslimited[lim_ind].info.limit_request,
                            request_rest: keyslimited[lim_ind].info.request_rest
                        }
                    }, {
                        $set: {
                            info: {
                                usuario: keyslimited[lim_ind].info.usuario,
                                apikey: dados.newapikey,
                                limit_request: keyslimited[lim_ind].info.limit_request,
                                request_rest: keyslimited[lim_ind].info.request_rest
                            }
                        }
                    })
                    keyslimited[lim_ind].info.apikey = dados.newapikey
                    fs.writeFileSync('./database/apikeyslimited.json', JSON.stringify(keyslimited, null, 2) + '\n')
                    res.send(JSON.stringify({success: true, resposta: 'Apikey alterada com sucesso!'}))
                } else return res.send(JSON.stringify({success: false, resposta: 'Falha ao mudar sua apikey'}, null, 2) + '\n')
            } catch(e) {
                console.log(e)
            }
        })
        app.post('/apikey/add', async(req, res) => {
            let dados = req.body
            res.header("Content-Type",'application/json');
            const access_keys = JSON.parse(fs.readFileSync('./database/access_keys.json'))
            const keyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const keysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            const keys_user = []
            const check_keys = []
            for(let obj of access_keys) {
                check_keys.push(obj.access_key)
            }
            for(let obj of keyslimited) {
                keys_user.push(obj.info.usuario)
                keys_user.push(obj.info.apikey)
            }
            for(let obj of keysunlimited){
                keys_user.push(obj.info.usuario)
                keys_user.push(obj.info.apikey)
            }
            console.log(dados)
            if(!dados.access_key) return res.send(JSON.stringify({success: false, resposta: 'Falta a chave de acesso'}, null, 2) +'\n')
            if(!dados.newapikey) return res.send(JSON.stringify({success: false, resposta: 'Falta a apikey'}, null, 2) +'\n')
            if(!dados.newapikey == 'SUAKEY') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'sua key') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'suakey') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'SUA KEY') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.user) return res.send(JSON.stringify({success: false, resposta: 'Falta o usuário'}, null, 2) +'\n')
            if(dados.user.length < 6 && dados.user.length > 15) return res.send(JSON.stringify({success: false, resposta: '6 caracteres minimos do usuário e 14 no máximo'}, null, 2) +'\n')
            if(dados.newapikey.length < 6 && dados.newapikeylength > 15) return res.send(JSON.stringify({success: false, resposta: '6 caracteres minimos da apikey e 14 no máximo'}, null, 2) +'\n')
            if(check_keys.indexOf(dados.access_key) < 0) return res.send(JSON.stringify({success: false, resposta: 'Chave de acesso inválida'}, null, 2) +'\n')
            if(keys_user.indexOf(dados.newapikey) >= 0) return res.send(JSON.stringify({success: false, resposta: 'Usuário ou apikey inválidos'}, null, 2) +'\n')
            if(keys_user.indexOf(dados.user) >= 0) return res.send(JSON.stringify({success: false, resposta: 'Usuário ou apikey inválidos'}, null, 2) +'\n')
            try {
                var ind = check_keys.indexOf(dados.access_key)
                var is_unlimited = (access_keys[ind].limit) ? false : true
                var valid_expire = access_keys[ind].months_add ? access_keys[ind].months_add : 0
                if(is_unlimited) {
                    if(access_keys.length < 1) {
                        await client.db('AcessKeys').collection('AcessKeys').deleteMany({})
                        access_keys.splice(ind, 1)
                    } else {
                        await client.db('AcessKeys').collection('AcessKeys').deleteOne({
                            access_key: access_keys[ind].access_key,
                            ilimitada: access_keys[ind].ilimitada,
                            data: access_keys[ind].data,
                            months_add: access_keys[ind].months_add
                        })
                        access_keys.splice(ind, 1)
                    }
                    fs.writeFileSync('./database/access_keys.json', JSON.stringify(access_keys, null, 2) + '\n')
                    axios.get(`${host}/config/addkey/unlimited?apikey=${supremeapikey}&user=${dados.user}&newapikey=${dados.newapikey}&valid=${valid_expire}`)
                    res.send(JSON.stringify({success:true, resposta: `Usuário: ${dados.user}\n Apikey: ${dados.newapikey}`}))
                } else {
                    var limit = access_keys[ind].limit
                    if(access_keys.length < 1) {
                        await client.db('AcessKeys').collection('AcessKeys').deleteMany({})
                    } else {
                        await client.db('AcessKeys').collection('AcessKeys').deleteMany(access_keys[ind])
                    }
                    access_keys.splice(ind, 1)
                    fs.writeFileSync('./database/access_keys.json', JSON.stringify(access_keys, null, 2) + '\n')
                    await axios.get(`${host}/config/addkey/limited?apikey=${supremeapikey}&user=${dados.user}&newapikey=${dados.newapikey}&limit=${limit}`)
                    res.send(JSON.stringify({success:true, resposta: `Usuário: ${dados.user}\n Apikey: ${dados.newapikey}\n Limite: ${limit}`}))
                }
            } catch(e) {
                console.log(e)
            }
        })
        app.get('/apikey/add', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            const access_keys = JSON.parse(fs.readFileSync('./database/access_keys.json'))
            const keyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const keysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            const keys_user = []
            const check_keys = []
            for(let obj of access_keys) {
                check_keys.push(obj.access_key)
            }
            for(let obj of keyslimited) {
                keys_user.push(obj.info.usuario)
                keys_user.push(obj.info.apikey)
            }
            for(let obj of keysunlimited){
                keys_user.push(obj.info.usuario)
                keys_user.push(obj.info.apikey)
            }
            console.log(dados)
            if(!dados.access_key) return res.send(JSON.stringify({success: false, resposta: 'Falta a chave de acesso'}, null, 2) +'\n')
            if(!dados.newapikey) return res.send(JSON.stringify({success: false, resposta: 'Falta a apikey'}, null, 2) +'\n')
            if(!dados.newapikey == 'SUAKEY') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'sua key') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'suakey') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.newapikey == 'SUA KEY') return res.send(JSON.stringify({success: false, resposta: 'Nome de apikey inválida'}, null, 2) +'\n')
            if(!dados.user) return res.send(JSON.stringify({success: false, resposta: 'Falta o usuário'}, null, 2) +'\n')
            if(dados.user.length < 6 && dados.user.length > 15) return res.send(JSON.stringify({success: false, resposta: '6 caracteres minimos do usuário e 14 no máximo'}, null, 2) +'\n')
            if(dados.newapikey.length < 6 && dados.newapikeylength > 15) return res.send(JSON.stringify({success: false, resposta: '6 caracteres minimos da apikey e 14 no máximo'}, null, 2) +'\n')
            if(check_keys.indexOf(dados.access_key) < 0) return res.send(JSON.stringify({success: false, resposta: 'Chave de acesso inválida'}, null, 2) +'\n')
            if(keys_user.indexOf(dados.newapikey) >= 0) return res.send(JSON.stringify({success: false, resposta: 'Usuário ou apikey inválidos'}, null, 2) +'\n')
            if(keys_user.indexOf(dados.user) >= 0) return res.send(JSON.stringify({success: false, resposta: 'Usuário ou apikey inválidos'}, null, 2) +'\n')
            try {
                var ind = check_keys.indexOf(dados.access_key)
                var is_unlimited = (access_keys[ind].limit) ? false : true
                var valid_expire = access_keys[ind].months_add ? access_keys[ind].months_add : 0
                if(is_unlimited) {
                    if(access_keys.length < 1) {
                        await client.db('AcessKeys').collection('AcessKeys').deleteMany({})
                        access_keys.splice(ind, 1)
                    } else {
                        await client.db('AcessKeys').collection('AcessKeys').deleteOne({
                            access_key: access_keys[ind].access_key,
                            ilimitada: access_keys[ind].ilimitada,
                            data: access_keys[ind].data,
                            months_add: access_keys[ind].months_add
                        })
                        access_keys.splice(ind, 1)
                    }
                    fs.writeFileSync('./database/access_keys.json', JSON.stringify(access_keys, null, 2) + '\n')
                    axios.get(`${host}/config/addkey/unlimited?apikey=${supremeapikey}&user=${dados.user}&newapikey=${dados.newapikey}&valid=${valid_expire}`)
                    res.send(JSON.stringify({success:true, resposta: `Usuário: ${dados.user}\n Apikey: ${dados.newapikey}`}))
                } else {
                    var limit = access_keys[ind].limit
                    if(access_keys.length < 1) {
                        await client.db('AcessKeys').collection('AcessKeys').deleteMany({})
                    } else {
                        await client.db('AcessKeys').collection('AcessKeys').deleteMany(access_keys[ind])
                    }
                    access_keys.splice(ind, 1)
                    fs.writeFileSync('./database/access_keys.json', JSON.stringify(access_keys, null, 2) + '\n')
                    await axios.get(`${host}/config/addkey/limited?apikey=${supremeapikey}&user=${dados.user}&newapikey=${dados.newapikey}&limit=${limit}`)
                    res.send(JSON.stringify({success:true, resposta: `Usuário: ${dados.user}\n Apikey: ${dados.newapikey}\n Limite: ${limit}`}))
                }
            } catch(e) {
                console.log(e)
            }
        })
        app.get('/login', async (req, res) => {
            res.header("Content-Type",'text/html');
            res.send(fs.readFileSync('./login.html'))
        })
        app.get('/register', async (req, res) => {
            res.header("Content-Type",'text/html');
            res.send(fs.readFileSync('./register.html'))
        })
        app.get('/generate_access', async(req, res) => {
            let dados = req.query
            var data_expire
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(dados.apikey != supremeapikey) return res.send(JSON.stringify({resposta:'Olá, você não tem permissão a utilizar essa api, se tentar novamente seu ip será banido', status:403}, null, 2)+ '\n')
            if(!dados.valid) data_expire = dataAtualFormatada()
            else data_expire = dataAtualFormatadaMod(parseInt(dados.valid))

            const allaccesskeys = JSON.parse(fs.readFileSync('./database/access_keys.json'))
            var access_generated = generateaccess()
            if(allaccesskeys.indexOf(access_generated) >= 0) return access_generated = generateaccess()
            if(!dados.limit) {
                var datares = {
                    access_key: access_generated,
                    ilimitada: true,
                    data: data_expire,
                    months_add: dados.valid
                }
                allaccesskeys.push(datares)
                await client.db('AcessKeys').collection('AcessKeys').insertOne(datares)
                fs.writeFileSync('./database/access_keys.json', JSON.stringify(allaccesskeys, null, 2)+'\n')
                res.send(JSON.stringify(datares, null, 2)+'\n')
            } else {
                var datares = {
                    access_key: access_generated,
                    limit: parseInt(dados.limit),
                    ilimitada: false,
                    data: data_expire,
                    months_add: 0
                }
                allaccesskeys.push(datares)
                await client.db('AcessKeys').collection('AcessKeys').insertOne(datares)
                fs.writeFileSync('./database/access_keys.json', JSON.stringify(allaccesskeys, null, 2)+'\n')
                res.send(JSON.stringify(datares, null, 2)+'\n')
            }
        })
    }
    async function ttpapi() {
        await registerFont('./fonts/googlesans.ttf', {family: 'Google Sans'})
        await registerFont('./fonts/comfortaa.ttf', {family: 'Comfortaa Bold'})
        await registerFont('./fonts/poppinsbold.ttf', {family: 'Poppins'})
        app.get('/ttp/attp1', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px Arial`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = [
                    'red',
                    'lime',
                    'yellow',
                    'magenta',
                    'cyan'
                ]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/ttp1', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            if(!dados.color) return res.send(JSON.stringify({resposta:'Preciso do da cor em formato hex sem o #', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(-1);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "Google Sans"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = ['#'+dados.color]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
            
        app.get('/ttp/attp2', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "Google Sans"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = [
                    'red',
                    'lime',
                    'yellow',
                    'magenta',
                    'cyan'
                ]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/ttp2', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            if(!dados.color) return res.send(JSON.stringify({resposta:'Preciso do da cor em formato hex sem o #', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "Google Sans"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = ['#'+dados.color]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/attp3', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "Comfortaa Bold"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = [
                    'red',
                    'lime',
                    'yellow',
                    'magenta',
                    'cyan'
                ]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/ttp3', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            if(!dados.color) return res.send(JSON.stringify({resposta:'Preciso do da cor em formato hex sem o #', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "Comfortaa Bold"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = ['#'+dados.color]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/attp4', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "Comic Sans MS"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = [
                    'red',
                    'lime',
                    'yellow',
                    'magenta',
                    'cyan'
                ]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/ttp4', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            if(!dados.color) return res.send(JSON.stringify({resposta:'Preciso do da cor em formato hex sem o #', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "Comic Sans MS"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = ['#'+dados.color]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/attp5', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "sans-serif"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = [
                    'red',
                    'lime',
                    'yellow',
                    'magenta',
                    'cyan'
                ]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/ttp5', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            if(!dados.color) return res.send(JSON.stringify({resposta:'Preciso do da cor em formato hex sem o #', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px "sans-serif"`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = ['#'+dados.color]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/attp6', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px Poppins`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = [
                    'red',
                    'lime',
                    'yellow',
                    'magenta',
                    'cyan'
                ]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
        app.get('/ttp/ttp6', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto', status:403}, null, 2)+ '\n')
            if(!dados.color) return res.send(JSON.stringify({resposta:'Preciso do da cor em formato hex sem o #', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image/webp');
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                const encoder = new GIFEncoder(512, 512);
                encoder.createReadStream().pipe(fs.createWriteStream(ran)).on('finish',async () => {
                    const result = webp.gwebp(ran,rano,"-q 80",logging="-v");
                    result.then(async (response) => {
                        await res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    }).catch(async err => {
                        await res.header("Content-Type",'application/json');
                        res.send(JSON.stringify({
                            resposta: 'Falha ao fazer attp'
                        }))
                    })
                })
                encoder.start();
                encoder.setRepeat(0);
                encoder.setDelay(120);
                encoder.setQuality(80);
                encoder.setTransparent('0x000000')
                const canvas = createCanvas(512, 512);
                const ctx = canvas.getContext('2d')
                const options = {
                    font: `${canvas.width * (38 / canvas.width)}px Poppins`,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    allowNewLine: true,
                    lineBreak: 'auto',
                    sizeToFill: true,
                    lineHeight: 80,
                }
                const color = ['#'+dados.color]
                for (let i = 0; i < color.length; i++) {
                    ctx.fillStyle = color[i];
                    CanvasTextWrapper(canvas, dados.text, options);
                    encoder.addFrame(ctx)
                }
                encoder.finish()
                
            } catch {
                res.send(JSON.stringify({resposta:'Falha ao fazer imagem', status:403}, null, 2)+ '\n')
            }

        })
    }
    async function uploadsapi() {
        app.post('/upload/image', async (req, res) => {
            let dados = req.body
            let media = req.files
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!media) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(!media.image) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(!media.image.mimetype.includes('image')) return res.send(JSON.stringify({resposta:'Apenas imagem', status:403}, null, 2)+ '\n')
            var ran = getRandom('.'+media.image.name.split('.')[1])
            fs.writeFileSync(ran, media.image.data)
            var json = {
                resultado: {
                    link: await tinyurl.shorten(`${host}/upload/image?imgname=${ran}`),
                    filename: ran,
                    download_time: '7seg'
                },
                status: 200
            }
            res.send(JSON.stringify(json, null, 2) + '\n')

        })
        app.get('/upload/image', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.imgname) return res.send(JSON.stringify({resposta:'Preciso do nome da imagem', status:403}, null, 2)+ '\n')
            if(!fs.existsSync(dados.imgname)) return res.send(JSON.stringify({resposta:'Imagem não encontrada no servidor', status:403}, null, 2)+ '\n')
            try {
                await res.header("Content-Type",'image');
                var buffer = await fs.readFileSync(dados.imgname)
                await res.send(buffer)
                setTimeout(() => {
                    fs.unlinkSync(dados.imgname)
                }, 30000)
            } catch {
                res.send(JSON.stringify({resposta:'Imagem não encontrada no servidor', status:403}, null, 2)+ '\n')
            }

        })
    }
    async function iaapis() {
        app.get('/ia/lyricsfinder', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Preciso do nome da música pra achar a letra', status:403}, null, 2)+ '\n')
            try {
                const lyric = await lyrics.search(dados.query);
                res.send(JSON.stringify({lyrics: lyric, status: 200}, null, 2) + '\n')
            } catch (error) {
                console.log("Unknow lyric.");
            }
        })
        app.get('/ia/facedetect', async(req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem para scanear', status:403}, null, 2)+ '\n')
            try {
                buff = await getBuffer(dados.img)
                ran = getRandom('.png')
                facedetect(buff, ran).then(async (result, err) => {
                    res.send(JSON.stringify({
                        img_result: await tinyurl.shorten(`${host}/upload/image?imgname=lib/${ran}`),
                        detects_faces: result
                    }, null, 2)+'\n')
                })
            } catch {
                res.status(404).send(JSON.stringify({
                    result:'Erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        
        app.get('/ia/simsimi', async(req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto para scanear', status:403}, null, 2)+ '\n')
            try {
                var anu = await fetchJson(`https://simsimi.info/api/?text=${dados.text}&lc=pt`)
                if(!anu.ok) { 
                    res.status(404).send(JSON.stringify({
                        result:'erro ao enviar simsimi',
                        status: 404
                    }, null, 2) + '\n')
                } else {
                    res.send(JSON.stringify({
                        resultado: {
                            pergunta: dados.text,
                            resposta: anu.message
                        },
                        status: 200
                    }, null, 2) + '\n')
                }
            } catch {
                try{
                    var anu = await fetchJson(`https://api.simsimi.net/v2/?text=${dados.text}&lc=pt&cf=false`)
                    console.log(anu);
                    if(!anu.success) { 
                        res.status(404).send(JSON.stringify({
                            result:'erro ao enviar simsimi',
                            status: 404
                        }, null, 2) + '\n')
                    } else {
                        res.send(JSON.stringify({
                            resultado: {
                                pergunta: dados.text,
                                resposta: anu.success
                            },
                            status: 200
                        }, null, 2) + '\n')
                    }
                } catch {
                    res.send(JSON.stringify({
                        resultado: {
                            pergunta: dados.text,
                            resposta: 'Simi não sabe'
                        },
                        status: 404
                    }, null, 2) + '\n')
                }
            }
        })
        app.get('/ia/linkdetect', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do texto para scanear', status:403}, null, 2)+ '\n')
            try {
                const isLink = isUrl(dados.text)
                res.send(JSON.stringify({
                    resultado: {
                        is_link: isLink,
                        texto: dados.text
                    },
                    status: 200
                }))
            } catch {
                res.status(404).send(JSON.stringify({
                    result:'erro ao enviar simsimi',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/ia/porndetect', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem', status:403}, null, 2)+ '\n')
            try {
                const pic = await axios.get(dados.img, {
                    responseType: 'arraybuffer',
                })
                const model = await nsfw.load()
                const image = await tf.node.decodeImage(pic.data,3)
                const predictions = await model.classify(image)
                image.dispose()
                var classnames = []
                for(i=0 ;i < predictions.length; ++i) {
                    classnames.push(predictions[i].className)
                }
                var porni = classnames.indexOf('Porn')
                var hentaii = classnames.indexOf('Hentai')
                var neutrali = classnames.indexOf('Neutral')
                var drawingi = classnames.indexOf('Drawing')
                var sexyi = classnames.indexOf('Sexy')
                var pornvalue = predictions[porni].probability.toFixed(2) * 100
                var hentaivalue = predictions[hentaii].probability.toFixed(2) * 100
                var neutralvalue = predictions[neutrali].probability.toFixed(2) * 100
                var drawingvalue = predictions[drawingi].probability.toFixed(2) * 100
                var sexyvalue = predictions[sexyi].probability.toFixed(2) * 100
                res.send(JSON.stringify({
                    probabilidades: {
                        porno: pornvalue+'%',
                        hentai: hentaivalue+'%',
                        neutro: neutralvalue+'%',
                        desenho: drawingvalue+'%',
                        sexy: sexyvalue+'%'
                    },
                    status: 200
                }, null, 2) + '\n')
            } catch {
                res.status(404).send(JSON.stringify({
                    result:'erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/ia/porngifdetect', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Preciso da url da imagem', status:403}, null, 2)+ '\n')
            try {
                const pic = await axios.get(dados.img, {
                    responseType: 'arraybuffer',
                })
                const myConfig = {
                    topk: 1
                }
                const model = await nsfw.load()
                const prediction = await model.classifyGif(pic.data, myConfig);
                var media_porn = 0
                var media_neutral = 0
                var media_drawing = 0
                var media_sexy = 0
                var media_hentai = 0
                var objs_porn = 0
                var objs_neutral = 0
                var objs_drawing = 0
                var objs_sexy = 0
                var objs_hentai = 0
                var all_frames = []
                for(i = 0; i < prediction.length; ++i) {
                    if(prediction[i][0].className == 'Hentai') {
                        media_hentai += prediction[i][0].probability
                        objs_hentai += 1
                    } else if(prediction[i][0].className == 'Porn') {
                        media_porn += prediction[i][0].probability
                        objs_porn += 1
                    } else if(prediction[i][0].className == 'Sexy') {
                        media_sexy += prediction[i][0].probability
                        objs_sexy += 1
                    } else if(prediction[i][0].className == 'Neutral') {
                        media_neutral += prediction[i][0].probability
                        objs_neutral += 1
                    } else if(prediction[i][0].className == 'Drawing') {
                        media_drawing += prediction[i][0].probability
                        objs_drawing += 1
                    }
                    prediction[i][0].probability = (prediction[i][0].probability).toFixed(2)+'%'
                    all_frames.push(prediction[i][0])
                }
                var porn = (media_porn / objs_porn).toFixed(2)
                var hentai = (media_hentai / objs_hentai).toFixed(2)
                var sexy =  (media_sexy / objs_sexy).toFixed(2)
                var neutro = (media_neutral / objs_neutral).toFixed(2)
                var desenho = (media_drawing / objs_drawing).toFixed(2)
                if(porn == 'NaN') porn = 0
                if(hentai == 'NaN') hentai = 0
                if(sexy == 'NaN') sexy = 0
                if(neutro == 'NaN') neutro = 0
                if(desenho == 'NaN') desenho = 0
                
                res.send(JSON.stringify({
                    status: 200,
                    result_media: {
                        porno: (porn * 100).toFixed(2) +'%',
                        hentai: (hentai * 100).toFixed(2) +'%',
                        desenho: (desenho * 100).toFixed(2) +'%',
                        sexy: (sexy * 100).toFixed(2) +'%',
                        neutro: (neutro * 100).toFixed(2) +'%'
                    },
                    frames_media: all_frames
                }, null, 2) + '\n')
            } catch (e){
                console.log(e)
                res.status(404).send(JSON.stringify({
                    result:'erro ao escanear imagem',
                    status: 404
                }, null, 2) + '\n')
            }
        })
    }
    async function principalapis() {
        app.get('/config/listaccesskey', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(dados.apikey != supremeapikey) return res.send(JSON.stringify({resposta:'Olá, você não tem permissão a utilizar essa api, se tentar novamente seu ip será banido', status:403}, null, 2)+ '\n')
            const access_keys = JSON.parse(fs.readFileSync('./database/access_keys.json'))
            let list_access = {
                limitadas: [],
                ilimitada: []
            }
            for(let obj of access_keys) { 
                if(!obj.ilimitada){
                    list_access.limitadas.push(obj)
                } else {
                    list_access.ilimitada.push(obj)
                }
            }
            res.send(JSON.stringify(list_access, null, 2) + '\n')
        })
        app.get('/admin', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.pass) return 
            if(!dados.user) return 
            if(dados.pass != 'toor') return
            if(dados.user != 'retr0') return
            res.header("Content-Type",'text/html');
            res.send(fs.readFileSync('./admin.html'))
        })
        app.get('/count/requests', async (req, res) => {
            res.header("Content-Type",'application/json');
            res.send(fs.readFileSync('./database/req_count.json'))
        })
        app.get('/count/visitors', async (req,res) => {
            res.header("Content-Type",'application/json');
            let dados = req.query
            if(!dados.action) return
            if(dados.action != 'get' && dados.action != 'add') return
            var results = await client.db('CountRequest').collection('visitors_count').find({}).toArray()
            if(dados.action == 'get') {
                res.send(JSON.stringify(results[0], null, 2) + '\n')
            } else if (dados.action == 'add') {
                client.db('CountRequest').collection('visitors_count').updateOne({
                    visitors: results[0].visitors
                }, {$set: {visitors: results[0].visitors + 1}})
                results[0].visitors = results[0].visitors + 1
                res.send(JSON.stringify(results[0], null, 2) + '\n')
            }
        })
        app.get('/count/users', async (req, res) => {
            res.header("Content-Type",'application/json');
            const databasekeyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const databasekeysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            const allkeys = []
            for(i=0; i < databasekeyslimited.length; ++i) {
                allkeys.push(databasekeyslimited[i])
            }
            for(i=0; i < databasekeysunlimited.length; ++i) {
                allkeys.push(databasekeysunlimited[i])
            }
            res.send(JSON.stringify({
                usuarios_registrados: allkeys.length + 30
            }, null, 2 ) + '\n')
        })
        app.get('/checkapikey', async (req, res) => {
            res.header("Content-Type",'application/json');
            let dados = req.query
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            const databasekeyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const databasekeysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            const keyslimited = []
            const keysunlimited = []
            for(i = 0; i < databasekeyslimited.length; ++i){
                keyslimited.push(databasekeyslimited[i].info.apikey)
            }
            for(i = 0; i < databasekeysunlimited.length; ++i) {
                keysunlimited.push(databasekeysunlimited[i].info.apikey)
            }
            if(keyslimited.indexOf(dados.apikey) >= 0) {
                var ind = keyslimited.indexOf(dados.apikey)
                res.send(JSON.stringify(databasekeyslimited[ind], null, 2) + '\n')
            }else if(keysunlimited.indexOf(dados.apikey) >= 0) {
                var ind = keysunlimited.indexOf(dados.apikey)
                res.send(JSON.stringify(databasekeysunlimited[ind], null, 2) + '\n')
            } else return res.send(JSON.stringify({resposta: 'não consegui encontrar essa apikey', status: 404}, null, 2) + '\n')
        })
        app.get('/', (req, res) => {
            res.header("Content-Type",'text/html');
            res.send(fs.readFileSync('./index.html'))
        });
        app.get('/pricing', (req, res) => {
            res.header("Content-Type",'text/html');
            res.sendFile(__dirname + '/pricing.html')
        });
        app.get('/config/rmkey', async (req,res) => {
            res.header("Content-Type",'application/json');
            let dados = req.query
            const databasekeyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const databasekeysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(dados.apikey != supremeapikey) return res.send(JSON.stringify({
                result: 'Olá, você não tem permissão a utilizar essa api, se tentar novamente seu ip será banido',
                status: 403
            }, null, 2) + '\n')
            if(!dados.user) return res.send(JSON.stringify({resposta:'Preciso do nome de usuário', status:403}, null, 2)+ '\n')

            try {
                let userslimit = []
                let usersunlimit = []
                for(i = 0; i < databasekeyslimited.length; ++i) {
                    userslimit.push(databasekeyslimited[i].info.usuario)
                }
                for(i = 0; i < databasekeysunlimited.length; ++i) {
                    usersunlimit.push(databasekeysunlimited[i].info.usuario)
                }
                if(userslimit.indexOf(dados.user) >= 0) {
                    var indice = userslimit.indexOf(dados.user)
                    const keyrm = databasekeyslimited[indice]
                    await client.db('apikeyslimited').collection('apikeyslimited').deleteOne(databasekeyslimited[indice])
                    databasekeyslimited.splice(indice, 1)
                    fs.writeFileSync('./database/apikeyslimited.json', JSON.stringify(databasekeyslimited, null, 2)+'\n')
                    res.send(JSON.stringify({
                        resposta: 'usuario removido com sucesso!!!',
                        user: keyrm,
                        status: 200
                    }, null, 2) + '\n')
                } else if (usersunlimit.indexOf(dados.user) >= 0) {
                    var indice = usersunlimit.indexOf(dados.user)
                    const keyrm = databasekeysunlimited[indice]
                    await client.db('apikeys').collection('apikeys').deleteOne(databasekeysunlimited[indice])
                    databasekeysunlimited.splice(indice, 1)
                    fs.writeFileSync('./database/apikeys.json', JSON.stringify(databasekeysunlimited, null, 2)+'\n')
                    res.send(JSON.stringify({
                        resposta: 'usuario removido com sucesso!!!',
                        user: keyrm,
                        status: 200
                    }, null, 2) + '\n')
                } else {
                    res.send(JSON.stringify({
                        resposta: 'não foi encontrado nenhum nome de usuário no banco de dados',
                        status: 404
                    }, null, 2) + '\n')
                }
            } catch {
                res.send(JSON.stringify({
                    resposta: 'falha ao remover usuario no banco de dados',
                    status: 404
                }, null, 2) + '\n')
            }  
        })
        app.get('/config/listallkeys', async (req, res) => {
            res.header("Content-Type",'application/json');
            let dados = req.query
            const databasekeyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const databasekeysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(dados.apikey != supremeapikey) return res.send(JSON.stringify({
                result: 'Olá, você não tem permissão a utilizar essa api, se tentar novamente seu ip será banido',
                status: 403
            }, null, 2) + '\n')
            let limitadas = []
            let ilimitadas = []
            for(i = 0; i < databasekeyslimited.length; ++i) {
                limitadas.push(databasekeyslimited[i])
            }
            for(i = 0; i < databasekeysunlimited.length; ++i) {
                ilimitadas.push(databasekeysunlimited[i])
            }
            let keys = (await allkeyslist())
            res.send(JSON.stringify({
                keys,
                status: 200}, null, 2) +'\n')
        })
        app.get('/config/addkey/limited', async(req, res) => {
            let dados = req.query
            var data_expire
            const databasekeyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const databasekeysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!dados.valid) data_expire = dataAtualFormatada()
            else data_expire = dataAtualFormatadaMod(parseInt(dados.valid))
            if(dados.apikey != supremeapikey) return res.send(JSON.stringify({
                result: 'Olá, você não tem permissão a utilizar essa api, se tentar novamente seu ip será banido',
                status: 403
            }, null, 2) + '\n')
            if(!dados.newapikey) return res.send(JSON.stringify({
                resposta:'Diga o nome da apikey', 
                status:403
            }, null, 2)+ '\n')
            if(!dados.user) return res.send(JSON.stringify({
                resposta:'Diga o nome de usuário', 
                status:403
            }, null, 2)+ '\n')
            if(!dados.limit) return res.send(JSON.stringify({
                resposta:'Diga o limite da apikey', 
                status:403
            }, null, 2)+ '\n')

            if(JSON.stringify(databasekeyslimited).indexOf(dados.newapikey) != -1) return  res.status(404).send(JSON.stringify({
                resposta: 'Já existe um nome de usuario ou uma apikey com esse nome',
                status: 404
            }, null, 2) +'\n')
            if(JSON.stringify(databasekeyslimited).indexOf(dados.user) >= 0) return  res.status(404).send(JSON.stringify({
                resposta: 'Já existe um nomde de usuario ou uma apikey com esse nome e apikey',
                status: 404
            }, null, 2) +'\n')
            if(JSON.stringify(databasekeysunlimited).indexOf(dados.newapikey) >= 0) return  res.status(404).send(JSON.stringify({
                resposta: 'Já existe um nome de usuario ou uma apikey com esse nome',
                status: 404
            }, null, 2) +'\n')
            if(JSON.stringify(databasekeysunlimited).indexOf(dados.user) >= 0) return  res.status(404).send(JSON.stringify({
                resposta: 'Já existe um nomde de usuario ou uma apikey com esse nome e apikey',
                status: 404
            }, null, 2) +'\n')
            let adduserkey = {
                info : {
                    usuario: dados.user,
                    apikey: dados.newapikey,
                    limit_request: parseInt(dados.limit),
                    request_rest: parseInt(dados.limit)
                },
                data: data_expire
            }
            try {
                databasekeyslimited.push(adduserkey)
                await client.db('apikeyslimited').collection('apikeyslimited').insertOne(adduserkey)
                fs.writeFileSync('./database/apikeyslimited.json', JSON.stringify(databasekeyslimited, null, 2) +'\n')
                res.status(200).send(JSON.stringify({
                    result: 'apikey adicionada com sucesso',
                    adduserkey
                }, null, 4))
            } catch (e) {
                console.log(e)
                res.status(404).send(JSON.stringify({
                    resposta: 'Erro ao adicionar a apikey',
                    status: 404
                }, null, 2) +'\n')
            }

        })
        app.get('/config/addkey/unlimited', async (req, res) => {
            let dados = req.query
            var data_expire
            const databasekeyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const databasekeysunlimited = JSON.parse(fs.readFileSync('./database/apikeys.json'))
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!dados.valid) data_expire = dataAtualFormatada()
            else data_expire = dataAtualFormatadaMod(parseInt(dados.valid))
            if(dados.apikey != supremeapikey) return res.send(JSON.stringify({
                result: 'Olá, você não tem permissão a utilizar essa api, se tentar novamente seu ip será banido',
                status: 403
            }, null, 2) + '\n')
            if(!dados.newapikey) return res.send(JSON.stringify({
                resposta:'Diga o nome da apikey', 
                status:403
            }, null, 2)+ '\n')
            if(!dados.user) return res.send(JSON.stringify({
                resposta:'Diga o nome de usuário', 
                status:403
            }, null, 2)+ '\n')

            if(JSON.stringify(databasekeyslimited).indexOf(dados.newapikey) != -1) return  res.status(404).send(JSON.stringify({
                resposta: 'Já existe um nome de usuario ou uma apikey com esse nome',
                status: 404
            }, null, 2) +'\n')
            if(JSON.stringify(databasekeyslimited).indexOf(dados.user) >= 0) return  res.status(404).send(JSON.stringify({
                resposta: 'Já existe um nomde de usuario ou uma apikey com esse nome e apikey',
                status: 404
            }, null, 2) +'\n')
            if(JSON.stringify(databasekeysunlimited).indexOf(dados.newapikey) >= 0) return  res.status(404).send(JSON.stringify({
                resposta: 'Já existe um nome de usuario ou uma apikey com esse nome',
                status: 404
            }, null, 2) +'\n')
            if(JSON.stringify(databasekeysunlimited).indexOf(dados.user) >= 0) return  res.status(404).send(JSON.stringify({
                resposta: 'Já existe um nomde de usuario ou uma apikey com esse nome e apikey',
                status: 404
            }, null, 2) +'\n')
                let adduserkey = {
                    info: {
                        usuario: dados.user,
                        apikey: dados.newapikey
                    },
                    data: data_expire
                }
                
            try {
                databasekeysunlimited.push(adduserkey)
                
                await client.db('apikeys').collection('apikeys').insertOne(adduserkey)
                fs.writeFileSync('./database/apikeys.json', JSON.stringify(databasekeysunlimited, null, 2) +'\n')
                res.status(200).send(JSON.stringify({
                    result: 'apikey adicionada com sucesso',
                    adduserkey
                }, null, 4))
            
            } catch (e) {
                console.log(e)
                res.status(404).send(JSON.stringify({
                    resposta: 'Erro ao adicionar a apikey',
                    status: 404
                }, null, 2) +'\n')
            }
        })
    }
    async function geradorapis() {
        app.get('/gerador/fancytext', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Preciso do nome', status:403}, null, 2)+ '\n')
            const invertedSquaresCharMap = {q:"🆀",w:"🆆",e:"🅴",r:"🆁",t:"🆃",y:"🆈",u:"🆄",i:"🅸",o:"🅾",p:"🅿",a:"🅰",s:"🆂",d:"🅳",f:"🅵",g:"🅶",h:"🅷",j:"🅹",k:"🅺",l:"🅻",z:"🆉",x:"🆇",c:"🅲",v:"🆅",b:"🅱",n:"🅽",m:"🅼"}
            const italicCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"𝘢","b":"𝘣","c":"𝘤","d":"𝘥","e":"𝘦","f":"𝘧","g":"𝘨","h":"𝘩","i":"𝘪","j":"𝘫","k":"𝘬","l":"𝘭","m":"𝘮","n":"𝘯","o":"𝘰","p":"𝘱","q":"𝘲","r":"𝘳","s":"𝘴","t":"𝘵","u":"𝘶","v":"𝘷","w":"𝘸","x":"𝘹","y":"𝘺","z":"𝘻","A":"𝘈","B":"𝘉","C":"𝘊","D":"𝘋","E":"𝘌","F":"𝘍","G":"𝘎","H":"𝘏","I":"𝘐","J":"𝘑","K":"𝘒","L":"𝘓","M":"𝘔","N":"𝘕","O":"𝘖","P":"𝘗","Q":"𝘘","R":"𝘙","S":"𝘚","T":"𝘛","U":"𝘜","V":"𝘝","W":"𝘞","X":"𝘟","Y":"𝘠","Z":"𝘡"};
            const boldCharMap = {"0":"𝟎","1":"𝟏","2":"𝟐","3":"𝟑","4":"𝟒","5":"𝟓","6":"𝟔","7":"𝟕","8":"𝟖","9":"𝟗","a":"𝐚","b":"𝐛","c":"𝐜","d":"𝐝","e":"𝐞","f":"𝐟","g":"𝐠","h":"𝐡","i":"𝐢","j":"𝐣","k":"𝐤","l":"𝐥","m":"𝐦","n":"𝐧","o":"𝐨","p":"𝐩","q":"𝐪","r":"𝐫","s":"𝐬","t":"𝐭","u":"𝐮","v":"𝐯","w":"𝐰","x":"𝐱","y":"𝐲","z":"𝐳","A":"𝐀","B":"𝐁","C":"𝐂","D":"𝐃","E":"𝐄","F":"𝐅","G":"𝐆","H":"𝐇","I":"𝐈","J":"𝐉","K":"𝐊","L":"𝐋","M":"𝐌","N":"𝐍","O":"𝐎","P":"𝐏","Q":"𝐐","R":"𝐑","S":"𝐒","T":"𝐓","U":"𝐔","V":"𝐕","W":"𝐖","X":"𝐗","Y":"𝐘","Z":"𝐙"};
            const boldItalicCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"𝙖","b":"𝙗","c":"𝙘","d":"𝙙","e":"𝙚","f":"𝙛","g":"𝙜","h":"𝙝","i":"𝙞","j":"𝙟","k":"𝙠","l":"𝙡","m":"𝙢","n":"𝙣","o":"𝙤","p":"𝙥","q":"𝙦","r":"𝙧","s":"𝙨","t":"𝙩","u":"𝙪","v":"𝙫","w":"𝙬","x":"𝙭","y":"𝙮","z":"𝙯","A":"𝘼","B":"𝘽","C":"𝘾","D":"𝘿","E":"𝙀","F":"𝙁","G":"𝙂","H":"𝙃","I":"𝙄","J":"𝙅","K":"𝙆","L":"𝙇","M":"𝙈","N":"𝙉","O":"𝙊","P":"𝙋","Q":"𝙌","R":"𝙍","S":"𝙎","T":"𝙏","U":"𝙐","V":"𝙑","W":"𝙒","X":"𝙓","Y":"𝙔","Z":"𝙕"};
            const squaresCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"🄰","b":"🄱","c":"🄲","d":"🄳","e":"🄴","f":"🄵","g":"🄶","h":"🄷","i":"🄸","j":"🄹","k":"🄺","l":"🄻","m":"🄼","n":"🄽","o":"🄾","p":"🄿","q":"🅀","r":"🅁","s":"🅂","t":"🅃","u":"🅄","v":"🅅","w":"🅆","x":"🅇","y":"🅈","z":"🅉","A":"🄰","B":"🄱","C":"🄲","D":"🄳","E":"🄴","F":"🄵","G":"🄶","H":"🄷","I":"🄸","J":"🄹","K":"🄺","L":"🄻","M":"🄼","N":"🄽","O":"🄾","P":"🄿","Q":"🅀","R":"🅁","S":"🅂","T":"🅃","U":"🅄","V":"🅅","W":"🅆","X":"🅇","Y":"🅈","Z":"🅉"};
            const subscriptCharMap = {"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉","a":"ₐ","b":"b","c":"c","d":"d","e":"ₑ","f":"f","g":"g","h":"ₕ","i":"ᵢ","j":"ⱼ","k":"ₖ","l":"ₗ","m":"ₘ","n":"ₙ","o":"ₒ","p":"ₚ","q":"q","r":"ᵣ","s":"ₛ","t":"ₜ","u":"ᵤ","v":"ᵥ","w":"w","x":"ₓ","y":"y","z":"z","A":"ₐ","B":"B","C":"C","D":"D","E":"ₑ","F":"F","G":"G","H":"ₕ","I":"ᵢ","J":"ⱼ","K":"ₖ","L":"ₗ","M":"ₘ","N":"ₙ","O":"ₒ","P":"ₚ","Q":"Q","R":"ᵣ","S":"ₛ","T":"ₜ","U":"ᵤ","V":"ᵥ","W":"W","X":"ₓ","Y":"Y","Z":"Z","+":"₊","-":"₋","=":"₌","(":"₍",")":"₎"};
            const superscriptCharMap = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","a":"ᵃ","b":"ᵇ","c":"ᶜ","d":"ᵈ","e":"ᵉ","f":"ᶠ","g":"ᵍ","h":"ʰ","i":"ⁱ","j":"ʲ","k":"ᵏ","l":"ˡ","m":"ᵐ","n":"ⁿ","o":"ᵒ","p":"ᵖ","q":"q","r":"ʳ","s":"ˢ","t":"ᵗ","u":"ᵘ","v":"ᵛ","w":"ʷ","x":"ˣ","y":"ʸ","z":"ᶻ","A":"ᴬ","B":"ᴮ","C":"ᶜ","D":"ᴰ","E":"ᴱ","F":"ᶠ","G":"ᴳ","H":"ᴴ","I":"ᴵ","J":"ᴶ","K":"ᴷ","L":"ᴸ","M":"ᴹ","N":"ᴺ","O":"ᴼ","P":"ᴾ","Q":"Q","R":"ᴿ","S":"ˢ","T":"ᵀ","U":"ᵁ","V":"ⱽ","W":"ᵂ","X":"ˣ","Y":"ʸ","Z":"ᶻ","+":"⁺","-":"⁻","=":"⁼","(":"⁽",")":"⁾"};
            const doubleStruckCharMap = {"0":"𝟘","1":"𝟙","2":"𝟚","3":"𝟛","4":"𝟜","5":"𝟝","6":"𝟞","7":"𝟟","8":"𝟠","9":"𝟡","a":"𝕒","b":"𝕓","c":"𝕔","d":"𝕕","e":"𝕖","f":"𝕗","g":"𝕘","h":"𝕙","i":"𝕚","j":"𝕛","k":"𝕜","l":"𝕝","m":"𝕞","n":"𝕟","o":"𝕠","p":"𝕡","q":"𝕢","r":"𝕣","s":"𝕤","t":"𝕥","u":"𝕦","v":"𝕧","w":"𝕨","x":"𝕩","y":"𝕪","z":"𝕫","A":"𝔸","B":"𝔹","C":"ℂ","D":"𝔻","E":"𝔼","F":"𝔽","G":"𝔾","H":"ℍ","I":"𝕀","J":"𝕁","K":"𝕂","L":"𝕃","M":"𝕄","N":"ℕ","O":"𝕆","P":"ℙ","Q":"ℚ","R":"ℝ","S":"𝕊","T":"𝕋","U":"𝕌","V":"𝕍","W":"𝕎","X":"𝕏","Y":"𝕐","Z":"ℤ"};
            const medievalCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"𝖆","b":"𝖇","c":"𝖈","d":"𝖉","e":"𝖊","f":"𝖋","g":"𝖌","h":"𝖍","i":"𝖎","j":"𝖏","k":"𝖐","l":"𝖑","m":"𝖒","n":"𝖓","o":"𝖔","p":"𝖕","q":"𝖖","r":"𝖗","s":"𝖘","t":"𝖙","u":"𝖚","v":"𝖛","w":"𝖜","x":"𝖝","y":"𝖞","z":"𝖟","A":"𝕬","B":"𝕭","C":"𝕮","D":"𝕯","E":"𝕰","F":"𝕱","G":"𝕲","H":"𝕳","I":"𝕴","J":"𝕵","K":"𝕶","L":"𝕷","M":"𝕸","N":"𝕹","O":"𝕺","P":"𝕻","Q":"𝕼","R":"𝕽","S":"𝕾","T":"𝕿","U":"𝖀","V":"𝖁","W":"𝖂","X":"𝖃","Y":"𝖄","Z":"𝖅"};
            const cursiveCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"𝓪","b":"𝓫","c":"𝓬","d":"𝓭","e":"𝓮","f":"𝓯","g":"𝓰","h":"𝓱","i":"𝓲","j":"𝓳","k":"𝓴","l":"𝓵","m":"𝓶","n":"𝓷","o":"𝓸","p":"𝓹","q":"𝓺","r":"𝓻","s":"𝓼","t":"𝓽","u":"𝓾","v":"𝓿","w":"𝔀","x":"𝔁","y":"𝔂","z":"𝔃","A":"𝓐","B":"𝓑","C":"𝓒","D":"𝓓","E":"𝓔","F":"𝓕","G":"𝓖","H":"𝓗","I":"𝓘","J":"𝓙","K":"𝓚","L":"𝓛","M":"𝓜","N":"𝓝","O":"𝓞","P":"𝓟","Q":"𝓠","R":"𝓡","S":"𝓢","T":"𝓣","U":"𝓤","V":"𝓥","W":"𝓦","X":"𝓧","Y":"𝓨","Z":"𝓩"};
            const oldEnglishCharMap = {"a":"𝔞","b":"𝔟","c":"𝔠","d":"𝔡","e":"𝔢","f":"𝔣","g":"𝔤","h":"𝔥","i":"𝔦","j":"𝔧","k":"𝔨","l":"𝔩","m":"𝔪","n":"𝔫","o":"𝔬","p":"𝔭","q":"𝔮","r":"𝔯","s":"𝔰","t":"𝔱","u":"𝔲","v":"𝔳","w":"𝔴","x":"𝔵","y":"𝔶","z":"𝔷","A":"𝔄","B":"𝔅","C":"ℭ","D":"𝔇","E":"𝔈","F":"𝔉","G":"𝔊","H":"ℌ","I":"ℑ","J":"𝔍","K":"𝔎","L":"𝔏","M":"𝔐","N":"𝔑","O":"𝔒","P":"𝔓","Q":"𝔔","R":"ℜ","S":"𝔖","T":"𝔗","U":"𝔘","V":"𝔙","W":"𝔚","X":"𝔛","Y":"𝔜","Z":"ℨ"};
            const futureAlienCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"ᗩ","b":"ᗷ","c":"ᑢ","d":"ᕲ","e":"ᘿ","f":"ᖴ","g":"ᘜ","h":"ᕼ","i":"ᓰ","j":"ᒚ","k":"ᖽᐸ","l":"ᒪ","m":"ᘻ","n":"ᘉ","o":"ᓍ","p":"ᕵ","q":"ᕴ","r":"ᖇ","s":"S","t":"ᖶ","u":"ᑘ","v":"ᐺ","w":"ᘺ","x":"᙭","y":"ᖻ","z":"ᗱ","A":"ᗩ","B":"ᗷ","C":"ᑢ","D":"ᕲ","E":"ᘿ","F":"ᖴ","G":"ᘜ","H":"ᕼ","I":"ᓰ","J":"ᒚ","K":"ᖽᐸ","L":"ᒪ","M":"ᘻ","N":"ᘉ","O":"ᓍ","P":"ᕵ","Q":"ᕴ","R":"ᖇ","S":"S","T":"ᖶ","U":"ᑘ","V":"ᐺ","W":"ᘺ","X":"᙭","Y":"ᖻ","Z":"ᗱ"};
            const squiggle6CharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"ค","b":"๖","c":"¢","d":"໓","e":"ē","f":"f","g":"ງ","h":"h","i":"i","j":"ว","k":"k","l":"l","m":"๓","n":"ຖ","o":"໐","p":"p","q":"๑","r":"r","s":"Ş","t":"t","u":"น","v":"ง","w":"ຟ","x":"x","y":"ฯ","z":"ຊ","A":"ค","B":"๖","C":"¢","D":"໓","E":"ē","F":"f","G":"ງ","H":"h","I":"i","J":"ว","K":"k","L":"l","M":"๓","N":"ຖ","O":"໐","P":"p","Q":"๑","R":"r","S":"Ş","T":"t","U":"น","V":"ง","W":"ຟ","X":"x","Y":"ฯ","Z":"ຊ"};
            const squiggle5CharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"ą","b":"ც","c":"ƈ","d":"ɖ","e":"ɛ","f":"ʄ","g":"ɠ","h":"ɧ","i":"ı","j":"ʝ","k":"ƙ","l":"Ɩ","m":"ɱ","n":"ŋ","o":"ơ","p":"℘","q":"զ","r":"ཞ","s":"ʂ","t":"ɬ","u":"ų","v":"۷","w":"ῳ","x":"ҳ","y":"ყ","z":"ʑ","A":"ą","B":"ც","C":"ƈ","D":"ɖ","E":"ɛ","F":"ʄ","G":"ɠ","H":"ɧ","I":"ı","J":"ʝ","K":"ƙ","L":"Ɩ","M":"ɱ","N":"ŋ","O":"ơ","P":"℘","Q":"զ","R":"ཞ","S":"ʂ","T":"ɬ","U":"ų","V":"۷","W":"ῳ","X":"ҳ","Y":"ყ","Z":"ʑ"};
            const asianStyle2CharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"ﾑ","b":"乃","c":"ᄃ","d":"り","e":"乇","f":"ｷ","g":"ム","h":"ん","i":"ﾉ","j":"ﾌ","k":"ズ","l":"ﾚ","m":"ﾶ","n":"刀","o":"の","p":"ｱ","q":"ゐ","r":"尺","s":"丂","t":"ｲ","u":"ひ","v":"√","w":"W","x":"ﾒ","y":"ﾘ","z":"乙","A":"ﾑ","B":"乃","C":"ᄃ","D":"り","E":"乇","F":"ｷ","G":"ム","H":"ん","I":"ﾉ","J":"ﾌ","K":"ズ","L":"ﾚ","M":"ﾶ","N":"刀","O":"の","P":"ｱ","Q":"ゐ","R":"尺","S":"丂","T":"ｲ","U":"ひ","V":"√","W":"W","X":"ﾒ","Y":"ﾘ","Z":"乙"};
            const asianStyleCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"卂","b":"乃","c":"匚","d":"ᗪ","e":"乇","f":"千","g":"Ꮆ","h":"卄","i":"丨","j":"ﾌ","k":"Ҝ","l":"ㄥ","m":"爪","n":"几","o":"ㄖ","p":"卩","q":"Ɋ","r":"尺","s":"丂","t":"ㄒ","u":"ㄩ","v":"ᐯ","w":"山","x":"乂","y":"ㄚ","z":"乙","A":"卂","B":"乃","C":"匚","D":"ᗪ","E":"乇","F":"千","G":"Ꮆ","H":"卄","I":"丨","J":"ﾌ","K":"Ҝ","L":"ㄥ","M":"爪","N":"几","O":"ㄖ","P":"卩","Q":"Ɋ","R":"尺","S":"丂","T":"ㄒ","U":"ㄩ","V":"ᐯ","W":"山","X":"乂","Y":"ㄚ","Z":"乙"};
            const squiggle4CharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"Ꮧ","b":"Ᏸ","c":"ፈ","d":"Ꮄ","e":"Ꮛ","f":"Ꭶ","g":"Ꮆ","h":"Ꮒ","i":"Ꭵ","j":"Ꮰ","k":"Ꮶ","l":"Ꮭ","m":"Ꮇ","n":"Ꮑ","o":"Ꭷ","p":"Ꭾ","q":"Ꭴ","r":"Ꮢ","s":"Ꮥ","t":"Ꮦ","u":"Ꮼ","v":"Ꮙ","w":"Ꮗ","x":"ጀ","y":"Ꭹ","z":"ፚ","A":"Ꮧ","B":"Ᏸ","C":"ፈ","D":"Ꮄ","E":"Ꮛ","F":"Ꭶ","G":"Ꮆ","H":"Ꮒ","I":"Ꭵ","J":"Ꮰ","K":"Ꮶ","L":"Ꮭ","M":"Ꮇ","N":"Ꮑ","O":"Ꭷ","P":"Ꭾ","Q":"Ꭴ","R":"Ꮢ","S":"Ꮥ","T":"Ꮦ","U":"Ꮼ","V":"Ꮙ","W":"Ꮗ","X":"ጀ","Y":"Ꭹ","Z":"ፚ"};
            const neonCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"ᗩ","b":"ᗷ","c":"ᑕ","d":"ᗪ","e":"E","f":"ᖴ","g":"G","h":"ᕼ","i":"I","j":"ᒍ","k":"K","l":"ᒪ","m":"ᗰ","n":"ᑎ","o":"O","p":"ᑭ","q":"ᑫ","r":"ᖇ","s":"ᔕ","t":"T","u":"ᑌ","v":"ᐯ","w":"ᗯ","x":"᙭","y":"Y","z":"ᘔ","A":"ᗩ","B":"ᗷ","C":"ᑕ","D":"ᗪ","E":"E","F":"ᖴ","G":"G","H":"ᕼ","I":"I","J":"ᒍ","K":"K","L":"ᒪ","M":"ᗰ","N":"ᑎ","O":"O","P":"ᑭ","Q":"ᑫ","R":"ᖇ","S":"ᔕ","T":"T","U":"ᑌ","V":"ᐯ","W":"ᗯ","X":"᙭","Y":"Y","Z":"ᘔ"};
            const squiggle3CharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"ǟ","b":"ɮ","c":"ƈ","d":"ɖ","e":"ɛ","f":"ʄ","g":"ɢ","h":"ɦ","i":"ɨ","j":"ʝ","k":"ӄ","l":"ʟ","m":"ʍ","n":"ռ","o":"օ","p":"ք","q":"զ","r":"ʀ","s":"ֆ","t":"ȶ","u":"ʊ","v":"ʋ","w":"ա","x":"Ӽ","y":"ʏ","z":"ʐ","A":"ǟ","B":"ɮ","C":"ƈ","D":"ɖ","E":"ɛ","F":"ʄ","G":"ɢ","H":"ɦ","I":"ɨ","J":"ʝ","K":"ӄ","L":"ʟ","M":"ʍ","N":"ռ","O":"օ","P":"ք","Q":"զ","R":"ʀ","S":"ֆ","T":"ȶ","U":"ʊ","V":"ʋ","W":"ա","X":"Ӽ","Y":"ʏ","Z":"ʐ"};
            const bubbleCharMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","a":"ⓐ","b":"ⓑ","c":"ⓒ","d":"ⓓ","e":"ⓔ","f":"ⓕ","g":"ⓖ","h":"ⓗ","i":"ⓘ","j":"ⓙ","k":"ⓚ","l":"ⓛ","m":"ⓜ","n":"ⓝ","o":"ⓞ","p":"ⓟ","q":"ⓠ","r":"ⓡ","s":"ⓢ","t":"ⓣ","u":"ⓤ","v":"ⓥ","w":"ⓦ","x":"ⓧ","y":"ⓨ","z":"ⓩ","A":"ⓐ","B":"ⓑ","C":"ⓒ","D":"ⓓ","E":"ⓔ","F":"ⓕ","G":"ⓖ","H":"ⓗ","I":"ⓘ","J":"ⓙ","K":"ⓚ","L":"ⓛ","M":"ⓜ","N":"ⓝ","O":"ⓞ","P":"ⓟ","Q":"ⓠ","R":"ⓡ","S":"ⓢ","T":"ⓣ","U":"ⓤ","V":"ⓥ","W":"ⓦ","X":"ⓧ","Y":"ⓨ","Z":"ⓩ"};
            const diacriticsTop = [ "̀", "́", "̂", "̃", "̄", "̅", "̆", "̇", "̈", "̉", "̊", "̋", "̌", "̍", "̎", "̏", "̐", "̑", "̒", "̓",
            "̔", "̕", "̚", "̛", "̽", "̾", "̿", "̀", "́", "͂", "̓", "̈́", "̈́", "͆", "͊", "͋", "͌", "͐", "͑", "͒", "͗", "͘", "͛",
            "͝", "͝", "͠", "͡" ];
            const diacriticsMiddle = ["̴", "̵", "̶", "̷", "̸" ];
            const diacriticsBottom = ["̖", "̗", "̘", "̙", "̜", "̝", "̞", "̟", "̠", "̡", "̢", "̣", "̤", "̥", "̦", "̧", "̨", "̩", "̪", "̫", "̬", "̭",
                "̮", "̯", "̰", "̱", "̲", "̳", "̹", "̺", "̻", "̼", "ͅ", "͇", "͈", "͉", "͍", "͎", "͓", "͔", "͕", "͖", "͙", "͚", "͜", "͟" ];

            const creepify = {
                encode: function (input) {
                    var result = '',
                        currentChar;
                    for (i in input) {
                        currentChar = input[i];
                        // Middle
                        // Put just one of the middle characters there, or it gets crowded
                        if (this.options.middle) {
                            currentChar += diacriticsMiddle[Math.floor(Math.random() * diacriticsMiddle.length)]
                        }
                        // Top
                        if (this.options.top) {
            
                            // Put up to this.options.maxHeight random diacritics on top.
                            // optionally fluctuate the number via the randomization value (0-100%)
                            // randomization 100%: 0 to maxHeight
                            //                30%: 70% of maxHeight to maxHeight
                            //                 x%: 100-x% of maxHeight to maxHeight
                            var diacriticsTopLength = diacriticsTop.length - 1;
                            var howManyTops = this.options.maxHeight - Math.random() * ((this.options.randomization / 100) * this.options.maxHeight);
                            for (var i = 0; i < howManyTops; i++) {
                                currentChar += diacriticsTop[Math.floor(Math.random() * diacriticsTopLength)]
                            }
                        }
                        // Bottom
                        if (this.options.bottom) {
                            var diacriticsBottomLength = diacriticsBottom.length - 1;
                            var howManyBottoms = this.options.maxHeight - Math.random() * ((this.options.randomization / 100) * this.options.maxHeight);
                            for (var j = 0; j < howManyBottoms; j++) {
                                currentChar += diacriticsBottom[Math.floor(Math.random() * diacriticsBottomLength)]
                            }
            
                        }
                        result += currentChar;
                    }
                    return result;
                },
            
                decode: function (input) {
                    var result = '',
                        charCode;
            
                    //Check if other, none diametric chars could get accidently cut.
                    for (i in input) {
                        charCode = input[i].charCodeAt(0);
                        if (charCode < 768 || charCode > 865) {
                            result += input[i];
                        }
                    }
                    return result;
                },
            
                options: {
                    top: true,
                    middle: true,
                    bottom: true,
                    maxHeight: 20,   // How many diacritic marks shall we put on top/bottom?
                    randomization: 100 // 0-100%. maxHeight 100 and randomization 20%: the height goes from 80 to 100. randomization 70%, height goes from 30 to 100.
                }
            };
            function applyCharMap(map, text) {
                let out = "";
                 for(let c of text.split("")) {
                   if(map[c] !== undefined) out += map[c];
                   else if(map[c.toLowerCase()] !== undefined) out += map[c.toLowerCase()];
                   else out += c;
                 }
                return out;
            }
            function randomElement(a) {
                return a[Math.floor(Math.random()*a.length)];
            }
            function randomSymbols(n) {
                var symbols = ["🐙","🐉","🐊","🐒","🐝","🐜","🐚","🐲","🐳","🐸","👑","👹","👺","👤","💲","💣","💙","💚","💛","💜","💝","💗","💘","💞","💔","💥","🐯","🐼","🐻","🐺","👌","🐍","🐧","🐟","🐠","🐨","🎯","🏆","🎁","🎀","🎉","🎈","🍮","🍭","🍬","🍫","🍪","🍧","🌷","🍓","😺","😾","✎","😎","😝","😂","😈","😡","😲","😳","🍔","🍟","🍩","🎃","🎄","🎅","🐣","🐤","👍","👊","👻","👽","👮","💎","💋","👣","💀","💢","🔥","♔","♕","♖","♗","♘","♙","♚","♛","♜","♝","♞","♟","♠","♡","♢","♣","♤","♥","♦","♧","♨","♩","♪","♬","★","☆","☺","☹","☯","☮","☢","☠","☟","☞","☝","☜","✌","✋","✊","⛵","ൠ","✌","ඏ"];
                var s = [];
                for(var i = 0; i < n; i++) s.push( randomElement(symbols) );
                return s.join("");
            }
            function crazifyCharacter(c) {
                c = c.toLowerCase();
                var map = {"&":"⅋","%":["⅍","℀","℁","℆","℅"],"0":["０","Ѳ","ʘ"],"1":["➀","❶","１"],"2":["２","❷","➁"],"3":["３","❸","➂"],"4":["４","❹","➃"],"5":["❺","➄","５"],"6":["６","❻","➅"],"7":["７","❼","➆"],"8":["８","➇","❽"],"9":["➈","❾","９"],"<":["≼","≺","≪","☾","≾","⋜","⋞","⋐","⊂","⊏","⊑","《","＜","❮","❰","⫷"],">":"☽≫≻≽≿⋝⋟⋑⊃⊐⊒⫸》＞❯❱","[":"【〖〘〚［","]":"】〗〙〛］","*":"✨✩✪✫✬✭✮✯✰✦✱✲✳✴✵✶✷֍֎✸✹✺✻✼✽✾✿❀❁❂❃❄★☆＊","a":["Ⓐ","ⓐ","α","Ａ","ａ","ᗩ","卂","Δ","ค","α","ά","Ã","𝔞","𝓪","𝒶","𝓐","𝐀","𝐚","𝔸","𝕒","ᵃ"],"b":["Ⓑ","ⓑ","в","Ｂ","乃","ｂ","ᗷ","β","๒","в","в","β","𝔟","𝓫","𝒷","𝓑","𝐁","𝐛","𝔹","𝕓","ᵇ"],"c":["Ⓒ","ⓒ","匚","¢","Ｃ","ｃ","ᑕ","Ć","ς","c","ς","Č","℃","𝔠","𝓬","𝒸","𝓒","𝐂","𝐜","ℂ","𝕔","ᶜ"],"d":["Ⓓ","ⓓ","∂","Ｄ","ｄ","ᗪ","Đ","๔","∂","đ","Ď","𝔡","𝓭","𝒹","𝓓","𝐃","ᗪ","𝐝","𝔻","𝕕","ᵈ"],"e":["Ⓔ","乇","ⓔ","є","Ｅ","ｅ","ᗴ","€","є","ε","έ","Ẹ","𝔢","𝒆","𝑒","𝓔","𝐄","𝐞","𝔼","𝕖","ᵉ"],"f":["Ⓕ","ⓕ","ƒ","Ｆ","ｆ","千","ᖴ","ℱ","Ŧ","ғ","ғ","Ƒ","𝔣","𝒇","𝒻","𝓕","𝐅","𝐟","𝔽","𝕗","ᶠ"],"g":["Ⓖ","ⓖ","ق","g","Ｇ","ｇ","Ǥ","Ꮆ","ﻮ","g","ģ","Ğ","𝔤","𝓰","𝑔","𝓖","𝐆","𝐠","𝔾","𝕘","ᵍ","Ꮆ"],"h":["Ⓗ","卄","ⓗ","н","Ｈ","ｈ","ᕼ","Ħ","ђ","н","ħ","Ĥ","𝔥","𝓱","𝒽","𝓗","𝐇","𝐡","ℍ","𝕙","ʰ"],"i":["Ⓘ","ⓘ","ι","Ｉ","ｉ","Ꭵ","丨","Ɨ","เ","ι","ί","Į","𝔦","𝓲","𝒾","𝓘","𝐈","𝐢","𝕀","𝕚","ᶤ"],"j":["Ⓙ","ⓙ","נ","Ｊ","ڶ","ｊ","ᒎ","Ĵ","ן","נ","ј","Ĵ","𝔧","𝓳","𝒿","𝓙","𝐉","𝐣","𝕁","𝕛","ʲ"],"k":["Ⓚ","ⓚ","к","Ｋ","ｋ","ᛕ","Ҝ","к","к","ķ","Ќ","𝔨","𝓴","𝓀","𝓚","𝐊","𝐤","𝕂","𝕜","ᵏ","Ҝ"],"l":["Ⓛ","ⓛ","ℓ","ㄥ","Ｌ","ｌ","ᒪ","Ł","l","ℓ","Ļ","Ĺ","𝔩","𝓵","𝓁","𝓛","𝐋","𝐥","𝕃","𝕝","ˡ"],"m":["Ⓜ","ⓜ","м","Ｍ","ｍ","ᗰ","Μ","๓","м","м","ϻ","𝔪","𝓶","𝓂","𝓜","𝐌","𝐦","𝕄","𝕞","ᵐ","爪"],"n":["Ⓝ","几","ⓝ","η","Ｎ","ｎ","ᑎ","Ň","ภ","η","ή","Ň","𝔫","𝓷","𝓃","𝓝","𝐍","𝐧","ℕ","𝕟","ᶰ"],"o":["Ⓞ","ㄖ","ⓞ","σ","Ｏ","ｏ","ᗝ","Ø","๏","σ","ό","Ỗ","𝔬","𝓸","𝑜","𝓞","𝐎","𝐨","𝕆","𝕠","ᵒ"],"p":["Ⓟ","ⓟ","ρ","Ｐ","ｐ","卩","ᑭ","Ƥ","ק","ρ","ρ","Ƥ","𝔭","𝓹","𝓅","𝓟","𝐏","𝐩","ℙ","𝕡","ᵖ"],"q":["Ⓠ","ⓠ","q","Ｑ","ｑ","Ɋ","Ω","ợ","q","q","Ǫ","𝔮","𝓺","𝓆","𝓠","𝐐","𝐪","ℚ","𝕢","ᵠ"],"r":["Ⓡ","ⓡ","я","尺","Ｒ","ｒ","ᖇ","Ř","г","я","ŕ","Ř","𝔯","𝓻","𝓇","𝓡","𝐑","𝐫","ℝ","𝕣","ʳ"],"s":["Ⓢ","ⓢ","ѕ","Ｓ","丂","ｓ","ᔕ","Ş","ร","s","ş","Ŝ","𝔰","𝓼","𝓈","𝓢","𝐒","𝐬","𝕊","𝕤","ˢ"],"t":["Ⓣ","ⓣ","т","Ｔ","ｔ","丅","Ŧ","t","т","ţ","Ť","𝔱","𝓽","𝓉","𝓣","𝐓","𝐭","𝕋","𝕥","ᵗ"],"u":["Ⓤ","ⓤ","υ","Ｕ","ｕ","ᑌ","Ữ","ย","υ","ù","Ǘ","𝔲","𝓾","𝓊","𝓤","𝐔","𝐮","𝕌","𝕦","ᵘ"],"v":["Ⓥ","ⓥ","ν","Ｖ","ｖ","ᐯ","V","ש","v","ν","Ѷ","𝔳","𝓿","𝓋","𝓥","𝐕","𝐯","𝕍","𝕧","ᵛ"],"w":["Ⓦ","ⓦ","ω","Ｗ","ｗ","ᗯ","Ŵ","ฬ","ω","ώ","Ŵ","𝔴","𝔀","𝓌","𝓦","𝐖","𝐰","𝕎","𝕨","ʷ","山"],"x":["Ⓧ","ⓧ","χ","Ｘ","乂","ｘ","᙭","Ж","א","x","x","Ж","𝔵","𝔁","𝓍","𝓧","𝐗","𝐱","𝕏","𝕩","ˣ"],"y":["Ⓨ","ㄚ","ⓨ","у","Ｙ","ｙ","Ƴ","¥","ץ","ү","ч","Ў","𝔶","𝔂","𝓎","𝓨","𝐘","𝐲","𝕐","𝕪","ʸ"],"z":["Ⓩ","ⓩ","z","乙","Ｚ","ｚ","Ƶ","Ž","z","z","ž","Ż","𝔷","𝔃","𝓏","𝓩","𝐙","𝐳","ℤ","𝕫","ᶻ"]};
                if(map[c]) { return randomElement(map[c]); }
                else { return c; }
            }
            function crazifyText(text) {
                text = text.split("");
                for(var i = 0; i < text.length; i++) { text[i] =  crazifyCharacter(text[i]); }
                return text.join("");
            }
            function fullCrazy(text) {
                if(text.trim() === "") return "";
                return randomSymbols(2) +"  "+ crazifyText(text) +"  "+ randomSymbols(2)
            }
            var nicks = {
                random_1: fullCrazy(dados.text),
                random_2: fullCrazy(dados.text),
                random_3: fullCrazy(dados.text),
                random_4: fullCrazy(dados.text),
                random_5: fullCrazy(dados.text),
                flip:Lunicode.tools.flip.encode(dados.text),
                mirror: Lunicode.tools.mirror.encode(dados.text),
                bent: Lunicode.tools.bent.encode(dados.text),
                squares: applyCharMap(squaresCharMap, dados.text),
                inverted_squares: applyCharMap(invertedSquaresCharMap, dados.text),
                italic: applyCharMap(italicCharMap, dados.text),
                bold: applyCharMap(boldCharMap, dados.text),
                bold_italic: applyCharMap(boldItalicCharMap, dados.text),
                subscript: applyCharMap(subscriptCharMap, dados.text),
                superscript: applyCharMap(superscriptCharMap, dados.text),
                tiny: Lunicode.tools.tiny.encode(dados.text),
                medieval: applyCharMap(medievalCharMap, dados.text),
                double_struck: applyCharMap(doubleStruckCharMap, dados.text),
                cursive: applyCharMap(cursiveCharMap, dados.text),
                old_english: applyCharMap(oldEnglishCharMap, dados.text),
                future_alien: applyCharMap(futureAlienCharMap, dados.text),
                asian_1: applyCharMap(asianStyleCharMap, dados.text),
                asian_2: applyCharMap(asianStyle2CharMap, dados.text),
                squiggle: applyCharMap(squiggle5CharMap, dados.text),
                squiggle_2: applyCharMap(squiggle6CharMap, dados.text),
                squiggle_3: applyCharMap(squiggle4CharMap, dados.text),
                squiggle_4: applyCharMap(squiggle3CharMap, dados.text),
                neon: applyCharMap(neonCharMap, dados.text),
                bubbles: applyCharMap(bubbleCharMap, dados.text),
                creep: creepify.encode(dados.text).slice(creepify.length).split('\u001b')[0]
            }
            res.send(JSON.stringify(nicks, null, 2) + '\n')
        })
        app.get('/gerador/cnpj', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    certidao: fakerBr.cnpj(),
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/certidao', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    certidao: fakerBr.certidao(),
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/cnh', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    CNH: fakerBr.cnh(),
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/cnae', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    CNAE: fakerBr.cnae(),
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/processo', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    processo_judicial: fakerBr.processo(),
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/empresa', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                console.log(fakerBr.empresa())
                res.status(200).send(JSON.stringify({
                    result : {
                        nome: fakerBr.empresa().nome,
                        email: fakerBr.empresa().email,
                        inscricaoestadual: fakerBr.empresa().inscricaoestadual,
                        cnpj: fakerBr.empresa().cnpj,
                        endereco: {
                            cep: fakerBr.empresa().endereco.cep,
                            logradouro: fakerBr.empresa().endereco.logradouro,
                            complemento: fakerBr.empresa().endereco.complemento,
                            numero: fakerBr.empresa().endereco.numero,
                            bairro: fakerBr.empresa().endereco.bairro,
                            cidade: fakerBr.empresa().endereco.cidade,
                            estado: fakerBr.empresa().endereco.estado,
                            estadoSigla: fakerBr.empresa().endereco.estadoSigla
                        },
                        telefone: fakerBr.empresa().telefone,
                        celular: fakerBr.empresa().celular,
                        dataAbertura: fakerBr.empresa().dataAbertura,
                        fundadores: fakerBr.empresa().fundadores
                    },
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/crlv', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    result : {
                        placa: fakerBr.veiculo().placa,
                        chassi: fakerBr.veiculo().chassi,
                        marca: fakerBr.veiculo().marca,
                        modelo: fakerBr.veiculo().modelo,
                        categoria: fakerBr.veiculo().categoria,
                        especie: fakerBr.veiculo().especie,
                        restricao: fakerBr.veiculo().restricao,
                        tipo: fakerBr.veiculo().tipo,
                        carroceria: fakerBr.veiculo().carroceria,
                        combustivel: fakerBr.veiculo().combustivel,
                        cor: fakerBr.veiculo().cor
                    }
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/pessoa', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    resultado: {
                        nome: fakerBr.pessoa().nome,
                        mae: fakerBr.pessoa().mae,
                        pai: fakerBr.pessoa().pai,
                        RG: fakerBr.pessoa().rg,
                        CPF: fakerBr.pessoa().cpf,
                        telefonde: fakerBr.pessoa().telefone,
                        nascimento: fakerBr.pessoa().dataNascimento,
                        signo: fakerBr.pessoa().signo,
                        altura: fakerBr.pessoa().altura,
                        peso: fakerBr.pessoa().peso,
                        tipoSanguineo: fakerBr.pessoa().tipoSanguineo,
                        endereco: {
                            cep: fakerBr.pessoa().endereco.cep,
                            logradouro: fakerBr.pessoa().endereco.logradouro,
                            complemento: fakerBr.pessoa().endereco.complemento,
                            numero: fakerBr.pessoa().endereco.numero,
                            bairro: fakerBr.pessoa().endereco.bairro,
                            cidade: fakerBr.pessoa().endereco.cidade,
                            estado: fakerBr.pessoa().endereco.estado,
                            estadoSigla: fakerBr.pessoa().endereco.estadoSigla
                        },
                    },
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/cep', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    CEP: fakerBr.cep(),
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/renavam', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    RENAVAM: fakerBr.renavam(),
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

        app.get('/gerador/cpf', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                res.status(200).send(JSON.stringify({
                    CPF: fakerBr.cpf(),
                    status:200
                }, null, 2)+ '\n')
            } catch {
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })

    }
    async function gifeffectapi() {
        app.get('/gifeffect/amongus', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.text1) return res.send(JSON.stringify({resultado:'Diga o texto da ejeção', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resultado:'Diga o texto do impostor', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/gif');
            try {
                buffimg = await getBuffer(dados.img)
                const buff = await ejectamong(dados.text1, dados.text2, buffimg)
                res.send(buff)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/gifeffect/blink', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.img2) return res.send(JSON.stringify({resultado:'Diga a url da imagem 2', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'video/mp4');
            try{
                new DIG.Blink().getImage(dados.img, dados.img2).then(result => {
                    ran = getRandom('.gif')
                    rano = getRandom('.mp4')
                    fs.writeFileSync(ran, result)
                    execute(`ffmpeg -r 30 -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`).then(async response => {
                        res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    })
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/gifeffect/triggered', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'video/mp4');
            try{
                new DIG.Triggered().getImage(dados.img).then(result => {
                    ran = getRandom('.gif')
                    rano = getRandom('.mp4')
                    fs.writeFileSync(ran, result)
                    execute(`ffmpeg -r 30 -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`).then(async response => {
                        res.send(fs.readFileSync(rano))
                        fs.unlinkSync(ran)
                        fs.unlinkSync(rano)
                    })
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
    }
    async function montageeffectapi(){
        app.get('/montage/ad', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Ad().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/affect', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Affect().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/batslap', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.img2) return res.send(JSON.stringify({resultado:'Diga a url da imagem 2', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Batslap().getImage(dados.img, dados.img2).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/beatiful', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Beautiful().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/bed', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.img2) return res.send(JSON.stringify({resultado:'Diga a url da imagem 2', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Bed().getImage(dados.img, dados.img2).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/dobross', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Bobross().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/confusedstonks', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.ConfusedStonk().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/delete', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Delete().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/blackdiscord', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.DiscordBlack().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/bluediscord', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.DiscordBlue().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/doublestonks', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.img2) return res.send(JSON.stringify({resultado:'Diga a url da imagem 2', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.DoubleStonk().getImage(dados.img, dados.img2).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/facepalm', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Facepalm().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/hitler', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Hitler().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/jail', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Jail().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/karaba', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Karaba().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/kiss', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.img2) return res.send(JSON.stringify({resultado:'Diga a url da imagem 2', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Kiss().getImage(dados.img, dados.img2).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/mms', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Mms().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/notstonks', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.NotStonk().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/podium', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.img2) return res.send(JSON.stringify({resultado:'Diga a url da imagem 2', status:403}, null, 2)+ '\n')
            if(!dados.img3) return res.send(JSON.stringify({resultado:'Diga a url da imagem 3', status:403}, null, 2)+ '\n')
            if(!dados.text) return res.send(JSON.stringify({resultado:'Diga o texto', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resultado:'Diga o texto 2', status:403}, null, 2)+ '\n')
            if(!dados.text3) return res.send(JSON.stringify({resultado:'Diga o texto 3', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Podium().getImage(dados.img, dados.img2, dados.img3, dados.text, dados.text2, dados.text3).then(result => {
                    res.send(result)
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/poutine', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Poutine().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/rip', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Rip().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/spank', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.img2) return res.send(JSON.stringify({resultado:'Diga a url da imagem 2', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Spank().getImage(dados.img, dados.img2).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/stonks', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Stonk().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/tatto', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Tatoo().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/thomas', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Thomas().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/trash', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Trash().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/montage/wanted', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.text) return res.send(JSON.stringify({resultado:'Diga o texto', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Wanted().getImage(dados.img, dados.text).then(result => {
                    res.send(result)
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
    }
    async function imageeffectapi() {
        app.get('/imgeffect/lisapresentation', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.text) return res.send(JSON.stringify({resultado:'Diga o texto a ser inserido', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.LisaPresentation().getImage(dados.text).then(result => {
                    res.send(result)
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/imgeffect/blur', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            if(!dados.level) return res.send(JSON.stringify({resultado:'Diga o level do blur', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Blur().getImage(dados.img, dados.level).then(result => {
                    res.send(result)
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/imgeffect/gay', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Gay().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/imgeffect/greyscale', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Greyscale().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/imgeffect/invert', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Invert().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/imgeffect/sepia', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Sepia().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
    }
    async function pornsearch() {
        app.get('/porn/rule34', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga a palavra chave', status:403}, null, 2)+ '\n')
            try {
                axios.get(`https://rule34.xxx/index.php?page=post&s=list&tags=${dados.query}`).then(({data}) => {
                    var $ = cheerio.load(data)
                    r = Math.floor(Math.random() * $('span.thumb').length + 0)
                    var link = 'https://rule34.xxx/'+$('span.thumb')[r].children[1].attribs.href
                    axios.get(link).then(({data}) => {
                        var $ = cheerio.load(data)
                        var image = $('#image')[0].attribs.src
                        var resultado = {
                            link: link,
                            imagem: image
                        }
                        res.send(JSON.stringify(resultado, null, 2) + '\n')
                    }).catch(async err => {
                        res.send(JSON.stringify({
                            resposta: 'Não encontrado',
                            error: 404
                        }))
                    })
                }).catch(async err => {
                    res.send(JSON.stringify({
                        resposta: 'Não encontrado',
                        error: 404
                    }))
                })
            }
            catch {
                res.send(JSON.stringify({
                    resposta: 'Não encontrado',
                    error: 404
                }))
            }
        })
        app.get('/porn/thumbzilla', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga a palavra chave', status:403}, null, 2)+ '\n')
            try {
                axios(`https://www.thumbzilla.com/tags/${dados.query}`).then(({data}) => {
                    var $ = cheerio.load(data)
                    var is_hd = false
                    if($('.js-thumb > .info > .hd')[0].children[0].data) is_hd = true
                    var link = 'https://www.thumbzilla.com'+$('.js-thumb')[0].attribs.href
                    var title = $('.js-thumb > .info > .title')[0].children[0].data
                    var duration = $('.js-thumb > .info > .duration')[0].children[0].data
                    var likes_porcent = $('.hoverInfo.videos')[0].children[3].children[1].data
                    axios(link).then(({data}) => {
                        var $ = cheerio.load(data)
                        var views = $('.ratingWrapper > .views').text()
                        var likes = $('.ratingWrapper > .voteCount > .votesUp').text()
                        var dislikes = $('.ratingWrapper > .voteCount > .votesDown').text()
                        var all_tags
                        for( i=0; i< $('.tags > a').length; ++i) {
                            all_tags += $('.tags > a')[i].children[0].data+', '
                        }
                        var tags = all_tags.slice(9)
                        var resultado = {
                            titulo: title,
                            link: link,
                            duration: duration,
                            likes_porcent: likes_porcent,
                            is_hd: is_hd,
                            views: views,
                            likes: likes,
                            dislikes: dislikes,
                            tags: tags,
                            status:200
                        }
                        res.send(JSON.stringify(resultado, null, 2) + '\n')
                    }).catch(async err => {
                        res.send(JSON.stringify({
                            resposta: 'Não encontrado',
                            error: 404
                        }))
                    })
                }).catch(async err => {
                    res.send(JSON.stringify({
                        resposta: 'Não encontrado',
                        error: 404
                    }))
                })
            }
            catch {
                res.send(JSON.stringify({
                    resposta: 'Não encontrado',
                    error: 404
                }))
            }
        })
        app.get('/porn/xanimu', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga a palavra chave', status:403}, null, 2)+ '\n')
            try {
                axios(`https://xanimu.com/?s=${dados.query}`).then(({data}) =>{
                    var $ = cheerio.load(data)
                    var thumb_video = $('.video-block.video-with-trailer')[0].attribs['data-trailer-url']
                    var link = $('#content > div.container.container-lg.p-0 > div > div > div:nth-child(2) > div > a.thumb')[0].attribs.href
                    var thumb_image = $('.thumb > img')[0].attribs['data-src']
                    var title = $('.infos > .title')[0].children[0].data
                    var duration = $('.infos > .video-datas > .duration')[0].children[0].data
                    var rating = $('.infos > .video-datas > .rating')[0].children[1].data.trim()
                    var views = $('.infos > .video-datas > .views-number')[0].children[1].data.trim()
                    axios(link).then(async respon => {
                        var video_download = respon.data.split('videoHigh="')[1].split('";')[0]
                        var resultados = {
                            titulo: title,
                            thumb_video: thumb_video,
                            thumb_image: thumb_image,
                            duration: duration,
                            rating: rating,
                            views: views,
                            video_download: video_download,
                            status:200
                        }
                        res.send(JSON.stringify(resultados, null, 2) + '\n')
                    }).catch(async err => {
                        console.log(err);
                        res.send(JSON.stringify({
                            resposta: 'Não encontrado',
                            error: 404
                        }))
                    })
                }).catch(async err => {
                    res.send(JSON.stringify({
                        resposta: 'Não encontrado',
                        error: 404
                    }))
                })
            }
            catch {
                res.send(JSON.stringify({
                    resposta: 'Não encontrado',
                    error: 404
                }))
            }
        })
        app.get('/porn/fapster', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga a palavra chave', status:403}, null, 2)+ '\n')
            try {
                axios(`https://fapster.xxx/search/${dados.query}/`).then(({data}) =>{
                    var $ = cheerio.load(data)
                    var is_hd = false
                    if($('.item > a > .img')[0].children[3].children[0].data == 'hd') is_hd = true
                    var title = $('.item')[0].children[1].attribs.title
                    var link = $('.item')[0].children[1].attribs.href
                    var thumb = $('.item > a > .img > img')[0].attribs['data-src']
                    var uploaded = $('.item > a > .info-post > .stat')[0].children[1].children[1].data
                    var views = $('.item > a > .info-post > .stat')[0].children[3].children[1].data
                    var likes_porcent = $('.item > a > .info-post > .stat')[0].children[5].children[1].data
                    var duration = $('.item > a > .img > .time')[0].children[0].data
                    var resultado = {
                        titulo: title,
                        link: link,
                        thumb: thumb,
                        is_hd: is_hd,
                        uploaded: uploaded,
                        views: views,
                        likes_porcent: likes_porcent,
                        duration: duration,
                        status:200
                    }
                    res.send(JSON.stringify(resultado, null, 2) + '\n')
                }).catch(async err => {
                    res.send(JSON.stringify({
                        resposta: 'Não encontrado',
                        error: 404
                    }))
                })
            }
            catch {
                res.send(JSON.stringify({
                    resposta: 'Não encontrado',
                    error: 404
                }))
            }
        })
        app.get('/porn/xnxx', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga a palavra chave', status:403}, null, 2)+ '\n')
            try {
                axios(`https://www.xnxx.com/search/${dados.query}`).then(({data}) => {
                    var $ = cheerio.load(data)
                    var id = $('.thumb-inside > .thumb')[0].children[0].children[0].attribs['data-src'].split('thumbs169xnxxll')[1].split('.')[0].split('/')
                    var title = $('.thumb-under')[0].children[0].children[0].attribs.title
                    var link = 'https://www.xnxx.com' + $('.thumb-under')[0].children[0].children[0].attribs.href
                    var thumb_image = $('.thumb-inside > .thumb')[0].children[0].children[0].attribs['data-src']
                    var preview_thumb = `https://img-hw.xnxx-cdn.com/videos/videopreview/${id[1]}/${id[2]}/${id[3]}/${id[4]}_169.mp4`
                    var duration = $('.metadata')[0].children[1].data.trim()
                    var views = $('.metadata > .right')[0].children[0].data.trim()
                    var quality = $('.metadata > .video-hd')[0].children[1].data.trim()
                    axios(link).then(({data}) => {
                        var $ = cheerio.load(data)
                        var likes = $('.vote-actions')[0].children[0].children[1].children[0].data
                        var dislikes = $('.vote-actions')[0].children[1].children[1].children[0].data
                        var rating = $('.rating-box.value').text()
                        var full_tag
                        for(i=0; i< $('.metadata-row.video-tags > a').length; ++i) {
                            full_tag += $('.metadata-row.video-tags > a')[i].children[0].data+', '
                        }
                        var dl_link = data.split('setVideoUrlHigh(\'')[1].split('\')')[0]
                        var tags = full_tag.slice(9)
                        var resultado = {
                            titulo: title,
                            link: link,
                            image_thumb: thumb_image,
                            video_thumb: preview_thumb,
                            duration: duration,
                            views: views,
                            qualidade: quality,
                            likes: likes,
                            deslikes: dislikes,
                            rating: rating,
                            tags: tags,
                            dl_link,
                            status:200
                        }
                        res.send(JSON.stringify(resultado, null, 2) + '\n')
                    }).catch(async err => {
                        res.send(JSON.stringify({
                            resposta: 'Não encontrado',
                            error: 404
                        }))
                    })
                }).catch(async err => {
                    res.send(JSON.stringify({
                        resposta: 'Não encontrado',
                        error: 404
                    }))
                })
            }
            catch {
                res.send(JSON.stringify({
                    resposta: 'Não encontrado',
                    error: 404
                }))
            }
        })
        app.get('/porn/pornhub', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga a palavra chave', status:403}, null, 2)+ '\n')
            try {
                porn.search(dados.query).then(result => {
                    const results = []
                    for(i=0; i < 3; ++i) {
                        results.push(result.results[i])
                    }
                    res.send(JSON.stringify({resultado: results
                        ,status:200
                    }, null, 2) + '\n')
                }).catch(async err => {
                    res.send(JSON.stringify({
                        resposta: 'Não encontrado',
                        error: 404
                    }))
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Não encontrado',
                    error: 404
                }))
            }
        })
        app.get('/porn/xvideos', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga a palavra chave', status:403}, null, 2)+ '\n')
            try {
                axios(`https://www.xvideos.com/?k=${dados.query}`, {method: 'GET'}).then(async ({data}) => {
                    var $ = cheerio.load(data)
                    var title = $('.thumb-block > .thumb-under')[0].children[0].children[0].attribs.title
                    var link = 'https://www.xvideos.com'+$('.thumb-block > .thumb-under')[0].children[0].children[0].attribs.href
                    var thumb = $('.thumb-block > .thumb-inside > .thumb')[0].children[0].children[0].attribs['data-src']
                    axios(link, {method: 'GET'}).then(({data}) => {
                        var $ = cheerio.load(data)
                        var views = $('#nb-views-number').text()
                        var likes = $('.btn.btn-default.vote-action-good > .rating-inbtn').text()
                        var dislikes = $('.btn.btn-default.vote-action-bad > .rating-inbtn').text()
                        var commentscount = $('.navbadge.nb-video-comments.nb-video-comments-27').text()
                        var channel = $('.btn.btn-default.label.main.uploader-tag.hover-name')[0].children[0].children[0].data
                        var duration = $('span.duration').text()
                        var videoid = link.split('/')[3].slice(5)
                        var dl_url = data.split('setVideoUrlHigh(\'')[1].split('\');')[0]
                        var resultado = {
                            id: videoid,
                            titulo: title,
                            link: link,
                            thumb: thumb,
                            view: views,
                            duration: duration,
                            likes: likes,
                            deslikes: dislikes,
                            comentarios:commentscount,
                            canal: channel,
                            dl_link: dl_url,
                            status:200
                        }
                        res.send(JSON.stringify(resultado, null, 2) + '\n')
                    }).catch(async err => {
                        res.send(JSON.stringify({
                            resposta: 'Não encontrado',
                            error: 404
                        }))
                    })
                }).catch(async err => {
                    res.send(JSON.stringify({
                        resposta: 'Não encontrado',
                        error: 404
                    }))
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Não encontrado',
                    error: 404
                }))
            }
        })
    }
    async function redessociaisapi() {
        app.get('/sociais/tiktok', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.url) return res.send(JSON.stringify({resposta:'Diga a url do vídeo', status:403}, null, 2)+ '\n')
            try {
                res.send(JSON.stringify(await getUrlTiktok(dados.url), null, 2))
            } catch (e) {
                res.send(JSON.stringify({message: 'falha'}, null, 2))
            }
        })
        app.get('/sociais/instagram', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.url) return res.send(JSON.stringify({resposta:'Diga a url do vídeo', status:403}, null, 2)+ '\n')
            try {
                res.send(JSON.stringify(await instagramDownloader(dados.url), null, 2))
            } catch (e) {
                res.send(JSON.stringify({message: 'falha'}, null, 2))
            }
        })
        app.get('/sociais/ttksearch', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.username) return res.send(JSON.stringify({resposta:'Diga o que tenho que pesquisar', status:403}, null, 2)+ '\n')
            try {
                tiktok.getUserProfileInfo(dados.username).then
            } catch(e) {
                console.log(e);
                res.send(JSON.stringify({
                    resposta: 'falha ao pesquisar no tiktok',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/sociais/youtubesrc', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga o que tenho que pesquisar', status:403}, null, 2)+ '\n')
            try {
                youtube.search(dados.query).then(results => {
                    var vids = []
                    for(i =0; i < results.videos.length; ++i) {
                        vids.push(results.videos[i])
                    }
                    res.send(JSON.stringify({
                        resultados: vids,
                        status: 200
                    }, null, 2)+ '\n')
                })
            } catch(e) {
                console.log(e);
                res.send(JSON.stringify({
                    resposta: 'falha ao pesquisar no youtube',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/sociais/ytplaymp3', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga o que tenho que pesquisar no youtube', status:403}, null, 2)+ '\n')
            try {
                youtube.search(dados.query).then(async results => {
                    var videoid = results.videos[0].id
                    var duration = results.videos[0].duration
                    var ytres = await new Youtube().ytmp3(`https://youtu.be/${videoid}`)
                    res.send(JSON.stringify({
                        titulo: results.videos[0].title,
                        link_share: results.videos[0].link,
                        thumb: results.videos[0].thumbnail,
                        canal: results.videos[0].channel,
                        views: results.videos[0].views,
                        duration: fmtMSS(duration),
                        audio_src: await tinyurl.shorten(ytres.dl_link),
                        quality: ytres.quality,
                        type: 'mp3',
                        description: results.videos[0].description, 
                        status: 200
                    },null, 2)+'\n')
                }).catch(err => console.log(err))
            } catch {
                res.send(JSON.stringify({
                    resposta: 'falha ao pesquisar no youtube',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/sociais/v2/ytplaymp3', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga o que tenho que pesquisar no youtube', status:403}, null, 2)+ '\n')
            try {
                youtube.search(dados.query).then(async results => {
                    var videoid = results.videos[0].id
                    var duration = results.videos[0].duration
                    const ytres = await ytdown.yta(`https://www.youtube.com/watch?v=${videoid}`)
                    res.send(JSON.stringify({
                        titulo: results.videos[0].title,
                        link_share: results.videos[0].link,
                        thumb: results.videos[0].thumbnail,
                        canal: results.videos[0].channel,
                        views: results.videos[0].views,
                        duration: fmtMSS(duration),
                        link_src: await tinyurl.shorten(ytres.dl_link),
                        size: ytres.size,
                        type: 'mp3',
                        description: results.videos[0].description, 
                        status: 200
                    },null, 2)+'\n')
                    
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'falha ao pesquisar no youtube',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/sociais/v2/ytplaymp4', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga o que tenho que pesquisar no youtube', status:403}, null, 2)+ '\n')
            try {
                youtube.search(dados.query).then(async results => {
                    var videoid = results.videos[0].id
                    var duration = results.videos[0].duration
                    const ytres = await ytdown.ytv(`https://www.youtube.com/watch?v=${videoid}`)
                    res.send(JSON.stringify({
                        titulo: results.videos[0].title,
                        link_share: results.videos[0].link,
                        thumb: results.videos[0].thumbnail,
                        canal: results.videos[0].channel,
                        views: results.videos[0].views,
                        duration: fmtMSS(duration),
                        link_src: await tinyurl.shorten(ytres.dl_link),
                        size: ytres.size,
                        quality: '360p',
                        type: 'mp4',
                        description: results.videos[0].description, 
                        status: 200
                    },null, 2)+'\n')
                    
                }).catch(err => console.log)
            } catch {
                res.send(JSON.stringify({
                    resposta: 'falha ao pesquisar no youtube',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/sociais/v2/ytmp3', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.url) return res.send(JSON.stringify({resposta:'Diga uma url do youtube', status:403}, null, 2)+ '\n')
            try {
                if(dados.url.match(getvideoid)){
                    fetch("https://x2download.com/api/ajaxSearch", {
                        "headers": {
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        },
                        "body": `q=${dados.url}&vt=home`,
                        "method": "POST"
                    }).then(async (resp) => {
                        const json = await resp.json()
                        const size = json.links.mp3['2'].size
                        const type = json.links.mp3['2'].key
                        const title = json.title
                        const channel = json.a
                        const time = fmtMSS(json.t)
                        fetch("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", {
                            "headers": {
                              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                              "x-requested-key": "de0cfuirtgf67a"
                            },
                            "body": `v_id=${json.vid}&ftype=mp3&fquality=128&token=${json.token}&timeExpire=${json.timeExpires}&client=X2Download.com`,
                            "method": "POST"
                        }).then(async response => {
                            const json2 = await response.json()
                            const dl_link = json2.d_url
                            const res_json = {
                                size,
                                type,
                                dl_link: await tinyurl.shorten(dl_link),
                                channel,
                                time,
                                title
                            }
                            res.send(JSON.stringify(res_json, null, 2))
                        })
                    })
                } else return res.send(JSON.stringify({resposta: 'insira um link válido', status: 404}, null, 2) + '\n')
            } catch(e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'falha ao música do youtube',
                    status: 404
                }, null, 2) + '\n')
            }

        })
        app.get('/sociais/v2/ytmp4', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.url) return res.send(JSON.stringify({resposta:'Diga uma url do youtube', status:403}, null, 2)+ '\n')
            try {
                if(dados.url.match(getvideoid)){
                    fetch("https://x2download.com/api/ajaxSearch", {
                        "headers": {
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        },
                        "body": `q=${dados.url}&vt=home`,
                        "method": "POST"
                    }).then(async (resp1) => {
                        const json = await resp1.json()
                        const time = fmtMSS(json.t)
                        const title = json.title
                        const channel = json.a
                        var size;
                        for(i = 3; i < 8; ++i) {
                            if(json.links.mp4[i].k == '360p') {
                                size = json.links.mp4[i].size
                            }
                        }
                        fetch("https://dd75.meonajfaf.xyz/api/json/convert", {
                            "headers": {
                            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            },
                            "body": `v_id=${json.vid}&ftype=mp4&fquality=360p&fname=${json.fn}&token=${json.token}&timeExpire=${json.timeExpires}`,
                            "method": "POST"
                        }).then(async resp2 => {
                            const json = await resp2.json()
                            res.send(JSON.stringify({
                                title,
                                channel,
                                time,
                                size,
                                type: 'mp4',
                                dl_link: await tinyurl.shorten(json.result)
                            }, null, 2))
                        })
                    })
                } else return res.send(JSON.stringify({resposta: 'insira um link válido', status: 404}, null, 2) + '\n')
            } catch(e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'falha ao música do youtube',
                    status: 404
                }, null, 2) + '\n')
            }

        })
        app.get('/sociais/ytmp3', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.url) return res.send(JSON.stringify({resposta:'Diga uma url do youtube', status:403}, null, 2)+ '\n')
            try {
                if(dados.url.match(getvideoid)){
                    var videoid = dados.url.match(getvideoid)[1]
                    var json = await new Youtube().ytmp3(`https://youtu.be/${videoid}`)
                    json.dl_link = await tinyurl.shorten(json.dl_link)
                    res.send(JSON.stringify(json, null, 2))
                } else return res.send(JSON.stringify({resposta: 'insira um link válido', status: 404}, null, 2) + '\n')
            } catch(e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'falha ao música do youtube',
                    status: 404
                }, null, 2) + '\n')
            }
            
        })
        app.get('/sociais/ytmp4', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.url) return res.send(JSON.stringify({resposta:'Diga uma url do youtube', status:403}, null, 2)+ '\n')
            try {
                var videoid = dados.url.match(getvideoid)[1]
                let json = await new Youtube().ytmp4(`https://www.youtube.com/watch?v=${videoid}`)
                json.dl_link = await tinyurl.shorten(json.dl_link)
                res.send(JSON.stringify(json, null, 2) + '\n')
            } catch(e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'falha ao música do youtube',
                    status: 404
                }, null, 2) + '\n')
            }
            
        })
        app.get('/sociais/ytplaymp4', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga o que tenho que pesquisar no youtube', status:403}, null, 2)+ '\n')
            try {
                youtube.search(dados.query).then(async results => {
                    var videoid = results.videos[0].id
                    var duration = results.videos[0].duration
                    var ytres = await new Youtube().ytmp4(`https://youtu.be/${videoid}`)
                    res.send(JSON.stringify({
                        titulo: results.videos[0].title,
                        link_share: results.videos[0].link,
                        thumb: results.videos[0].thumbnail,
                        canal: results.videos[0].channel,
                        views: results.videos[0].views,
                        duration: fmtMSS(duration),
                        video: await tinyurl.shorten(ytres.dl_link),
                        quality: ytres.quality,
                        type: 'mp4',
                        description: results.videos[0].description, 
                        status: 200
                    },null, 2)+'\n')
                }).catch(err => console.log)
            } catch {
                res.send(JSON.stringify({
                    resposta: 'falha ao pesquisar no youtube',
                    status: 404
                }, null, 2) + '\n')
            }
        })
    }
    async function audioapis() {
        app.post('/audio/esquilo', async (req, res) => {
            let dados = req.body
            let media = req.files
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!media) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(!media.audio) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(media.audio.mimetype != 'audio/mpeg') return res.send(JSON.stringify({resposta:'Apenas arquivos em mp3', status:403}, null, 2)+ '\n')
            try {
                ran = getRandom('.mp3')
                rano = getRandom('.mp3')
                fs.writeFileSync(ran, media.audio.data)
                await execute(`ffmpeg -i ${ran} -filter:a "atempo=0.5,asetrate=65100" ${rano}`)
                res.header("Content-Type",'audio/mpeg')
                await res.send(fs.readFileSync(rano))
                fs.unlinkSync(ran)
                fs.unlinkSync(rano)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao modificar audio',
                    status: 404
                }, null, 2) +'\n')
            }
        })
        app.post('/audio/bass', async (req, res) => {
            let dados = req.body
            let media = req.files
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!media) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(!media.audio) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(media.audio.mimetype != 'audio/mpeg') return res.send(JSON.stringify({resposta:'Apenas arquivos em mp3', status:403}, null, 2)+ '\n')
            try {
                ran = getRandom('.mp3')
                rano = getRandom('.mp3')
                fs.writeFileSync(ran, media.audio.data)
                await execute(`ffmpeg -i ${ran} -af bass=g=100:f=110:w=0.6 ${rano}`)
                res.header("Content-Type",'audio/mpeg')
                await res.send(fs.readFileSync(rano))
                fs.unlinkSync(ran)
                fs.unlinkSync(rano)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao modificar audio',
                    status: 404
                }, null, 2) +'\n')
            }
        })
        app.post('/audio/estourar', async (req, res) => {
            let dados = req.body
            let media = req.files
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!media) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(!media.audio) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(media.audio.mimetype != 'audio/mpeg') return res.send(JSON.stringify({resposta:'Apenas arquivos em mp3', status:403}, null, 2)+ '\n')
            try {
                ran = getRandom('.mp3')
                rano = getRandom('.mp3')
                fs.writeFileSync(ran, media.audio.data)
                await execute(`ffmpeg -i ${ran} -af equalizer=f=500:width_type=o:width=2:g=30 ${rano}`)
                res.header("Content-Type",'audio/mpeg')
                await res.send(fs.readFileSync(rano))
                fs.unlinkSync(ran)
                fs.unlinkSync(rano)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao modificar audio',
                    status: 404
                }, null, 2) +'\n')
            }
        })
        app.post('/audio/reverseaudio', async (req, res) => {
            let dados = req.body
            let media = req.files
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!media) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(!media.audio) return res.send(JSON.stringify({resposta:'Necessito do audio', status:403}, null, 2)+ '\n')
            if(media.audio.mimetype != 'audio/mpeg') return res.send(JSON.stringify({resposta:'Apenas arquivos em mp3', status:403}, null, 2)+ '\n')
            try {
                ran = getRandom('.mp3')
                rano = getRandom('.mp3')
                fs.writeFileSync(ran, media.audio.data)
                await execute(`ffmpeg -i ${ran} -af areverse ${rano}`)
                res.header("Content-Type",'audio/mpeg')
                await res.send(fs.readFileSync(rano))
                fs.unlinkSync(ran)
                fs.unlinkSync(rano)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao inverter audio',
                    status: 404
                }, null, 2) +'\n')
            }
        })
    }
    async function videosapis() {
        app.post('/video/reversevideo', async (req, res) => {
            let dados = req.body
            let media = req.files
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!media) return res.send(JSON.stringify({resposta:'Necessito do vídeo', status:403}, null, 2)+ '\n')
            if(!media.video) return res.send(JSON.stringify({resposta:'Necessito do vídeo', status:403}, null, 2)+ '\n')
            if(media.video.mimetype != 'video/mp4') return res.send(JSON.stringify({resposta:'Apenas arquivos em mp4', status:403}, null, 2)+ '\n')
            try {
                ran = getRandom('.mp4')
                rano = getRandom('.mp4')
                fs.writeFileSync(ran, media.video.data)
                await execute(`ffmpeg -i ${ran} -vf reverse -af areverse ${rano}`)
                res.header("Content-Type",'video/mp4')
                await res.send(fs.readFileSync(rano))
                fs.unlinkSync(ran)
                fs.unlinkSync(rano)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao inverter vídeo',
                    status: 404
                }, null, 2) +'\n')
            }
        })
        app.post('/video/rapidvid', async (req, res) => {
            let dados = req.body
            let media = req.files
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!media) return res.send(JSON.stringify({resposta:'Necessito do vídeo', status:403}, null, 2)+ '\n')
            if(!media.video) return res.send(JSON.stringify({resposta:'Necessito do vídeo', status:403}, null, 2)+ '\n')
            if(media.video.mimetype != 'video/mp4') return res.send(JSON.stringify({resposta:'Apenas arquivos em mp4', status:403}, null, 2)+ '\n')
            try {
                ran = getRandom('.mp4')
                rano = getRandom('.mp4')
                fs.writeFileSync(ran, media.video.data)
                await execute(`ffmpeg -i ${ran} -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" ${rano}`)
                res.header("Content-Type",'video/mp4')
                await res.send(fs.readFileSync(rano))
                fs.unlinkSync(ran)
                fs.unlinkSync(rano)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao inverter vídeo',
                    status: 404
                }, null, 2) +'\n')
            }
        })
        app.post('/video/lentovid', async (req, res) => {
            let dados = req.body
            let media = req.files
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!media) return res.send(JSON.stringify({resposta:'Necessito do vídeo', status:403}, null, 2)+ '\n')
            if(!media.video) return res.send(JSON.stringify({resposta:'Necessito do vídeo', status:403}, null, 2)+ '\n')
            if(media.video.mimetype != 'video/mp4') return res.send(JSON.stringify({resposta:'Apenas arquivos em mp4', status:403}, null, 2)+ '\n')
            try {
                ran = getRandom('.mp4')
                rano = getRandom('.mp4')
                fs.writeFileSync(ran, media.video.data)
                await execute(`ffmpeg -i ${ran} -filter_complex "[0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" ${rano}`)
                res.header("Content-Type",'video/mp4')
                await res.send(fs.readFileSync(rano))
                fs.unlinkSync(ran)
                fs.unlinkSync(rano)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao inverter vídeo',
                    status: 404
                }, null, 2) +'\n')
            }
        })
    }
    async function photosapi() {
        app.get('/photomod/rank', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.name) return res.send(JSON.stringify({resultado:'Diga o nome de usuário', status:403}, null, 2)+ '\n')
            if(!dados.atualxp) return res.send(JSON.stringify({resultado:'Diga o xp atual', status:403}, null, 2)+ '\n')
            if(!dados.maxxp) return res.send(JSON.stringify({resultado:'Diga o xp maximo', status:403}, null, 2)+ '\n')
            if(!dados.desc) return res.send(JSON.stringify({resultado:'Diga o xp maximo', status:403}, null, 2)+ '\n')
            if(!dados.colorbar) return res.send(JSON.stringify({resultado:'Diga a cor da barra de progresso em formato HEX sem o #', status:403}, null, 2)+ '\n')
            if(!dados.colortext) return res.send(JSON.stringify({resultado:'Diga a cor do texto em formato HEX sem o #', status:403}, null, 2)+ '\n')
            if(!dados.background) return res.send(JSON.stringify({resultado:'Diga a url do fundo', status:403}, null, 2)+ '\n')
            if(!dados.profileimg) return res.send(JSON.stringify({resultado:'Diga a url da foto de perfil do usuário', status:403}, null, 2)+ '\n')
            if(!dados.rank) return res.send(JSON.stringify({resultado:'Diga o rank do usuário', status:403}, null, 2)+ '\n')
            if(!dados.level) return res.send(JSON.stringify({resultado:'Diga o level do usuário', status:403}, null, 2)+ '\n')
            try{
                await res.header("Content-Type",'image/png');
                const rank = new canvacord.Rank()
                .setAvatar(dados.profileimg)
                .setCurrentXP(parseFloat(dados.atualxp))
                .setRequiredXP(parseFloat(dados.maxxp))
                .setStatus('online')
                .setProgressBar('#'+dados.colorbar, "COLOR")
                .setRank(parseFloat(dados.rank))
                .setRankColor('#'+dados.colortext)
                .setLevelColor('#'+dados.colortext)
                .setLevel(parseInt(dados.level))
                .setUsername(dados.name)
                .setDiscriminator(dados.desc)
                .setBackground("IMAGE", dados.background)
                .setOverlay('#000000', 0.6)
                
                rank.build().then(data => {
                    res.send(data)
                })
            } catch (e) {
                await res.header("Content-Type",'application/json');
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao upar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photomod/spotify', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.author) return res.send(JSON.stringify({resultado:'Diga o nome do autor', status:403}, null, 2)+ '\n')
            if(!dados.album) return res.send(JSON.stringify({resultado:'Diga o nome do album', status:403}, null, 2)+ '\n')
            if(!dados.timestart) return res.send(JSON.stringify({resultado: 'Diga o tempo de inicio da música', status:403}, null, 2)+ '\n')
            if(!dados.timeend) return res.send(JSON.stringify({resultado: 'Diga o tempo de fim da música', status:403}, null, 2)+ '\n')
            if(!dados.thumb) return res.send(JSON.stringify({resultado: 'Diga a thumb da música', status:403}, null, 2)+ '\n')
            if(!dados.title) return res.send(JSON.stringify({resultado: 'Diga o título da música', status:403}, null, 2)+ '\n')
            try{
                await res.header("Content-Type",'image/png');
                const card = new canvacord.Spotify()
                .setAuthor(dados.author)
                .setAlbum(dados.album)
                .setStartTimestamp(parseInt(dados.timestart))
                .setEndTimestamp(parseInt(dados.timeend))
                .setImage(dados.thumb)
                .setTitle(dados.title);
                card.build()
                .then(buffer => {
                    res.send(buffer)
                });
            } catch (e) {
                await res.header("Content-Type",'application/json');
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao upar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photomod/welcome', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.background) return res.send(JSON.stringify({resultado:'Diga a url do fundo da imagem', status:403}, null, 2)+ '\n')
            if(!dados.profileimg) return res.send(JSON.stringify({resultado:'Diga a url da foto de perfil do membro', status:403}, null, 2)+ '\n')
            if(!dados.groupimg) return res.send(JSON.stringify({resultado:'Diga a url da foto de perfil do grupo', status:403}, null, 2)+ '\n')
            if(!dados.number) return res.send(JSON.stringify({resultado:'Diga o numero de membros do grupo', status:403}, null, 2)+ '\n')
            if(!dados.groupname) return res.send(JSON.stringify({resultado:'Diga o nome do grupo', status:403}, null, 2)+ '\n')
            if(!dados.desc) return res.send(JSON.stringify({resultado:'Diga a descrição', status:403}, null, 2)+ '\n')
            if(!dados.name) return res.send(JSON.stringify({resultado:'Diga o nome de usuario', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                const image = await cord.Welcome()
                .setUsername(dados.name)
                .setMemberCount(dados.number)
                .setDiscriminator(dados.desc)
                .setGuildName(dados.groupname)
                .setGuildIcon(dados.groupimg)
                .setAvatar(dados.profileimg)
                .setBackground(dados.background)
                .toAttachment()
                res.send(image)
                
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao upar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photomod/circle', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Circle().getImage(dados.img).then(result => {
                    res.send(result)
                }).catch(async err => {
                    await res.header("Content-Type",'application/json');
                    res.send({resposta: 'Falha ao processar imagem'})
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photomod/getcolor', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.color) return res.send(JSON.stringify({resultado:'diga o código HEX da cor', status:403}, null, 2)+ '\n')
            await res.header("Content-Type",'image/png');
            try{
                ran = getRandom('.png')
                new DIG.Color().getImage('#'+dados.color).then(result => {
                    res.send(result)
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photomod/reversegif', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.gif) return res.send(JSON.stringify({resposta:'Cade o link do gif?', status:403}, null, 2)+ '\n')
            try {
                buff = await getBuffer(dados.gif)
                rano = getRandom('.gif')
                ran = getRandom('.gif')
                fs.writeFileSync(rano, buff)
                await execute(`ffmpeg -i ${rano} -vf reverse ${ran}`)
                res.header("Content-Type",'image/gif');
                await res.send(fs.readFileSync(ran))
                fs.unlinkSync(ran)
                fs.unlinkSync(rano)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao inverter gif',
                    status: 404
                }, null, 2) +'\n')
            }
        })
        app.get('/photomod/giftowebp', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Cade o link da imagem?', status:403}, null, 2)+ '\n')
            try {
                buff = await getBuffer(dados.img)
                ran = getRandom('.gif')
                rano = getRandom('.webp')
                fs.writeFileSync(ran, buff)
                const result = webp.gwebp(ran, rano, '-q 80', logging='-v')
                result.then((resulta) => {
                    res.header("Content-Type",'image/webp')
                    res.send(fs.readFileSync(rano))
                })
                setTimeout(async function () {
                    fs.unlinkSync(ran)
                    fs.unlinkSync(rano)
                }, 10000)
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({
                    resposta: 'Falha ao converter gif',
                    status: 404
                }, null, 2) +'\n')
            }
        })
        app.get('/photomod/resizeimg', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Cade o link da imagem?', status:403}, null, 2)+ '\n')
            if(!dados.width) return res.send(JSON.stringify({resposta:'Fale a largura', status:403}, null, 2)+ '\n')
            if(!dados.height) return res.send(JSON.stringify({resposta:'Fale a altura', status:403}, null, 2)+ '\n')
            ran = getRandom('.webp')
            res.header("Content-Type",'image/png');
            execute(`ffmpeg -i ${dados.img} -vf scale=${dados.width}:${dados.height} ${ran}`, async function (err) {
                if(err) return res.send(JSON.stringify({resposta:'Erro ao criar sticker', status:403}, null, 2)+ '\n')
                res.send(fs.readFileSync(ran))
                setTimeout(async function () {
                    fs.unlinkSync(ran)
                }, 20000)
        
            })
        })
        app.get('/photomod/sticker/formatter', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.img) return res.send(JSON.stringify({resposta:'Cade o link da imagem?', status:403}, null, 2)+ '\n')
            ran = getRandom('.webp')
            res.header("Content-Type",'image/webp');
            execute(`ffmpeg -i ${dados.img} -vf scale=512:512 ${ran}`, async function (err) {
                if(err) return res.send(JSON.stringify({resposta:'Erro ao criar sticker', status:403}, null, 2)+ '\n')
                res.send(fs.readFileSync(ran))
                setTimeout(async function () {
                    fs.unlinkSync(ran)
                }, 60000)
        
            })
        
        })

        app.get('/photomod/v2/menu', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.profileimg) return res.send(JSON.stringify({resposta:'Necessito do link da foto de perfil', status:403}, null, 2)+ '\n')
            if(!dados.background) return res.send(JSON.stringify({resposta:'Necessito do link da foto de perfil', status:403}, null, 2)+ '\n')
            if(!dados.description) return res.send(JSON.stringify({resposta:'Necessito da descrição da imagem', status:403}, null, 2)+ '\n')
            try {
                var buffprofile = await getBuffer(dados.profileimg)
                var buffback = await getBuffer(dados.background)
                var desc = dados.description
                var ranpp = getRandom('.png')
                var ppng = getRandom('.png')
                var ranback = getRandom('.png')
                var ranbackres = getRandom('.png')
                var errmsg = {resultado: 'error', status: 404}
                await gm(buffprofile).resize(400, 400, '!').write(ranpp, async(err) => {
                    if(err) return res.send(JSON.stringify(errmsg, null, 2)+'\n')
                    gm(400, 400, 'none').fill(ranpp).drawCircle(200, 200, 200, 0).write(ppng, (err) => {
                        if(err) return res.send(JSON.stringify(errmsg, null, 2)+'\n')
                        gm(buffback).gravity('Center').composite(ppng).geometry('-0-100').write(ranback, async (err) =>{
                            if(err) return res.send(JSON.stringify(errmsg, null, 2)+'\n')
                            gm(ranback).fill('white').font('./database/fonts/Sonic.ttf', 52).drawText(0, 200, desc, 'Center').write(ranbackres, (err) =>{
                                if(err) return res.send(JSON.stringify(errmsg, null, 2)+'\n')
                                fs.unlinkSync(ranback)
                                fs.unlinkSync(ranpp)
                                fs.unlinkSync(ppng)
                                res.header("Content-Type",'image');
                                res.send(fs.readFileSync(ranbackres))
                                setTimeout(async function(){
                                    fs.unlinkSync(ranbackres)
                                }, 10000)
                            })
                        })
                    })
                })

            } catch (e){
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }

        })
        app.get('/photomod/v1/menu', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.profileimg) return res.send(JSON.stringify({resposta:'Necessito do link da foto de perfil', status:403}, null, 2)+ '\n')
            if(!dados.background) return res.send(JSON.stringify({resposta:'Necessito do link do fundo da imagem em 1280x720', status:403}, null, 2)+ '\n')
            if(!dados.description) return res.send(JSON.stringify({resposta:'Necessito da descrição da imagem', status:403}, null, 2)+ '\n')
            if(!dados.title) return res.send(JSON.stringify({resposta:'Necessito do título', status:403}, null, 2)+ '\n')
            if(!dados.username) return res.send(JSON.stringify({resposta:'Necessito do título', status:403}, null, 2)+ '\n')
            try {
                const welcomer = await new canvas.Goodbye()
                .setUsername(dados.username)
                .setGuildName(``)
                .setDiscriminator(new Date().getFullYear())
                .setMemberCount(``)
                .setAvatar(dados.profileimg)
                .setText("title", dados.title)
                .setText("message", dados.description)
                .setText("member-count", ``)
                .setText("discriminator-box", '')
                .setColor('border', '#00100C')
                .setColor('username-box', '#00100C')
                .setColor('discriminator-box', '#00100C')
                .setColor('message-box', '#00100C')
                .setColor('title', '#AE00FF')
                .setOpacity("username-box", 0.6)
                .setOpacity("discriminator-box", 0.6)
                .setOpacity("message-box", 0.6)
                .setOpacity("border", 0.4)
                .setBackground(dados.background)
                .toAttachment()
                res.header("Content-Type",'image');
                res.send(welcomer.toBuffer())
            } catch (e){
                console.log(e)
                res.header("Content-Type",'application/json');
                res.status(404).send(JSON.stringify({
                    result:'error',
                    status: 404
                }, null, 2) + '\n')
            }
        })
    }
    async function randomapi() {
        app.get('/random/quotes', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            const quote = await Quotes.randomQuote();
            res.send(JSON.stringify({quote: quote, status: 200}, null, 2) + '\n')
        })
        app.get('/random/shota', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await loli.getSFWShota()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/loli', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await loli.getSFWLoli()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/waifu', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.waifu()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/avatar', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.avatar()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/gegc', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.gecg()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/goose', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.goose()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/wallpaper', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.wallpaper()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/woof', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.woof()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/holo', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.holo()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/kemonomimi', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.kemonomimi()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/cuddle', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.cuddle()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/feed', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.feed()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/foxgirl', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.foxGirl()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hug', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.hug()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/kiss', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.kiss()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/lizard', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.lizard()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/meow', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.meow()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/nekogif', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.nekoGif()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image/gif')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/neko', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.neko()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/pat', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.pat()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/poke', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.poke()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/slap', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.slap()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/tickle', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.tickle()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/baka', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.baka()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/smug', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.smug()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/fuckmylife', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            translate(fml(), {to: 'pt'}).then(result => {
                res.send(JSON.stringify({
                    resultado: result.text.slice(0,-5),
                    status:200
                }, null, 2) + '\n')
            }).catch(err => {
                res.send(JSON.stringify({
                    resultado: 'Err',
                    status: 404
                }, null, 2) + '\n')
            })
        })
    }
    async function hentaiapi() {
        app.get('/random/hentai/tentacles', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.tentacles()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/gangbang', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.gangbang()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/uniform', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.uniform()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/ahegao', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.ahegao()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/pussy', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.vagina()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/thighs', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.thighs()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/cuckold', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.cuckold()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/glasses', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.glasses()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/pantsu', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.pantsu()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/orgy', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.orgy()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/public', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.public()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/incest', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.incest()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/manga', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.manga()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/creampie', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.creampie()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/bdsm', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.bdsm()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/ass', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.ass()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/nsfwloli', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await loli.getNSFWLoli()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/blowjob', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.blowjob()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/eroneko', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.neko()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/erokemonomimi', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.NekoBot.sfw.kemonomimi()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/erokitsune', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.NekoBot.nsfw.kitsune()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/ero', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.ero()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/feet', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.foot()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/femdom', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.femdom()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/hentai', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.hentai()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/nsfwholoero', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.ero()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/nsfwholo', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.NekoBot.sfw.holo()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/kitsune', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.NekoBot.nsfw.kitsune()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/nsfwkemonomimi', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.NekoBot.sfw.kemonomimi()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/pussywankgif', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await neko.nsfw.pussyWankGif()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/girlsolo', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.masturbation()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/yuri', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.yuri()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/anal', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.NekoBot.nsfw.anal()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/boobs', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.boobjob()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/cumsluts', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.cum()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/neko', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.neko()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/nsfwnekogif', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.Nekos.nsfw.nekogif()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/random/hentai/hentaigif', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            linkimg = (await HMfull.HMtai.nsfw.gif()).url
            buff = await getBuffer(linkimg)
            try {
                res.header("Content-Type", 'image')
                res.send(buff)
            } catch {
                res.sendStatus(404).send(JSON.stringify({
                    result: 'Erro, imagem não encontrada',
                    status: 404
                }, null, 2) + '\n')
            }
        })
    }
    async function consultasapi() {
        app.get('/consulta/ddd', async function(req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.ddd) return  res.send(JSON.stringify({resposta:'Falta o ddd', status:403}, null, 2)+ '\n')
            try {
                anu = await fetchJson(`https://brasilapi.com.br/api/ddd/v1/${dados.ddd}`, {method: 'get'})
                res.send(JSON.stringify({
                    resultado: anu.cities, 
                    status:200}, null, 2)+ '\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao consultar ddd', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/consulta/cep', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.cep) return  res.send(JSON.stringify({resposta:'Falta o cep', status:403}, null, 2)+ '\n')
            try {
                consultarCep(dados.cep).then(async result => {
                    res.send(JSON.stringify({resultado: result, 
                        status:200}, null, 2)+ '\n')
                }).catch(async err => {
                    res.send(JSON.stringify({
                        resultado: 'Cep invalido',
                        status: 404
                    }, null, 2))
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao consultar cep', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/consulta/rastreamento/correio', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.codigo) return  res.send(JSON.stringify({resposta:'Falta o codigo de rastreamento', status:403}, null, 2)+ '\n')
            try {
                rastrearEncomendas([dados.codigo]).then(async result => {
                    res.send(JSON.stringify({resultado: result[0], 
                        status:200}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao rastrear encomenda', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/consulta/ip', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.ip) return res.send(JSON.stringify({resposta:'Fale o ip que tenho que pesquisar gay', status:403}, null, 2)+ '\n')
            try {
                anu = await fetchJson(`http://ip-api.com/json/${dados.ip}`)
                res.send(JSON.stringify({
                    resultado: {
                        ip_informado: anu.query,
                        pais: anu.country,
                        codigo_pais: anu.countryCode,
                        regiao: anu.regionName,
                        codigo_regiao: anu.region,
                        cidade: anu.city,
                        codigo_postal: anu.zip,
                        latitude: anu.lat,
                        longitude: anu.lon,
                        fuso_horario: anu.timezone,
                        provedora: anu.isp,
                        empresa: anu.org,
                        as: anu.as
                    },
                    status: 200
                }, null, 2) + '\n')
                
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao procurar ip', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/consulta/cnpj', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.cnpj) return res.send(JSON.stringify({resposta:'Fale o CNPJ gay', status:403}, null, 2)+ '\n')
            try {
                anu = await fetchJson(`https://www.receitaws.com.br/v1/cnpj/${dados.cnpj}`)
                res.send(JSON.stringify({
                    resultado: anu,
                    status: 200
                }, null, 2) + '\n')
                
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar CNPJ', status: 404}, null, 2)+ '\n')
            }
        })
    }
    async function covidapi() {
        app.get('/covidbrasil', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                covid.countries({country:'brazil'}).then(result => {
                    res.send(JSON.stringify({
                    resultado: {
                        pais: result.country,
                        infopais: {
                            iso: result.countryInfo.iso2,
                            iso2:  result.countryInfo.iso3,
                            coord: {
                                lat: result.countryInfo.lat,
                                long: result.countryInfo.long
                            },
                            bandeira: result.countryInfo.flag
                        },
                        casos: result.cases,
                        casos_hoje: result.todayCases,
                        mortes: result.deaths,
                        mortes_hojes: result.todayDeaths,
                        recuperados: result.recovered,
                        recuperados_hoje: result.todayRecovered,
                        recuperadosPorMilhao: result.recoveredPerOneMillion,
                        ativos: result.active,
                        ativosPorMilhao: result.activePerOneMillion,
                        criticos: result.critical,
                        criticosPorMilhao: result.criticalPerOneMillion,
                        casosPorMilhao: result.casesPerOneMillion,
                        mortesPorMilhao: result.deathsPerOneMillion,
                        testes: result.tests,
                        testesPorMilhao: result.testsPerOneMillion,
                        população: result.population,
                        continente: result.continent,
                        umCasoPorPessoa: result.oneCasePerPeople,
                        umaMortePorPessoa: result.oneDeathPerPeople,
                        umTestPorPessoa: result.oneTestPerPeople,
                        casosIndefinidos: result.undefined,
                        

                    }, 
                    status: 200
                }, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar estado da api', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/covidmundo', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            try {
                covid.all().then(result => {
                    res.send(JSON.stringify({
                        resultado: {
                            paisesAfetados: result.affectedCountries,
                            casos: result.cases,
                            casos_hoje: result.todayCases,
                            mortes: result.deaths,
                            mortes_hojes: result.todayDeaths,
                            recuperados: result.recovered,
                            recuperados_hoje: result.todayRecovered,
                            recuperadosPorMilhao: result.recoveredPerOneMillion,
                            ativos: result.active,
                            ativosPorMilhao: result.activePerOneMillion,
                            criticos: result.critical,
                            criticosPorMilhao: result.criticalPerOneMillion,
                            casosPorMilhao: result.casesPerOneMillion,
                            mortesPorMilhao: result.deathsPerOneMillion,
                            testes: result.tests,
                            testesPorMilhao: result.testsPerOneMillion,
                            população: result.population,
                        }
                    }, null, 2) + '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar estado da api', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/covidcountry', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.country) return res.send(JSON.stringify({resposta:'Diga o país', status:403}, null, 2)+ '\n')
            try {
                covid.countries({country:dados.country}).then(result => {
                    if(result.message) return res.send(JSON.stringify({resultado: 'Páis nao encontrado, tente dizer em inglês', status: 404}, null, 2) + '\n')
                    res.send(JSON.stringify({
                    resultado: {
                        pais: result.country,
                        infopais: {
                            iso: result.countryInfo.iso2,
                            iso2:  result.countryInfo.iso3,
                            coord: {
                                lat: result.countryInfo.lat,
                                long: result.countryInfo.long
                            },
                            bandeira: result.countryInfo.flag
                        },
                        casos: result.cases,
                        casos_hoje: result.todayCases,
                        mortes: result.deaths,
                        mortes_hojes: result.todayDeaths,
                        recuperados: result.recovered,
                        recuperados_hoje: result.todayRecovered,
                        recuperadosPorMilhao: result.recoveredPerOneMillion,
                        ativos: result.active,
                        ativosPorMilhao: result.activePerOneMillion,
                        criticos: result.critical,
                        criticosPorMilhao: result.criticalPerOneMillion,
                        casosPorMilhao: result.casesPerOneMillion,
                        mortesPorMilhao: result.deathsPerOneMillion,
                        testes: result.tests,
                        testesPorMilhao: result.testsPerOneMillion,
                        população: result.population,
                        continente: result.continent,
                        umCasoPorPessoa: result.oneCasePerPeople,
                        umaMortePorPessoa: result.oneDeathPerPeople,
                        umTestPorPessoa: result.oneTestPerPeople,
                        casosIndefinidos: result.undefined,
                        

                    }, 
                    status: 200
                }, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar estado da api', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/covidcontinent', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.continent) return res.send(JSON.stringify({resposta:'Diga o continentemn b', status:403}, null, 2)+ '\n')
            try {
                covid.continents({continent:dados.continent}).then(result => {
                    if(result.message) return res.send(JSON.stringify({resultado: 'Continente nao encontrado, tente dizer em inglês', status: 404}, null, 2) + '\n')
                    res.send(JSON.stringify({
                        resultado: {
                            continent: result.continent,
                            continentInfo: {
                                lat: result.continentInfo.lat,
                                long: result.continentInfo.long
                            },
                            casos: result.cases,
                            casos_hoje: result.todayCases,
                            mortes: result.deaths,
                            mortes_hojes: result.todayDeaths,
                            recuperados: result.recovered,
                            recuperados_hoje: result.todayRecovered,
                            ativos: result.active,
                            ativosPorMilhao: result.activePerOneMillion,
                            criticos: result.critical,
                            criticosPorMilhao: result.criticalPerOneMillion,
                            casosPorMilhao: result.casesPerOneMillion,
                            mortesPorMilhao: result.deathsPerOneMillion,
                            testes: result.tests,
                            testesPorMilhao: result.testsPerOneMillion,
                            população: result.population,
                            paisesDoContinente: result.countries
                        }, 
                        status: 200
                    }, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar estado da api', status: 404}, null, 2)+ '\n')
            }
        })
    }
    async function lojasapis() {
        app.get('/lojas/mercadolivre', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Falta a palavra chave', status:403}, null, 2)+ '\n')
            try {
                axios(`https://lista.mercadolivre.com.br/${dados.query}`, {method: 'GET'})
                .then(({data}) => {
                    $ = cheerio.load(data)
                    var product =  $('.ui-search-result__image > .ui-search-link')[0].children[0].parent.attribs.href
                    axios.get(product).then(({data}) => {
                        var frete_free = false
                        if(data.includes('<p class="ui-pdp-color--GREEN ui-pdp-family--REGULAR ui-pdp-media__title">Chegará grátis')) frete_free = true
                        $ = cheerio.load(data)
                        var parcelamentos = $('.ui-pdp-size--MEDIUM').text()
                        if(parcelamentos.includes('jurosBusque')) parcelamentos = $('.ui-pdp-size--MEDIUM').text().split('Busque')[0]
                        let resultado = {
                            thumb: $('.ui-pdp-image')[1].attribs.src,
                            titulo: $('.ui-pdp-title').text(),
                            valor: $('.price-tag-fraction')[0].children[0].data,
                            description: $('.ui-pdp-description__content').text(),
                            frete_gratis: frete_free,
                            parcelamentos: parcelamentos,
                            link: product,    
                        }
                        res.send(JSON.stringify(resultado, null, 2) + '\n')
                    })
                }).catch(e => {
                    res.send(JSON.stringify({resposta:'Erro ao pesquisar no mercado livre', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar no mercado livre', status: 404}, null, 2)+ '\n')
            }
        })
    }
    async function searchapi() {
        app.get('/search/tudo-celular', async function(req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Falta a palavra chave', status:403}, null, 2)+ '\n')
            try {
                const listPhones = await searchPhone(dados.query)
                const listDetailsPhones = []
                for(let obj of listPhones) {
                    const detailsPhone = await getInfoPhone(obj.url)
                    listDetailsPhones.push({name:obj.title, detailsPhone})
                }
                res.send(JSON.stringify(listDetailsPhones, null, 2))
            } catch (e) {

            }
        })
        app.get('/search/pensador', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Falta a palavra chave', status:403}, null, 2)+ '\n')
            try {
                axios(`https://www.pensador.com/busca.php?q=${dados.query}`).then(({data}) => {
                    var $ = cheerio.load(data)
                    var cards = $('.thought-card')
                    var quotes = []
                    for(i = 0; i < cards.length; ++i) {
                        var frase = $('.thought-card')[i].attribs['data-alt'].split('....')[0]
                        var img = $('.thought-card')[i].attribs['data-src']
                        var json = { frase: frase, img: img }
                        quotes.push(json)
                    }
                    var resultados = {
                        autor: $('.top > h1')[0].children[0].data,
                        qnt: $('.thought-card').length,
                        frases: quotes
                    }
                    res.send(JSON.stringify(resultados, null, 2) + '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar no google maps', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/search/googlemaps', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Falta a palavra chave', status:403}, null, 2)+ '\n')
            try {
                geo().geocode(dados.query).end((err, addres) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao pesquisar no google maps', status: 404}, null, 2)+ '\n')
                    if(addres == '[]') return res.send(JSON.stringify({resposta:'Erro ao pesquisar no google maps', status: 404}, null, 2)+ '\n')
                    res.send(JSON.stringify({
                        resultado: addres,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar no google maps', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/search/githubrepo', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Fale oq tenho que pesquisar gay', status:403}, null, 2)+ '\n')
            try {
                anu = await fetchJson(`https://api.github.com/users/${dados.query}/repos`)
                const repos = []
                for(i = 0; i < anu.length; ++i) {
                    repos.push({
                        repo_name: anu[i].name,
                        full_name_repo: anu[i].full_name,
                        url_repo: anu[i].html_url,
                        descrição: anu[i].description,
                        repo_private: anu[i].private,
                        tamanho: anu[i].size,
                        proprietario: {
                            nome: anu[i].owner.login,
                            perfil_foto: anu[i].owner.avatar_url,
                            user_link: anu[i].owner.url,
                            tipo_perfil: anu[i].owner.type,
                            site_admin: anu[i].owner.site_admin,
                        },
                        criado_em: anu[i].created_at,
                        atualizado_em: anu[i].updated_at,
                        liguagem: anu[i].language,
                        tem_issue: anu[i].has_issue,
                        tem_projects: anu[i].has_projects,
                        tem_downloads: anu[i].has_downloads,
                        tem_wiki: anu[i].has_wiki,
                        tem_pages: anu[i].has_pages,
                        forks: anu[i].forks,
                        issues_abertas: anu[i].open_issues,
                        watchers: anu[i].watchers,
                        branch_usada: anu[i].default_branch
                    })
                }
                res.send(JSON.stringify({
                    resultado: repos
                    , status: 200
                }, null, 2) + '\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar conta no github', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/search/happymod', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Fale oq tenho que pesquisar gay', status:403}, null, 2)+ '\n')
            try {
                const products = []
                axios(`https://happymod.com/search.html?q=miecraft`, {method: "GET"}).then(async ({data}) => {
                    var $ = cheerio.load(data)
                    for(i=0; i< 4; ++i) {
                        var linkapp = `https://happymod.com${$('.section-page-white > .pdt-app-box > .pdt-app-img')[i].attribs.href}`
                        await axios(linkapp, {method: "GET"}).then(async ({data}) => {
                            var $ = cheerio.load(data)
                            var tit = $('.new-div-box > .new-pdt-h3')[0].children[0].data
                            var version = $('.new-div-box > .new-pdt-ul > li')[0].children[0].data.slice(10)
                            var size = $('.new-div-box > .new-pdt-ul > li')[1].children[0].data.slice(11)
                            var price = $('.new-div-box > .new-pdt-ul > li')[2].children[0].data.slice(9)
                            var raiz = $('.new-div-box > .new-pdt-ul > li')[3].children[0].data.split(':')[1]
                            var inapp = $('.new-div-box > .new-pdt-ul > li')[4].children[0].data.slice(25)
                        
                            var resultado = {
                            titulo: tit,
                            link: linkapp,
                            versao: version,
                            tamanho: size,
                            preco: price,
                            pasta_raiz: raiz,
                            microtranslacao: inapp
                            }
                            products.push(resultado)
                        })
                    }
                    res.send(JSON.stringify({
                        resultado: products
                    }, null, 2) + '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar app no happymod!', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/search/wikipedia', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Fale oq tenho que pesquisar gay', status:403}, null, 2)+ '\n')
            try {
                anu = await fetchJson(`https://pt.wikipedia.org/api/rest_v1/page/summary/${dados.query}`)
                res.send(JSON.stringify({
                    pesquisa: {
                        titulo: anu.title,
                        thumb: anu.thumbnail.source,
                        descrição: anu.description,
                        link: anu.content_urls.desktop.page,
                        resultado: anu.extract
                    },
                    status: 200
                }, null, 2) + '\n')
                
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao pesquisar na wikipedia', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/search/githubuser', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Fale oq tenho que pesquisar gay', status:403}, null, 2)+ '\n')
            try {
                fetch(`https://api.github.com/users/${dados.query}`).then(async result => result.json()).then(async data => { 
                    res.send(JSON.stringify({
                        resultado: {
                            username: data.login,
                            bio: data.bio,
                            foto_url: data.avatar_url,
                            user_url: data.html_url,
                            seguidores: data.followers,
                            seguindo: data.following,
                            conta_tipo: data.type,
                            conta_criada: data.created_at,
                            ultima_update: data.updated_at,
                            apelido: data.name,
                            companhias: data.company,
                            localização: data.location,
                            email: data.email,
                            twitter_username: data.twitter_username,
                            repos_publico: data.public_repos,
                            gits_publicas: data.public_gists,
                        }, status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({resposta:'Erro ao pesquisar conta no github', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/search/googleplay', async function(req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Fale oq tenho que pesquisar gay', status:403}, null, 2)+ '\n')
            try {
                gplay.search({term: dados.query, num: 4}).then(result => {
                    res.send(JSON.stringify({
                        resultado: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({resposta:'Erro ao pesquisar app na google play', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/search/googlesrc', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga o que tenho que pesquisar', status:403}, null, 2)+ '\n')
            googleIt({'query': dados.query, disableConsole : true }).then(results => {
                res.send(JSON.stringify({resposta:{
                    results
                }, status: 200}, null, 2)+ '\n')
            }).catch(e => {
                res.send(JSON.stringify({resposta:'Houve erro na pesquisa', status:404}, null, 2)+ '\n')
            })
        })
        app.get('/search/googleimg', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.query) return res.send(JSON.stringify({resposta:'Diga o que tenho que pesquisar', status:403}, null, 2)+ '\n')
            try {
                gis(dados.query, logsLinks)
                    async function logsLinks(error, results) {
                        const datasadd = []
                        for(i = 0; i < 10; ++i) {
                            datasadd.push(results[i])
                        }
                        res.status(200).send(JSON.stringify({
                            resultados: datasadd,
                            status: 200
                        }, null, 2) + '\n')
                    }
            } catch {
                res.send(JSON.stringify({resposta:'Houve erro na pesquisa', status:404}, null, 2)+ '\n')
            }
        })
    }
    async function photooxyapi() {
        app.get('/photooxy/flower', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/art-effects/flower-typography-text-effect-164.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/undergrass', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/typography', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/create-a-layered-leaves-typography-text-effect-354.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/naruto', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/love', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/coffe', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/coffev2', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/cemitery', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/text-on-scary-cemetery-gate-172.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/neon/pink', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                axios('https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `text_2=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                    
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/neon/rainbow', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
                axios('https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=1&text_2=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/neon/green', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
                axios('https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=2&text_2=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/neon/sky', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
                axios('https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=3&text_2=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/neon/blue', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
                axios('https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=4&text_2=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/neon/yellow', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
                axios('https://photooxy.com/logo-and-text-effects/create-party-neon-text-effect-161.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=5&text_2=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/googlesrc', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Digite o texto 2 pra por na imagem', status:403}, null, 2)+ '\n')
            if(!dados.text3) return res.send(JSON.stringify({resposta:'Digite o texto 3 pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            if(dados.text2.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            if(dados.text3.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/other-design/make-google-suggestion-photos-238.html', [dados.text, dados.text2, dados.text3])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/gradient', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/gradient-avatar-text-effect-207.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/glowing', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/pubg', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Digite o texto 2 pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text2.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html', [dados.text, dados.text2])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/btf4', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Digite o texto 2 pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text2.length2< 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/fps-game-effect/create-battlefield-4-rising-effect-152.html', [dados.text, dados.text2])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/graffiti', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/banner-cover/graffiti-text-cover-222.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/shinerainbow', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                res_json = await new Maker().PhotoOxy('https://photooxy.com/banner-cover/graffiti-text-cover-222.html', [dados.text])
                res.send(JSON.stringify({resultado: res_json.imageUrl, status:200}, null, 2) +'\n')
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        
    }
    async function photooxyv2api() {
        app.get('/photooxy/v2/3dlines', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(730,900, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/art-effects/3d-lines-photo-effect-302.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/wanted', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.text) return res.send(JSON.stringify({resultado:'Diga o texto 1 pra por na imagem', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resultado:'Diga o texto 2 pra por na imagem', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(451,351, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/manga-and-anime/make-one-piece-wanted-poster-online-129.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `text_3=${dados.text}&text_4=${dados.text2}&image_1=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/gunscircle', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.text) return res.send(JSON.stringify({resultado:'Diga o texto 1 pra por na imagem', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resultado:'Diga o texto 2 pra por na imagem', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(192,218, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/game-effects/cool-circle-guns-wallpapers-141.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `text_2=${dados.text}&text_3=${dados.text2}&image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/crossgun', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(640,640, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/other-design/cross-gun-like-a-fps-player-130.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/gtav', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(405,465, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/game-effects/make-grand-theft-auto-v-official-cover-132.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_1=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/sketch', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(763,456, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/art-effects/sketch-your-picture-on-paper-226.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_1=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/stitch', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(522,700, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/other-design/mix-into-galaxy-169.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_1=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/glitch', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(522,700, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/art-effects/glitch-red-cyan-photo-effect-202.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/phonewallpaper', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(333,666, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/art-effects/set-your-photo-into-iphone-x-wallpaper-208.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/anaglyph', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(800,800, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/art-effects/create-3d-anaglyph-photo-effect-203.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/nightbeach', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(541,564, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/art-effects/night-beach-photo-effect-353.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/photooxy/v2/nightbeach', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(541,564, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/art-effects/night-beach-photo-effect-353.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
    }
    async function photooxyvideoapi() {
        app.get('/video/burning', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(227,210, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/burning-effect/holding-fire-animation-304.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/video/rain', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resultado:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resultado:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!dados.img) return res.send(JSON.stringify({resultado:'Diga a url da imagem', status:403}, null, 2)+ '\n')
            try{
                buff = await getBuffer(dados.img)
                ran = getRandom('.jpg')
                gm(buff).gravity('Center').resize(500,700, '!').write(ran, async (err) => {
                    if(err) return res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                    var base64 = encodeURIComponent(fs.readFileSync(ran).toString('base64'))
                    axios('https://photooxy.com/art-effects/gif-animated-rain-online-361.html', {
                        method: "POST",
                        headers:{
                            "content-type": "application/x-www-form-urlencoded",
                            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                          },
                        data: `image_0=${base64}&login=OK`
                    }).then(async ({data}) => {
                        var $ = await cheerio.load(data)
                        var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > img')[0].attribs.src}`
                        res.send(JSON.stringify({
                            resultado: imglink,
                            status: 200
                        }, null, 2) + '\n')
                        fs.unlinkSync(ran)
                    })
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resultado:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/video/cold', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                axios('https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `text_1=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > video > source')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/video/bold', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                axios('https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=1&text_1=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > video > source')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/video/glowing', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                axios('https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=2&text_1=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > video > source')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/video/colorful', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                axios('https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=3&text_1=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > video > source')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/video/army', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                axios('https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=4&text_1=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > video > source')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })
        app.get('/video/retro', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Digite o texto pra por na imagem', status:403}, null, 2)+ '\n')
            if(dados.text.length < 3) return res.send(JSON.stringify({resposta:'O texto tem que ser maior que 3 caracteres', status:403}, null, 2)+ '\n')
            try {
                axios('https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html',{
                    method: "POST",
                    headers:{
                      "content-type": "application/x-www-form-urlencoded",
                      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    },
                    data: `optionNumber_0=5&text_1=${dados.text}&login=OK`
                }).then(async ({data}) => {
                    var $ = await cheerio.load(data)
                    var imglink = `https://photooxy.com${$('.col-md-9 > .thumbnail > video > source')[0].attribs.src}`
                    res.send(JSON.stringify({resultado: imglink, status:200}, null, 2) +'\n')
                }).catch(async (err) => {
                    res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Erro ao criar a imagem', status: 404}, null, 2)+ '\n')
            }
        })

    }
    async function gamesapi(){
        app.get('/games/ffprofile', async (req,res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.id) return res.send(JSON.stringify({resposta:'Diga o id do usuário do freefire', status:403}, null, 2)+ '\n')
            var data = await fetchJson(`https://ffapi.000webhostapp.com/?id=${dados.id}`)
            res.status(200).send(JSON.stringify(data, null, 2) + '\n')
        })
        app.get('/games/lolprofile', async function (req, res) {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.nickname) return res.send(JSON.stringify({resposta:'Diga o nick do usuário do lol', status:403}, null, 2)+ '\n')
            try {
                axios(`https://br.op.gg/summoner/userName=${dados.nickname}`, {
                    method: 'GET',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded",
                        'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.259"
                    }
                }).then(async ({data}) => {
                    var $ = cheerio.load(data)
                    var nickname = $('.Profile > .Information > span.Name')[0].children[0].data
                    var kda = parseFloat($('.KDA > .KDA > span.Kill').text()).toFixed(1)+ '/' + parseFloat($('.KDA > .KDA > span.Death').text()).toFixed(1) + '/' +
                    parseFloat($('.KDA > .KDA > span.Assist').text()).toFixed(1)
                    var level = $('.ProfileIcon > span')[0].children[0].data
                    var profile_icon = 'https:'+$('.ProfileIcon > img')[0].attribs.src
                    var ranqueada_solo = ($('.TierRankInfo > .TierRank.unranked')[0]) ? 'Sem elo' : $('.TierRankInfo > .TierRank')[0].children[0].data.trim()
                    var ranqueada_flex = ($('.sub-tier__rank-tier.unranked')[0]) ? 'Sem elo' :  $('.sub-tier__rank-tier')[0].children[0].data.trim()
                    var partidas_length = $('.GameItem > .Content').length
                    var partidas = []
                    for(i=0;i<partidas_length;++i) {
                        var partidas_champion = $('.GameItem > .Content > .GameSettingInfo > .ChampionName > a')[i].children[0].data
                        var partidas_champion_img = 'https:' + $('.GameItem > .Content > .GameSettingInfo > .ChampionImage > a > img')[i].attribs.src
                        
                        var partidas_kda = parseInt($('.GameItem > .Content > .KDA > .KDA > .Kill')[i].children[0].data) + '/' + 
                        parseInt($('.GameItem > .Content > .KDA > .KDA > .Death')[i].children[0].data) + '/' +
                        parseInt($('.GameItem > .Content > .KDA > .KDA > .Assist')[i].children[0].data)
                
                        var partidas_level = $('.GameItem > .Content > .Stats > .Level')[i].children[0].data.trim()
                        var partidas_result = $('.GameItem > .Content > .GameStats > .GameResult')[i].children[0].data.trim()
                        var partida_type = $('.GameItem > .Content > .GameStats > .GameType')[i].children[0].data.trim()
                        var partida_duracao = $('.GameItem > .Content > .GameStats > .GameLength')[i].children[0].data.trim()
                        var partida_iniciada = $('.GameItem > .Content > .GameStats > .TimeStamp > span')[i].children[0].data.trim()
                
                        partidas.push({
                            champion_used: partidas_champion,
                            champion_icon: await tinyurl.shorten(partidas_champion_img),
                            kda: partidas_kda,
                            champion_level: partidas_level,
                            resultado: partidas_result,
                            tipo: partida_type,
                            duracao: partida_duracao,
                            iniciada: partida_iniciada
                        })
                        
                    }
                    var json = {
                        usuario: nickname,
                        kda: kda,
                        nivel: level,
                        perfil_icon: await tinyurl.shorten(profile_icon),
                        ranqueada_solo: ranqueada_solo,
                        ranqueada_flex: ranqueada_flex,
                        partidas_historico: partidas
                    }
                    res.send(JSON.stringify({resultado: json, status: 200}, null, 2)+ '\n')
                })
            } catch (e) {
                console.log(e)
                res.send(JSON.stringify({resposta:'Usuário inesxistente', status: 404}, null, 2)+ '\n')
            }
        })
    }
    async function textproapis() {
        app.get('/textpro/ph', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text1) return res.send(JSON.stringify({resposta:'Diga o texto 1', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Diga o texto 2', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/pornhub-style-logo-online-generator-free-977.html', [dados.text1, dados.text2])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/marvel', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text1) return res.send(JSON.stringify({resposta:'Diga o texto 1', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Diga o texto 2', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-logo-style-marvel-studios-ver-metal-972.html', [dados.text1, dados.text2])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/avengers', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text1) return res.send(JSON.stringify({resposta:'Diga o texto 1', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Diga o texto 2', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-3d-avengers-logo-online-974.html', [dados.text1, dados.text2])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/thunder', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-thunder-text-effect-online-881.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/dropwater', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/dropwater-text-effect-872.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/neonlight', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/neon-light-text-effect-online-882.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/impressive_glitch', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-impressive-glitch-text-effects-online-1027.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/bearlogo', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/lionlogo', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text1) return res.send(JSON.stringify({resposta:'Diga o texto 1', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Diga o texto 2', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-lion-logo-mascot-online-938.html', [dados.text1, dados.text2])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/wolflogo', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text1) return res.send(JSON.stringify({resposta:'Diga o texto 1', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Diga o texto 2', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-wolf-logo-black-white-937.html', [dados.text1, dados.text2])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/wolflogogalaxy', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text1) return res.send(JSON.stringify({resposta:'Diga o texto 1', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Diga o texto 2', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-wolf-logo-galaxy-online-936.html', [dados.text1, dados.text2])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/ninjalogo', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text1) return res.send(JSON.stringify({resposta:'Diga o texto 1', status:403}, null, 2)+ '\n')
            if(!dados.text2) return res.send(JSON.stringify({resposta:'Diga o texto 2', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-wolf-logo-galaxy-online-936.html', [dados.text1, dados.text2])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/matrix', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/matrix-style-text-effect-online-884.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/box3d', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/3d-box-text-effect-online-880.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/space', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-space-text-effects-online-free-1042.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/circuit', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
        app.get('/textpro/magma', async (req, res) => {
            let dados = req.query
            res.header("Content-Type",'application/json');
            if(!dados.apikey) return res.send(JSON.stringify({resposta:'Ow projeto de anta e a apikey?', status:403}, null, 2)+ '\n')
            if(!(await checkapikey(dados.apikey))) return res.send(JSON.stringify({resposta:'Apikey incorreta ou número de requests esgotados', status:403}, null, 2)+ '\n')
            if(!(await ipcheck(req.headers['x-forwarded-for'] || req.socket.remoteAddress))) return res.send(JSON.stringify({resposta: 'Flood detectado, serviço negado', status: 403}))
            if(!dados.text) return res.send(JSON.stringify({resposta:'Diga o texto', status:403}, null, 2)+ '\n')
            try {
                textpro.textpro('https://textpro.me/create-a-magma-hot-text-effect-online-1030.html', [dados.text])
                .then(result => {
                    res.send(JSON.stringify({
                        img: result,
                        status: 200
                    }, null, 2) + '\n')
                })
            } catch {
                res.send(JSON.stringify({
                    resposta: 'Falha',
                    status: 404
                }, null, 2) + '\n')
            }
        })
    }
    
    app.listen(PORT, async () => {
        console.log(`Servidor iniciando em ${host} !`)
        const getcountmsg = await client.db('CountRequest').collection('req_count').find({}).toArray()
        const getapikeys = await client.db('apikeys').collection('apikeys').find({}).toArray()
        const getapikeyslimited = await client.db('apikeyslimited').collection('apikeyslimited').find({}).toArray()
        const getaccesskeys = await client.db('AcessKeys').collection('AcessKeys').find({}).toArray()
        const getbotstore = await client.db('BotStore').collection('BotStore').find({}).toArray()

        fs.writeFileSync('./database/botstore.json', JSON.stringify(getbotstore, null, 2) + '\n')
        fs.writeFileSync('./database/access_keys.json', JSON.stringify(getaccesskeys, null, 2) + '\n')
        fs.writeFileSync('./database/req_count.json', JSON.stringify(getcountmsg, null, 2) + '\n')
        fs.writeFileSync('./database/apikeys.json', JSON.stringify(getapikeys, null, 2) + '\n')
        fs.writeFileSync('./database/apikeyslimited.json', JSON.stringify(getapikeyslimited, null, 2) + '\n')

        cron.schedule('0 21 * * *', async () => {
            const keyslimited = JSON.parse(fs.readFileSync('./database/apikeyslimited.json'))
            const keys = []
            for(i = 0; i < keyslimited.length; ++i) {
                keys.push(keyslimited[i].info.apikey)
            }
            var indice = keys.indexOf('brizaloka')
            await client.db('apikeyslimited').collection('apikeyslimited').updateMany( {
                info: {
                    usuario: keyslimited[indice].info.usuario,
                    apikey: keyslimited[indice].info.apikey,
                    limit_request: 10000,
                    request_rest: keyslimited[indice].info.request_rest
                }
            }, { $set: {
                info: {
                    usuario: keyslimited[indice].info.usuario,
                    apikey: keyslimited[indice].info.apikey,
                    limit_request: 10000,
                    request_rest: 10000
                }
            }})
            fs.writeFileSync('./database/apikeyslimited.json', JSON.stringify(keyslimited, null , 2) + '\n')
            console.log('Apikey gratuita atualizada com sucesso!!')

            const date = new Date()
            const exeusers = ['ian pablo', 'gabriel', 'Crowley']
            const objsdie = []
            for(i=0;i < getapikeys.length; ++i) {
                const dateApiKey = new Date(getapikeys[i].data.split('/')[2], getapikeys[i].data.split('/')[1], getapikeys[i].data.split('/')[0])
                if(exeusers.indexOf(getapikeys[i].info.usuario) < 0) {
                    if(dateApiKey.getDate() == date.getDate() && dateApiKey.getMonth() < (date.getMonth() + 1) && dateApiKey.getFullYear() == date.getFullYear()) {
                        objsdie.push(i)
                        console.log('Apikey vencida encontrada')
                    } else if(dateApiKey.getMonth() == 12 && date.getMonth()+1 == 1 && dateApiKey.getDate() == date.getDate() 
                    && dateApiKey.getFullYear() < date.getFullYear()) {
                        objsdie.push(i)
                        console.log('Apikey vencida encontrada')
                    } else console.log('Apikey dentro do prazo')
                } else console.log('Apikey exclusiva')
            }
            for(i=0;i<objsdie.length;++i) {
                getapikeys.splice(objsdie[i], 1)
            }
            fs.writeFileSync('./database/apikeys.json', JSON.stringify(getapikeys, null, 2) + '\n')
            await client.db('apikeys').collection('apikeys').deleteMany({})
            client.db('apikeys').collection('apikeys').insertMany(getapikeys)
        })
        
        cron.schedule('*/1 * * * *', async () => {
            const getcount = await client.db('CountRequest').collection('req_count').find({}).toArray()
            fs.writeFileSync('./database/req_count.json', JSON.stringify(getcount, null, 2) + '\n')
            const getapikeys = await client.db('apikeys').collection('apikeys').find({}).toArray()
            const getapikeyslimited = await client.db('apikeyslimited').collection('apikeyslimited').find({}).toArray()
            const getaccesskeys = await client.db('AcessKeys').collection('AcessKeys').find({}).toArray()
            const getbotstore = await client.db('BotStore').collection('BotStore').find({}).toArray()

            fs.writeFileSync('./database/botstore.json', JSON.stringify(getbotstore, null, 2) + '\n')
            fs.writeFileSync('./database/access_keys.json', JSON.stringify(getaccesskeys, null, 2) + '\n')
            fs.writeFileSync('./database/apikeys.json', JSON.stringify(getapikeys, null, 2) + '\n')
            fs.writeFileSync('./database/apikeyslimited.json', JSON.stringify(getapikeyslimited, null, 2) + '\n')
        })

    });
    await textproapis()
    await gamesapi()
    await conversorapi()
    await registerapi()
    await ttpapi()
    await uploadsapi()
    await pornsearch()
    await montageeffectapi()
    await imageeffectapi()
    await iaapis()
    await videosapis()
    await covidapi()
    await lojasapis()
    await consultasapi()
    await gifeffectapi()
    await audioapis()
    await photooxyv2api()
    await photooxyvideoapi()
    await photooxyapi()
    await searchapi()
    await hentaiapi()
    await randomapi()
    await principalapis()
    await imitadorapi()
    await geradorapis()
    await redessociaisapi()
    await photosapi()
    await botstoreapi()

    app.use(async function(req, res) {
        res.header("Content-Type",'text/html')
        res.send(fs.readFileSync('404.html'))
    })
}

starts()