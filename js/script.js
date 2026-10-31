// Configurações gerais
const VALOR_FRETE = 5;
const NUMERO_WHATSAPP = '5584987733297';
const CHAVE_ARMAZENAMENTO_CARRINHO = 'devlanches-cart';
const CATEGORIAS = ['lanches', 'bebidas', 'petiscos'];

// Dados do cardápio
const produtosCardapio = [
  { id: 'burger-exe', categoria: 'lanches', nome: 'Burger.exe', descricao: 'Pão brioche, smash bovino, queijo e molho secreto.', preco: 24.9, imagem: 'img/burger-exe.jpg', permiteAdicionais: true },
  { id: 'stack-overflow', categoria: 'lanches', nome: 'Stack Overflow', descricao: 'Duplo smash, cheddar cremoso, bacon e cebola crispy.', preco: 31.9, imagem: 'img/stack-overflow.jpg', permiteAdicionais: true },
  { id: 'null-pointer', categoria: 'lanches', nome: 'Null Pointer', descricao: 'Smash, queijo, alface, tomate e maionese da casa.', preco: 22.9, imagem: 'img/null-pointer.jpg', permiteAdicionais: true },
  { id: 'x-bug', categoria: 'lanches', nome: 'X-Bug', descricao: 'Pão, hambúrguer, queijo, presunto, ovo e salada.', preco: 18.9, imagem: 'img/x-bug.jpg', permiteAdicionais: true },
  { id: 'misto-syntax', categoria: 'lanches', nome: 'Misto Syntax', descricao: 'Pão na chapa, queijo derretido e presunto caprichado.', preco: 12.9, imagem: 'img/misto-syntax.jpg', permiteAdicionais: true },
  { id: 'cachorro-git', categoria: 'lanches', nome: 'Cachorro-Quente Git', descricao: 'Salsicha, molho, milho, ervilha, batata palha e queijo.', preco: 16.9, imagem: 'img/cachorro-quente-git.jpg', permiteAdicionais: true },
  { id: 'coca-classica', categoria: 'bebidas', nome: 'Coca-Cola: versão clássica', descricao: 'Lata 350ml, geladinha para acompanhar seu commit.', preco: 6, imagem: 'img/coca-cola.jpg' },
  { id: 'coca-zero', categoria: 'bebidas', nome: 'Coca-Cola Zero: sem bugs', descricao: 'Lata 350ml, zero açúcar e cheia de atitude.', preco: 6, imagem: 'img/coca-cola-zero.jpg' },
  { id: 'guarana-build', categoria: 'bebidas', nome: 'Guaraná Build', descricao: 'Lata 350ml do clássico que nunca falha.', preco: 5.5, imagem: 'img/guarana-antarctica.jpg' },
  { id: 'agua-mineral', categoria: 'bebidas', nome: 'Água localhost', descricao: 'Água mineral 500ml para atualizar as energias.', preco: 3.5, imagem: 'img/agua-crystal.jpg' },
  { id: 'suco-laranja', categoria: 'bebidas', nome: 'Suco Orange Juice', descricao: 'Suco de laranja natural e refrescante.', preco: 8, imagem: 'img/suco-laranja.jpg' },
  { id: 'suco-limao', categoria: 'bebidas', nome: 'Suco Lemon Logic', descricao: 'Suco de limão natural, gelado e equilibrado.', preco: 8, imagem: 'img/suco-limao.jpg' },
  { id: 'onion-rings', categoria: 'petiscos', nome: 'Onion Rings Loop', descricao: 'Anéis de cebola empanados, crocantes por fora.', preco: 18.9, imagem: 'img/onion-rings.jpg' },
  { id: 'batata-frita', categoria: 'petiscos', nome: 'Batata Frita Deploy', descricao: 'Porção de batata frita sequinha e dourada.', preco: 17.9, imagem: 'img/batata-frita.jpg' },
  { id: 'tiras-frango', categoria: 'petiscos', nome: 'Chicken Debug', descricao: 'Tiras de frango empanado com molho especial.', preco: 23.9, imagem: 'img/frango-empanado.jpg' },
  { id: 'calabresa-macaxeira', categoria: 'petiscos', nome: 'Calabresa Commit', descricao: 'Calabresa acebolada com macaxeira macia.', preco: 27.9, imagem: 'img/calabresa-com-macaxeira.jpg' },
  { id: 'bolinho-queijo', categoria: 'petiscos', nome: 'Cheese Exception', descricao: 'Bolinho de queijo dourado e recheado.', preco: 19.9, imagem: 'img/bolinhos-de-queijo.jpg' },
  { id: 'camarao-empanado', categoria: 'petiscos', nome: 'Camarão Full Stack', descricao: 'Camarão empanado, crocante e servido com molho.', preco: 32.9, imagem: 'img/camarao-empanado.jpg' }
];

