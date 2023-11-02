const synth = window.speechSynthesis;

let voices = [];
let speedValue;

const form = document.querySelector('form');
const inputTxt = document.querySelector('#txt');
const voiceSelect = document.querySelector('#voice');
const rate = document.querySelectorAll('.btn');
const speech = document.querySelector('#speech');

document.addEventListener('DOMContentLoaded', function () {
  speedValue = rate[0].getAttribute('value');
  rate[0].setAttribute('status', 'true');
  rate[0].setAttribute('id', 'button');
  return;
});

for (let i = 0; i < rate.length; i++) {
  rate[i].addEventListener('click', function () {
    findUnclickedButtons();

    speedValue = this.getAttribute('value'); // Obtenha o valor do botão clicado
    this.setAttribute('status', 'true');
    this.setAttribute('id', 'button');
    console.log(`Botão com valor ${speedValue} foi clicado.`);
  });
}

function findUnclickedButtons() {
  rate.forEach((button) => {
    if (button.getAttribute('status') === 'true') {
      button.setAttribute('id', '');
      button.setAttribute('status', 'false');
    }
  });
}

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    const name = voices[i].name.split(' ');
    option.textContent = `${name[1]} - ${voices[i].lang}`;
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();

if (
  typeof speechSynthesis !== 'undefined' &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

form.onsubmit = (event) => {
  event.preventDefault();

  let text = inputTxt.value;

  let utterance = new SpeechSynthesisUtterance(text);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterance.voice = voices[i];
    }
  }

  utterance.rate = speedValue;
  speechSynthesis.speak(utterance);

  inputTxt.blur();
};
