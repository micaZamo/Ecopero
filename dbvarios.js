const mongoClient = require("mongodb").MongoClient;

function usuarios(user, cbErr, cbUsuario) {
  mongoClient.connect("mongodb://localhost:27017", function (err, client) {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbErr(err);
      return;
    }
    // Conecto base de datos y colección
    const dbEcopero = client.db("Ecopero");
    const colecciones = dbEcopero.collection("users");

    // Consulto todos los documentos y los paso a Array (función asincrónica)
    colecciones.find({ username: user }).toArray(function (err, datos) {
      client.close();

      if (err) {
        console.log("Hubo un error convirtiendo datos:", err);
        cbErr(err);
        return;
      }

      console.log(datos);

      // Si llegué acá no hubo errores, los retorno al callback de datos
      cbUsuario(datos);
    });
  });
}

function insertar(user, cbErr, cbUsuario) {
  mongoClient.connect("mongodb://localhost:27017", function (err, client) {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbErr(err);
      return;
    }
    // Conecto base de datos y colección
    const dbEcopero = client.db("Ecopero");
    const colecciones = dbEcopero.collection("users");

    // Consulto todos los documentos y los paso a Array (función asincrónica)
    colecciones.insertOne(user, function (err, datos) {
      client.close();

      if (err) {
        console.log("Hubo un error convirtiendo datos:", err);
        cbErr(err);
        return;
      }

      // Si llegué acá no hubo errores, los retorno al callback de datos
      cbUsuario(datos);
    });
  });
}

function insertarPresta(cliente, cbErr, cbUsuario) {
  mongoClient.connect("mongodb://localhost:27017", function (err, client) {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbErr(err);
      return;
    }
    // Conecto base de datos y colección
    const dbEcopero = client.db("Ecopero");
    const colecciones = dbEcopero.collection("recibidos");

    // Consulto todos los documentos y los paso a Array (función asincrónica)
    colecciones.insertOne(cliente, function (err, datos) {
      client.close();

      if (err) {
        console.log("Hubo un error convirtiendo datos:", err);
        cbErr(err);
        return;
      }

      // Si llegué acá no hubo errores, los retorno al callback de datos
      cbUsuario(datos);
    });
  });
}
module.exports = {
  usuarios,
  insertar,
  insertarPresta,
};
