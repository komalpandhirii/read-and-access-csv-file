create database flatFiles;

use flatFiles;
select * from user;

create table user (
	memberId int auto_increment primary key,
    first_name varchar(100) not null,
    last_name varchar(100),
    card_no bigint(12) not null,
    email varchar(100),
    country_code int,
    mobile bigint
);

drop table user;

insert into user(first_name,last_name,card_no,email,country_code,mobile)
values ('Chanchal', 'Pandhiri',874833112122,'chanchal@gmail.com',400066,6325463877),
('Keval', 'Vadher',874833112123,'keval@gmail.com',400043,9594477089),
('Ajay', 'Patel',874833112124,'ajay@gmail.com',400067,7209726380),
('Heena', 'Paleja',874833112126,'heena@gmail.com',400078,9836276274);

use flatFiles;
select * from user;

select* from flat_file;
create table flat_file (
	flatFileId int auto_increment primary key,
    file_name varchar(100) not null,
    total_count bigint,
    success_count bigint,
    failure_count bigint
);

select * from flat_file;

drop table flat_file;

select * from transactionTable;

create table transactionTable (
	unique_transaction_id int primary key,
    memberId int,
    flatFileId int,
    transaction_date date,
    card_no bigint(12),
    amount bigint,
	FOREIGN KEY (memberId) REFERENCES user(memberId),
	FOREIGN KEY (flatFileId) REFERENCES flat_file(flatFileId)
);

drop table transactionTable;

select * from flat_file_data;

create table flat_file_data (
	id int auto_increment primary key,
	flatFileId int ,
    unique_transaction_id int ,
	transactionDate date,
    card_no bigint(12),
    amount bigint,
    FOREIGN KEY (flatFileId) REFERENCES flat_file(flatFileId),
    status varchar(100),
    error varchar(200)
);

drop table flat_file_data;

use practice;
drop table member;
