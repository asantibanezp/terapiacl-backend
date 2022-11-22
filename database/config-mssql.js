// Avoiding concurrent SQL SERVER calls
var poolConfig = {
  min: 1,
  max: 1,
  log: true
};

// Edit this config
var connectionConfig = {
  userName: process.env.BDSIAT_USER,
  password: process.env.BDSIAT_PASS,
  server: process.env.BDSIAT_SERVER,
  options: {
    rowCollectionOnDone: true, // Only get row set instead of row by row
    useColumnNames: true, // For easier JSON formatting
    database: process.env.BDSIAT_NAME,
  }
};
var connectionConfigVina = {
  userName: process.env.BDVINA_USER,
  password: process.env.BDVINA_PASS,
  server: process.env.BDVINA_SERVER,
  options: {
    rowCollectionOnDone: true,
    useColumnNames: true,
    database: process.env.BDVINA_NAME,
  }
};
var connectionConfigStgo = {
  userName: process.env.BDSTGO_USER,
  password: process.env.BDSTGO_PASS,
  server: process.env.BDSTGO_SERVER,
  options: {
    rowCollectionOnDone: true,
    useColumnNames: true,
    database: process.env.BDSTGO_NAME,
  }
};
var connectionConfigTOL = {
  userName: process.env.BDTOL_USER,
  password: process.env.BDTOL_PASS,
  server: process.env.BDTOL_SERVER,
  options: {
    rowCollectionOnDone: true,
    useColumnNames: true,
    database: process.env.BDTOL_NAME,
  }
};
var connectionConfigTerapiaCL = {
  userName: process.env.BDTERAPIACL_USER,
  password: process.env.BDTERAPIACL_PASS,
  server: process.env.BDTERAPIACL_SERVER,
  options: {
    rowCollectionOnDone: true,
    useColumnNames: true,
    database: process.env.BDTERAPIACL_NAME,
  }
};

module.exports = {
    poolConfig, 
    connectionConfig,
    connectionConfigVina,
    connectionConfigStgo,
    connectionConfigTOL,
    connectionConfigTerapiaCL
}