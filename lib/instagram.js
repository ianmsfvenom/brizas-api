const fetch = require('node-fetch').default
const date = new Date()

const instagramDownloader = async (url) => {
    return new Promise(async (resolve, reject) => {
        fetch(`https://api.sssgram.com/st-tik/ins/dl?url=${url}&timestamp=${date.getTime()}`, {
        "headers": {
            "Referer": "https://www.sssgram.com/",
        },
        "body": null,
        "method": "GET"
        }).then(async res => {
            const resJson = await res.json()
            resolve(resJson.result.insBos)
        })
    })
}

module.exports = {
    instagramDownloader
}