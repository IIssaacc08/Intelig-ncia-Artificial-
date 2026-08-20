document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar

    // Seleciona todas as respostas marcadas
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    
    // Validação de segurança extra
    if(answers.length < 4) {
        alert("Por favor, responda todas as 4 perguntas antes de prosseguir!");
        return;
    }

    // Calcula a pontuação total somando os valores inteiros das respostas
    let score = 0;
    answers.forEach(answer => {
        score += parseInt(answer.value);
    });

    // Elementos do Modal de Resultado para manipulação
    const modal = document.getElementById('resultResultModal');
    const resultModal = document.getElementById('resultModal');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');

    // Lógica dos Diagnósticos Condicionais
    if (score >= 4 && score <= 6) {
        resultIcon.textContent = "🟢";
        resultTitle.textContent = "Navegador Consciente";
        resultTitle.style.color = "#00ff87";
        resultText.innerHTML = "<strong>Perfil:</strong> Você possui uma relação saudável e equilibrada com a tecnologia. As telas servem como ferramentas úteis, não como distrações controladoras.<br><br><strong>Recomendação:</strong> Continue assim e ajude pessoas próximas compartilhando seus bons hábitos de desconexão.";
    } 
    else if (score >= 7 && score <= 10) {
        resultIcon.textContent = "🟡";
        resultTitle.textContent = "Alerta de Conexão";
        resultTitle.style.color = "#fec107";
        resultText.innerHTML = "<strong>Perfil:</strong> O mundo digital começou a invadir seus momentos de descanso e foco. Você usa as telas mais tempo do que gostaria por puro automatismo do cérebro.<br><br><strong>Recomendação:</strong> Ative limites de tempo nativos nos aplicativos de redes sociais e determine horários fixos para checar mensagens.";
    } 
    else if (score >= 11 && score <= 12) {
        resultIcon.textContent = "🔴";
        resultTitle.textContent = "Dependência Digital Alta";
        resultTitle.style.color = "#ff4b2b";
        resultText.innerHTML = "<strong>Perfil:</strong> A tecnologia está ditando o ritmo da sua rotina, gerando picos de ansiedade e fragmentando sua produtividade e relações reais.<br><br><strong>Recomendação:</strong> Faça um detox digital completo programado nos fins de semana (24h totalmente offline). Se necessário, busque apoio focado em gerenciar o foco.";
    }

    // Remove a classe hidden disparando as animações CSS
    resultModal.classList.remove('hidden');
});

// Função para fechar a tela de resultado e resetar o formulário
function closeResult() {
    const resultModal = document.getElementById('resultModal');
    resultModal.classList.add('hidden');
    document.getElementById('quizForm').reset();
    
    // Rola suavemente de volta para o início do teste
    document.getElementById('teste').scrollIntoView({ behavior: 'smooth' });
}
