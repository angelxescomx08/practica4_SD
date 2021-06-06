create database tiempo;
use tiempo;

create table Hora_central(
    id int AUTO_INCREMENT primary key,
    hora_previa varchar(10),
    hora_referencia varchar(10)
);

create table Equipo(
    id int AUTO_INCREMENT primary key,
    latencia int
);

create table Hora_equipo(
    id int AUTO_INCREMENT primary key,
    id_central int,
    id_equipo int,
    FOREIGN KEY (id_central) REFERENCES Hora_central(id) ON DELETE CASCADE,
    FOREIGN KEY (id_equipo) REFERENCES Equipo(id) ON DELETE CASCADE
);