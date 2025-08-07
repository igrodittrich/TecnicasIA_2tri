const nomes = ["Igor", "Alfredo", "Bruce", "Robin", "Tony", "Judson", "Quandávio"];

export function aleatorio (lista){
    const posicao = Math.floor(Math.random()* lista.length);
    return lista[posicao];
}

export const nome = aleatorio(nomes)