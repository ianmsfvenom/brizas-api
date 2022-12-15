const fetch = require('node-fetch').default
const cheerio = require('cheerio').default

function _0xe11c(d, e, f) {
  var g = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/' ['split']('');
  var h = g['slice'](0, e);
  var i = g['slice'](0, f);
  var j = d['split']('')['reverse']()['reduce'](function(a, b, c) {
      if (h['indexOf'](b) !== -1) return a += h['indexOf'](b) * (Math['pow'](e, c))
  }, 0);
  var k = '';
  while (j > 0) {
      k = i[j % f] + k;
      j = (j - (j % f)) / f
  }
  return k || '0'
}

const getToken = async () => {
  const html = await fetch('https://tikmate.online/?lang=pt').then(async res => {return await res.text()})
  const token = html.split('<input name="token" value="')[1].split('" type="hidden">')[0]
  return token
}

const decodeHtml = async (h, u, n, t, e, r) => {
  r = "";
  for (var i = 0, len = h.length; i < len; i++) {
      var s = "";
      while (h[i] !== n[e]) {
          s += h[i];
          i++
      }
      for (var j = 0; j < n.length; j++) s = s.replace(new RegExp(n[j], "g"), j);
      r += String.fromCharCode(_0xe11c(s, e, 10) - t)
  }
  return decodeURIComponent(escape(r))
}
async function getUrlTiktok(video = new String()) {
  return new Promise(async (resolve, reject) => {
    const token = await getToken()
    await fetch("https://tikmate.online/abc.php", {
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "cookie": "_ga=GA1.2.1870072113.1670252638; _gid=GA1.2.1513836312.1670252638; __gads=ID=f5c43969a6184463-22bef4b8ddd80060:T=1670252637:RT=1670252637:S=ALNI_MbbETWLNOvVQ7D5zShU28IC9ollkA; __gpi=UID=000009daea10249c:T=1670252637:RT=1670252637:S=ALNI_MaE3Cfgz_WED6uopSle1XZajAN-CQ; PHPSESSID=bve2krupjhq09lig24lkef57ho; __cfruid=c8fcb8f997846b2313ddc96de6e95e622e50cb9c-1670252641",
        "Referer": "https://tikmate.online/?lang=pt",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": `url=${video}&token=${token}`,
      "method": "POST"
    }).then(async res => {
      const html = await res.text()
      const bodyArray = html.split(`}("`)[1].split('))')[0].split(',')
      const h = bodyArray[0].replace('\"', '')
      const u = bodyArray[1]
      const n = bodyArray[2].replace('\"', '')
      const t = bodyArray[3]
      const e = bodyArray[4]
      const r = bodyArray[5]
      const htmlDecoded = (await decodeHtml(h, u, n, t, e, r)).replace(/\\\"|\\\'/g, '"')
      const $ = cheerio.load(htmlDecoded)
      
      var imgUrl = $('img')[0].attribs.src
      var authorname = $('.videotikmate-middle.center > div > h1 > div')[0].attribs.title
      var title = $('.videotikmate-middle.center > p > span')[0].children[0].data
      var urlDownloadMp4 = $('.abuttons > a')[0].attribs.href
      var urlDownloadMp3 = $('.abuttons > a')[1].attribs.href
      resolve({
        imgUrl,
        authorname,
        title,
        urlDownloadMp3,
        urlDownloadMp4
      })
    }).catch(err =>{
      reject(err)
    })
  })
}

getUrlTiktok('https://www.tiktok.com/@halextori/video/7162843507231640837?is_copy_url=1&is_from_webapp=v1')