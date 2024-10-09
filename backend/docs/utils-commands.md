## Hasura-CLI

- **Gerar migration total do hasura console**:  
  `hasura migrate create "all_schema_changes" --from-server` 

- **Aplicar migração no ambiente**:  
  `hasura migrate apply --admin-secret ${ADMIN_SECRET} --endpoint ${HASURA_ENDPOINT}`

- **Exportar metadata**:  
  `hasura metadata export`

## Iniciar o projeto em ambiente local

- **Bash para gerar schema e metadata no Hasura**
  `Vá para pasta root e dispare os comandos:`
  *cd ./hasura*
  *./initial.db.sh*
