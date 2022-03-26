const API_URL = 'http://localhost:8080/api/v1/'
const endPoint = `${API_URL}/imovel`

const listarImoveis = async () => {
    fetch(endPoint)
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(jsonResposta) {
        montarCardsImoveis(jsonResposta)
    });
}

const montarCardsImoveis = (imoveis) => {
    const rootDiv = document.getElementById("rootDiv");
    const divsImoveis = imoveis.map(imovel => cardImovel(imovel))
    rootDiv.innerHTML = divsImoveis
}

const cardImovel = (imovel) => {
    return `<div class="card">
                <p>Nome: ${imovel.nome}</p>
                <p>Descrição: ${imovel.descricao}</p>
                <p>Cidade: ${imovel.cidade}</p>
                <p>Bairro: ${imovel.bairro}</p>
                <p>Valor: ${imovel.valor}</p>
            </div>`
}