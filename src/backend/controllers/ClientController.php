<?php

namespace app\controllers;

use app\models\Client;
use app\components\JwtHttpBearerAuth;
use Yii;

class ClientController extends ApiController
{
  public $modelClass = 'app\models\Client';

  public function behaviors()
  {
    $behaviors = parent::behaviors();

    $behaviors['authenticator'] = [
      'class' => JwtHttpBearerAuth::class,
      'except' => ['options'],
    ];

    $behaviors['access'] = [
      'class' => \yii\filters\AccessControl::class,
      'except' => ['options'],
      'rules' => [
        [
          'allow' => true,
          'roles' => ['@'],
          'actions' => ['create', 'delete', 'update', 'index', 'add-product'],
          'matchCallback' => function ($rule, $action) {
            $role = Yii::$app->user->identity->role;
            return in_array($role, ['admin', 'seller']);
          }
        ]
      ]
    ];

    return $behaviors;
  }

  public function actions()
  {
    $actions = parent::actions();

    $actions['index']['prepareDataProvider'] = function () {
      return new \yii\data\ActiveDataProvider([
        'query' => Client::find()->with(['clientProducts.product']),
      ]);
    };

    return $actions;
  }

  public function actionClientProducts($id)
  {
    $client = Client::findOne($id);

    if (!$client) {
      throw new \yii\web\NotFoundHttpException('Cliente não encontrado');
    }

    $products = array_map(function ($relation) {
      return [
        'relation_id' => $relation->id, // ID da customer_products
        'product' => $relation->product // Todos dados do produto
      ];
    }, $client->customerProducts);

    return [
      'client' => $client,
      'products' => $products
    ];
  }

  public function actionAddProduct($id)
  {
    $model = new \app\models\CustomerProduct();
    $model->client = $id;
    $model->load(Yii::$app->request->post(), '');

    if ($model->save()) {
      return ['success' => true, 'data' => $model];
    }

    return ['success' => false, 'errors' => $model->getErrors()];
  }
}
