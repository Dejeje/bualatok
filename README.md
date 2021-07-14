1- Esta práctica ha sido desarrollada en VSCode
2- Para lanzarla, hay que abrir un terminal
3- Entrar a la carpeta raiz del proyecto.
4- Ejecutar el comando: node app.js
5- Lanzar en un navegador la web http://localhost:8080/

Esta página web ofrece la funcionalidad de registrar o editar un usuario, logearte y deslogearte, registrar un producto, 
ver todos los productos creados por todos los usuarios y ver tus propios productos.

Esta practica ha sido realizada por Jesus Pérez Abellán y David García González.

Para que las queries en mysql funcionen es necesario crear dos tablas siguiendo las sentencias que se detallan:

CREATE TABLE `user` (
  `username` varchar(12) NOT NULL,
  `password` varchar(24) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `surname` varchar(64) DEFAULT NULL,
  `credit` int DEFAULT NULL,
  `province` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product` (
  `idproduct` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `description` varchar(128) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `owner` varchar(45) DEFAULT NULL,
  `timesSeen` int DEFAULT 0,
  PRIMARY KEY (`idproduct`),
  KEY `user_owner_idx` (`owner`),
  CONSTRAINT `user_owner` FOREIGN KEY (`owner`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM daweb.product;
