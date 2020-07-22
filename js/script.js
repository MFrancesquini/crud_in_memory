// a logica... start so e executado, quando load acontecer!
window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Tres', 'Quatro'];
// Nao e feita a ligacao com o HTML aqui pois ainda nao e certeza
// que a pagina esta totalmente carregada, entao faz-se dentro de start;
// porem fica fora pois sera usado varias vezes e assim fica global
var inputName = null;
var isEditing = false;
currentIndex = null;
function start() {
  // tem q ser antes de activateInput() pois ira ser usao la ;)
  inputName = document.querySelector('#inputName');
  preventFormSubmit();

  // aqui sim conseguimos acessar o input e vamos focar nele
  activateInput();

  // monta a lista na tela, de cara, ao acessar o js
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form = addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(Newname) {
    globalNames.push(Newname);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  }
  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    // aparece a maozinha de clicavel com essa adicao da classe css
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  // Criar ul
  var ul = document.createElement('ul');
  // Fazer n li's, conforme o tamanho da array
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  // inputName.focus();
}
