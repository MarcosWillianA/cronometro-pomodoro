const tempo25 = document.querySelector('#tempo25');
const tempo50 = document.querySelector('#tempo50');
const descanso05 = document.querySelector('#descanso05');
const descanso15 = document.querySelector('#descanso15');
const iniciarPausar = document.querySelector('#iniciar-pausar');
const zerar = document.querySelector('#zerar');
const cronometro = document.querySelector('#cronometro');


let tempo = 0;
let intervalo; 
let contagem = false;
let cronometroPrincipal = true;

function atualizarCronometro () {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;

    const formatoMinutos = String(minutos).padStart(2, '0');
    const formatoSegundos = String(segundos).padStart(2, '0');

    cronometro.innerText = `${formatoMinutos}:${formatoSegundos}`;

    if (tempo > 0) {
        tempo--;
    } else {
        clearInterval(intervalo); 
        contagem = false;
        iniciarPausar.innerText = 'Iniciar';
    }
}

function iniciarOuPausar () {
    if (contagem) {
        clearInterval(intervalo);
        contagem = false;
        iniciarPausar.innerText = 'Iniciar';
    } else {
        intervalo = setInterval(atualizarCronometro, 1000);
        contagem = true;
        iniciarPausar.innerText = 'Pausar';
    }
}

function zerarCronometro() {
    clearInterval(intervalo);
    tempo = 0;
    contagem = false;
    cronometroPrincipal = true;
    cronometro.innerText = '00:00';
    iniciarPausar.innerText = 'Iniciar';
    descanso05.disabled = false; 
    descanso15.disabled = false;
}

tempo25.addEventListener('click', () => {
    tempo = 25 * 60; // Configura 25 minutos
    atualizarCronometro(); // Atualiza a exibição
    if (contagem) {
        iniciarOuPausar(); // Pausa se já estiver contando
    }
    cronometroPrincipal = true;
})

tempo50.addEventListener('click', () => {
    tempo = 50 * 60;
    atualizarCronometro(); 
    if (contagem) {
        iniciarOuPausar();
    }
    cronometroPrincipal = true;
})

descanso05.addEventListener('click', () => {
    tempo = 5 * 60; 
    atualizarCronometro();
    cronometroPrincipal = false;
    descanso05.disabled = true;
    descanso15.disabled = true;
});

descanso15.addEventListener('click', () => {
    tempo = 15 * 60; 
    atualizarCronometro();
    cronometroPrincipal = false;
    descanso05.disabled = true;
    descanso15.disabled = true;
})

iniciarPausar.addEventListener('click', iniciarOuPausar);
zerar.addEventListener('click', zerarCronometro);
