const formulario = document.getElementById("cep-form");
const campocep = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

async function processar(evento) {
  evento.preventDefault();
  resultado.hidden = false; // visível

  let cep = campocep.value.trim();

  if (/^\d{5}-?\d{3}/.test(cep) == false) {
    mensagem.textContent = "CEP inválido. Digite 12328070 ou 12328-070";
    return;
  }

  mensagem.textContent = "Consultando...";

  cep = cep.replace("-", ""); // o ViaCEP não aceita o hífen na URL

  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json`);
  if (resposta.ok == false) {
    mensagem.textContent = "Erro ao consultar o serviço. Tente novamente.";
    return;
  }

  const r = await resposta.json();
  if (r.erro) {
    mensagem.textContent = "CEP não encontrado.";
  } else {
    document.getElementById("valor-cep").textContent = r.cep;
    resultado.hidden = false;
    document.getElementById("valor-logradouro").textContent =
      r.logradouro || "Não informado";
    document.getElementById("valor-bairro").textContent =
      r.bairro || "Não informado";
    document.getElementById("valor-cidade").textContent = r.localidade;
    document.getElementById("valor-uf").textContent = r.uf;
    document.getElementById("valor-ibge").textContent = r.ibge;
    mensagem.textContent = "Resposta do ViaCEP:";
  }

  //resultado.hidden = true; // invisível
  console.log(r);
}

formulario.addEventListener("submit", processar);