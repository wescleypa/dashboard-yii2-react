<?php

namespace app\controllers;

use app\models\Category;

class CategoryController extends ApiController
{
  public $modelClass = 'app\models\Category';

  public function behaviors()
  {
    $behaviors = parent::behaviors();


    $behaviors['access'] = [
      'class' => \yii\filters\AccessControl::class,
      'rules' => [
        [
          'allow' => true,
          'roles' => ['admin'],
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
        'query' => Category::find()->with('products'),
      ]);
    };

    return $actions;
  }
}
