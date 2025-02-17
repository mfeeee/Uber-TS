interface IUsuario {
    nome: string;
    email: string;
    telefone: string;
}

interface ICorrida {
    origem: string;
    destino: string;
    calcularPreco(distancia: number): number;
    toString(): string;
}

abstract class Usuario implements IUsuario {
    protected _nome: string;
    protected _email: string;
    protected _telefone: string;

    constructor(nome: string, email: string, telefone: string) {
        this.validarNome(nome);
        this.validarEmail(email);
        this.validarTelefone(telefone);
        
        this._nome = nome;
        this._email = email;
        this._telefone = telefone;
    }

    protected validarNome(nome: string): void {
        if (nome.length === 0) {
            throw new Error("O nome não pode ficar vazio");
        }
    }

    protected validarEmail(email: string): void {
        const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Email inválido");
        }
    }

    protected validarTelefone(telefone: string): void {
        const telefoneRegex = /^\d{10,11}$/;
        if (!telefoneRegex.test(telefone)) {
            throw new Error("Telefone inválido");
        }
    }

    get nome(): string { return this._nome; }
    get email(): string { return this._email; }
    get telefone(): string { return this._telefone; }


}

class Motorista extends Usuario {
    private _cnh: string;
    private _tipoVeiculo: string;
    private _totalCorridas: number;

    constructor(nome: string, email: string, telefone: string, cnh: string, tipoVeiculo: string) {
        super(nome, email, telefone);
        this.validarCNH(cnh);
        this._cnh = cnh;
        this._tipoVeiculo = tipoVeiculo;
        this._totalCorridas = 0;
    }

    private validarCNH(cnh: string): void {
        if (cnh.length === 0) {
            throw new Error("CNH não pode ficar vazia");
        }
    }

    iniciarCorrida(): void {
        console.log(`Motorista ${this._nome} iniciou a corrida`);
    }

    finalizarCorrida(): void {
        this._totalCorridas++;
        console.log(`Motorista ${this._nome} finalizou a corrida`);
    }
}

class Passageiro extends Usuario {
    private _formaPagamento: string;

    constructor(nome: string, email: string, telefone: string, formaPagamento: string) {
        super(nome, email, telefone);
        this._formaPagamento = formaPagamento;
    }

    get formaPagamento(): string {
        return this._formaPagamento;
    }
}

class Corrida implements ICorrida {
    constructor(
        public origem: string,
        public destino: string,
        public passageiro: string,
        public motorista: string
    ) {
        this.origem = origem;
        this.destino = destino;
        this.passageiro = passageiro;
        this.motorista = motorista;
    }

    private validarOrigem(origem: string): void {
        if (origem.length === 0) {
            throw new Error("Origem não pode ficar vazia");
        }
    }

    private validarDestino(destino: string): void {
        if (destino.length === 0) {
            throw new Error("Destino não pode ficar vazio");
        }
    }
    
    private validarPassageiro(passageiro: string): void {
        if (passageiro.length === 0) {
            throw new Error("Passageiro não pode ficar vazio");
        }
    }

    private validarMotorista(motorista: string): void {
        if (motorista.length === 0) {
            throw new Error("Motorista não pode ficar vazio");
        }
    }

    calcularPreco(distancia: number): number {
        const precoPorKm = 2.5;
        return distancia * precoPorKm;
    }

    toString(): string {
        return `Origem: ${this.origem}, Destino: ${this.destino}, Passageiro: ${this.passageiro}, Motorista: ${this.motorista}`;
    }
}

class HistoricoCorridas {
    private _corridas: Corrida[] = [];

    adicionarCorrida(corrida: Corrida): void {
        this._corridas.push(corrida);
    }

    listarCorridas(): void {
        if (this._corridas.length === 0) {
            console.log("Nenhuma corrida registrada.");
        } else {
            this._corridas.forEach((corrida, index) => {
                console.log(`${index + 1}. ${corrida.toString()}`);
            });
        }
    }

    buscarPorOrigem(origem: string): Corrida[] {
        return this._corridas.filter(corrida => 
            corrida.origem.toLowerCase().trim() === origem.toLowerCase().trim()
        );
    }

    removerCorrida(origem: string): boolean {
        const tamanhoAntes = this._corridas.length;
        this._corridas = this._corridas.filter(corrida => 
            corrida.origem.toLowerCase().trim() !== origem.toLowerCase().trim()
        );
        return this._corridas.length < tamanhoAntes;
    }

}

const uber = new HistoricoCorridas();
let motoristas: Motorista[] = [];
let passageiros: Passageiro[] = [];


function adicionar() {
    console.log("Cadastrando nova corrida");
    const origem = prompt("Digite a origem da corrida: ") || "";
    const destino = prompt("Digite o destino da corrida: ") || "";
    const passageiro = prompt("Digite o nome do passageiro: ") || "";
    const motorista = prompt("Digite o nome do motorista: ") || "";
    
    try {
        const corrida = new Corrida(origem, destino, passageiro, motorista);
        uber.adicionarCorrida(corrida);
        console.log("Corrida adicionada com sucesso!");
    } catch (error) {
        console.log("A corrida não foi adicionada ao sistema");
        console.log((error as Error).message);
    }
}

function pesquisar() {
    const origem = prompt("Digite a origem da corrida que procura: ") || "";
    const corridas = uber.buscarPorOrigem(origem);
    if (corridas.length === 0) {
        console.error("Nenhuma corrida encontrada com essa origem");
    } else {
        corridas.forEach(corrida => console.log(corrida.toString()));
    }
}