const opcoesAdicionais = [
  { nome: 'Bacon extra', preco: 4 },
  { nome: 'Queijo extra', preco: 3 },
  { nome: 'Ovo', preco: 2.5 },
  { nome: 'Cheddar', preco: 3.5 }
];

// Estado e elementos da página
let itensCarrinho = carregarItensDoCarrinho();
const gradeDoCardapio = document.querySelector('#grade-produtos');
const modalDoCarrinho = document.querySelector('#modal-carrinho');
const barraDeFeedback = document.querySelector('#feedback-carrinho');

// Funções auxiliares
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function carregarItensDoCarrinho() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO_CARRINHO)) || [];
  } catch {
    return [];
  }
}

function salvarItensDoCarrinho() {
  localStorage.setItem(CHAVE_ARMAZENAMENTO_CARRINHO, JSON.stringify(itensCarrinho));
}

// Renderização do cardápio
function criarOpcoesDeAdicionais() {
  return opcoesAdicionais.map((adicional, indice) => `
    <label class="opcao-adicional">
      <input type="checkbox" data-indice-adicional="${indice}">
      ${adicional.nome} <span>+${formatarMoeda(adicional.preco)}</span>
    </label>`).join('');
}

function criarCardDoProduto(produto) {
  const campoAdicionais = produto.permiteAdicionais ? `
    <fieldset class="adicionais-produto">
      <legend>+ adicionais</legend>
      ${criarOpcoesDeAdicionais()}
    </fieldset>` : '';

  return `
    <article class="card-produto">
      <img class="imagem-produto" src="${produto.imagem}" alt="Imagem de ${produto.nome}: ${produto.descricao}" loading="lazy">
      <div class="informacoes-produto">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        ${campoAdicionais}
        <div class="rodape-produto">
          <strong class="preco-produto" data-preco-base="${produto.preco}">${formatarMoeda(produto.preco)}</strong>
          <button class="botao-adicionar" type="button" data-adicionar="${produto.id}">Adicionar +</button>
        </div>
      </div>
    </article>`;
}

function atualizarPrecoDoCard(cardProduto) {
  const preco = Number(cardProduto.querySelector('[data-preco-base]').dataset.precoBase);
  const totalAdicionais = obterAdicionaisSelecionados(cardProduto)
    .reduce((total, adicional) => total + adicional.preco, 0);
  cardProduto.querySelector('.preco-produto').textContent = formatarMoeda(preco + totalAdicionais);
}

function obterProdutosDaCategoria(categoria) {
  return produtosCardapio.filter(produto => produto.categoria === categoria);
}

function mostrarProdutosDaCategoria(categoria = 'lanches') {
  const produtosDaCategoria = obterProdutosDaCategoria(categoria);
  gradeDoCardapio.innerHTML = produtosDaCategoria
    .map(criarCardDoProduto)
    .join('');
}

function atualizarAbasDoCardapio(categoriaSelecionada) {
  document.querySelectorAll('.aba-categoria').forEach(item => {
    const categoriaAtiva = item.dataset.category === categoriaSelecionada;
    item.classList.toggle('ativo', categoriaAtiva);
    item.setAttribute('aria-selected', categoriaAtiva);
  });
}

function selecionarCategoriaDoCardapio(categoria) {
  atualizarAbasDoCardapio(categoria);
  mostrarProdutosDaCategoria(categoria);
}

function obterAdicionaisSelecionados(cardProduto) {
  return [...cardProduto.querySelectorAll('input:checked')]
    .map(checkbox => opcoesAdicionais[checkbox.dataset.indiceAdicional]);
}

