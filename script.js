// Sistema Interativo de Perguntas (Quiz)
const questions = [
    {
        q: "Quanto tempo você passa nas redes sociais por dia?",
        options: ["Menos de 2 horas", "Entre 2 e 4 horas", "Mais de 4 horas"]
    },
    {
        q: "Qual a frequência com que você checa o celular sem motivo?",
        options: ["Raramente", "Às vezes", "A todo momento"]
    },
    {
        q: "A tecnologia atrapalha suas tarefas ou sono?",
        options: ["Não afeta", "Ocasionalmente", "Com muita frequência"]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

function nextQuestion(score) {
    totalScore += score;
    currentQuestionIndex++;

    const quizDiv = document.getElementById('quiz');
    
    if (currentQuestionIndex < questions.length) {
        // Atualiza a pergunta com efeito visual simples
        quizDiv.style.opacity = 0;
        
        setTimeout(() => {
            const currentQ = questions[currentQuestionIndex];
            quizDiv.innerHTML = `
                <p class="question">${currentQ.q}</p>
                <div class="quiz-options">
                    <button class="quiz-btn" onclick="nextQuestion(1)">${currentQ.options[0]}</button>
                    <button class="quiz-btn" onclick="nextQuestion(2)">${currentQ.options[1]}</button>
                    <button class="quiz-btn" onclick="nextQuestion(3)">${currentQ.options[2]}</button>
                </div>
            `;
            quizDiv.style.opacity = 1;
        }, 200);
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz').classList.add('hidden');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('result-text');
    
    resultDiv.classList.remove('hidden');
    
    if (totalScore <= 4) {
        resultText.innerHTML = "<strong>Equilibrado!</strong> Você tem uma ótima relação com a tecnologia e sabe impor limites saudáveis.";
    } else if (totalScore <= 7) {
        resultText.innerHTML = "<strong>Alerta Moderado!</strong> Seus hábitos virtuais estão começando a assumir o controle. Vale a pena aplicar algumas dicas do nosso guia.";
    } else {
        resultText.innerHTML = "<strong>Dilema Crítico!</strong> Você está altamente dependente das telas. Recomendamos aplicar o Guia de Sobrevivência Digital imediatamente.";
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    document.getElementById('result').classList.add('hidden');
    const quizDiv = document.getElementById('quiz');
    quizDiv.classList.remove('hidden');
    
    quizDiv.innerHTML = `
        <p class="question">${questions[0].q}</p>
        <div class="quiz-options">
            <button class="quiz-btn" onclick="nextQuestion(1)">${questions[0].options[0]}</button>
            <button class="quiz-btn" onclick="nextQuestion(2)">${questions[0].options[1]}</button>
            <button class="quiz-btn" onclick="nextQuestion(3)">${questions[0].options[2]}</button>
        </div>
    `;
}
