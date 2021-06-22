const express = require("express");
const app = express();
const path = require("path");
const expHbs = require("express-handlebars");
const dbproductos = require("./dbproductos");
const expSession = require("express-session");
const users = require("./users.json");
const colArriba = "parteArriba";
const colAbajo = "parteAbajo";
const colmono = "monoprendas";
const jsmulter = require("./client/pedidos");
const dbvarios = require("./dbvarios");
const { Recoverable } = require("repl");
const { equal } = require("assert");
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
//********************************************************/

//Para sesiones en express
app.use(
  expSession({
    secret: "isahdihvbrvyrbvrysgdygdefuiahf",
  })
);
//********************************************************/
app.get("/", (req, res) => {
  res.render("bienvenida", {
    titulo: "Ecopero",
    sesion: req.session,
  });
});

app.get("/publicar", (req, res) => {
  res.render("prestar", {});
});

app.post("/enviar", jsmulter.upload.single("cover"), (req, res) => {
  const ext = req.file.originalname.slice(
    req.file.originalname.lastIndexOf(".")
  );
  const users = {
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    size: req.body.size,
    price: req.body.size,
    cover: `img-${req.body.phone}${ext}`,
  };
  dbvarios.insertarPresta(
    users,
    (cberr) => console.log("Error"),
    (resultado) => console.log("ok")
  );
  console.log(req.headers["content-type"]);
  res.redirect("/");
});

app.get("/logeo", (req, res) => {
  res.render("login", {});
});

app.post("/login", (req, res) => {
  const usuario = "";
  dbvarios.usuarios(
    usuario,
    (err) => res.redirect("/login"),
    (datos) => {
      function getUser(usr, pwd) {
        return users.find((user) => user.username === usr && user.pass === pwd);
      }
      const usuario = getUser(req.body.usr, req.body.pwd);
      if (usuario) {
        req.session.username = usuario.username;
        req.session.name = usuario.name;
        req.session.userimg = usuario.userimg;

        console.log(req.session);

        res.redirect("/home");
      }
    }
  );
});

app.get("/home", (req, res) => {
  if (!req.session.username) {
    res.redirect("/login");
    return;
  }

  res.render("home", {
    name: req.session.name,
    userPic: req.session.userimg,
    sesion: req.session,
  });
  console.log(req.sesion);
});

app.get("/datos", (req, res) => {
  if (!req.session.username) {
    res.render("bienvenida", {
      sesion: req.session,
    });
    return;
  }

  res.render("datos", {
    name: req.session.name,
    username: req.session.username,
    userPic: req.session.userimg,
    sesion: req.session,
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
app.get("/registro", (req, res) => {
  res.render("registro", {});
});
app.post("/registro", (req, res) => {
  const users = {
    username: req.body.username,
    pass: req.body.pass,
    name: req.body.name,
    userimg: req.body.userimg,
  };
  dbvarios.insertar(
    users,
    (cberr) => console.log("Error"),
    (resultado) => console.log("ok")
  );
  res.redirect("/");
});

app.get("/productos", (req, res) => {
  let nombre = "";
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

app.get("/partearriba", (req, res) => {
  let nombre = "";
  const modo = req.query.modo;
  let compra = false;
  if (modo) {
    compra = true;
  }
  dbproductos.todosProductos(
    nombre,
    colArriba,
    (cbErr) => err,
    (datos) => {
      console.log(datos), res.render("partedearriba", { datos, compra });
    }
  );
});

app.get("/parteabajo", (req, res) => {
  let nombre = "";
  const modo = req.query.modo;
  let compra = false;
  if (modo) {
    compra = true;
  }
  dbproductos.todosProductos(
    nombre,
    colAbajo,
    (cbErr) => err,
    (datos) => {
      console.log(datos), res.render("partedeabajo", { datos, compra });
    }
  );
});

app.get("/monoprendas", (req, res) => {
  let nombre = "";
  const modo = req.query.modo;
  let compra = false;
  if (modo) {
    compra = true;
  }
  dbproductos.todosProductos(
    nombre,
    colmono,
    (cbErr) => err,
    (datos) => {
      console.log(datos), res.render("monoprendas", { datos, compra });
    }
  );
});

app.get("/buscar", (req, res) => {
  let nombre = req.query.nombre;
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
                  console.log(datos),
                    res.render("listadeprod", { datos, datos1, datos2 });
                }
              );
          }
        );
    }
  );
});

app.get("/detalleproducto", (req, res) => {
  const id = parseInt(req.query.id);
  const modo = req.query.modo;
  let compra = false;
  if (modo) {
    compra = true;
  }
  console.log(req.query.id);
  dbproductos.porId(
    id,
    colArriba,
    (cbErr) => err,
    (datos) => {
      datos,
        dbproductos.porId(
          id,
          colAbajo,
          (cbErr) => err,
          (datos1) => {
            datos1,
              dbproductos.porId(
                id,
                colmono,
                (cbErr) => err,
                (datos2) => {
                  console.log(datos, datos1, datos2),
                    res.render("detalleprods", {
                      datos,
                      datos1,
                      datos2,
                      compra,
                    });
                }
              );
          }
        );
    }
  );
});

app.get("/comprar", (req, res) => {
  res.redirect("/productos");
});

app.get("/prestar", (req, res) => {
  res.redirect("/publicar");
});

app.get("/combos", (req, res) => {
  dbproductos.todasCombinaciones(
    "",
    (Err) => console.log("error"),
    (datos) => res.render("comb", { datos, tipo: datos.tipo })
  );
});
app.listen(puerto, () => {
  console.log(`Iniciando servidor en el puerto ${puerto}`);
});
