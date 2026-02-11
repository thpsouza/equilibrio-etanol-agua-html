function plotar(X, Y) {
    const ctx = document.getElementById('grafico').getContext('2d');
    
    if (window.diagramaEquilibrio) {
        window.diagramaEquilibrio.destroy();
    }

    const dadosEquilibrio = X.map((x, i) => ({ x: x, y: Y[i] }));
    const linhaAuxiliar = X.map((x) => ({ x: x, y: x }));

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
            plugins: {
                legend: {display: false}
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "linear",
                    title: { display: true, text: 'x' },
                    min: 0,
                    max: 1,
                    grid: {
                        color: 'rgba(0,0,0,0.08)',
                        lineWidth: 1
                    },
                    ticks: {
                        stepSize: 0.1
                    }
                },
                y: {
                    title: { display: true, text: 'y' },
                    min: 0,
                    max: 1,
                    grid: {
                        color: 'rgba(0,0,0,0.08)',
                        lineWidth: 1
                    },
                    ticks: {
                        stepSize: 0.1
                    }
                }
            }
        }
    });
}

function updatePlot() {
    // const SliderR = document.getElementById("R");
    // SliderR.addEventListener("input", updatePlot);
    // const R = parseFloat(SliderR.value);

    // const SliderXD = document.getElementById("xD");
    // SliderXD.addEventListener("input", updatePlot);
    // const xD = parseFloat(SliderXD.value);

    const SliderT = document.getElementById("T");
    const T = parseFloat(SliderT.value);
    const [X,Y] = gerarDados(T);
    plotar(X,Y);
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