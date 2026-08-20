// Banco de dados dinâmico de perguntas do Quiz
const quizQuestions = [
    {
        q: "Quanto tempo você passa nas redes sociais por dia?",
        options: ["Menos de 2 horas", "Entre 2 e 4 horas", "Mais de 4 horas"]
    },
    {
        q: "Qual a frequência com que você checa o celular sem ter recebido notificações?",
        options: ["Raramente", "Às vezes ao longo do dia", "A todo momento de forma automática"]
    },
    {
        q: "A tecnologia ou o uso de telas já atrapalhou suas tarefas profissionais ou seu sono?",
        options: ["Não afeta minha rotina", "Ocasionalmente perco prazos ou horas de sono", "Com muita frequência me sinto prejudicado"]
    },
    {
        q: "Como você se sente quando fica sem acesso à internet ou esquece o telefone?",
        options: ["Tranquilo, aproveito o momento", "Um pouco desconfortável ou curioso", "Extremamente ansioso e isolado"]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

// Inicializa o quiz na tela ao carregar o site
document.addEventListener("DOMContentLoaded", () => {
    renderQuestion();
});

function renderQuestion() {
    const quizDiv = document.getElementById('quiz');
    const currentQ = quizQuestions[currentQuestionIndex];
    
    quizDiv.innerHTML = `
        <p class="question">${currentQ.q}</p>
        <div class="quiz-options">
            <button class="quiz-btn" onclick="handleAnswer(1)">${currentQ.options[0]}</button>
            <button class="quiz-btn" onclick="handleAnswer(2)">${currentQ.options[1]}</button>
            <button class="quiz-btn" onclick="handleAnswer(3)">${currentQ.options[2]}</button>
        </div>
    `;
}

function handleAnswer(score) {
    totalScore += score;
    currentQuestionIndex++;

    const quizDiv = document.getElementById('quiz');
    quizDiv.style.opacity = 0;
    quizDiv.style.transform = "scale(0.95)";
    quizDiv.style.transition = "all 0.2s ease";
    
    setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length) {
            renderQuestion();
            quizDiv.style.opacity = 1;
            quizDiv.style.transform = "scale(1)";
        } else {
            showResult();
        }
    }, 200);
}

function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('result-text');
    
    resultDiv.classList.remove('hidden');
    
    // Cálculo baseado no score de 4 perguntas (mínimo 4, máximo 12)
    if (totalScore <= 6) {
        resultText.innerHTML = "<strong>Equilibrado!</strong> Você tem uma ótima relação com a tecnologia, sabe ditar seus limites e consome o ambiente digital de maneira consciente.";
    } else if (totalScore <= 9) {
        resultText.innerHTML = "<strong>Alerta Moderado!</strong> Os algoritmos estão começando a capturar mais do seu tempo do que deveriam. Vale a pena aplicar algumas das nossas estratégias antes que vire um vício.";
    } else {
        resultText.innerHTML = "<strong>Dilema Crítico!</strong> Suas telas estão controlando sua rotina, foco e bem-estar emocional. Recomendamos aplicar o Guia de Sobrevivência Digital imediatamente para recuperar sua autonomia.";
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    document.getElementById('result').classList.add('hidden');
    const quizDiv = document.getElementById('quiz');
    quizDiv.classList.remove('hidden');
    quizDiv.style.opacity = 1;
    quizDiv.style.transform = "scale(1)";
    renderQuestion();
}
