const fetch = require('node-fetch').default

async function ytv(url) {
    return new Promise(async (resolve, reject) => {
        try {
            fetch("https://x2download.com/api/ajaxSearch", {
                "headers": {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                "body": `q=${url}&vt=home`,
                "method": "POST"
            }).then(async (resp1) => {
                const json = await resp1.json()
                function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
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
                    resolve({
                        title,
                        channel,
                        time,
                        size,
                        type: 'mp4',
                        dl_link: await tinyurl.shorten(json.result)
                    })
                })
            })
        } catch (e) {
            console.log(e)
            reject({msg: 'Houve falha'})
        }
    })
}

async function ytv2(url, needSearch = false) {
    return new Promise(async (resolve, reject) => {
        if (needSearch) {
          const search = await ytsearch(url)
          url = search[0].url
        }
        request({
            url: 'https://yt1s.io/api/ajaxSearch',
            method: 'POST',
            headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            form: { 'q': url, 'vt': 'mp4' }
        }, function (error, response, body) {
          const result = JSON.parse(body)
          var thumb = `https://i.ytimg.com/vi/${result.vid}/0.jpg`
          let quality = []
          Object.keys(result.links.mp4).map((i) => {
            quality.push(result.links.mp4[i].k)
          })
          request({
            url: 'https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994',
            method: 'POST',
            headers:  {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-requested-key': 'de0cfuirtgf67a'
            },
            form: {
              'v_id': result.vid,
              'ftype': 'mp4',
              'fquality': (quality[0] == '1080p') ? quality[3] : (quality[0] == '720p') ? quality[2] : (quality[0] == '480p') ? quality[1] : quality[0],
              'token': result.token,
              'timeExpire': result.timeExpires,
              'client': 'yt1s.io'
            }
          }, function (error, response, body) {
            request({
              url: `${JSON.parse(body).c_server}/api/json/convert`,
              method: 'POST',
              headers:  {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-requested-key': 'de0cfuirtgf67a'
                },
              form: {
                'v_id': result.vid,
                'ftype': 'mp4',
                'fquality': (quality[0] == '1080p') ? quality[3] : (quality[0] == '720p') ? quality[2] : (quality[0] == '480p') ? quality[1] : quality[0],
                'fname': result.title,
                'token': result.token,
                'timeExpire': result.timeExpires
              }
            }, function (error, response, body2) {
              resolve({
                dl_link: JSON.parse(body2).result,
                thumbnail: thumb,
                title: result.title,
                quality: (quality[0] == '1080p') ? quality[3] : (quality[0] == '720p') ? quality[2] : (quality[0] == '480p') ? quality[1] : quality[0],
                qualitys: quality,
                url: url,
                channel: result.a,
                needSearch: needSearch
              })
            })
          })
        })
    })
}

async function yta(url) {
    return new Promise(async (resolve, reject) => {
        try {
            fetch("https://x2download.com/api/ajaxSearch", {
                "headers": {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                "body": `q=${url}&vt=home`,
                "method": "POST"
            }).then(async (res) => {
                const json = await res.json()
                const size = json.links.mp3['2'].size
                const type = json.links.mp3['2'].key
                const title = json.title
                const channel = json.a
                function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
                const time = fmtMSS(json.t)
                fetch("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", {
                    "headers": {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-requested-key": "de0cfuirtgf67a"
                    },
                    "body": `v_id=${json.vid}&ftype=mp3&fquality=128&token=${json.token}&timeExpire=${json.timeExpires}&client=X2Download.com`,
                    "method": "POST"
                }).then(async res => {
                    const json2 = await res.json()
                    const dl_link = json2.d_url
                    const res_json = {
                        size,
                        type,
                        dl_link,
                        channel,
                        time,
                        title
                    }
                    resolve(res_json)
                })
            })
        } catch (e) {
            console.log(e)
            reject({msg: 'Houve falha'})
        }
    })
}

module.exports = {yta, ytv, ytv2}