// Operações do carrinho
function adicionarProdutoAoCarrinho(idProduto, cardProduto) {
  const produto = produtosCardapio.find(item => item.id === idProduto);
  const adicionaisSelecionados = obterAdicionaisSelecionados(cardProduto);
  const nomesDosAdicionais = adicionaisSelecionados.map(item => item.nome).sort().join('|');
  const idDoItem = `${idProduto}:${nomesDosAdicionais}`;
  const itemExistente = itensCarrinho.find(item => item.id === idDoItem);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    itensCarrinho.push({
      id: idDoItem,
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      adicionais: adicionaisSelecionados,
      quantidade: 1
    });
  }

  salvarItensDoCarrinho();
  atualizarExibicaoDoCarrinho();
  document.querySelector('#erro-finalizacao').textContent = '';
}

function calcularTotalDoItem(item) {
  const precoDosAdicionais = item.adicionais
    .reduce((total, adicional) => total + adicional.preco, 0);
  return (item.preco + precoDosAdicionais) * item.quantidade;
}

function criarItemDoCarrinho(item) {
  const textoAdicionais = item.adicionais.length
    ? `<p>+ ${item.adicionais.map(adicional => adicional.nome).join(', ')}</p>`
    : '';

  return `
    <div class="item-carrinho">
      <div>
        <h3>${item.nome}</h3>
        ${textoAdicionais}
        <div class="controles-quantidade">
          <button type="button" data-diminuir="${item.id}" aria-label="Diminuir quantidade">−</button>
          <span>${item.quantidade}</span>
          <button type="button" data-aumentar="${item.id}" aria-label="Aumentar quantidade">+</button>
          <button type="button" class="botao-remover-item" data-remover="${item.id}">remover</button>
        </div>
      </div>
      <strong class="preco-item-carrinho">${formatarMoeda(calcularTotalDoItem(item))}</strong>
    </div>`;
}

function atualizarExibicaoDoCarrinho() {
  const listaCarrinho = document.querySelector('#itens-carrinho');
  const quantidadeTotal = itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  const subtotal = itensCarrinho.reduce((total, item) => total + calcularTotalDoItem(item), 0);

  document.querySelector('.contador-carrinho').textContent = quantidadeTotal;
  listaCarrinho.innerHTML = itensCarrinho.length
    ? itensCarrinho.map(criarItemDoCarrinho).join('')
    : '<p class="carrinho-vazio">Seu carrinho está vazio.<br>Que tal compilar um lanche?</p>';
  document.querySelector('#subtotal-carrinho').textContent = formatarMoeda(subtotal);
  document.querySelector('#total-carrinho').textContent = formatarMoeda(subtotal + VALOR_FRETE);
  document.querySelector('#botao-finalizar').disabled = false;

  document.querySelector('#quantidade-feedback').textContent = quantidadeTotal;
  document.querySelector('#subtotal-feedback').textContent = formatarMoeda(subtotal);
  barraDeFeedback.classList.toggle('is-visible', itensCarrinho.length > 0);
  document.body.classList.toggle('carrinho-com-itens', itensCarrinho.length > 0);
}

function abrirModalDoCarrinho() {
  modalDoCarrinho.classList.add('is-open');
  modalDoCarrinho.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelector('.botao-fechar-modal').focus();
}

