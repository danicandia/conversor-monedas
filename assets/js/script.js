const urlAPI = "https://mindicador.cl/api";

async function obtener_datos(moneda) {
    try {
        const res = await fetch(urlAPI + "/" + moneda);
        const data = await res.json();
        console.log(data);

        return data;
    } catch (e) {
        alert(e.message);
    }
}

async function convertir_moneda() {
    monto = document.getElementById("monto-pesos").value;

    if (monto == "") {
        alert("Debe ingresar un monto a convertir");
    }
    else {
        moneda = document.getElementById("moneda").value;
        resultado = document.getElementById("resultado");
        datos = await obtener_datos(moneda);
        conversion = Number(Number(monto) / Number(datos.serie[0].valor)).toFixed(2);

        if (moneda == "uf" || moneda == "utm") {
            resultado.innerHTML = moneda.toUpperCase() + " " + conversion;
        }
        else {
            resultado.innerHTML = "$" + conversion;
        }

        generar_grafico(datos);
        document.querySelector("canvas").style.backgroundColor = "white";
    }
}

async function generar_grafico(datos) {
    xValues = [];
    yValues = [];

    for (i = 9; i >= 0; i--) {
        xValues.push(new Date(datos.serie[i].fecha).toLocaleDateString());
        yValues.push(Number(datos.serie[i].valor).toFixed(2));
    }

    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(52,58,64,1.0)",
                borderColor: "rgba(52,58,64,0.1)",
                data: yValues
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5
                }
            },
            legend: { display: false },
            title: {
                display: true,
                fontSize: 16,
                text: "Historial últimos 10 días"
            },
            scales: {
                yAxes: [],
            }
        }
    });
}

document.getElementById("btn-buscar").addEventListener('click', convertir_moneda);