function plotar(X, Y) {
    const ctx = document.getElementById('grafico').getContext('2d');
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
                    borderColor: '#ff4d4d',
                    fill: false,
                    tension: 0.2,
                    pointRadius: 0
                },
                {
                    label: 'Linha auxiliar',
                    data: linhaAuxiliar,
                    borderColor: '#8b949eda',
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
                legend: { display: false }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "linear",
                    title: {
                        display: true,
                        text: 'x',
                        color: '#8b949e',
                        font: {
                            size: 17,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                        size: 1,
                        color: '#8b949e'
                    },
                    grid: {
                        color: '#3e4650d7'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'y',
                        color: '#8b949e',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                        color: '#8b949e',
                    },
                    grid: {
                        color: '#3e4650d7'
                    }
                }
            }
        }
    });
}

function updatePlot() {
    const SliderT = document.getElementById("T");
    const T = parseFloat(SliderT.value);
    const [X,Y] = gerarDados(T);
    plotar(X,Y);
}

function animarTemperatura() {
    const sliderT = document.getElementById("T");
    let t = 0;
    function animar() {
        t += 0.02;
        const Tmin = 273;
        const Tmax = 373;
        const T = Tmin + (Tmax - Tmin) * (0.5 + 0.5 * Math.sin(t));
        sliderT.value = T;
        updatePlot();
        const Tc = T - 273.15;
        document.getElementById("valorT").textContent =
            `${T.toFixed(1)} K (${Tc.toFixed(1)} °C)`;

        requestAnimationFrame(animar);
    }

    animar();
}

function main() {
    animarTemperatura();
}

window.addEventListener('DOMContentLoaded', main);