function fecharModalDoCarrinho() {
  modalDoCarrinho.classList.remove('is-open');
  modalDoCarrinho.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function alterarQuantidadeDoItem(idDoItem, alteracao) {
  const item = itensCarrinho.find(produto => produto.id === idDoItem);
  if (!item) return;

  item.quantidade += alteracao;
  if (item.quantidade <= 0) {
    itensCarrinho = itensCarrinho.filter(produto => produto.id !== idDoItem);
  }
  salvarItensDoCarrinho();
  atualizarExibicaoDoCarrinho();
}

function removerItemDoCarrinho(idDoItem) {
  itensCarrinho = itensCarrinho.filter(item => item.id !== idDoItem);
  salvarItensDoCarrinho();
  atualizarExibicaoDoCarrinho();
}

function criarMensagemDoPedido() {
  const partesDaMensagem = CATEGORIAS.map(categoria => {
    const itensDaCategoria = itensCarrinho.filter(item => item.categoria === categoria);
    return itensDaCategoria.map(item => {
      const opcoesAdicionaisDoItem = item.adicionais.length
        ? `\n   Adicionais: ${item.adicionais.map(adicional => adicional.nome).join(', ')}`
        : '';
      return `${item.quantidade}x ${item.nome}${opcoesAdicionaisDoItem}`;
    }).join('\n');
  }).filter(Boolean);

  const subtotal = itensCarrinho.reduce((total, item) => total + calcularTotalDoItem(item), 0);
  return `Olá, divas do DevLanches! Meu pedido é:\n\n${partesDaMensagem.join('\n=============================\n')}\n\nSubtotal: ${formatarMoeda(subtotal)}\nFrete: ${formatarMoeda(VALOR_FRETE)}\nTotal: ${formatarMoeda(subtotal + VALOR_FRETE)}`;
}

// Navegação
function configurarMenuPrincipal() {
  const botaoMenu = document.querySelector('.botao-menu');
  const menu = document.querySelector('.navegacao-principal');

  botaoMenu.addEventListener('click', () => {
    const menuAberto = menu.classList.toggle('is-open');
    botaoMenu.setAttribute('aria-expanded', menuAberto);
  });

  menu.addEventListener('click', evento => {
    if (evento.target.matches('.link-navegacao, .link-submenu')) {
      menu.classList.remove('is-open');
      botaoMenu.setAttribute('aria-expanded', 'false');
    }
  });

  configurarLinksAtivos();
}

function configurarLinksAtivos() {
  const secoes = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.link-navegacao');
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      links.forEach(link => {
        const linkAtivo = link.getAttribute('href') === `#${entrada.target.id}`;
        link.classList.toggle('ativo', linkAtivo);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  secoes.forEach(secao => observador.observe(secao));
}

function configurarCategoriaPelaUrl() {
  const categoria = window.location.hash.replace('#categoria-', '');
  if (CATEGORIAS.includes(categoria)) {
    selecionarCategoriaDoCardapio(categoria);
  }
}

// Eventos da página
document.addEventListener('click', evento => {
  const linkSubmenu = evento.target.closest('.link-submenu');
  if (linkSubmenu) {
    selecionarCategoriaDoCardapio(linkSubmenu.dataset.category);
  }

  const aba = evento.target.closest('.aba-categoria');
  if (aba) {
    selecionarCategoriaDoCardapio(aba.dataset.category);
  }

  const botaoAdicionar = evento.target.closest('[data-adicionar]');
  if (botaoAdicionar) adicionarProdutoAoCarrinho(botaoAdicionar.dataset.adicionar, botaoAdicionar.closest('.card-produto'));

  const botaoAumentar = evento.target.closest('[data-aumentar]');
  if (botaoAumentar) alterarQuantidadeDoItem(botaoAumentar.dataset.aumentar, 1);

  const botaoDiminuir = evento.target.closest('[data-diminuir]');
  if (botaoDiminuir) alterarQuantidadeDoItem(botaoDiminuir.dataset.diminuir, -1);

  const botaoRemover = evento.target.closest('[data-remover]');
  if (botaoRemover) removerItemDoCarrinho(botaoRemover.dataset.remover);

  if (evento.target.closest('[data-open-cart]')) abrirModalDoCarrinho();
  if (evento.target.closest('[data-close-cart]') || evento.target === modalDoCarrinho) fecharModalDoCarrinho();

  if (evento.target.matches('#botao-finalizar')) {
    const mensagemDeErro = document.querySelector('#erro-finalizacao');
    if (!itensCarrinho.length) {
      mensagemDeErro.textContent = 'Erro 404: Lanche não encontrado! Adicione pelo menos um item para finalizar o pedido.';
      return;
    }
    const mensagem = encodeURIComponent(criarMensagemDoPedido());
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, '_blank');
  }
});

document.addEventListener('change', evento => {
  const adicional = evento.target.closest('.opcao-adicional input');
  if (adicional) atualizarPrecoDoCard(adicional.closest('.card-produto'));
});

document.addEventListener('error', evento => {
  const imagem = evento.target;
  const imagemAlternativa = imagem.dataset?.fallback;

  if (imagem instanceof HTMLImageElement && imagemAlternativa) {
    delete imagem.dataset.fallback;
    imagem.src = imagemAlternativa;
  }
}, true);

document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && modalDoCarrinho.classList.contains('is-open')) fecharModalDoCarrinho();
});

window.addEventListener('hashchange', configurarCategoriaPelaUrl);

// Inicialização da página
mostrarProdutosDaCategoria();
atualizarExibicaoDoCarrinho();
configurarMenuPrincipal();
configurarCategoriaPelaUrl();
