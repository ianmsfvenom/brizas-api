const fetch = require('node-fetch').default
const fs = require('fs')

async function uberduck(voice = '', text = '') {
    return new Promise((resolve, reject) => {
        if(voice == '' || text == '') {
            reject('Missing parameters')
        }
        fetch("https://api.uberduck.ai/speak", {
            "headers": {
                "content-type": "text/plain;charset=UTF-8",
                "cookie": "access_token=\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpYW5nYW1lcjI5NkBnbWFpbC5jb20iLCJpc3MiOiJ1YmVyZHVjayIsImV4cCI6MTY2MDE2NDIwNH0.bzJwwU0cPHKySeLsz_C3TgzwvR-3L0FYUIR1Rln4aQI\"; mp_0e29b22fd14c14fef47a0f90409ed3df_mixpanel=%7B%22distinct_id%22%3A%20%22iangamer296%40gmail.com%22%2C%22%24device_id%22%3A%20%22181eeff995b34-01ee3fdad50b5d-6f542419-15f900-181eeff995c441%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22%24user_id%22%3A%20%22iangamer296%40gmail.com%22%7D",
            },
            "body": JSON.stringify({
                speech: text,
                voice: voice,
                pace:1
            }),
            "method": "POST"
        }).then(async res => {
            if(res.status == 200) {
                const res_json = await res.json() 
                if(!res_json.uuid) return reject('No uuid')
                var loop = await setInterval(async () => {
                    await fetch(`https://api.uberduck.ai/speak-status?uuid=${res_json.uuid}`, {
                        "headers": {
                            "cookie": "access_token=\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpYW5nYW1lcjI5NkBnbWFpbC5jb20iLCJpc3MiOiJ1YmVyZHVjayIsImV4cCI6MTY2MDE2NDIwNH0.bzJwwU0cPHKySeLsz_C3TgzwvR-3L0FYUIR1Rln4aQI\"; mp_0e29b22fd14c14fef47a0f90409ed3df_mixpanel=%7B%22distinct_id%22%3A%20%22iangamer296%40gmail.com%22%2C%22%24device_id%22%3A%20%22181eeff995b34-01ee3fdad50b5d-6f542419-15f900-181eeff995c441%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22%24user_id%22%3A%20%22iangamer296%40gmail.com%22%7D",
                        },
                    }).then(async res => {
                        if(res.status == 200) {
                            let json = await res.json()
                            if(json.path) {
                                if(res_json.uuid) fetch(`https://uberduck-audio-outputs.s3-us-west-2.amazonaws.com/${res_json.uuid}/audio.wav`).then(async res => {
                                    const res_buff = await res.buffer()
                                    return resolve(res_buff)
                                })
                                clearInterval(loop)
                            }
                        } else {
                            clearInterval(loop)
                            return reject('Error')
                        }
                    })
                }, 2000)
            } else {
                return reject('Error')
            }
        }) 
    })
}

module.exports = {uberduck}