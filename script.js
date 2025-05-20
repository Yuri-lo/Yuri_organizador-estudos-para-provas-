const form = document.getElementById("study-form");
const studiesList = document.getElementById("studies");

// Recupera os dados salvos no localStorage ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("estudos")) || [];
  saved.forEach(item => addStudyToList(item));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value.trim();
  const topic = document.getElementById("topic").value.trim();
  const date = document.getElementById("date").value;

  if (!subject || !topic || !date) return;

  const study = { subject, topic, date };
  addStudyToList(study);
  saveToLocalStorage(study);
  form.reset();
});

function addStudyToList(study) {
  const li = document.createElement("li");
  li.className = "study-item";

  const text = document.createElement("span");
  text.textContent = `${study.subject} - ${study.topic} (Prova em: ${study.date})`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remover";
  removeBtn.onclick = () => {
    li.remove();
    removeFromLocalStorage(study);
  };

  li.appendChild(text);
  li.appendChild(removeBtn);
  studiesList.appendChild(li);
}

function saveToLocalStorage(study) {
  const saved = JSON.parse(localStorage.getItem("estudos")) || [];
  saved.push(study);
  localStorage.setItem("estudos", JSON.stringify(saved));
}

function removeFromLocalStorage(studyToRemove) {
  const saved = JSON.parse(localStorage.getItem("estudos")) || [];
  const updated = saved.filter(
    s => s.subject !== studyToRemove.subject || s.topic !== studyToRemove.topic || s.date !== studyToRemove.date
  );
  localStorage.setItem("estudos", JSON.stringify(updated));
}
