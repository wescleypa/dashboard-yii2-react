<?php

namespace app\controllers;

use app\models\User;
use Yii;
use app\components\JwtHelper;

class UserController extends ApiController
{
  public $modelClass = 'app\models\User';

  public function behaviors()
  {
    $behaviors = parent::behaviors();

    $behaviors['access'] = [
      'class' => \yii\filters\AccessControl::class,
      'rules' => [
        [
          'allow' => true,
          'actions' => ['login', 'login-with-token'],
          'roles' => ['?', '@'],
        ],
        [
          'allow' => true,
          'actions' => ['create'],
          'roles' => ['admin'],
        ]
      ],
    ];

    return $behaviors;
  }

  public function actionLogin()
  {
    $request = Yii::$app->request;
    $email = $request->post('email');
    $password = $request->post('password');

    $user = User::findOne(['email' => $email]);

    if ($user && $user->validatePassword($password)) {
      $userData = [
        'token' => (string) $user->generateJwt($user),
        'id' => $user->id,
        'avatar_url' => $user->avatar_url,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $user->role,
      ];

      Yii::$app->user->login($user);

      return $userData;
    }
   
    throw new \yii\web\UnauthorizedHttpException('Email ou senha inválidos');
  }

  public function actionLoginWithToken()
  {
    $token = Yii::$app->request->post('token');

    if (empty($token)) {
      throw new \yii\web\BadRequestHttpException('Token não fornecido');
    }

    try {
      $decoded = JwtHelper::validateToken($token);

      if (!$decoded) {
        throw new \yii\web\UnauthorizedHttpException('Token inválido ou expirado.');
      }

      $user = User::findOne($decoded->id);

      if (!$user) {
        throw new \yii\web\UnauthorizedHttpException('Usuário não encontrado');
      }

      Yii::$app->user->login($user);

      return [
        'success' => true,
        'data' => [
          'token' => (string) $token,
          'id' => $user->id,
          'avatar_url' => $user->avatar_url,
          'name' => $user->name,
          'email' => $user->email,
          'role' => $user->role,
        ]
      ];
    } catch (\Exception $e) {
      throw new \yii\web\UnauthorizedHttpException('Token inválido: ' . $e->getMessage());
    }
  }
}
