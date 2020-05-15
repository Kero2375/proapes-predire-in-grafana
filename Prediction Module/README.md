# Modulo interno - Predire in Grafana ![SonarCloud](https://github.com/FiammettaFMC/ModuloInterno/workflows/SonarCloud/badge.svg?branch=master)
## Descrizione
**Prediction Module**: modulo di predizione interno alla piattaforma Grafana.
- Università degli Studi di Padova
- **Gruppo** ProApes
- **Versione** 3.0.0-1.10

## Componenti del team
- Bari Francesco
- Biolcati Rinaldi Igor
- Cannavò Fiammetta
- Carboni Federico
- Discalzi Alessandro
- Piran Giacomo
- Signor Valentina

## Installazione

Clonare il contenuto della repository corrente nella directory `plugin` di Grafana

Per lavorare al progetto:

    yarn dev
    
oppure (questo eseguirà i tools linting e prettier per formattazioni di stile) :

    yarn watch

Per compilare il progetto (completo per il rilascio):

    yarn build

Quindi avviare (o riavviare) il servizio Grafana con il comando:
    
    sudo systemctl [re]start grafana-server 
