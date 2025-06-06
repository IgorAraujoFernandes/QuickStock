export class Product {
  constructor(name, description, price, quantity, available) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.available = available;
  }
}

window.mostrarCadastro = function() {
  document.getElementById("telaListagem").classList.remove("ativa");
  document.getElementById("telaCadastro").classList.add("ativa");
}

window.mostrarListagem = async function() {
  document.getElementById("telaCadastro").classList.remove("ativa");
  document.getElementById("telaListagem").classList.add("ativa");

  try {
    const response = await fetch('http://localhost:5000/product/list');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const produtos = await response.json();

    const ul = document.getElementById('listaProdutos');
    ul.innerHTML = '';

    produtos.forEach(produto => {
      const li = document.createElement('li');
      li.textContent = `${produto.name} - ${produto.description} - R$${produto.price.toFixed(2)} - Quantidade: ${produto.quantity} - Disponível: ${produto.available ? 'Sim' : 'Não'}`;
      ul.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
}

window.Finalizar = async function(produto) {
  try {
    const response = await fetch('http://localhost:5000/product', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na API: ${errorText}`);
    }

    console.log('Produto cadastrado:', produto);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
  }
}

document.getElementById('formCadastro').addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = this.elements['name'].value.trim();
  const descricao = this.elements['description'].value.trim();
  const preco = parseFloat(this.elements['price'].value);
  const quantidade = parseInt(this.elements['quantity'].value, 10);
  const available = this.elements['avaliable'].value === 'true';

  const novoProduto = new Product(nome, descricao, preco, quantidade, available);

  Finalizar(novoProduto).then(() => {
    this.reset();
    mostrarListagem();
  });
});

window.addEventListener('load', mostrarListagem);
