const buildSelectQuery = (table, fields=null, whereFields=null) => {
    let query = `SELECT `;

    if(!fields || !fields.length){
        query += `* `;
    }else{
        fields.forEach((field, index) => {
            query += `${field}`;
            if(index < fields.length - 1){
                query += `, `;
            }
        });
    }

    query += ` FROM ${table}`;

    if(whereFields && whereFields.length){
        query += ` WHERE `;
        whereFields.forEach((field, index) => {
            query += `${field} = ?`;
            if(index < whereFields.length - 1){
                query += `AND `;
            }
        });
    }

    return query;
};

const buildInsertQuery = (table, body) => {
    const bodyObject = Object.entries(body);

    let query = `INSERT INTO ${table}(`;

    bodyObject.forEach(([key, value], index) => {
        query += `${key}`;
        if(index < bodyObject.length - 1){
            query += `, `;
        }
    });

    query += `) VALUES(`;

    bodyObject.forEach(([key, value], index) => {
        query += `?`;
        if(index < bodyObject.length - 1){
            query += `, `;
        }
    });

    query += `)`;

    return query;
};

const buildUpdateQuery = (table, body, whereFields=null) => {
    const bodyObject = Object.entries(body);

    let query = `UPDATE users SET `;

    bodyObject.forEach(([key, value], index) => {
        query += `${key} = ?`;
        if(index < bodyObject.length - 1){
            query += `, `;
        }
    });

    if(whereFields && whereFields.length){
        query += ` WHERE `;
        whereFields.forEach((field, index) => {
            query += `${field} = ?`;
            if(index < whereFields.length - 1){
                query += `AND `;
            }
        });
    }

    return query;
};

const buildDeleteQuery = (table, whereFields=null) => {
    let query = `DELETE `;

    query += `FROM ${table}`;

    if(whereFields && whereFields.length){
        query += ` WHERE `;
        whereFields.forEach((field, index) => {
            query += `${field} = ?`;
            if(index < whereFields.length - 1){
                query += `AND `;
            }
        });
    }

    return query;
};

const buildBatchDeleteQuery = (table, whereField, body) => {
    let query = `DELETE `;

    query += `FROM ${table}`;

    if(whereField){
        query += ` WHERE ${whereField} IN (`;
        body.forEach((field, index) => {
            query += `?`;
            if(index < body.length - 1){
                query += `, `;
            }
        });
        query += `)`;
    }

    return query;
};

const buildGenericQuery = () => {

};

const buildValues = (body, others) => {
    let values = [];
    const bodyObject = Object.entries(body);

    bodyObject.forEach(([key, value], index) => {
        values = [
            ...values,
            value,
        ];
    });

    return [
        ...values,
        ...others,
    ];
}

module.exports = {
    buildSelectQuery,
    buildInsertQuery,
    buildUpdateQuery,
    buildDeleteQuery,
    buildBatchDeleteQuery,
    buildGenericQuery,
    buildValues,
}