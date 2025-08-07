const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector(".botao-reiniciar");
const progressoAtual = document.querySelector(".progresso-atual");
const progressoTotal = document.querySelector(".progresso-total");

const perguntas = [
    {
        enunciado: "De cara com essas novas IA's, você se pergunta:",
        alternativas: [
            {
                texto: "Serei burro e usarei essa ferramenta para poupar meu trabalho..",
                afirmacao: "Você se acomodou com a facilidade e como não tem mais a necessidade de pensar. Algo pensa por você enquanto você faz coisas do cotidiano."
            },
            {
                texto: "Serei esperto e usarei essas ferramentas como auxílio. Quero continuar pensando.",
                afirmacao: "Você quer que alguém lave a sua louça enquanto você faz arte, e não quer lavar sua roupa enquanto alguém faz sua arte."
            }
        ]
    },
    {
        enunciado: "Na faculdade, surge um desafio: utilizar de forma ética a IA, para desenvolver uma tese. O que você faz?",
        alternativas: [
            {
                texto: "Pede para a IA gerar uma proposta criativa e adapta com seu toque pessoal.",
                afirmacao: "Você foi criativo, e uniu tecnologia e suas ideias originais para criar algo único."
            },
            {
                texto: "Discute com colegas, reflete de forma solitária, e depois compara com sugestões da IA.",
                afirmacao: "Você priorizou o toque humano e confiou em si mesmo antes de considerar a tecnologia."
            }
        ]
    },
    {
        enunciado: "Na hora de apresentar sua tese, um colega usa IA para cronometrar e dar dicas em tempo real. Você:",
        alternativas: [
            {
                texto: "Aprende com ele a usar a mesma ferramenta e vê que ela realmente pode ser muito eficiente..",
                afirmacao: "É claro como a inteligência artificial pode facilitar várias etapas e melhorar seus resultados."
            },
            {
                texto: "Mantém a cabeça firme, confiando na sua intuição e experiência.",
                afirmacao: "Você concluiu que confia mais em si mesmo e na sua própria organização."
            }
        ]
    },
    {
        enunciado: "Para auxiliar na sua apresentação, você decide criar um power point. Mas como você vai atrás das imagens digitais?",
        alternativas: [
            {
                texto: "Desenha você mesmo, utilizando de aplicações e programas web que você já conhecia.",
                afirmacao: "Do seu jeito, criou algo original utilizando das ferramentas que você já era familiarizado"
            },
            {
                texto: "Gera uma apresentação de slides realista usando IA.",
                afirmacao: "Não tem problema poupar trabalho. Assim, você consegue se concentrar no que é mais importante."
            }
        ]
    },
    {
        enunciado: "Lá no final, você vê que um colega entregou um trabalho idêntico ao da IA, sem se esforçar para mudar nada. O que você faz?",
        alternativas: [
            {
                texto: "Ignora, já que a IA é um método de criação.",
                afirmacao: "Parou de pensar, se acomodando."
            },
            {
                texto: "Acha um absurdo e acredita que é importante revisar as ideias e falas da IA.",
                afirmacao: "Você compreende que a IA é uma ferramenta, não um colega. A criatividade humana ainda é essencial."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = localStorage.getItem("historiaCulinaria") || "";

function inicia() {
    progressoTotal.textContent = perguntas.length;
    if (historiaFinal && atual >= perguntas.length) {
        mostraResultado();
    } else {
        mostraPergunta();
    }
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    caixaResultado.style.display = "none";
    textoResultado.textContent = "";
    progressoAtual.textContent = atual + 1;

    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    localStorage.setItem("historiaCulinaria", historiaFinal);
    atual++;
    caixaPrincipal.style.opacity = 0;
    setTimeout(() => {
        mostraPergunta();
        caixaPrincipal.style.opacity = 1;
    }, 300);
}

function mostraResultado() {
    caixaPerguntas.textContent = "Sua jornada na cozinha digital...";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.style.display = "block";
    botaoReiniciar.style.display = "inline-block";
}

botaoReiniciar.addEventListener("click", () => {
    atual = 0;
    historiaFinal = "";
    localStorage.removeItem("historiaCulinaria");
    botaoReiniciar.style.display = "none";
    caixaPrincipal.style.opacity = 0;
    setTimeout(() => {
        mostraPergunta();
        caixaPrincipal.style.opacity = 1;
    }, 300);
});

inicia();