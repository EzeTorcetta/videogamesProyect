//! Encargado de levantar el server


const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001 (force: false)'); // eslint-disable-line no-console
  });
});
