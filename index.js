/* Nesta primeira função, iremos iniciar a requisição de endereço
Iniciada sempre como async await onde é esperado uma resposta do endereço desejado.
*/

async function getAddressByCep() {
    
    /* Esta primeira const irá ouxar pelo Id dentro do html o valor que vai ser alterado após o recebimento dos dados desejados*/

    const Cep = document.getElementById('cepi').value;
    try {
        /* Adicionaremos duas constantes, uma para resposta e outra para envio da mesma para a página selecionada. A primeira const será com o link disponibilizado pela api para buscarmos os valores que serão adicionados à página.
        Já a segunda const será onde o código irá esperar os resultados da busca serem finalizados */
        const response = await fetch(`https://viacep.com.br/ws/${Cep}/json/`);
        const data = await response.json();
        console.log(data);
        
        /* Após os dados serem recebidos, precisamos traze-los para o front-end da página, e isto será feito buscando os Id's no html que correspondam a cada requisição solicitada pelo usuário*/

        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;

        /* O código também precisa ter uma mensagem de aviso, caso algum dado digitado pelo usuário esteja faltando */

    } catch(error) {
        alert('Neste momento você receberá apenas os dados da temperatura de Região. Para receber informações sobre o endereço, informe o seu CEP');
    }
}

/* Para a requisição de previsão do tempo, temos o mesmo padrão de código para requisição dos dados, porém, podemos utilizar if else para enviarmos os dados para o front-end da página */

async function getPrevisao() {
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`)
        const data = await response.json()
        console.log(data);

        if (data.hourly && Array.isArray(data.hourly.temperature_2m)) {

            /* Aqui temos uma única constante que será utilizada para enviar o código para o front-end da página.
            Nela teremos uma array com dados do link da api e para usarmos a temperatura mais recente, devemos finaliar a const com -1 */


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
