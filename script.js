// Função para atualizar a lista de estudos
function atualizarListaDeEstudos() {
    const studiesList = document.getElementById('studies');
    studiesList.innerHTML = ''; // Limpa a lista antes de repopular

    // Recuperar estudos do localStorage
    const estudos = JSON.parse(localStorage.getItem('estudos')) || [];

    // Se não houver estudos, mostrar mensagem
    if (estudos.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'Nenhum estudo cadastrado';
        studiesList.appendChild(emptyMessage);
    } else {
        estudos.forEach(estudo => {
            const listItem = document.createElement('li');
            listItem.classList.add('study-item');
            listItem.innerHTML = `
                <div>
                    <strong>${estudo.materia}</strong> - ${estudo.topico}<br>
                    <small>Data da prova: ${estudo.data_prova}</small>
                </div>
                <button onclick="excluirEstudo(${estudo.id})">Excluir</button>
            `;
            studiesList.appendChild(listItem);
        });
    }
}

// Função para adicionar um estudo
document.getElementById('study-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const materia = document.getElementById('materia').value;
    const topico = document.getElementById('topico').value;
    const data_prova = document.getElementById('data_prova').value;

    // Recuperar os estudos do localStorage ou inicializar um array vazio
    const estudos = JSON.parse(localStorage.getItem('estudos')) || [];

    // Criar um novo estudo
    const novoEstudo = {
        id: Date.now(),  // Usando timestamp como ID único
        materia: materia,
        topico: topico,
        data_prova: data_prova
    };

    // Adicionar o novo estudo ao array
    estudos.push(novoEstudo);

    // Salvar novamente no localStorage
    localStorage.setItem('estudos', JSON.stringify(estudos));

    // Limpar os campos do formulário
    document.getElementById('materia').value = '';
    document.getElementById('topico').value = '';
    document.getElementById('data_prova').value = '';

    // Atualizar a lista
    atualizarListaDeEstudos();
});

// Função para excluir um estudo
function excluirEstudo(id) {
    // Recuperar estudos do localStorage
    const estudos = JSON.parse(localStorage.getItem('estudos')) || [];

    // Filtrar o estudo que será excluído
    const estudosAtualizados = estudos.filter(estudo => estudo.id !== id);

    // Atualizar o localStorage
    localStorage.setItem('estudos', JSON.stringify(estudosAtualizados));

    // Atualizar a lista de estudos na tela
    atualizarListaDeEstudos();
}

// Inicializar a lista de estudos ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarListaDeEstudos);
