function consultar_libros(connection, libros) {
    try {
        connection.query('select * from Libro', (err, rows, fields) => {
            if (err) throw err
            rows.map(libro => libros.push(libro))
        })   
    } catch (error) {
        
    }
}

function insertar_cliente(connection,values) {
    try {
        connection.query(
            `INSERT INTO Usuario (ip,nombre) VALUES ?`,
            [values],
            (err, rows, flieds) => {
                if (err) throw err
            });         
    } catch (error) {
  
    }
}

function consultar_clientes(connection,ip){
    try {
        connection.query('select ip from Usuario', (err, rows, fields) => {
            if (err) throw err
            let c = 0
            rows.map((cliente)=>{
                if(cliente.ip === ip){
                    c++
                }
            })
            if(c===0){
                insertar_cliente(connection,[[ip,'cliente']])
            }
        })   
    } catch (error) {
        
    }
}

function insertar_pedido(connection,values,ip){
    try {
        connection.query(
            `INSERT INTO Pedido (fecha,hora,libro) VALUES ?`,
            [values],
            (err, rows, flieds) => {
                if (err) throw err
                consultar_pedidos(connection,ip)
            });   
    } catch (error) {
        
    }
}

function consultar_pedidos(connection,ip){
    try {
        connection.query('select * from Pedido', (err, rows, fields) => {
            if (err) throw err
            let id = rows[rows.length -1].id
            insertar_sesion(connection,[[id,ip]])
        })   
    } catch (error) {
        
    }
}

function insertar_sesion(connection,values){
    try {
        connection.query(
            `INSERT INTO Sesion (id_pedido,id_cliente) VALUES ?`,
            [values],
            (err, rows, flieds) => {
                if (err) throw err
            });   
    } catch (error) {
        
    }
}

module.exports = {
    consultar_libros,
    insertar_cliente,
    consultar_clientes,
    insertar_pedido,
    consultar_pedidos
}