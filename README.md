# calendar

mini API REST per gestire un calendario di appuntamenti

## Tabelle gestite:

- customers
- booking

Vedi init-database.sql per le strutture e la relazione tra le due tabelle

## funzioni disponibili

- creazione customer
- modifica customer
- cancellazione customer
- lettura customer

## ambiente

l'API gira in locale sulla porta 3000 appoggiandosi su un database mysql in esecuzione su un container

## installazione

dopo aver clonato il repository eseguire dalla radice del repo questi comandi in sequenza

- npm install
- docker-compose up -d
- node init-database.js

Dopo aver preparato l'ambiente lanciare l'applicazione con node app.js

## utilities

- inizializzazione del database con node init-database.js
- collezione Postman per testare le chiamate

## TODO

- usare un pool di connessione a mysql
- CRUD tabella booking
- autenticazione con apikey








