var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var ConnectionPool = require("tedious-connection-pool");
var { poolConfig, connectionConfig, connectionConfigVina, connectionConfigStgo, connectionConfigTOL, connectionConfigTerapiaCL } = require("../database/config-mssql");


var _rows = [];

// var poolProv = new ConnectionPool(poolConfig, connectionConfig);
// var poolVina = new ConnectionPool(poolConfig, connectionConfigVina);
// var poolStgo = new ConnectionPool(poolConfig, connectionConfigStgo);
// var poolTOL = new ConnectionPool(poolConfig, connectionConfigTOL);
var poolTerapiaCL = new ConnectionPool(poolConfig, connectionConfigTerapiaCL);



// poolProv.on("error", function(err) {
//   console.error(err);
// });
// poolVina.on("error", function(err) {
//   console.error(err);
// });
// poolStgo.on("error", function(err) {
//   console.error(err);
// });
// poolTOL.on("error", function(err) {
//   console.error(err);
// });
poolTerapiaCL.on("error", function(err) {
  console.error(err);
});

console.log('tedious conectado');

var _rows = [];

const query = async(params, sql, suc = 0, callback) => {

  switch(suc){
    case 0:
      pool = poolTerapiaCL;
    break;
    case 1:
      pool = poolProv;
    break;
    case 2:
      pool = poolVina;
    break;
    case 3:
      pool = poolStgo;
    break;
    // case 4:
    //   pool = poolTOL;
    // break;
  }


  pool.acquire((err, connection) => {
    request = new Request(sql, (err, rowCount) => {
      if (err) {
        console.log(err);
        return;
      }
      connection.release();
    });

    if (params.length > 0) {
      params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
      });
    }

    _rows = [];

    request.on("row", columns => {
      var _item = {};
      // Converting the response row to a JSON formatted object: [property]: value
      for (var name in columns) {
        _item[name] = columns[name].value;
      }
      _rows.push(_item);
    });

    // We return the set of rows after the query is complete, instead of returing row by row
    request.on("doneInProc", (rowCount, more, rows) => {
      callback(_rows);
    });

    connection.execSql(request);
  });
};

const proc = (params, sql, callback) => {
  pool.acquire((err, connection) => {
    request = new Request(sql, (err, rowCount) => {
      if (err) {
        console.log(err);
        return;
      }
      connection.release();
    });

    if (params.length > 0) {
      params.forEach(param => {
        request.addParameter(param.name, param.type, param.value);
      });
    }

    _rows = [];

    request.on("row", columns => {
      var _item = {};
      // Converting the response row to a JSON formatted object: [property]: value
      for (var name in columns) {
        _item[name] = columns[name].value;
      }
      _rows.push(_item);
    });

    // We return the set of rows after the procedure is complete, instead of returing row by row
    request.on("doneProc", (rowCount, more, rows) => {
      callback(_rows);
    });

    connection.callProcedure(request);
  });
};

const buildParams = (params, name, type, value) => {
  params.push({
    name: name,
    type: type,
    value: value
  });
};

module.exports = {
  buildParams: buildParams,
  query: query,
  proc: proc
};