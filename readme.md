Vou criar um enunciado para um Sistema do Uber, utilizando os conceitos de POO. Aqui está:

Exercício: Sistema de Gerenciamento de Corridas Uber

Desenvolva um sistema para gerenciar corridas do Uber que suporte diferentes tipos de serviços e motoristas:

1. Interface IPessoa:
   - Métodos: calcularAvaliacao(): number e exibirInfo(): string

2. Classe Abstrata Conta:
   - Atributos protegidos: nome, email, telefone, avaliacao
   - Métodos abstratos: validarCadastro(): boolean
   - Getters e setters para os atributos

3. Classes que herdam de Conta e implementam IPessoa:
   - Motorista: adiciona atributos CNH, tipoVeiculo e totalCorridas
   - Passageiro: adiciona atributo formaPagamento e historicoViagens

4. Interface ICorrida:
   - Métodos: calcularPreco(distancia: number): number e definirTipo(): string

5. Classes que implementam ICorrida:
   - UberX: adiciona precoBase e taxaPorKm
   - UberBlack: adiciona precoBase, taxaPorKm e taxaConforto
   - UberPool: adiciona precoBase, taxaPorKm e descontoCompartilhamento

6. Crie uma classe GerenciadorCorridas que:
   - Armazene um array de corridas
   - Calcule o preço total de todas as corridas
   - Gere relatórios de desempenho dos motoristas
   - Faça matching entre passageiros e motoristas disponíveis

Conceitos que serão utilizados:

1. Herança:
   - Classe Conta sendo herdada por Motorista e Passageiro
   - Reutilização de atributos e métodos comuns

2. Encapsulamento:
   - Atributos protegidos na classe Conta
   - Getters e setters para acesso controlado

3. Polimorfismo:
   - Interface IPessoa implementada de formas diferentes por Motorista e Passageiro
   - Interface ICorrida implementada pelos diferentes tipos de serviço Uber

4. Sobrecarga:
   - Diferentes construtores nas classes de tipos de corrida
   - Métodos de cálculo de preço com diferentes parâmetros

5. Sobrescrita:
   - Método calcularAvaliacao() implementado diferentemente em Motorista e Passageiro
   - Método validarCadastro() implementado especificamente em cada classe filha

Extras sugeridos:
- Implemente tratamento de exceções para dados inválidos
- Adicione um sistema de pagamento com diferentes métodos
- Crie um histórico de corridas com persistência de dados
- Implemente um sistema de cupons e descontos