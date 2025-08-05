# Breve explicação

Infelizmente não consegui finalizar nem certa de 20% do que foi pedido, acabei precisando configurar todo o setup pois não tinha um pré pronto para usar e isso acabou me custando mais tempo do que eu gostária.

Eu sei que isso não é um fator importante para a vaga, por isso não pretendo me prolongar muito.

Abaixo explico um pouco de como rodar, resumidamente utilzei containers `docker` para rodar o banco de dados, aplicação e servidor web, minha ideia era fazer multiplos containers da aplicação para rodar alguns testes de carga e mostrar gráficos do desempenho da aplicação, mas como citei acima, perdi muito tempo só configurando o setup e não consegui fazer.

# Execução do projeto

Para executar é possível fazer isso de duas formas, versão **dev** ou **prod**. A diferença entre ambos é a forma de montagem dos volumes do *Docker*. 

Primeiramete crie um `.env` no root do projeto, o arquivo `.env.exemple` mostra quais variaveis de ambiente precisam ser prenchidas para executar o projeto.

**Dev**:

Para executar o [dev] é necessário ter o [nodejs] (ou outro runtime js) instalado. 

```sh
npm i
docker compose -f compose-dev.yml up -d
```

**Prod**:

```sh
docker compose -f compose-prod.yml up -d
```

Em ambos casos o projeto vai ficar no: `http://127.0.0.1:8080`.

Já para usar os dados pré-populados do banco de dados e rodar as migrations é necessário usar os seguinte comandos.

```sh
docker run \
    --rm \
    -it \
    --network box-prod_connection \
    # --network box-dev_connection \
    -w /app \
    --mount type=bind,src="$PWD",target=/app \
    node:24.4.1-alpine \
    npx drizzle-kit push
    
// aqui utilizei o BUN (javascript runtime) para evitar problemas de configuração do node com typescript
docker run \
    --rm \
    -it \
    --network box-prod_connection \
    # --network box-dev_connection \
    -w /app \
    --mount type=bind,src="$PWD",target=/app \
    oven/bun:1.2-alpine \
    bun src/db/mock.ts
```