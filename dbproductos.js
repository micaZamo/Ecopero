const mongoClient = require("mongodb").MongoClient;

function todosProductos(nombre, coleccion, cbErr, cbProducto) {
  mongoClient.connect("mongodb://localhost:27017", function (err, client) {
    if (err) {
      console.log("Hubo un error conectando con el servidor:", err);
      cbErr(err);
      return;
    }
    // Conecto base de datos y colección
    const dbEcopero = client.db("Ecopero");
    const colecciones = dbEcopero.collection(coleccion);

    // Consulto todos los documentos y los paso a Array (función asincrónica)
    colecciones.find({ nombre: RegExp(nombre) }).toArray(function (err, datos) {
      client.close();

      if (err) {
        console.log("Hubo un error convirtiendo datos:", err);
        cbErr(err);
        return;
      }

      console.log(datos);

      // Si llegué acá no hubo errores, los retorno al callback de datos
      cbProducto(datos);
    });
  });
}

module.exports = {
  todosProductos,
};
