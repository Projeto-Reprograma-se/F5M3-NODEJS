const fs = require('fs').promises;
const prompt = require('prompt-sync')();
const CAR_FILE_PATH = './data.json';
const Table = require('cli-table3');

async function start() {
  console.log('Sistema de cadastro de carros');
  
  while (true) {
    console.log('O que você gostaria de fazer?');
    console.log('')
    console.log('1 - Listar carros');
    console.log('2 - Cadastrar novo carro');
    console.log('3 - Sair do sistema');
    console.log('')

    const option = Number(prompt('Digite a opção desejada: '));
    
    switch (option) {
      case 1:
        await listCars();
        break;
      case 2:
        await addCar();
        break;
      case 3:
        console.log('Saindo do sistema...');
        return;
      default:
        console.log('Opção inválida, tente novamente!');
    }
  }
}

async function listCars() {
  try {
    const data = await fs.readFile(CAR_FILE_PATH);
    const cars = JSON.parse(data);

    const table = new Table({
      head: ['Placa', 'Nome', 'Montadora'],
      colWidths: [15, 30, 20],
    });

    table.options.colAligns = ['center', 'center', 'center'];
    
    cars.forEach(car => {
      table.push([car.placa, car.nome, car.montadora]);
    });

    console.log(table.toString());
  } catch (error) {
    console.log('Erro ao listar carros:', error);
  }
}


async function addCar() {
  const placa = prompt('Digite a placa do carro: ');
  const nome = prompt('Digite o nome do carro: ');
  const montadora = prompt('Digite a montadora do carro: ');

  try {
    let cars = [];
    const data = await fs.readFile(CAR_FILE_PATH);

    if (data.length > 0) {
      cars = JSON.parse(data);
    }

    cars.push({ placa, nome, montadora });
    await fs.writeFile(CAR_FILE_PATH, JSON.stringify(cars));
    console.log('Carro cadastrado com sucesso!');
  } catch (error) {
    console.log('Erro ao cadastrar carro:', error);
  }
}

start();
