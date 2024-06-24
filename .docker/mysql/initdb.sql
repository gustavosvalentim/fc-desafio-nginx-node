create database if not exists fullcycle;

create table if not exists fullcycle.people (
    id int auto_increment primary key,
    name varchar(150)
)