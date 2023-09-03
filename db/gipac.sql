drop database if exists gipac;
create database if not exists gipac;
use gipac;
create table if not exists anuncio(id_anuncion int auto_increment primary key,detalle_anuncio text,
                     url_foto_anuncio longtext,estado smallint(1) default 1);
create table if not exists rol(id_rol int auto_increment primary key,detalle varchar(250),estado smallint(1) default 1);
create table if not exists usuario(email_usuario varchar(250) primary key,contrasenia longtext not null ,nombre_usuario varchar(250),
                telefono_usuario varchar(50),dni_usuario varchar(50),
                sexo_usuario smallint(1) default 1 comment '1 -> MASCULINO 0 -> FEMENINO',
                estado smallint(1) default 1,
                fk_id_rol int not null );
create table if not exists tipo_departamento(id_tipo_departamento int auto_increment primary key,detalle_tipo_departamento text not null,
                                             precio_arriendo decimal(6,2) default 200.00,estado smallint(1) default 1);
create table if not exists departamento(code_departamento varchar(10) primary key,num_piso smallint default 1,
                                        detalle_departamento longtext,fk_id_tipo_departamento int not null,
                                        estado smallint(1) default 1 comment '1 -> activo (disponible) ... 0 inactivo (elimnado) .... 2 arrendado');
create table if not exists vehiculo(placa_vehiculo varchar(10) primary key,modelo_vehiculo varchar(250),
                           detalle_vehiculo longtext,fk_email_usuario varchar(250) not null,estado smallint(1) default 1);
create table if not exists usuario_departamento(usuario_departamento int auto_increment primary key,
                           fk_email_usuario varchar(250) not null,fk_code_departamento varchar(10) not null,
                           fecha_arrendamiento datetime default now(),fecha_cancelacion_arriendo datetime,
                           estado smallint(1) default 1 comment '1-> activo ... 0 inactivo (el usuario dejop de arrendar)');
create table if not exists rubro(id_rubro int primary key auto_increment,detalle_rubro varchar(250),
                                 precio_rubro decimal(10,2) default 0.00,estado smallint(1) default 1);
create table if not exists tipo_pago(id_tipo_pago int auto_increment primary key ,detalle_tipo_pago varchar(250));
create table if not exists pago_departamento(id_pago_departamento int primary key auto_increment,
                           fecha_creacion datetime default now(),
                           motivo varchar(250),
                           code_referencia varchar(250),
                           fk_code_departamento varchar(10),foto_url_deposito longtext,
                           fk_email_usuario varchar(250),
                           fk_tipo_pago int,
                           fk_cuenta_banco varchar(250),
                           estado smallint(1) default 1 comment '1 -> en espera de pago...... 2 -> en proceso de verificacion ..... 3 -> verificado y comprobado ..... 4 -> error al comprobar el comprobante');
create table if not exists banco(id_banco int auto_increment primary key ,detalle_banco varchar(250) collate utf8mb4_general_ci);
create table if not exists cuenta_bancaria(num_cuenta_bancaria varchar(50) primary key,fk_email_usuario varchar(250),fk_banco int);

create table if not exists tipo_soporte(id_tipo_soporte int primary key auto_increment,detalle_soporte varchar(250) not null,estado smallint(1) default 1);

create table if not exists soporte(id_soporte int primary key auto_increment,
             fk_tipo_soporte int not null,
             fecha_apertura datetime not null,
             detalle_soporte longtext,
             usuario_emisor_ticket varchar(250) not null,
             url_img longtext,
             url_archivo longtext,
             asunto_soporte longtext,
             usuario_receptor_ticket varchar(250),
             solucion_ticket longtext,
             fecha_solucion datetime,
             estado smallint(1) default 1 comment '1 -> enviado .... 2 -> en proceso ... 3 -> finalizado ... 0 -> cancelado');

/******** SQL POR DEFECTOS ********/
insert into rol(detalle) values ('Administrador');
insert into rol(detalle) values ('Clientes');
insert into rol(detalle) values ('Servicios');
insert into usuario(email_usuario,contrasenia, nombre_usuario, telefono_usuario, dni_usuario, fk_id_rol) VALUES ('guaman1579@gmail.com',MD5('12345678'),'Administrador',
                                                   '0993706012','0604666982',1);
insert into banco(detalle_banco) values ('BANCO CENTRAL DEL ECUADOR');
insert into banco(detalle_banco) values ('BANCO NACIONAL DE FOMENTO');
insert into banco(detalle_banco) values ('BANCO AMAZONAS');
insert into banco(detalle_banco) values ('BANCO DEL PACIFICO');
insert into banco(detalle_banco) values ('BANCO PICHINCHA');
insert into banco(detalle_banco) values ('BANCO DE MACHALA');
insert into banco(detalle_banco) values ('BANCO SUDAMERICANO');
insert into banco(detalle_banco) values ('PRODUBANCO');
insert into banco(detalle_banco) values ('BANCO INTERNACIONAL');
insert into banco(detalle_banco) values ('COOPERATIVA DE AHORRO Y CRÉDITO CÁMARA DE COMERCIO AMBATO');
insert into banco(detalle_banco) values ('BANCO PROMERICA');
insert into banco(detalle_banco) values ('COOPERATIVA DE AHORRO Y CRÉDITO “EL DISCAPACITADO” LTDA.');
insert into banco(detalle_banco) values ('BANCO CAPITAL S.A.');
insert into banco(detalle_banco) values ('FINANCIERA DE LA REPUBLICA S.A “FIRESA”');

