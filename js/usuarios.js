const API_URL = 'http://localhost:8080/api/v1/'
const endPoint = `${API_URL}/usuario`

const listarUsuarios = async () => {
    fetch(endPoint)
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(jsonResposta) {
        montarCardsUsuarios(jsonResposta)
    });
}

const montarCardsUsuarios = (usuarios) => {
    const rootDiv = document.getElementById("rootDiv");
    const divsUsuarios = usuarios.map(usuario => cardUsuario(usuario))
    rootDiv.innerHTML = divsUsuarios
}

const cardUsuario = (usuario) => {
    return `<div class="card">
                <p>Email: ${usuario.email}</p>
                <p>Senha: ${usuario.senha}</p>
                <p>Papel: ${usuario.papel}</p>
                <button onClick="excluirUsuario(${usuario.id})">Excluir</button>
            </div>`
}

const excluirUsuario = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${endPoint}/${id}`, true)
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.onreadystatechange = () => {
        // Verifica se o retorno (4 -> DONE e o status da requisicao )
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('Usuario excluido!')
            document.location.reload(true);
        } else if (xhr.readyState === 4 && xhr.status !== 200){
            console.error(xhr.responseText)
            alert('Erro ao deleter...')
        }
    }
    xhr.send();
}

const adicionarUsuario = () => {
    let data = {};
    data.email = document.getElementById("email").value;
    data.senha = document.getElementById("senha").value;
    data.papel = document.getElementById("tipo").value;

    const json = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", endPoint, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Content-type","application/json");
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.responseText){
                alert("Cadastrado com sucesso! - " + xhr.responseText);
            } else {
                alert("Erro... " + xhr.responseText)
            }
        }  
    }
    xhr.send(json);
}