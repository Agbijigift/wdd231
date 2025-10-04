document.addEventListener("DOMContentLoaded", () => {
  const tsField = document.getElementById("timestampField");
  if (tsField) {
    tsField.value = new Date().toLocaleString();
  }
});

function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}


