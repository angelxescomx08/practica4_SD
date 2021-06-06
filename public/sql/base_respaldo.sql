create database practica4_respaldo;
use practica4_respaldo;

create table Libro(
    ISBN varchar(13) NOT NULL primary key,
    nombre varchar(50) NOT NULL,
    autor varchar(50) NOT NULL,
    editorial varchar(50) NOT NULL,
    precio float NOT NULL,
    link varchar(50)
);

create table Pedido(
    id int NOT NULL AUTO_INCREMENT primary key,
    fecha date NOT NULL,
    hora time NOT NULL,
    libro varchar(13) NOT NULL,
    FOREIGN KEY (libro) REFERENCES Libro(ISBN) ON DELETE CASCADE
);

create table Usuario(
    ip varchar(20) NOT NULL primary key,
    nombre varchar(50)
);

create table Sesion(
    id_sesion int NOT NULL AUTO_INCREMENT primary key,
    id_pedido int NOT NULL,
    id_cliente varchar(20) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES Usuario(ip) ON DELETE CASCADE
);

INSERT INTO Libro values ('9780060098919','El gran Gatsby','F. Scott','Anagrama',123.53,'./img/el-gran-gatsby.jpg');
INSERT INTO Libro values ('9780064105489','El perfume','Patrick Suskind','Seix Barral',218.14,'./img/el-perfume.jpg');
INSERT INTO Libro values ('8721064105489','El senor de los anillos','J. R. R. Tolkien','Tirant Lo Blanch',762.09,'./img/el-senor-de-los-anillos.jpg');
INSERT INTO Libro values ('8721040602154','El resplandor','Stephen King','Alfaguara',167.70 ,'./img/el-resplandor.jpg');
INSERT INTO Libro values ('0457890602154','Matar a un ruisenor','Harper Lee','J. B. Lippincott',214.70,'./img/matar-a-un-ruisenor.jpg' );