function faillogin(text) {
    $('#status_alert').removeClass('alert-success')
    $('#status_alert').removeClass('collapse').addClass('alert-danger').html(text)
}
if(localStorage.getItem('Theme')) {
    var value = localStorage.getItem('Theme')
    $('body').attr('data-sa-theme', value)
}
function openregister() {
    $('#l-register').addClass('active')
    $('#l-login').removeClass('active')
}
function openlogin() {
    $('#l-login').addClass('active')
    $('#l-register').removeClass('active')
}
async function login() {
    var user = document.getElementById('user_login').value
    var apikey = document.getElementById('apikey_login').value
    if(user.toLowerCase() == '') return faillogin('Usuário vazio')
    if(apikey.toLowerCase() == '') return faillogin('Apikey vazia')

    var data = await fetch('/checkapikey?apikey='+apikey).then(res => res.json())
    if(data.resposta) {
        $('#status_alert').removeClass('collapse').removeClass('alert-success').addClass('alert-danger').html('Usuário não registrado')
    } else {
        $('#status_alert').removeClass('collapse').removeClass('alert-danger').addClass('alert-success').html('Apikey salva e registrada com sucesso!')
        localStorage.setItem('user', user)
        localStorage.setItem('apikey', apikey)
        setTimeout(function gotohome() {
            window.location.href = '/'
        }, 3000)
    }
}
function sucess(text) {
    $('#status_alert_register').removeClass('alert-danger')
    $('#status_alert_register').removeClass('collapse').addClass('alert-success').html(text)
    setTimeout(() => {
        window.open('/')
    }, 3000);
}
function fail(text) {
    $('#status_alert_register').removeClass('alert-success')
    $('#status_alert_register').removeClass('collapse').addClass('alert-danger').html(text)
}
async function register() {
    var chave = document.getElementById('access_code').value
    var usuario = document.getElementById('user_register').value
    var newapikey = document.getElementById('pass_register').value
    if(chave == "") return fail('Chave de acesso vazia')
    if(usuario == "") return fail('Usuário vazio')
    if(newapikey == "") return fail('Apikey vazia')

    if(chave.toLowerCase() == usuario.toLowerCase()) return fail('A chave não pode ter o msm nome que o usuario')
    if(chave.toLowerCase() == newapikey.toLowerCase()) return fail('A chave não pode ter o msm nome que a apikey')
    if(usuario.toLowerCase() == newapikey.toLowerCase()) return fail('O usuário não pode ter o mesmo nome que a apikey')
    if(newapikey.toLowerCase() == usuario.toLowerCase()) return fail('A apikey não pode ter o mesmo nome que o usuário')
    if(usuario.toLowerCase() == chave.toLowerCase()) return fail('O usuário não pode ter o msm nome que a chave')
    if(newapikey.toLowerCase() == chave.toLowerCase()) return fail('A apikey não pode ter o msm nome que a chave')
    fetch(`/apikey/add?access_key=${chave}&user=${usuario}&newapikey=${newapikey}`).then(async res => {
        var json_res = await res.json()
        if(json_res.success) return sucess(json_res.resposta)
        if(!json_res.success) return fail(json_res.resposta)
    }).catch(err => {
        fail('Falha no envio!')
    })
}
var input = document.getElementById("access_code");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("send").click();
    }
})
var input = document.getElementById("user_register");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("send").click();
    }
});

var input = document.getElementById("pass_register");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("send").click();
    }
});