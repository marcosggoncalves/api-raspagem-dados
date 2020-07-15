const server = require('./config/server.js');

const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log("Servidor inicializado na porta: " + 3000);
});