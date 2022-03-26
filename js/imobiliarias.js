const API_URL = 'http://localhost:8080/api/v1/'
const endPoint = `${API_URL}/imobiliaria`

const listarImobiliarias = async () => {
    fetch(endPoint)
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(jsonResposta) {
        montarCardsImobiliarias(jsonResposta)
    });
}

const montarCardsImobiliarias = (imobiliarias) => {
    const rootDiv = document.getElementById("rootDiv");
    const divsImobiliarias = imobiliarias.map(imobiliaria => cardImobiliaria(imobiliaria))
    rootDiv.innerHTML = divsImobiliarias
}

const cardImobiliaria = (imobiliaria) => {
    return `<div class="card">
                <p>Email: ${imobiliaria.email}</p>
                <p>Senha: ${imobiliaria.senha}</p>
                <p>Nome: ${imobiliaria.nome}</p>
                <p>Descrição: ${imobiliaria.descricao}</p>
                <p>CNPJ: ${imobiliaria.cnpj}</p>
                <button onClick="excluirImobiliaria(${imobiliaria.id})">Excluir</button>
            </div>`
}

const excluirImobiliaria = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${endPoint}/${id}`, true)
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.onreadystatechange = () => {
        // Verifica se o retorno (4 -> DONE e o status da requisicao )
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('Imobiliaria excluida!')
            document.location.reload(true);
        } else if (xhr.readyState === 4 && xhr.status !== 200){
            console.error(xhr.responseText)
            alert('Erro ao deleter...')
        }
    }
    xhr.send();
}

const adicionarImobiliaria = () => {
    let data = {};
    data.email = document.getElementById("email").value;
    data.senha = document.getElementById("senha").value;
    data.descricao = document.getElementById("descricao").value;
    data.nome = document.getElementById("nome").value;
    data.cnpj = document.getElementById("CNPJ").value;

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