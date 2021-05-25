 postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';


 psql -d postgres -U me
 postgres=> CREATE DATABASE pweeter;


 postgres=> \c pweeter


 CREATE TABLE users (
   ID SERIAL PRIMARY KEY,
   name VARCHAR(30),
   email VARCHAR(30)
 );

INSERT INTO users (email, name)
VALUES ('jfernandez7@uc.cl', 'Jose'),
('smdelano@uc.cl', 'Sofi'), 
('jirarrazabal@uc.cl', 'Javi');



ALTER TABLE users ADD CONSTRAINT email_unique UNIQUE (email);

CREATE TABLE pweets(                                         
  pweet_id INT GENERATED ALWAYS AS IDENTITY,
  body text,
  email VARCHAR(30),
  CONSTRAINT owner
     FOREIGN KEY(email) 
     REFERENCES users(email)
);


INSERT INTO pweets (email, body)
VALUES ('jfernandez7@uc.cl', 'me gusta el ramo web avanzado'),
('smdelano@uc.cl', 'Tengo frio'), 
('jirarrazabal@uc.cl', 'Queda poco para las vacaciones de invierno :)');