<?php

namespace app\controllers;

use app\components\JwtHttpBearerAuth;
use app\models\Product;
use Yii;

class ProductController extends ApiController
{
  public $modelClass = 'app\models\Product';

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
          'actions' => ['index', 'view'],
          'roles' => ['?', '@'],
        ],
        [
          'allow' => true,
          'roles' => ['@'],
          'actions' => ['update'],
          'matchCallback' => function ($rule, $action) {
            $role = Yii::$app->user->identity->role;
            return in_array($role, ['admin', 'seller']);
          }
        ],
        [
          'allow' => true,
          'roles' => ['@'],
          'actions' => ['delete', 'create'],
          'matchCallback' => function ($rule, $action) {
            $role = Yii::$app->user->identity->role;
            return in_array($role, ['admin']);
          }
        ],
      ],
    ];

    return $behaviors;
  }

  public function actions()
  {
    $actions = parent::actions();

    $actions['index']['prepareDataProvider'] = function () {
      $request = \Yii::$app->request;
      $query = Product::find()->alias('p')->with('category');

      // Filter by name
      $name = $request->get('name');
      if (!empty($name)) {
        $query->andWhere(['like', 'p.name', $name]);
      }

      // Filter by client/product
      $customerId = $request->get('customer_id');
      if (!empty($customerId)) {
        $query->joinWith('customerProducts cp')
          ->andWhere(['cp.client' => $customerId]);
      }

      // Limit search
      $limit = (int) $request->get('limit', 50);
      $query->limit($limit);

      return new \yii\data\ActiveDataProvider([
        'query' => $query,
        'pagination' => false,
      ]);
    };

    return $actions;
  }
}
