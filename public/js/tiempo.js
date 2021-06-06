const aleatorio = (x) => Math.floor(Math.random() * (x + 1))
const r = new Reloj(aleatorio(23), aleatorio(59), aleatorio(59))
let t = 5
let s = t
const url = 'http://localhost:8000/'

const peticion = async (url) => {
    try {
        let t1 = performance.now()
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    h: r.getH,
                    m: r.getM,
                    s: r.getS,
                    t: t
                }
            })
        })
        let t2 = performance.now()
        const datos = await res.json()
        let hora_previa = r.formato_hora()
        r.setH = parseInt(Math.floor((datos.h+r.getH)/2)%24)
        r.setM = parseInt(Math.floor((datos.m+r.getM)/2)%60)
        r.setS = parseInt(Math.floor((datos.s+r.getS)/2)%60)
        let hora_nueva = r.formato_hora()
        const res1 = await fetch('http://localhost:8002/central', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    p:hora_previa,
                    n:hora_nueva
                }
            })
        })
        let l = parseInt(t2-t1)*10
        const res2 = await fetch('http://localhost:8002/equipo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    l: l
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const cambiar_sincronizacion = () => {
    t = parseInt(prompt('Ingrese nuevo tiempo de sincronizacion en segundos'))
    s = t
}

const cambiar_hora = () => {
    let hora = prompt('Ingrese hora en formato H:M:S')
    let h = hora.split(':')
    r.setH = parseInt(h[0])
    r.setM = parseInt(h[1])
    r.setS = parseInt(h[2])

}

window.onload = () => {
    const reloj = document.getElementById('reloj')
    const tiempo = document.getElementById('tiempo')
    r.hora()
    const intervalor = setInterval(() => {
        tiempo.innerHTML = `El tiempo de sincronización es de: ${t}s <br/>Siguiente sincronización: ${s}`
        s--
        if (s < 0) {
            s = t
            peticion(url + 'tiempo')
        }
        reloj.innerHTML = r.formato_hora()
    }, 1000)
}