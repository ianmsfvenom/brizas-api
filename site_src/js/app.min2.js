fetch('https://api.ipify.org/?format=json', {method: 'GET'}).then(async res =>{
    var res_json = await res.json()
    document.getElementById('ipv4').innerHTML = res_json.ip
})
if(localStorage.getItem('Theme')) {
    var value = localStorage.getItem('Theme')
    console.log(value)
    if(value == 1) $('#red').addClass('btn border-0 active')
    else if(value == 2) $('#gray').addClass('btn border-0 active')
    else if(value == 3) $('#green').addClass('btn border-0 active')
    else if(value == 4) $('#gray_dark').addClass('btn border-0 active')
    else if(value == 5) $('#brown').addClass('btn border-0 active')
    else if(value == 6) $('#brown_light').addClass('btn border-0 active')
    else if(value == 7) $('#blue').addClass('btn border-0 active')
    else if(value == 8) $('#green_light').addClass('btn border-0 active')
    else if(value == 9) $('#green_dark').addClass('btn border-0 active')
    else if(value == 10) $('#red_light').addClass('btn border-0 active')
    $('body').attr('data-sa-theme', value)
}
if(localStorage.getItem('user')){
    document.getElementById('username').innerHTML = 'Usuário: ' + localStorage.getItem('user')
}
if(localStorage.getItem('apikey')) {
    document.getElementById('user_apikey').innerHTML = 'Apikey: ' + localStorage.getItem('apikey')
    for(i=0;i < document.getElementsByClassName('api').length; ++i) {
        document.getElementsByClassName('api')[i].href = document.getElementsByClassName('api')[i].href.replace('SUAKEY', localStorage.getItem('apikey'))
    }
}

async function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('apikey')
    location.reload()
}
async function requestupdate() {
    var data = await fetch('/count/requests', {
        method: 'GET',
    }).then(res => res.json())
    document.getElementById("request_total").innerHTML = data[0].request_totais

    var user_data = await fetch('/count/users', {
        method: 'GET',
    }).then(res => res.json())
    document.getElementById("user_total").innerHTML = user_data.usuarios_registrados
}

setInterval(requestupdate, 3000)
async function checkapikey() {
    var apikey = document.getElementById('apikey_search').value
    window.open('/checkapikey?apikey='+apikey, 'blank')
}