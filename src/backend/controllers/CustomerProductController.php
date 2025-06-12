<?php

namespace app\controllers;

use app\components\JwtHttpBearerAuth;
use Yii;

class CustomerProductController extends ApiController
{
  public $modelClass = 'app\models\CustomerProduct';

  public function behaviors()
  {
    $behaviors = parent::behaviors();

    $behaviors['authenticator'] = [
      'class' => JwtHttpBearerAuth::class,
      'except' => ['options']
    ];

    $behaviors['access'] = [
      'class' => \yii\filters\AccessControl::class,
      'rules' => [
        [
          'allow' => true,
          'roles' => ['@'],
          'actions' => ['create', 'index', 'delete'],
          'matchCallback' => function ($rule, $action) {
            $role = Yii::$app->user->identity->role;
            return in_array($role, ['admin', 'seller']);
          }
        ]
      ]
    ];

    return $behaviors;
  }

  public function fields()
  {
    return [
      'id', // ID da relação customer_products
      'client',
      'product' => function ($model) {
        return $model->product; // Retorna todo o objeto do produto
      },
      'created_at'
    ];
  }

  public function actions()
  {
    $actions = parent::actions();

    $actions['create']['class'] = 'yii\rest\CreateAction';
    $actions['create']['modelClass'] = $this->modelClass;

    return $actions;
  }
}
