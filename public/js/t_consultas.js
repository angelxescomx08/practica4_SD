function insertar_central(connection,values){
    try {
        connection.query(
            `INSERT INTO Hora_central (hora_previa,hora_referencia) VALUES ?`,
            [values],
            (err, rows, flieds) => {
                if (err) throw err
            });   
    } catch (error) {
        
    }
}

function insertar_equipo(connection,values){
    try {
        connection.query(
            `INSERT INTO Equipo (latencia) VALUES ?`,
            [values],
            (err, rows, flieds) => {
                if (err) throw err
            });   
    } catch (error) {
        
    }
}

module.exports = {
    insertar_central,
    insertar_equipo
}