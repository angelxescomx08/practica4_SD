const fetch = require('node-fetch');

function peticion(url, data) {
    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data
            })
        })
    } catch (error) {
        
    }
}

module.exports = {
    peticion
}