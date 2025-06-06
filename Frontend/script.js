import { Product } from "./classes.js";

window.mostrarCadastro = function() {
  document.getElementById("telaListagem").classList.remove("ativa");
  document.getElementById("telaCadastro").classList.add("ativa");
}

window.mostrarListagem = function() {
  document.getElementById("telaCadastro").classList.remove("ativa");
  document.getElementById("telaListagem").classList.add("ativa");
}

window.Finalizar = async function(produto) {
  const jsonProduto = JSON.stringify(produto);
  try{
  const response = await fetch('http://localhost:5000/product', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonProduto
  });
  console.log(jsonProduto);
}
catch (error){
  console.log(`erro:${error.message}`);
}
}

document.getElementById('formCadastro').addEventListener('submit', function(event){
  event.preventDefault();

  const nome = this.elements['name'].value.trim();
  const descricao = this.elements['description'].value.trim();
  const preco = parseFloat(this.elements['price'].value);
  const quantidade = parseInt(this.elements['quantity'].value, 10);
  const avaliable = parseInt(this.elements['avaliable'].value, 10);
  const novoProduto = new Product(nome, descricao, preco, quantidade, avaliable);

  Finalizar(novoProduto);
  
  this.reset();
  mostrarListagem();
});