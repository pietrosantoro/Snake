DROP DATABASE if exists punteggi;
CREATE DATABASE punteggi;

CREATE TABLE punteggi.BEST (
	Nome VARCHAR(10) NOT NULL,
	Punteggio INTEGER(10) NOT NULL
);
