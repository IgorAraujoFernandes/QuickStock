import { Product } from "./classes.js";

window.mostrarCadastro = function() {
  document.getElementById("telaListagem").classList.remove("ativa");
  document.getElementById("telaCadastro").classList.add("ativa");
}

window.mostrarListagem = function() {
  document.getElementById("telaCadastro").classList.remove("ativa");
  document.getElementById("telaListagem").classList.add("ativa");
}

window.Finalizar = function(produto) {
  const jsonProduto = JSON.stringify(produto);
  console.log(jsonProduto);
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