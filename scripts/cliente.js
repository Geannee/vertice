// Funções da área do cliente
let saldo = 1500.00;
let limite = 1000.00;
let extrato = [
  { tipo: 'Depósito', valor: 500, data: '2025-05-20' },
  { tipo: 'Saque', valor: 200, data: '2025-05-22' },
  { tipo: 'Transferência', valor: 100, data: '2025-05-24' }
];

function consultarSaldo() {
  document.getElementById('resultadoSaldo').innerHTML = `<div class='alert alert-info'>Saldo atual: <strong>R$ ${saldo.toFixed(2)}</strong></div>`;
}
function consultarLimite() {
  document.getElementById('resultadoLimite').innerHTML = `<div class='alert alert-info'>Limite disponível: <strong>R$ ${limite.toFixed(2)}</strong></div>`;
}
function mostrarExtrato() {
  let html = '<ul class="list-group">';
  extrato.slice().reverse().forEach(item => {
    html += `<li class='list-group-item d-flex justify-content-between align-items-center'>
      <span>${item.tipo} (${item.data})</span>
      <span class='fw-bold'>R$ ${item.valor.toFixed(2)}</span>
    </li>`;
  });
  html += '</ul>';
  document.getElementById('resultadoExtrato').innerHTML = html;
}
function abrirModal(id) {
  // Não faz nada, pois não usamos mais modais
}
document.addEventListener('DOMContentLoaded', function() {
  // Atualiza saldo e extrato ao carregar
  consultarSaldo();
  mostrarExtrato();
  // Depósito
  document.getElementById('formDeposito').onsubmit = function(e) {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valorDeposito').value);
    if(valor > 0) {
      saldo += valor;
      extrato.push({ tipo: 'Depósito', valor, data: new Date().toISOString().slice(0,10) });
      alert('Depósito realizado com sucesso!');
      mostrarExtrato();
      consultarSaldo();
    } else {
      alert('Valor inválido.');
    }
  };
  // Saque
  document.getElementById('formSaque').onsubmit = function(e) {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valorSaque').value);
    if(valor > 0 && valor <= saldo) {
      saldo -= valor;
      extrato.push({ tipo: 'Saque', valor, data: new Date().toISOString().slice(0,10) });
      alert('Saque realizado com sucesso!');
      mostrarExtrato();
      consultarSaldo();
    } else {
      alert('Valor inválido ou saldo insuficiente.');
    }
  };
  // Transferência
  document.getElementById('formTransferencia').onsubmit = function(e) {
    e.preventDefault();
    const valor = parseFloat(document.getElementById('valorTransferencia').value);
    if(valor > 0 && valor <= saldo + limite) {
      saldo -= valor;
      extrato.push({ tipo: 'Transferência', valor, data: new Date().toISOString().slice(0,10) });
      alert('Transferência realizada com sucesso!');
      mostrarExtrato();
      consultarSaldo();
    } else {
      alert('Valor inválido ou saldo/limite insuficiente.');
    }
  };
});
function sairCliente() {
  window.location.href = '../index.html';
}
