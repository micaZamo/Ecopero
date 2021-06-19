const prods = require("./todosprods.json");
//parte de combinaciones que sigo pensando como hacer
for (let i = 0; i <= prods.length; i++) {
  if (
    prods[i].nombre === "Camisa CHICAGO" &&
    prods[i].nombre === "Pantalon DETROIT"
  ) {
    const nuevaCaja = document.createElement("div");
    const imagenCargada = document.createElement("img");
    const titnombre = document.createElement("p");

    imagenCargada.src = prods[i].foto;
    titnombre.textContent = prods[i].nombre;
    contenedor.appendChild(nuevaCaja);
    nuevaCaja.appendChild(imagenCargada);
    nuevaCaja.appendChild(titnombre);
    nuevaCaja.classList.add("tarjetas");
  }
}
