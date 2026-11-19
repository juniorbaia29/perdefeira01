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

// ... todo o seu código anterior do formulário de contato fica acima ...

    // Remove a mensagem de sucesso após 5 segundos
    setTimeout(() => {
        alertaSucesso.classList.add('hidden');
    }, 5000);

// =========================================
// COLE O NOVO CÓDIGO AQUI EMBAIXO
// =========================================

// Gerenciamento de Upload de Imagens e Comentários
const formUpload = document.getElementById('formUpload');
const galeriaGrid = document.querySelector('.galeria-grid');
const listaComentarios = document.getElementById('listaComentarios');

// Carrega itens salvos anteriormente ao abrir a página
document.addEventListener('DOMContentLoaded', carregarPostagensSalvas);

formUpload.addEventListener('submit', function(event) {
    event.preventDefault();

    const autor = document.getElementById('autorPost').value;
    const comentario = document.getElementById('comentarioPost').value;
    const fotoInput = document.getElementById('fotoInput');
    const arquivo = fotoInput.files[0];

    // Sempre adiciona o comentário ao mural
    adicionarComentarioNaTela(autor, comentario);
    salvarDadosLocalmente('comentarios', { autor, comentario });

    // Se o usuário selecionou uma imagem, converte e adiciona na galeria
    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            const imagemBase64 = e.target.result;
            const legendaCompleta = `${autor}: ${comentario}`;
            
            adicionarFotoNaGaleria(imagemBase64, legendaCompleta);
            salvarDadosLocalmente('fotos', { src: imagemBase64, legenda: legendaCompleta });
        };
        leitor.readAsDataURL(arquivo);
    }

    formUpload.reset();
    alert('Publicação adicionada com sucesso!');
});

function adicionarFotoNaGaleria(src, legendaTexto) {
    if (!galeriaGrid) return;

    const novoItem = document.createElement('div');
    novoItem.classList.add('galeria-item');

    novoItem.innerHTML = `
        <img src="${src}" alt="${legendaTexto}">
        <div class="legenda">${legendaTexto}</div>
    `;

    galeriaGrid.appendChild(novoItem);
}

function adicionarComentarioNaTela(autor, texto) {
    const card = document.createElement('div');
    card.classList.add('comentario-card');

    card.innerHTML = `
        <strong>${autor}</strong>
        <p>${texto}</p>
    `;

    // Adiciona o comentário mais recente no topo da lista
    listaComentarios.prepend(card);
}

function salvarDadosLocalmente(chave, item) {
    const dadosAtuais = JSON.parse(localStorage.getItem(chave)) || [];
    dadosAtuais.push(item);
    localStorage.setItem(chave, JSON.stringify(dadosAtuais));
}

function carregarPostagensSalvas() {
    const fotosSalvas = JSON.parse(localStorage.getItem('fotos')) || [];
    fotosSalvas.forEach(foto => adicionarFotoNaGaleria(foto.src, foto.legenda));

    const comentariosSalvos = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentariosSalvos.forEach(com => adicionarComentarioNaTela(com.autor, com.comentario));
}

// =========================================
// EXPANDIR FOTOS DA GALERIA (LIGHTBOX)
// =========================================
const modalGaleria = document.getElementById('modalGaleria');
const imagemAmpliada = document.getElementById('imagemAmpliada');
const legendaAmpliada = document.getElementById('legendaAmpliada');
const btnFecharModal = document.getElementById('fecharModal');

// Detecta o clique em qualquer foto dentro da galeria (fixas ou enviadas depois)
if (galeriaGrid) {
    galeriaGrid.addEventListener('click', function(event) {
        const itemClicado = event.target.closest('.galeria-item');
        
        if (itemClicado) {
            const img = itemClicado.querySelector('img');
            const legenda = itemClicado.querySelector('.legenda');

            imagemAmpliada.src = img.src;
            legendaAmpliada.textContent = legenda ? legenda.textContent : '';
            modalGaleria.classList.remove('hidden');
        }
    });
}

// Fecha ao clicar no X
btnFecharModal.addEventListener('click', function() {
    modalGaleria.classList.add('hidden');
});

// Fecha ao clicar fora da imagem (no fundo escuro)
modalGaleria.addEventListener('click', function(event) {
    if (event.target === modalGaleria) {
        modalGaleria.classList.add('hidden');
    }
});

// Fecha ao apertar a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !modalGaleria.classList.contains('hidden')) {
        modalGaleria.classList.add('hidden');
    }
});

