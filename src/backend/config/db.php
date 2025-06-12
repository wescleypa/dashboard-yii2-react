<?php
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../../');
$dotenv->load();

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host='.$_ENV['DB_URL'].';dbname='.$_ENV['DB_NAME'],
    'username' => $_ENV['DB_USER'],
    'password' => $_ENV['DB_PASS'],
    'charset' => 'utf8mb4',
    'enableSchemaCache' => true,
];
