export class Product {
  constructor(name, description, price, quantity, avaliable) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.avaliable = avaliable; // deve ser 1 ou 0
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

    produtos.sort((a, b) => a.price - b.price);

    const ul = document.getElementById('listaProdutos');
    ul.innerHTML = '';

    produtos.forEach(produto => {
      const li = document.createElement('li');
      const disponivel = produto.avaliable === true || produto.avaliable === 'true' || produto.avaliable === 1 || produto.avaliable === '1';
      const preco = produto.price/100;
      li.textContent = `${produto.name} - ${produto.description} - R$${preco.toFixed(2)} - Quantidade: ${produto.quantity} - Disponível: ${disponivel ? 'Sim' : 'Não'}`;
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
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
  }
}

document.getElementById('formCadastro').addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = this.elements['name'].value.trim();
  const descricao = this.elements['description'].value.trim();
  let preco = parseInt(this.elements['price'].value);
  const quantidade = parseInt(this.elements['quantity'].value, 10);

  const radios = this.elements['avaliable'];
  let selectedValue = '0';
  for (let radio of radios) {
    if (radio.checked) {
      selectedValue = radio.value; 
      break;
    }
  }
  
  const avaliableInt = parseInt(selectedValue, 10);

  const novoProduto = new Product(nome, descricao, preco, quantidade, avaliableInt);

  Finalizar(novoProduto).then(() => {
    this.reset();
    mostrarListagem();
  });
});

window.addEventListener('load', mostrarListagem);
