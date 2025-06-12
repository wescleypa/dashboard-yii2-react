<?php
defined('YII_DEBUG') or define('YII_DEBUG', false);

require __DIR__ . '/../../../vendor/autoload.php';
require __DIR__ . '/../../../vendor/yiisoft/yii2/Yii.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$config = require __DIR__ . '/../../../src/backend/config/web.php';

(new yii\web\Application($config))->run();
