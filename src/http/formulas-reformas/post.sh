curl "http://localhost:3000/APIs/formulas-reformas" \
    --request POST \
    --data '{
        "reforma": {
            "nome": "teste",
            "descricao": "Lorem"
        },
        "formula": {
            "nome": "calc",
            "expressao": "%",
            "valido": "true"
        }
    }'
    