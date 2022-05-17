module.exports = {
  HOST: "localhost",
  PORT: "1434",
  USER: "arb712",
  PASSWORD: "akuslaluada",
  DB: "sequelizePrc",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
