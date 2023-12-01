let menu = document.querySelector('#menu');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
  
  const savedData = JSON.parse(localStorage.getItem('formData')) || [];
  renderFormData(savedData);

  // Adiciona um evento de submissão ao formulário
  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.querySelector('input[placeholder="Nome"]').value;
    const email = document.querySelector('input[placeholder="E-mail"]').value;
    const assunto = document.querySelector('input.box').value;
    const mensagem = document.querySelector('textarea').value;

    
    const formData = {
      nome,
      email,
      assunto,
      mensagem,
      dataEnvio: new Date().toLocaleString(), 
    };

    
    savedData.push(formData);

    
    localStorage.setItem('formData', JSON.stringify(savedData));

    
    renderFormData(savedData);

    // Limpa os campos do formulário
    form.reset();
  });

  // Função para renderizar os dados na lista
  function renderFormData(data) {
    const listaContato = document.querySelector('.lista-contato');
    listaContato.innerHTML = ''; 

    
    data.forEach((item, index) => {
      const listItem = document.createElement('div');
      listItem.classList.add('item-contato');

      // Adiciona botão de exclusão
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.addEventListener('click', function () {
        
        savedData.splice(index, 1);
        localStorage.setItem('formData', JSON.stringify(savedData));

        
        renderFormData(savedData);
      });

      
      const itemText = document.createElement('p');
      itemText.textContent = `${item.dataEnvio} - Nome: ${item.nome}, Assunto: ${item.assunto}`;

      
      listItem.appendChild(deleteButton);
      listItem.appendChild(itemText);
      listaContato.appendChild(listItem);
    });
  }

  
  const inputPesquisa = document.querySelector('#input-pesquisa');
  inputPesquisa.addEventListener('input', function () {
    const termoPesquisa = inputPesquisa.value.toLowerCase();
    const resultados = savedData.filter(
      (item) =>
        item.nome.toLowerCase().includes(termoPesquisa) ||
        item.assunto.toLowerCase().includes(termoPesquisa)
    );

    renderFormData(resultados);
  });

  
  const btnLimparCampos = document.querySelector('#btn-limpar-campos');
  btnLimparCampos.addEventListener('click', function () {
    form.reset();
  });

  
  const btnLimparLista = document.querySelector('#btn-limpar-lista');
  btnLimparLista.addEventListener('click', function () {
    localStorage.removeItem('formData');
    renderFormData([]);
  });
});

