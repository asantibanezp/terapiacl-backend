const { query, buildParams } = require("../database/sql-connection");


const simpleQuery = (sql, params = []) => {

    return new Promise((resolve, reject) => {

        query(params, sql, undefined, result => {
            resolve(result);
        });

    })

}


module.exports = {
    simpleQuery
}