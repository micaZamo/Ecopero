const express = require("express");
const app = express();
const path = require("path");
const expHbs = require("express-handlebars");
const dbproductos = require("./dbproductos");
const expSession = require("express-session");
const users = require("./users.json");
const puerto = 4554;

app.use(express.urlencoded({ extended: true }));

//Mildware de recursos estaticos
app.use(express.static(path.join(`${__dirname}/client`)));

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

//Para sesiones en express
app.use(
  expSession({
    secret: "isahdihvbrvyrbvrysgdygdefuiahf",
  })
);

app.get("/", (req, res) => {
  res.render("bienvenida", {
    titulo: "Ecopero",
  });
});

app.post("/login", (req, res) => {
  const user = getUser(req.body.usr, req.body.pwd);

  if (user) {
    req.session.username = user.username;
    req.session.name = user.name;
    req.session.userimg = user.userimg;

    console.log(req.session);

    res.redirect("/home");
  } else {
    res.redirect("/");
  }
});

app.get("/home", (req, res) => {
  if (!req.session.username) {
    res.redirect("/");
    return;
  }

  res.render("home", {
    name: req.session.name,
    userPic: req.session.userimg,
  });
});

app.get("/datos", (req, res) => {
  if (!req.session.username) {
    res.redirect("/");
    return;
  }

  res.render("datos", {
    name: req.session.name,
    username: req.session.username,
    userPic: req.session.userimg,
  });
});

app.get("/compras", (req, res) => {
  if (!req.session.username) {
    res.redirect("/");
    return;
  }

  // consulto a la base de datos las compras del usuarix req.session.username
  const comprasUsr = getCompras(req.session.username);

  res.render("compras", {
    name: req.session.name,
    userPic: req.session.userimg,
    compras: comprasUsr,
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
//app.get("/partearriba", (req, res)=>{
//const nombre="";//

app.get("/productos", (req, res) => {
  const nombre = "";
  const colArriba = "parteArriba";
  const colAbajo = "parteAbajo";
  const colmono = "monoprendas";
  dbproductos.todosProductos(
    nombre,
    colArriba,
    (cbErr) => err,
    (datos) => {
      datos,
        dbproductos.todosProductos(
          nombre,
          colAbajo,
          (cbErr) => err,
          (datos1) => {
            datos1,
              dbproductos.todosProductos(
                nombre,
                colmono,
                (cbErr) => err,
                (datos2) => {
                  res.render("listadeprod", { datos, datos1, datos2 });
                }
              );
          }
        );
    }
  );
});

app.listen(puerto, () => {
  console.log(`Iniciando servidor en el puerto ${puerto}`);
});

function getUser(usr, pwd) {
  return users.find((user) => user.username === usr && user.pass === pwd);
}
