<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\filters\ContentNegotiator;
use yii\web\Response;

class ApiController extends ActiveController
{
  public $modelClass = '';

  public function behaviors()
  {
    $behaviors = parent::behaviors();

    // Remove autenticação para listar e visualizar (LOGIN, NECESSAARIO)
    if ($this->action->id === 'index' || $this->action->id === 'view') {
      unset($behaviors['authenticator']);
    }

    // Configura CORS
    $behaviors['cors'] = [
      'class' => Cors::class,
      'cors' => [
        'Origin' => ['*'],
        'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'Access-Control-Request-Headers' => ['*'],
        'Access-Control-Allow-Credentials' => null,
        'Access-Control-Max-Age' => 86400,
      ],
    ];

    // Configura content negotiator
    $behaviors['contentNegotiator'] = [
      'class' => ContentNegotiator::class,
      'formats' => [
        'application/json' => Response::FORMAT_JSON,
      ],
    ];
    return $behaviors;
  }

  public function beforeAction($action)
  {
    \Yii::$app->response->headers->set('Access-Control-Allow-Origin', '*');
    \Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    \Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

    if (\Yii::$app->request->isOptions) {
      \Yii::$app->response->statusCode = 200;
      return false;
    }

    return parent::beforeAction($action);
  }
}
