/*
https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo
JSON.parse(localStorage.getItem('dados')).filter(e => e.gender === "female").reduce((acc, obj) => acc + obj.dob.age, 0) -> Idade
JSON.parse(localStorage.getItem('dados')).filter(e => e.name.first.includes('Santos') || e.name.last.includes('Santos'))-> Verifica se há algum nome com aquela letra


*/

window.addEventListener('load', () => {
    start();
});

async function start() {

    if (localStorage.getItem("dados") == null) {
        let dados = await new Promise((res, rej) => {
            fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo').then(data => data.json().then(json => res(json)));
        });

        localStorage.setItem("dados", JSON.stringify(dados.results));
    }

    let input = document.querySelector("#pesquisa");
    let btn = document.querySelector("#btn");

    if (localStorage.getItem("dados") != null) {
        input.removeAttribute("disabled");
        btn.removeAttribute("disabled");
    }

    input.addEventListener("keyup", e => {
        if (e.keyCode != 13)
            return;
        buscar();
    });
}

function buscar() {
    let string = document.querySelector('#pesquisa').value.toLowerCase();

    //Pesquisa de elementos
    let resultado = JSON.parse(localStorage.getItem('dados')).filter(e => e.name.first.toLowerCase().includes(string) || e.name.last.toLowerCase().includes(string));

    let sexoFeminino = resultado.filter(e => e.gender === "female").length;
    let sexoMasculino = resultado.filter(e => e.gender === "male").length;
    let somaIdades = resultado.reduce((acc, atual) => acc + atual.dob.age, 0);
    let mediaIdades = (somaIdades / (sexoFeminino + sexoMasculino)).toFixed(2);
    let usuariosEncontrados = resultado.length;

    document.querySelector("#sexoFeminino").innerHTML = sexoFeminino;
    document.querySelector("#sexoMasculino").innerHTML = sexoMasculino;
    document.querySelector("#somaIdades").innerHTML = somaIdades;
    document.querySelector("#mediaIdades").innerHTML = mediaIdades;
    document.querySelector("#usuariosEncontrados").innerHTML = usuariosEncontrados;

    mostrarLinhasResultado(resultado);
}

function mostrarLinhasResultado(resultado) {
    document.querySelector('#linhasResultado').innerHTML = '';
    resultado.map(e => {
        document.querySelector('#linhasResultado').innerHTML += `
            <div class="linhaResultado">
                <img src=${e.picture.thumbnail} alt="thumbnail">
                <span>${e.name.first} ${e.name.last}, ${e.dob.age}.</span>
            </div>`;
    });
}