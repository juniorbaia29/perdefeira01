// Gerenciamento do Formulário de Contato
const formulario = document.getElementById('formContato');
const alertaSucesso = document.getElementById('mensagemSucesso');

formulario.addEventListener('submit', function(event) {
    // Evita o recarregamento automático da página
    event.preventDefault();

    // Captura os dados preenchidos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    // Exibe os dados no console (simulando o recebimento)
    console.log("Formulário Recebido:");
    console.log("Nome:", nome);
    console.log("E-mail:", email);
    console.log("Mensagem:", mensagem);

    // Mostra o aviso de sucesso na tela
    alertaSucesso.classList.remove('hidden');

    // Limpa os campos do formulário
    formulario.reset();

    // Remove a mensagem de sucesso após 5 segundos
    setTimeout(() => {
        alertaSucesso.classList.add('hidden');
    }, 5000);
});
