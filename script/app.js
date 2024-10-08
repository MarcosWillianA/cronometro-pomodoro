const tempo25 = document.querySelector('#tempo25');
const tempo50 = document.querySelector('#tempo50');
const descanso05 = document.querySelector('#descanso05');
const descanso15 = document.querySelector('#descanso15');
const iniciarPausar = document.querySelector('#iniciar-pausar');
const zerar = document.querySelector('#zerar');
const cronometro = document.querySelector('#cronometro');

let tempo;
let marcandoTempo = false;
let tempoRestante = 0;

function configurarTempo(min) {
    tempoRestante = min * 60;
    atualizarCronometro();
}

function atualizarCronometro() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60; 
    cronometro.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function iniciarEPausar() {
    if (marcandoTempo) {
        clearInterval(tempo);
        marcandoTempo = false;
        iniciarPausar.textContent = 'Iniciar';
    } else {
        tempo = setInterval(() => {
            if (tempoRestante > 0) {
                tempoRestante--;
                atualizarCronometro();
            } else {
                clearInterval(tempo);
                marcandoTempo = false;
                iniciarPausar.textContent = 'Iniciar';
            }
        }, 1000); //Atualiza por segundo
        marcandoTempo = true;
        iniciarPausar.textContent = 'Pausar';
    }
}

function zerarCronometro() {
    iniciarPausar.innerHTML = 'Iniciar';
    clearInterval(tempo);
    tempoRestante = 0;
    atualizarCronometro();
    marcandoTempo = false;
}

atualizarCronometro();

tempo25.addEventListener('click', () => {
    configurarTempo(25);
    atualizarCronometro();
})

tempo50.addEventListener('click', () => {
    configurarTempo(50);
    atualizarCronometro();
})

descanso05.addEventListener('click', () => {
    configurarTempo(5);
    atualizarCronometro();
})

descanso15.addEventListener('click', () => {
    configurarTempo(15);
    atualizarCronometro();
})

iniciarPausar.addEventListener('click', () => {
    iniciarEPausar();
})

zerar.addEventListener('click', () => {
    zerarCronometro();
    atualizarCronometro();
})