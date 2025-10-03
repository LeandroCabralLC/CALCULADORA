document.addEventListener('DOMContentLoaded', () => {
    
    const tela = document.getElementById('tela');
    const teclado = document.querySelector('.calculadora__teclado');
    const seletorTema = document.querySelector('.seletor-tema__container');

    let entradaAtual = '0';
    let entradaAnterior = '';
    let operador = null;
    let deveLimparTela = false;

    
    const formatarNumero = (numStr) => {
        if (numStr.includes('.')) {
            const partes = numStr.split('.');
            partes[0] = parseFloat(partes[0]).toLocaleString('en-US');
            return partes.join('.');
        }
        return parseFloat(numStr).toLocaleString('en-US');
    };

    // Atualiza o que é exibido na tela
    const atualizarTela = () => {
        tela.textContent = formatarNumero(entradaAtual);
    };

    // cálculo matemático
    const calcular = () => {
        let resultado;
        const anterior = parseFloat(entradaAnterior);
        const atual = parseFloat(entradaAtual);

        if (isNaN(anterior) || isNaN(atual)) return;

        switch (operador) {
            case 'somar':
                resultado = anterior + atual;
                break;
            case 'subtrair':
                resultado = anterior - atual;
                break;
            case 'multiplicar':
                resultado = anterior * atual;
                break;
            case 'dividir':
                if (atual === 0) {
                    alert("Não é possível dividir por zero.");
                    return 'erro';
                }
                resultado = anterior / atual;
                break;
            default:
                return;
        }
        return resultado.toString();
    };

    
    teclado.addEventListener('click', (e) => {
        // Se o clique não for em um botão, não faz nada
        if (!e.target.matches('button')) return;

        const tecla = e.target;
        const acao = tecla.dataset.acao;
        const valor = tecla.dataset.valor;

        // entrada de números e ponto decimal
        if (valor) {
            if (deveLimparTela) {
                entradaAtual = valor;
                deveLimparTela = false;
            } else if (entradaAtual === '0' && valor !== '.') {
                entradaAtual = valor;
            } else if (valor === '.' && entradaAtual.includes('.')) {
                return;
            } else {
                entradaAtual += valor;
            }
        }

    
        if (acao) {
            switch (acao) {
                case 'deletar':
                    entradaAtual = entradaAtual.slice(0, -1) || '0';
                    break;
                case 'limpar':
                    entradaAtual = '0';
                    entradaAnterior = '';
                    operador = null;
                    break;
                case 'somar':
                case 'subtrair':
                case 'multiplicar':
                case 'dividir':
                    if (operador && entradaAnterior) {
                       const resultado = calcular();
                       if (resultado !== 'erro') {
                           entradaAtual = resultado;
                       } else {
                           entradaAtual = '0'; 
                       }
                    }
                    entradaAnterior = entradaAtual;
                    operador = acao;
                    deveLimparTela = true;
                    break;
                case 'igual':
                    if (operador && entradaAnterior) {
                        const resultado = calcular();
                         if (resultado !== 'erro') {
                            entradaAtual = resultado;
                            operador = null;
                            entradaAnterior = '';
                        } else {
                             entradaAtual = '0';
                             entradaAnterior = '';
                             operador = null;
                         }
                    }
                    break;
            }
        }
        
        atualizarTela();
    });

    //  troca de tema
    let temaAtual = 1;
    seletorTema.addEventListener('click', () => {
        const body = document.body;
        body.classList.remove(`tema-${temaAtual}`);
        
        temaAtual = temaAtual % 3 + 1; 
        
        body.classList.add(`tema-${temaAtual}`);
    });

    
    atualizarTela();
});