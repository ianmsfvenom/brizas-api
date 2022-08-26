async function simi() {
    fetch(`/ia/simsimi?apikey=brizaloka&text=${document.getElementById('request_simi').value}`).then(async res =>{
        var json = await res.json()
        console.log(json)
        document.getElementById('request_simi').value = ''
        document.getElementById('response_simi').value = json.resultado.resposta
    })
}