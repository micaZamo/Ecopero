const express = require("express");
const app = express();
const path = require("path");
const expHbs = require("express-handlebars");
const productos = require("./productos.json");
const puerto = 4554;

//***Configuracion de handlebars
app.engine(
  "handlebars",
  expHbs({
    defaultLayout: "main-layout",
    layoutsDir: "views/layouts",
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(`${__dirname}/views`));

//Mildware de recursos estaticos
app.use(express.static(path.join(`${__dirname}/client`)));

app.get("/", (req, res) => {
  res.render("bienvenida", {
    titulo: "Sitio de Productos",
  });
});
app.get("/productos", (req, res) => {
  // Busco los productos
  const todosProductos = productos.parteArriba;

  // Renderizo la vista "grilla" con esos datos
  res.render("grilla", {
    productos: todosProductos,
    titulo: "Búsqueda de productos",
  });
});

app.listen(puerto, () => {
  console.log(`Iniciando servidor en el puerto ${puerto}`);
});
