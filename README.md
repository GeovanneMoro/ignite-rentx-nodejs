# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser listar todas as categorias.

**RN**
Não deve possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado como disponível por padrão.
O usuário responsável pelo cadastro deve ser um usuário adm.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar carros disponíveis pelo nome da marca.
Deve ser possível listar carros disponíveis pelo nome da categoria.
Deve ser possível listar carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro inexistente.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário adm.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário adm.

# Aluguel

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 1 dia.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

# Devolução de carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuáio deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcionalmente aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.

**Requisitos Funcionais**
//funcionalidades que a aplicação vai ter

**Requisitos Não Funcionais**
// não está ligado diretamente com a aplicação, ex dados serem salvos em bd postgres, não importanta diretamente qual bd manja?

**Regra de Negócio**
