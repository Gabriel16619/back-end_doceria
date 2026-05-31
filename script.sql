create table tb_doce (
id_doce int not null primary key auto_increment,
nome varchar(100) not null,
recheio varchar(100) not null,
tipo varchar(100) not null,
sabor varchar(100) not null,
cobertura varchar(100),
data_validade date not null,
data_feito date not null
);


ALTER TABLE tb_doce DROP FOREIGN KEY FK_TIPO_DOCE; 

ALTER TABLE tb_doce DROP COLUMN id_tipo;

desc tb_tipo;

ALTER TABLE tb_doce ADD COLUMN id_tipo INT NULL;

alter table tb_doce modify column  massa varchar(100) null;

insert into tb_tipo(nome) values ('gelado'), ('quente'), ('esfarofento'), ('molhado');


ALTER TABLE tb_doce 
ADD COLUMN id_tipo INT  NULL,
ADD CONSTRAINT FK_TIPO_DOCE 
FOREIGN KEY (id_tipo) REFERENCES tb_tipo(id_tipo);

select * from tb_doce;
select * from tb_tipo;

SELECT 
    t.id_tipo,
    t.nome   
FROM tb_doce_tipo dt
INNER JOIN tb_tipo t ON t.id_tipo = dt.id_tipo
WHERE dt.id_doce = 3;

alter table tb_doce drop column id_doce;

alter table tb_doce add column massa varchar(100) not null;

desc tb_usuario;

insert into tb_usuario (nome, senha) values ('Gabriel Santos', '1234567'), ('Victoria Melo', '123435');

select * from tb_usuario;

desc tb_doce;
select * from tb_tipo;

create table tb_doce_tipo(
id_doce_tipo int not null primary key auto_increment,
id_doce int not null,
id_tipo int not null,

constraint FK_DOCE_DOCETIPO foreign key (id_doce) references tb_doce(id_doce),
constraint FK_TIPO_DOCETIPO foreign key (id_tipo) references tb_tipo (id_tipo)
);

select * from tb_doce where id_doce = 1;

create table tb_usuario(
id_usuario int not null primary key auto_increment,
nome varchar(100) not null,
senha varchar(100) not null
);

desc tb_doce_tipo;

insert into tb_usuario (nome, senha) values('Gabriel Cavalcante', '12345');

select* from tb_usuario;

create table tb_doce_usuario(
id_doce_usuario int not null primary key auto_increment,
id_doce int NOT NULL,
id_usuario int NOT NULL,

constraint FK_DOCE_DOCEUSUARIO
foreign key (id_doce)
references tb_doce(id_doce),

constraint FK_USUARIO_DOCEUSUARIO
foreign key (id_usuario)
references tb_usuario(id_usuario)

);

alter table tb_doce drop column tipo;

drop table tb_doce_usuario;


create table tb_doce_usuario(
id_doce_usuario int not null primary key auto_increment,
id_doce int NOT NULL,
id_usuario int NOT NULL,

constraint FK_DOCE_DOCEUSUARIO
foreign key (id_doce)
references tb_doce(id_doce),

constraint FK_USUARIO_DOCEUSUARIO
foreign key (id_usuario)
references tb_usuario(id_usuario)

);

create table tb_delete_doce(
id_delete_doce int not null primary key,
id_doce int,
id_usuario int,

constraint FK_DOCE_DELETEDOCE
foreign key (id_doce)
references tb_doce(id_doce),

constraint FK_USUARIO_DELETEDOCE
foreign key (id_usuario)
references tb_usuario(id_usuario)
);

insert into tb_doce (nome, recheio,  sabor, cobertura, massa, data_validade, data_feito, id_tipo)
values
('Torta de Manga', 'geleia de manga com ninho', 'Manga', 'Chantilly', 'bolacha de maisena com manteiga', '2026-07-01', '2026-06-20', 1 );


INSERT INTO tb_doce (nome, recheio, sabor, cobertura, massa, data_validade, data_feito)
VALUES ('Bolo de Milho com Requeijão', 'Milho com Requeijão', 'Milho', '', 'Milho', '2026-05-01', '2026-05-10');

INSERT INTO tb_doce_tipo (id_doce, id_tipo)
VALUES
    (LAST_INSERT_ID(), 5),
    (LAST_INSERT_ID(), 2);

select * from tb_doce;

select * from tb_tipo;

select * from tb_doce_tipo;
desc tb_usuario;

desc tb_delete_doce;

desc tb_historico_estoque;

alter table tb_delete_doce rename tb_delete_doce_usuario;

insert into tb_doce_tipo (id_doce, id_tipo) values (3, 1);

create table tb_tipo (
id_tipo int not null primary key auto_increment,
nome varchar (50) not null
);

insert into tb_tipo(nome) values ('Gelado'), ('Frito'), ('Assado');

select * from tb_doce;
select * from tb_tipo;


create table tb_historico_estoque(
id_historico_estoque int auto_increment primary key,
id_usuario int not null,
id_doce int not null,
tipo_acao enum('criar','excluir') not null,
data_acao datetime default current_timestamp,

constraint FK_DOCE_HISTORICOESTOQUE
foreign key (id_doce)
references tb_doce(id_doce),

constraint FK_USUARIO_HISTORICOESTOQUE
foreign key (id_usuario)
references tb_usuario(id_usuario)
);
 
select * from tb_doce;




