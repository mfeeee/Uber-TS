// Trabalho de POO - Maria Fernanda
// Interface IUsuario
interface IUsuario {
    nome: string;
    email: string;
    telefone: string;
}

// Interface ICorrida
interface ICorrida {
    origem: string;
    destino: string;
    calcularPreco(distancia: number): number;
    toString(): string;
}

// Classe abstrata Usuario implementando a interface IUsuario
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


    // Métodos de validação de nome, email e telefone
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


// Classe Motorista extendendo a classe Usuario
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

    // Validar CNH
    private validarCNH(cnh: string): void {
        if (cnh.length === 0) {
            throw new Error("CNH não pode ficar vazia");
        }
    }

    // inicializar e finalizar corrida
    iniciarCorrida(): void {
        console.log(`Motorista ${this._nome} iniciou a corrida`);
    }

    finalizarCorrida(): void {
        this._totalCorridas++;
        console.log(`Motorista ${this._nome} finalizou a corrida`);
    }
}


// Classe Passageiro extendendo a classe Usuario
class Passageiro extends Usuario {
    private _formaPagamento: string;

    constructor(nome: string, email: string, telefone: string, formaPagamento: string) {
        super(nome, email, telefone);
        this._formaPagamento = formaPagamento;
    }

    // Getter para receber a forma de pagamento
    get formaPagamento(): string {
        return this._formaPagamento;
    }
}

// Classe Corrida implementando a interface ICorrida
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

    // Métodos de validação de origem, destino, passageiro e motorista
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

    // Método para calcular o preço da corrida
    calcularPreco(distancia: number): number {
        const precoPorKm = 2.5;
        return distancia * precoPorKm;
    }

    // Método da interface ICorrida para retornar a corrida em string
    toString(): string {
        return `Origem: ${this.origem}, Destino: ${this.destino}, Passageiro: ${this.passageiro}, Motorista: ${this.motorista}`;
    }
}

class HistoricoCorridas {
    // Array privado para armazenar as corridas
    private _corridas: Corrida[] = [];

    // Adicionar corrida ao histórico
    adicionarCorrida(corrida: Corrida): void {
        this._corridas.push(corrida);
    }

    // Listar todas as corridas
    listarCorridas(): void {
        if (this._corridas.length === 0) {
            console.log("Nenhuma corrida registrada.");
        } else {
            this._corridas.forEach((corrida, index) => {
                console.log(`${index + 1}. ${corrida.toString()}`);
            });
        }
    }

    // Buscar corrida por origem
    buscarPorOrigem(origem: string): Corrida[] {
        return this._corridas.filter(corrida => 
            corrida.origem.toLowerCase().trim() === origem.toLowerCase().trim()
        );
    }

    // Remover corrida por origem
    removerCorrida(origem: string): boolean {
        const tamanhoAntes = this._corridas.length;
        this._corridas = this._corridas.filter(corrida => 
            corrida.origem.toLowerCase().trim() !== origem.toLowerCase().trim()
        );
        return this._corridas.length < tamanhoAntes;
    }

}

// Instanciando a classe HistoricoCorridas para usar na main()
const uber = new HistoricoCorridas();
let motoristas: Motorista[] = [];
let passageiros: Passageiro[] = [];


// Função adicionar nova corrida, ligada com o metodo Corridas
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

// Função para pesquisar corrida por origem, ligada com o metodo Corridas
function pesquisar() {
    const origem = prompt("Digite a origem da corrida que procura: ") || "";
    const corridas = uber.buscarPorOrigem(origem);
    if (corridas.length === 0) {
        console.error("Nenhuma corrida encontrada com essa origem");
    } else {
        corridas.forEach(corrida => console.log(corrida.toString()));
    }
}

// Função para apagar corrida, ligada com o metodo Corridas
function apagar() {
    const origem = prompt("Digite a origem da corrida para remover: ") || "";
    const corridas = uber.buscarPorOrigem(origem);
    
    // Verifica se a corrida existe e se o usuário quer mesmo remover
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

// Função para atualizar corrida, ligada com o metodo Corridas
function atualizar() {
    const origem = prompt("Digite a origem da corrida para atualizar: ") || "";
    const corridas = uber.buscarPorOrigem(origem);
    
    if (corridas.length > 0) {
        const novaOrigem = prompt("Nova origem: ") || "";
        const novoDestino = prompt("Novo destino: ") || "";
        const novoPassageiro = prompt("Novo passageiro: ") || "";
        const novoMotorista = prompt("Novo motorista: ") || "";
        
        // Remove a corrida antiga e adiciona a nova
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


// Função para cadastrar motorista, ligada com o metodo Motorista
function cadastrarMotorista() {
    const nomeMotorista = prompt("Nome do motorista: ") || "";
    const emailMotorista = prompt("Email do motorista: ") || "";
    const telefoneMotorista = prompt("Telefone do motorista: ") || "";
    const cnhMotorista = prompt("CNH do motorista: ") || "";
    const tipoVeiculo = prompt("Tipo de veículo: ") || "";

    // Cria uma nova instacia de Motorista e adiciona ao array de motoristas
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

// Função para cadastrar passageiro, ligada com o metodo Passageiro
function cadastrarPassageiro() {
    const nomePassageiro = prompt("Nome do passageiro: ") || "";
    const emailPassageiro = prompt("Email do passageiro: ") || "";
    const telefonePassageiro = prompt("Telefone do passageiro: ") || "";
    const formaPagamento = prompt("Forma de pagamento: ") || "";

    // Cria uma nova instacia de Passageiro e adiciona ao array de passageiros
    const passageiro = new Passageiro(
        nomePassageiro,
        emailPassageiro,
        telefonePassageiro,
        formaPagamento
    );
    passageiros.push(passageiro);
    console.log("Passageiro cadastrado com sucesso!");
}

// Função para iniciar corrida, ligada com o metodo Motorista
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

// Função para finalizar corrida, ligada com o metodo Motorista
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

// Função para calcular preço da corrida
function calcularPrecoCorrida() {
    const distancia = parseFloat(prompt("Distância da corrida (em km): ") || "0");
    if (isNaN(distancia) || distancia <= 0) {
        console.log("Distância inválida.");
        return;
    }

    const preco = new Corrida("", "", "", "").calcularPreco(distancia);
    console.log(`Preço da corrida: R$ ${preco.toFixed(2)}`);
}

// Função main para rodar o programa
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
        // Tratamento de erro
        } catch (error) {
            console.error("Erro:", (error as Error).message);
        }
    }
}

main();