insert into tipo_pago(detalle_tipo_pago) values ('TRANSFERENCIA PROPIO BANCO');
insert into tipo_pago(detalle_tipo_pago) values ('TRANSFERECIA INTERBANCARIA');
insert into tipo_pago(detalle_tipo_pago) values ('PAGO INMEDIATO');

insert into tipo_departamento(detalle_tipo_departamento, precio_arriendo) VALUES ('Estudio/estudio convertible',250);
insert into tipo_departamento(detalle_tipo_departamento, precio_arriendo) VALUES ('Departamento de interés social',350);
insert into tipo_departamento(detalle_tipo_departamento, precio_arriendo) VALUES ('Loft',500);
insert into tipo_departamento(detalle_tipo_departamento, precio_arriendo) VALUES ('Duplex o Triplex',800);

insert into rubro(detalle_rubro, precio_rubro) values ('ARANCEL CUOTA ESTACIONAMIENTO',10.50);
insert into rubro(detalle_rubro, precio_rubro) values ('ARANCEL ALUMBRAMIENTO',5);
insert into rubro(detalle_rubro, precio_rubro) values ('ARANCEL REMODELACION DE VIAS',50);

insert into tipo_soporte(detalle_soporte, estado) VALUES ('RECLAMOS',1);
insert into tipo_soporte(detalle_soporte, estado) VALUES ('RESERVA DE SERVICIO',1);
insert into tipo_soporte(detalle_soporte, estado) VALUES ('SOLICITUD DE ARRENDAMIENTO',1);
insert into tipo_soporte(detalle_soporte, estado) VALUES ('OTROS',1);

alter table usuario add constraint rel_rol_usuario foreign key usuario(fk_id_rol) references rol(id_rol);
alter table departamento add constraint rel_tipo_departamento_departamento foreign key departamento(fk_id_tipo_departamento)
                         references tipo_departamento(id_tipo_departamento);
alter table vehiculo add constraint rel_vehiculo_usuario foreign key vehiculo(fk_email_usuario) references usuario(email_usuario);
alter table cuenta_bancaria add constraint rel_cuenta_bancaria_banco foreign key cuenta_bancaria(fk_banco) references banco(id_banco);
alter table cuenta_bancaria add constraint rel_cuenta_bancaria_usuario foreign key cuenta_bancaria(fk_email_usuario) references usuario(email_usuario);
alter table pago_departamento add constraint rel_pago_departamento_tipo_pago foreign key pago_departamento(fk_tipo_pago)
                              references tipo_pago(id_tipo_pago);
alter table pago_departamento add constraint rel_pago_departamento_departamento foreign key pago_departamento(fk_code_departamento)
                              references departamento(code_departamento);
alter table usuario_departamento add constraint rel_usuario_departamento foreign key usuario_departamento(fk_code_departamento)
                              references departamento(code_departamento);
alter table usuario_departamento add constraint rel_usuario_departamento_usuario foreign key usuario_departamento(fk_email_usuario)
                              references usuario(email_usuario);

alter table departamento add column actual_usuario_arrendador varchar(250);
alter table departamento add column fecha_arrendado datetime;

alter table soporte add constraint rel_soporte_tipo_soporte foreign key soporte(fk_tipo_soporte) references tipo_soporte(id_tipo_soporte);
alter table soporte add constraint rel_soporte_usuario_emisor foreign key usuario(usuario_emisor_ticket) references usuario(email_usuario);

/***********************************************************************/

select * from tipo_soporte where estado = 1;
insert into soporte(fecha_apertura,asunto_soporte,detalle_soporte,fk_tipo_soporte, usuario_emisor_ticket,
                    url_img, url_archivo) values (now(),'BASURERO DEMASIADO LLENO','Porfavor recolectar la basura, no se pude vivir asi',
                                                  1,'juan.carrera@espoch.edu.ec','https://firebasestorage.googleapis.com/v0/b/gipac-d45bf.appspot.com/o/ticket_image%2F18062021-ENT-06I04.jpg.jpg?alt=media',null);
insert into soporte(fecha_apertura,asunto_soporte,detalle_soporte,fk_tipo_soporte, usuario_emisor_ticket,
                    url_img, url_archivo) values (now(),'RESERVA DE PISINA','NECESITO RESERVAR LA PISINA A LAS 2023-09-04 10:00',2,'test','',null);
insert into soporte(fecha_apertura,asunto_soporte,detalle_soporte,fk_tipo_soporte, usuario_emisor_ticket,
                    url_img, url_archivo) values (now(),'OFICIO ARRENDAMIENTO POLICIAL','Buenos dias, porfavor solicito se atienda el siguiente oficio para arrendar el departamento al suscrito en el oficio',3,'vivi@gmail.com',null,'https://firebasestorage.googleapis.com/v0/b/gipac-d45bf.appspot.com/o/ticket_archivo%2FContratoResidenciaUniversitariaESPE.pdf?alt=media');
insert into soporte(fecha_apertura,asunto_soporte,detalle_soporte,fk_tipo_soporte, usuario_emisor_ticket,
                    url_img, url_archivo) values (now(),'AYUDA EN MAYOR PATRULLAMIENTO','Solicito de patrulle mi departamneto por motivo de viaje',4,'juan.carrera@espoch.edu.ec','',null);
select * from soporte;



update soporte set estado = 0,solucion_ticket='',fecha_solucion = now(),usuario_receptor_ticket='' where id_soporte = 0;


