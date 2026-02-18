function coeficientesAtividadeEtanolAguaNRTL(x1, T) {
    const x2 = 1 - x1;
    // Parâmetros (Etanol=1, Agua=2)
    const a12 = -0.8009, b12 = 246.18;
    const a21 = 3.4578, b21 = -586.08;
    const alpha12 = 0.3, alpha21 = 0.3;
    // Tau
    const tau12 = a12 + (b12 / T);
    const tau21 = a21 + (b21 / T);
    // G
    const G12 = Math.exp(-alpha12 * tau12);
    const G21 = Math.exp(-alpha21 * tau21);
    // ln(gamma)
    const aux1_lnG1 = tau21 * Math.pow(G21 / (x1 + x2 * G21), 2);
    const aux1_lnG2 = tau12 * Math.pow(G12 / (x2 + x1 * G12), 2);
    const aux2_lnG1 = (tau12 * G12) / Math.pow(x2 + x1 * G12, 2);
    const aux2_lnG2 = (tau21 * G21) / Math.pow(x1 + x2 * G21, 2);
    const lnGamma1 = Math.pow(x2, 2) * (aux1_lnG1 + aux2_lnG1);
    const lnGamma2 = Math.pow(x1, 2) * (aux1_lnG2 + aux2_lnG2);

    return {
        1: Math.exp(lnGamma1),
        2: Math.exp(lnGamma2)
    };
}

function equacaoAntoine(T, A, B, C) { 
    return Math.pow(10, A - (B / (T + C))) * 100000;
}

function pressaoSaturacaoAgua(T) {
    let A, B, C;
    if (T >= 273 && T <= 303) {
        A = 5.40221; B = 1838.675; C = -31.737;
    } else if (T <= 333) {
        A = 5.20389; B = 1733.926; C = -39.485;
    } else if (T <= 363) {
        A = 5.0768; B = 1659.793; C = -45.854;
    } else if (T <= 373) {
        A = 5.08354; B = 1663.125; C = -45.622;
    } else {
        throw new Error("Temperatura fora da faixa válida.");
    }
    return equacaoAntoine(T, A, B, C);
}

function pressaoSaturacaoEtanol(T) {
    return equacaoAntoine(T, 5.24677, 1598.673, -46.424);
}

function calcularEquilibrioEtanolAgua(x, T) {
    const gammas = coeficientesAtividadeEtanolAguaNRTL(x, T);
    const pSatEtanol = pressaoSaturacaoEtanol(T);
    const pSatAgua = pressaoSaturacaoAgua(T);
    const P = (1-x) * pSatAgua * gammas[2] + x * pSatEtanol * gammas[1];
    const y1 = x * gammas[1] * pSatEtanol / P
    const y2 = (1-x) * gammas[2] * pSatAgua / P
    return [y1, y2, P];
}

function gerarDados(T) {
    const X = [];
    const Y = [];
    const P = [];
    for (let x = 0; x <= 100; x++) {
        const [y1, y2, p] = calcularEquilibrioEtanolAgua(x/100, T);
        X.push(x/100);
        Y.push(y1);
        P.push(p);
    }
    return [X, Y, P];
}
