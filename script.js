// ==========================================
// DILEMAS DIGITAIS
// JavaScript principal
// ==========================================


// MENU MOBILE
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


// FECHAR MENU AO CLICAR EM UM LINK
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });

});


// ==========================================
// ANIMAÇÃO AO ENTRAR NA TELA
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    observer.observe(element);
});


// ==========================================
// BOTÕES "VER SOLUÇÃO"
// ==========================================

const solutionButtons = document.querySelectorAll(".solution-btn");

solutionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const target = document.getElementById(targetId);

        if (!target) return;

        target.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        target.style.borderColor = "#8b5cf6";

        setTimeout(() => {
            target.style.borderColor = "";
        }, 1500);

    });

});


// ==========================================
// QUIZ
// ==========================================

const questions = [

    {
        question: "Você costuma olhar o celular assim que acorda?",
        answers: [
            ["Sempre. É uma das primeiras coisas que faço.", 3],
            ["Muitas vezes.", 2],
            ["Às vezes.", 1],
            ["Quase nunca.", 0]
        ]
    },

    {
        question: "Quando começa a usar uma rede social, você costuma perder a noção do tempo?",
        answers: [
            ["Muito. Quando percebo, passou bastante tempo.", 3],
            ["Às vezes acontece.", 2],
            ["Raramente.", 1],
            ["Consigo controlar bem.", 0]
        ]
    },

    {
        question: "Você usa o celular enquanto deveria estar estudando ou trabalhando?",
        answers: [
            ["Frequentemente.", 3],
            ["Às vezes.", 2],
            ["Raramente.", 1],
            ["Quase nunca.", 0]
        ]
    },

    {
        question: "Você costuma ficar no celular antes de dormir?",
        answers: [
            ["Todos os dias.", 3],
            ["Na maioria dos dias.", 2],
            ["Algumas vezes.", 1],
            ["Evito.", 0]
        ]
    },

    {
        question: "Você verifica notificações mesmo quando não recebeu nenhuma?",
        answers: [
            ["Sim, várias vezes.", 3],
            ["Às vezes.", 2],
            ["Raramente.", 1],
            ["Quase nunca.", 0]
        ]
    },

    {
        question: "Você consegue passar algumas horas sem usar redes sociais?",
        answers: [
            ["É muito difícil.", 3],
            ["Preciso me esforçar.", 2],
            ["Consigo normalmente.", 1],
            ["Sim, sem problema.", 0]
        ]
    }

];


let currentQuestion = 0;
let score = 0;
let selectedPoints = null;


// ELEMENTOS
const quizContent = document.getElementById("quizContent");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("scoreText");
const progressBar = document.getElementById("progressBar");
const questionCounter = document.getElementById("questionCounter");


// MOSTRAR PERGUNTA
function showQuestion() {

    const question = questions[currentQuestion];

    selectedPoints = null;

    nextBtn.disabled = true;

    questionCounter.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    let html = `
        <div class="question">
            ${question.question}
        </div>

        <div class="answers">
    `;

    question.answers.forEach((answer, index) => {

        html += `
            <button
                class="answer"
                data-points="${answer[1]}"
            >
                <span>${String.fromCharCode(65 + index)}</span>
                ${answer[0]}
            </button>
        `;

    });

    html += `</div>`;

    quizContent.innerHTML = html;


    // EVENTOS DAS RESPOSTAS
    document.querySelectorAll(".answer").forEach(answer => {

        answer.addEventListener("click", () => {

            document
                .querySelectorAll(".answer")
                .forEach(button => {
                    button.classList.remove("selected");
                });

            answer.classList.add("selected");

            selectedPoints =
                Number(answer.dataset.points);

            nextBtn.disabled = false;

        });

    });

}


// BOTÃO PRÓXIMA
nextBtn.addEventListener("click", () => {

    if (selectedPoints === null) return;

    score += selectedPoints;

    scoreText.textContent =
        `Pontuação: ${score}`;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// ==========================================
// RESULTADO
// ==========================================

function showResult() {

    progressBar.style.width = "100%";

    const resultSection =
        document.getElementById("resultado");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultDescription =
        document.getElementById("resultDescription");

    const resultIcon =
        document.getElementById("resultIcon");

    const resultMeter =
        document.getElementById("resultMeter");


    let title;
    let description;
    let icon;
    let percentage;


    if (score <= 5) {

        title = "Explorador Consciente";
        icon = "🌿";
        percentage = 25;

        description =
            "Você demonstra uma relação relativamente equilibrada com a tecnologia. Continue usando as telas de forma intencional e preserve seus momentos offline.";

    }

    else if (score <= 10) {

        title = "Conectado em Equilíbrio";
        icon = "⚡";
        percentage = 50;

        description =
            "A tecnologia faz bastante parte da sua rotina, mas você ainda consegue estabelecer limites. Pequenas mudanças podem deixar seu uso ainda mais saudável.";

    }

    else if (score <= 14) {

        title = "Sempre Conectado";
        icon = "📱";
        percentage = 75;

        description =
            "Seu celular provavelmente ocupa bastante espaço na sua rotina. Experimente reduzir notificações, criar horários sem tela e fazer pausas conscientes.";

    }

    else {

        title = "Alerta Digital";
        icon = "🚨";
        percentage = 95;

        description =
            "Suas respostas indicam uma forte presença das telas no cotidiano. Vale experimentar limites mais claros e observar como isso afeta sono, estudos, lazer e convivência.";

    }


    resultTitle.textContent = title;
    resultDescription.textContent = description;
    resultIcon.textContent = icon;


    resultSection.scrollIntoView({
        behavior: "smooth"
    });


    setTimeout(() => {

        resultMeter.style.width =
            `${percentage}%`;

    }, 300);

}


// ==========================================
// REINICIAR QUIZ
// ==========================================

const restartBtn =
    document.getElementById("restartBtn");

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;
    selectedPoints = null;

    scoreText.textContent =
        "Pontuação: 0";

    document
        .getElementById("resultMeter")
        .style.width = "0%";

    showQuestion();

    document
        .getElementById("quiz")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ==========================================
// EFEITO DE PARALLAX SUAVE
// ==========================================

const phone =
    document.querySelector(".phone");

window.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 800) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 10;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 10;

    phone.style.transform =
        `translate(${x}px, ${y}px) rotate(${x / 5}deg)`;

});


// ==========================================
// HEADER MUDA AO ROLAR
// ==========================================

const header =
    document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(7, 9, 20, .92)";

    } else {

        header.style.background =
            "rgba(7, 9, 20, .7)";

    }

});


// INICIAR QUIZ
showQuestion();
