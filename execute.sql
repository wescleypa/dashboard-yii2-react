-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.42 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para viana_shop
DROP DATABASE IF EXISTS `viana_shop`;
CREATE DATABASE IF NOT EXISTS `viana_shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `viana_shop`;

-- Copiando estrutura para tabela viana_shop.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `desc` text,
  `active` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Categorias de produtos';

-- Copiando dados para a tabela viana_shop.categories: ~1 rows (aproximadamente)
INSERT INTO `categories` (`id`, `name`, `desc`, `active`, `created_at`, `updated_at`) VALUES
	(1, 'teste', 'dasd', 1, '2025-06-09 17:45:29', '2025-06-09 17:45:29');

-- Copiando estrutura para tabela viana_shop.clients
DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `email` varchar(50) NOT NULL,
  `active` int DEFAULT '1',
  `picture` longtext,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de clientes';

-- Copiando dados para a tabela viana_shop.clients: ~5 rows (aproximadamente)
INSERT INTO `clients` (`id`, `name`, `email`, `active`, `picture`, `created_at`, `updated_at`) VALUES
	(16, 'Joao jorge', 'joaojorge@gmail.com', 1, 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-in-shirt-smiles-and-gives-thumbs-up-to-show-approval-png-image_13146336.png', '2025-06-12 21:24:37', '2025-06-12 21:24:37'),
	(17, 'José Miguel', 'josemiguel@gmail.com', 1, 'https://purepng.com/public/uploads/large/purepng.com-thinking-manthinking-manpersongentle-men-thinkingthinking-brain-1421526976458gpxqy.png', '2025-06-12 21:24:56', '2025-06-12 21:24:56'),
	(18, 'Carlos Alberto', 'carlosalberto@gmail.com', 1, 'https://static.vecteezy.com/system/resources/previews/041/642/170/non_2x/ai-generated-portrait-of-handsome-smiling-young-man-with-folded-arms-isolated-free-png.png', '2025-06-12 21:25:15', '2025-06-12 21:25:15'),
	(19, 'Yuri Souza', 'yurisouza@gmail.com', 1, 'https://purepng.com/public/uploads/large/purepng.com-business-manbusinessmanbusinesssalesrevenuegeneratingsuits-1421526838614bzxy9.png', '2025-06-12 21:25:30', '2025-06-12 21:25:30'),
	(20, 'Jair Messias', 'jairmessias@gmail.com', 1, 'https://rsf.org/sites/default/files/rsf_drupal7/jair_bolsonaro.png', '2025-06-12 21:25:45', '2025-06-12 21:25:45');

-- Copiando estrutura para tabela viana_shop.customer_products
DROP TABLE IF EXISTS `customer_products`;
CREATE TABLE IF NOT EXISTS `customer_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client` int NOT NULL,
  `product` int NOT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `client_product` (`client`),
  KEY `product_product` (`product`),
  CONSTRAINT `client_product` FOREIGN KEY (`client`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_product` FOREIGN KEY (`product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Produtos do cliente';

-- Copiando dados para a tabela viana_shop.customer_products: ~13 rows (aproximadamente)
INSERT INTO `customer_products` (`id`, `client`, `product`, `created_at`) VALUES
	(77, 16, 20, '2025-01-12 21:33:09'),
	(78, 16, 21, '2025-06-12 21:33:09'),
	(79, 17, 20, '2025-02-12 21:33:15'),
	(80, 17, 22, '2025-06-12 21:33:15'),
	(81, 18, 22, '2025-06-12 21:33:21'),
	(82, 18, 23, '2025-06-12 21:33:21'),
	(83, 19, 23, '2025-06-12 21:33:27'),
	(84, 19, 24, '2025-06-12 21:33:27'),
	(85, 20, 20, '2025-06-12 21:33:34'),
	(86, 20, 21, '2025-06-12 21:33:34'),
	(87, 20, 22, '2025-03-13 21:33:34'),
	(88, 20, 23, '2025-04-12 21:33:34'),
	(89, 20, 24, '2025-05-12 21:33:34');

-- Copiando estrutura para tabela viana_shop.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `desc` text,
  `picture` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `sale_price` decimal(10,2) NOT NULL DEFAULT (0),
  `active` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Produtos';

-- Copiando dados para a tabela viana_shop.products: ~5 rows (aproximadamente)
INSERT INTO `products` (`id`, `name`, `desc`, `picture`, `cost_price`, `sale_price`, `active`, `created_at`, `updated_at`) VALUES
	(20, 'Headset', 'um lindo headset gamer para tu perder em todas partidas', 'https://images.vexels.com/media/users/3/136166/isolated/preview/10e1c15978cf71f10e008a614817533c-desenhos-animados-de-headphon.png', 90.32, 134.00, 1, '2025-06-12 21:28:49', '2025-06-12 21:28:49'),
	(21, 'CPU Gamer', 'Uma linda CPU que diz ser gamer, mas nao é', 'https://images.vexels.com/media/users/3/128638/isolated/preview/cf3250ba4e47c1590d8ee3e484f5c4e2-icone-plano-da-torre-da-cpu-do-pc.png', 240.00, 780.25, 0, '2025-06-12 21:29:25', '2025-06-12 21:29:25'),
	(22, 'Violao', 'Um lindo violao para ficar de enfeite em sua parede', 'https://images.vexels.com/media/users/3/139538/isolated/preview/817f15a3c91a72cc88778da9ac312a59-violao.png', 430.24, 950.21, 1, '2025-06-12 21:30:04', '2025-06-12 21:30:04'),
	(23, 'Mouse Razer', 'Um maravilhoso mouse para jogar com Aimbot no Counter Strike 2', 'https://www.pngplay.com/wp-content/uploads/2/Gaming-Pc-Mouse-PNG-Clipart-Background.png', 345.00, 442.00, 1, '2025-06-12 21:30:44', '2025-06-12 21:30:44'),
	(24, 'Teclado funcional', 'Um ótimo teclado para voce nao nao ver as letrasss duplicaaaaando ou falhando igual ao  meu', 'https://static.vecteezy.com/system/resources/thumbnails/011/665/175/small_2x/slim-thai-and-english-keyboard-isolated-on-white-background-png.png', 32.00, 37.40, 1, '2025-06-12 21:32:09', '2025-06-12 21:32:09');

-- Copiando estrutura para tabela viana_shop.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `avatar_url` text,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` enum('admin','seller') DEFAULT 'seller',
  `active` int DEFAULT (1),
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de usuários';

-- Copiando dados para a tabela viana_shop.users: ~2 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `avatar_url`, `email`, `password`, `role`, `active`, `created_at`, `updated_at`) VALUES
	(2, 'Wescley Andrade', 'https://cdn-icons-png.flaticon.com/512/9703/9703596.png', 'admin@viana.com', '$2y$13$k0OyQYe9ycFhzp8qgkgbPeOjvz8uaxteIPX9xlisfZizWjvM0j/cG', 'admin', 1, '2025-06-08 20:41:02', '2025-06-08 20:41:02'),
	(3, 'Wescley Andrade', 'https://cdn-icons-png.flaticon.com/512/4515/4515443.png', 'seller@viana.com', '$2y$13$k0OyQYe9ycFhzp8qgkgbPeOjvz8uaxteIPX9xlisfZizWjvM0j/cG', 'seller', 1, '2025-06-12 20:59:21', '2025-06-12 20:59:21');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
