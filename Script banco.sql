/* CREATE DATABASE divulgador; */

/* USE divulgador; */

/* CREATE TABLE tipo (
		id INT PRIMARY KEY AUTO_INCREMENT,
        descricao VARCHAR(255) NOT NULL
); */

# INSERT INTO tipo (descricao) VALUES ('Organizador');
# INSERT INTO tipo (descricao) VALUES ('Aluno');
# SELECT * FROM tipo;

/* CREATE TABLE pessoa (
		cpf VARCHAR(14) PRIMARY KEY NOT NULL,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL,
        UNIQUE(email),
        senha VARCHAR(50) NOT NULL,
        tipo_fk INT,
        FOREIGN KEY (tipo_fk) REFERENCES tipo(id)
); */

# INSERT INTO pessoa (cpf, nome, email, senha, tipo_fk) VALUES ('044.133.399-08', 'Bruno Fukunaga', 'kazuh_fuku@icloud.com', md5('teste1'), 2);
# INSERT INTO pessoa (cpf, nome, email, senha, tipo_fk) VALUES ('105.112.229-55', 'Aline Ferreira', 'alinelima81665@gmail.com', md5('teste2'), 2);
# SELECT * FROM pessoa;

/* CREATE TABLE curso (
		id INT PRIMARY KEY AUTO_INCREMENT,
        descricao VARCHAR(255)
); */

# INSERT INTO curso (descricao) VALUES ('Analise e Desenvolvimento de Sistemas');
# INSERT INTO curso (descricao) VALUES ('Direito');
# INSERT INTO curso (descricao) VALUES ('Psicologia');
# INSERT INTO curso (descricao) VALUES ('Farmácia');
# INSERT INTO curso (descricao) VALUES ('Biomedicina');
# INSERT INTO curso (descricao) VALUES ('Odontologia');
# INSERT INTO curso (descricao) VALUES ('Medicina Veterinária');
# SELECT * FROM curso;

/* CREATE TABLE pessoa_curso (
		pessoa_fk VARCHAR(14),
        FOREIGN KEY (pessoa_fk) REFERENCES pessoa(cpf),
        curso_fk INT,
        FOREIGN KEY (curso_fk) REFERENCES curso(id)
); */

# INSERT INTO pessoa_curso (pessoa_fk, curso_fk) VALUES ('044.133.399-08',1);
# INSERT INTO pessoa_curso (pessoa_fk, curso_fk) VALUES ('105.112.229-55',2);
# SELECT * FROM pessoa_curso;

/* CREATE TABLE evento (
		id INT PRIMARY KEY AUTO_INCREMENT,
        codVerificacao VARCHAR(100) NOT NULL,
        nome VARCHAR(100) NOT NULL,
        palestrante VARCHAR(255) NOT NULL,
        descricao VARCHAR(400) NOT NULL,
        local_evento VARCHAR(255) NOT NULL,
        carga_horaria INT NOT NULL,
        data_hora TIMESTAMP NOT NULL
); */

# INSERT INTO evento (codVerificacao, nome, palestrante, descricao, local_evento, carga_horaria, data_hora) VALUES ('r56gh8', 'Simpósio de Letras', 'Fulano de Tal', 'blablablablabla blablablabla', 'Auditório', 4, '2022/12/01 19:00:00');
# INSERT INTO evento (codVerificacao, nome, palestrante, descricao, local_evento, carga_horaria, data_hora) VALUES ('58jy4k', 'Semana acadêmica de ADS', 'Joao Marques', 'blablablablabla blablablabla', 'Auditório', 4, '2022/12/01 19:00:00');
# SELECT * FROM evento;

/* CREATE TABLE evento_curso (
		evento_fk int,
        FOREIGN KEY (evento_fk) REFERENCES evento(id),
        curso_fk INT,
        FOREIGN KEY (curso_fk) REFERENCES curso(id)
); */

# INSERT INTO evento_curso (evento_fk, curso_fk) VALUES (1,1);
# INSERT INTO evento_curso (evento_fk, curso_fk) VALUES (2,2);
# SELECT * FROM evento_curso;

/* CREATE TABLE pessoa_evento (
		evento_fk int,
        FOREIGN KEY (evento_fk) REFERENCES evento(id),
		pessoa_fk VARCHAR(14),
        FOREIGN KEY (pessoa_fk) REFERENCES pessoa(cpf)
); */

# INSERT INTO pessoa_evento (pessoa_fk, evento_fk) VALUES ('044.133.399-08',1);
# INSERT INTO pessoa_evento (pessoa_fk, evento_fk) VALUES ('105.112.229-55',2);
# SELECT * FROM pessoa_curso;

#Alterações no banco de dados
/*
alter table evento add column capacidade_maxima int not null;
alter table evento add column hora time not null;
alter table evento add column curso_fk int not null;

alter table evento rename column codVerificacao to  codigo_checkin;
alter table evento rename column data_hora to  data;
alter table evento rename column capa_evento to  file_name;
alter table pessoa rename column tipo_fk to  tipo_fk;

alter table evento drop column data;
alter table evento add column data date not null;
*/

/*
	CREATE TABLE inscricao_evento(
		id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        cpf VARCHAR(255) NOT NULL,
        UNIQUE(cpf),
        email VARCHAR(255) NOT NULL,
        UNIQUE(email),        
        curso_fk INT,
        FOREIGN KEY (curso_fk) REFERENCES curso(id)
    );
*/

/*
	CREATE TABLE presenca_evento(
		id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        cpf VARCHAR(255) NOT NULL,
        UNIQUE(cpf),
        email VARCHAR(255) NOT NULL,
        UNIQUE(email),        
        curso_fk INT,
        FOREIGN KEY (curso_fk) REFERENCES curso(id),
        codigo_validacao VARCHAR(255) NOT NULL
    );
*/

/*
	CREATE TABLE galeria_evento(
		id INT PRIMARY KEY AUTO_INCREMENT,
        imagem VARCHAR(255) NOT NULL,
        evento_fk INT,
        FOREIGN KEY (evento_fk) REFERENCES evento(id)
    );
*/