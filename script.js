const form = document.getElementById("study-form");
const studiesList = document.getElementById("studies");

let estudos = [];

document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("estudos")) || [];
  estudos = saved;
  exibirEstudosOrdenados();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value.trim();
  const topic = document.getElementById("topic").value.trim();
  const date = document.getElementById("date").value;

  if (!subject || !topic || !date) return;

  const study = { subject, topic, date };
  estudos.push(study);
  salvarEstudos();
  exibirEstudosOrdenados();
  form.reset();
});

function salvarEstudos() {
  localStorage.setItem("estudos", JSON.stringify(estudos));
}

function exibirEstudosOrdenados() {
  studiesList.innerHTML = "";

  const ordenado = [...estudos].sort((a, b) => {
    const numA = parseInt(a.topic.match(/\d+/)); // Extrai número do tópico
    const numB = parseInt(b.topic.match(/\d+/));
    return numA - numB;
  });

  ordenado.forEach(study => {
    const li = document.createElement("li");
    li.className = "study-item";

    const text = document.createElement("span");
    text.textContent = `${study.subject} - ${study.topic} (Prova em: ${study.date})`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover";
    removeBtn.onclick = () => {
      estudos = estudos.filter(s =>
        !(s.subject === study.subject && s.topic === study.topic && s.date === study.date)
      );
      salvarEstudos();
      exibirEstudosOrdenados();
    };

    li.appendChild(text);
    li.appendChild(removeBtn);
    studiesList.appendChild(li);
  });
}
