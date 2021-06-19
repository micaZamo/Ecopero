const btnBuscar = document.getElementById("btn-buscar");
const inputNombre = document.getElementById("input-nombre");

btnBuscar.addEventListener("click", function () {
  console.log(inputNombre.value);
  window.location.href = "/buscar?nombre=" + inputNombre.value;
});
