<?php
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../../');
$dotenv->load();
$db = require __DIR__ . '/db.php';

return [
  'id' => 'vianashop',
  'basePath' => dirname(__DIR__),
  'components' => [
    'db' => $db,
    'user' => [
      'identityClass' => 'app\models\User',
      'enableAutoLogin' => false,
      'enableSession' => false,
      'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
    ],
    'request' => [
      'enableCookieValidation' => false,
      'enableCsrfValidation' => false,
    ],
    'jwt' => [
      'class' => \sizeg\jwt\Jwt::class,
      'key' => $_ENV['JWT_KEY']
    ],
    'urlManager' => [
      'enablePrettyUrl' => true,
      'showScriptName' => false,
      'rules' => [
        ['class' => 'yii\rest\UrlRule', 'controller' => 'category'],
        ['class' => 'yii\rest\UrlRule', 'controller' => 'product'],
        ['class' => 'yii\rest\UrlRule', 'controller' => 'client'],
        ['class' => 'yii\rest\UrlRule', 'controller' => 'user'],
        ['class' => 'yii\rest\UrlRule', 'controller' => 'report'],
        ['class' => 'yii\rest\UrlRule', 'controller' => 'customer-product'],

        'PUT product/{id}' => 'product/update',
        'GET clients' => 'client/index',
      ],
    ],
  ],
];
