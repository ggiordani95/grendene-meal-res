#!/bin/bash

function exit_after_delay {
    sleep 12
    exit 1
}

if [ -f ../../.env ]; then
    echo "Carregando variáveis do .env..."
    source ../../.env  
else
    echo "Arquivo .env não encontrado. Verifique se ele está no diretório correto."
    exit_after_delay
fi

if [ -z "$HASURA_ENDPOINT" ] || [ -z "$HASURA_ADMIN_SECRET" ]; then
    echo "Erro: HASURA_ENDPOINT ou HASURA_ADMIN_SECRET não definido no .env."
    exit_after_delay
fi

MIGRATION_NAME="migration_$(date +%Y%m%d%H%M%S)"

echo "Verificando conexão com o Hasura em $HASURA_ENDPOINT..."
curl --silent --head --fail "$HASURA_ENDPOINT/v1/version" --header "x-hasura-admin-secret: $HASURA_ADMIN_SECRET"
if [ $? -ne 0 ]; then
    echo "Erro: Não foi possível conectar ao Hasura no endpoint $HASURA_ENDPOINT."
    exit_after_delay
fi

echo "Conexão com o Hasura bem-sucedida."

echo "Gerando migrações do servidor Hasura..."
hasura migrate create "$MIGRATION_NAME" --from-server --endpoint "$HASURA_ENDPOINT" --admin-secret "$HASURA_ADMIN_SECRET"
if [ $? -ne 0 ]; then
    echo "Erro ao gerar migrações." >&2
    exit_after_delay
fi

echo "Migração '$MIGRATION_NAME' gerada com sucesso."

echo "Exportando metadados do servidor Hasura..."
hasura metadata export --endpoint "$HASURA_ENDPOINT" --admin-secret "$HASURA_ADMIN_SECRET"
if [ $? -ne 0 ]; then
    echo "Erro ao exportar metadados." >&2
    exit_after_delay
fi

echo "Processo de migrações e exportação de metadados concluído com sucesso."

sleep 6