function apagar() {
    const origem = prompt("Digite a origem da corrida para remover: ") || "";
    const corridas = uber.buscarPorOrigem(origem);
    
    if (corridas.length > 0) {
        const resp = prompt(
            `Deseja realmente remover a corrida de ${origem}? (s/n): `
        );
        if (resp?.toLowerCase() === "s") {
            if (uber.removerCorrida(origem)) {
                console.log("Corrida removida com sucesso!");
            }
        } else {
            console.log("Operação cancelada");
        }
    } else {
        console.log("Corrida não encontrada");
    }
}

function atualizar() {
    const origem = prompt("Digite a origem da corrida para atualizar: ") || "";
    const corridas = uber.buscarPorOrigem(origem);
    
    if (corridas.length > 0) {
        const novaOrigem = prompt("Nova origem: ") || "";
        const novoDestino = prompt("Novo destino: ") || "";
        const novoPassageiro = prompt("Novo passageiro: ") || "";
        const novoMotorista = prompt("Novo motorista: ") || "";
        
        try {
            const corridaAtualizada = new Corrida(novaOrigem, novoDestino, novoPassageiro, novoMotorista);
            uber.removerCorrida(origem);
            console.log("Corrida atualizada com sucesso!");
        } catch (error) {
            console.log("Não foi possível atualizar a corrida");
            console.log((error as Error).message);
        }
    } else {
        console.log("Corrida não encontrada");
    }
}

function cadastrarMotorista() {
    const nomeMotorista = prompt("Nome do motorista: ") || "";
    const emailMotorista = prompt("Email do motorista: ") || "";
    const telefoneMotorista = prompt("Telefone do motorista: ") || "";
    const cnhMotorista = prompt("CNH do motorista: ") || "";
    const tipoVeiculo = prompt("Tipo de veículo: ") || "";

    const motorista = new Motorista(
        nomeMotorista,
        emailMotorista,
        telefoneMotorista,
        cnhMotorista,
        tipoVeiculo
    );
    motoristas.push(motorista);
    console.log("Motorista cadastrado com sucesso!");
}

function cadastrarPassageiro() {
    const nomePassageiro = prompt("Nome do passageiro: ") || "";
    const emailPassageiro = prompt("Email do passageiro: ") || "";
    const telefonePassageiro = prompt("Telefone do passageiro: ") || "";
    const formaPagamento = prompt("Forma de pagamento: ") || "";

    const passageiro = new Passageiro(
        nomePassageiro,
        emailPassageiro,
        telefonePassageiro,
        formaPagamento
    );
    passageiros.push(passageiro);
    console.log("Passageiro cadastrado com sucesso!");
}

function iniciarCorrida() {
    const nomeMotoristaIniciar = prompt("Nome do motorista para iniciar a corrida: ") || "";
    let motoristaIniciar: Motorista | undefined;

    motoristas.forEach(motorista => {
        if (motorista.nome === nomeMotoristaIniciar) {
            motoristaIniciar = motorista;
        }
    });

    if (motoristaIniciar) {
        motoristaIniciar.iniciarCorrida();
    } else {
        console.log("Motorista não encontrado.");
    }
}


function finalizarCorrida() {
    const nomeMotoristaFinalizar = prompt("Nome do motorista para finalizar a corrida: ") || "";
    let motoristaFinalizar: Motorista | undefined;

    motoristas.forEach(motorista => {
        if (motorista.nome === nomeMotoristaFinalizar) {
            motoristaFinalizar = motorista;
        }
    });

    if (motoristaFinalizar) {
        motoristaFinalizar.finalizarCorrida();
    } else {
        console.log("Motorista não encontrado.");
    }
}

function calcularPrecoCorrida() {
    const distancia = parseFloat(prompt("Distância da corrida (em km): ") || "0");
    if (isNaN(distancia) || distancia <= 0) {
        console.log("Distância inválida.");
        return;
    }

    const preco = new Corrida("", "", "", "").calcularPreco(distancia);
    console.log(`Preço da corrida: R$ ${preco.toFixed(2)}`);
}

function main() {
    for (;;) {
        console.log("1 - Cadastrar Motorista");
        console.log("2 - Cadastrar Passageiro");
        console.log("3 - Criar Corrida");
        console.log("4 - Listar Corridas");
        console.log("5 - Buscar Corrida por Origem");
        console.log("6 - Remover Corrida");
        console.log("7 - Atualizar Corrida");
        console.log("8 - Iniciar Corrida (Motorista)");
        console.log("9 - Finalizar Corrida (Motorista)");
        console.log("10 - Calcular Preço da Corrida");
        console.log("0 - Sair");

        let opcao = Number(prompt("Digite uma opcao: "));

        try {
            switch (opcao) {
                case 0:
                    console.log("Saindo do programa...");
                    return;

                case 1:
                    cadastrarMotorista();
                    break;

                case 2:
                    cadastrarPassageiro();
                    break;

                case 3:
                    adicionar();
                    break;

                case 4:
                    console.log("Lista de todas as corridas:");
                    uber.listarCorridas();
                    break;

                case 5:
                    pesquisar();
                    break;

                case 6:
                    apagar();
                    break;

                case 7:
                    atualizar();
                    break;

                case 8:
                    iniciarCorrida();
                    break;

                case 9:
                    finalizarCorrida();
                    break;

                case 10:
                    calcularPrecoCorrida();
                    break;

                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        } catch (error) {
            console.error("Erro:", (error as Error).message);
        }
    }
}

main();
