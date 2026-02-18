function plotarDiagramaXY(X,Y) {
    const ctx = document.getElementById('diagrama-xy').getContext('2d');
    const dadosEquilibrio = X.map((x, i) => ({ x: x, y: Y[i] }));
    const linhaAuxiliar = X.map((x) => ({ x: x, y: x }));

    if (window.diagramaEquilibrio) {
        window.diagramaEquilibrio.data.datasets[0].data = dadosEquilibrio;
        window.diagramaEquilibrio.data.datasets[1].data = linhaAuxiliar;
        window.diagramaEquilibrio.update();
        return;
    }

    window.diagramaEquilibrio = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curva de equilíbrio',
                    data: dadosEquilibrio,
                    borderColor: '#c62828',
                    fill: false,
                    tension: 0.2,
                    pointRadius: 0
                },
                {
                    label: 'Linha auxiliar',
                    data: linhaAuxiliar,
                    borderColor: 'black',
                    borderWidth: 2,
                    borderDash: [5,2],
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            animation: false,
            plugins: {
                legend: {display: false}
            },
            responsive: true,
            maintainAspectRatio: false,
            // maintainAspectRatio: true,
            // aspectRatio:1,
            scales: {
                x: {
                    type: "linear",
                    title: { display: true, text: 'x' },
                    min: 0,
                    max: 1,
                },
                y: {
                    title: { display: true, text: 'y' },
                    min: 0,
                    max: 1,
                }
            }
        }
    });
}

function plotarDiagramaPXY(P,X,Y) {
    const ctx = document.getElementById('diagrama-pxy').getContext('2d');
    const dadosEquilibrioPX = X.map((x, i) => ({ x: x, y: P[i]/100000 }));
    const dadosEquilibrioPY = Y.map((y, i) => ({ x: y, y: P[i]/100000 }));

    if (window.diagramaEquilibrioPXY) {
        window.diagramaEquilibrioPXY.data.datasets[0].data = dadosEquilibrioPX;
        window.diagramaEquilibrioPXY.data.datasets[1].data = dadosEquilibrioPY;
        window.diagramaEquilibrioPXY.update();
        return;
    }

    window.diagramaEquilibrioPXY = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curva de bolha',
                    data: dadosEquilibrioPX,
                    borderColor: '#d38614',
                    fill: false,
                    tension: 0.2,
                    pointRadius: 0
                },
                {
                    label: 'Curva de orvalho',
                    data: dadosEquilibrioPY,
                    borderColor: '#2845c6',
                    fill: false,
                    tension: 0.2,
                    pointRadius: 0
                },
            ]
        },
        options: {
            animation: true,
            plugins: {
                legend: {display: false, position:'top'}
            },
            responsive: true,
            maintainAspectRatio: false,
            // maintainAspectRatio: true,
            // aspectRatio:1,
            scales: {
                x: {
                    type: "linear",
                    title: { display: true, text: 'x/y' },
                    min: 0,
                    max: 1,
                },
                y: {
                    title: { display: true, text: 'P (bar)' }
                }
            }
        }
    });
}


function updatePlot() {
    const SliderT = document.getElementById("T");
    const T = parseFloat(SliderT.value);
    const [X,Y,P] = gerarDados(T);
    plotarDiagramaXY(X,Y);
    plotarDiagramaPXY(P,X,Y);
}


function main() {
    const sliderT = document.getElementById("T");
    const valorT = document.getElementById("valorT");
    sliderT.addEventListener("input", () => {
        updatePlot();
        const T = parseFloat(sliderT.value);
        const Tc = T - 273;
        valorT.textContent = `${T} K (${Tc} °C)`;
    });
    updatePlot();
}

window.addEventListener('DOMContentLoaded', main);
// console.log(window.outerWidth);
// console.log(window.outerHeight);