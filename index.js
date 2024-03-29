
async function getAddressByCep() {
    const Cep = document.getElementById('cepi').value;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${Cep}/json/`);
        const data = await response.json();
        console.log(data);

        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;

    } catch(error) {
        alert('Neste momento você receberá apenas os dados da temperatura de Região. Para receber informações sobre o endereço, informe o seu CEP');
    }
}



async function getPrevisao() {
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`)
        const data = await response.json()
        console.log(data);

        if (data.hourly && Array.isArray(data.hourly.temperature_2m)) {
            const ultimaTemperatura = data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1];
            document.getElementById('celsius').innerHTML = `${ultimaTemperatura}° C`;
        } else {
            alert('Neste momento você receberá apenas os dados do seu endereço. Para receber informações sobre a temperatura da região, informe sua Latitude e Longitude')
        }
    } catch (error) {
        alert('Neste momento você receberá apenas os dados do seu endereço. Para receber informações sobre a temperatura da região, informe sua Latitude e Longitude')
    }
}



// -22.7134382 lat
// -43.5616878 long
