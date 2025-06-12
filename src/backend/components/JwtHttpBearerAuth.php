<?php

namespace app\components;

use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\web\UnauthorizedHttpException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtHttpBearerAuth extends HttpBearerAuth
{
  public $except = [];

  public function beforeAction($action)
  {
    // Skip authentication for excepted actions
    if (in_array($action->id, $this->except)) {
      return true;
    }

    return parent::beforeAction($action);
  }

  public function authenticate($user, $request, $response)
  {
    $authHeader = $request->getHeaders()->get('Authorization');
    if ($authHeader && preg_match('/^Bearer\s+(.*?)$/', $authHeader, $matches)) {
      $token = $matches[1];
      try {
        $decoded = JWT::decode($token, new Key($_ENV['JWT_KEY'], 'HS256'));
        $identity = \app\models\User::findOne($decoded->data->id);
        if ($identity) {
          Yii::$app->user->setIdentity($identity);
          return $identity;
        }
      } catch (\Exception $e) {
        throw new UnauthorizedHttpException('Token inválido: ' . $e->getMessage());
      }
    }

    throw new UnauthorizedHttpException('Token JWT ausente ou inválido');
  }

  public function challenge($response)
  {
    $response->getHeaders()->set('WWW-Authenticate', 'Bearer realm="api"');
  }

  public function handleFailure($response)
  {
    $this->challenge($response);
    $response->setStatusCode(401);
    $response->data = [
      'name' => 'Unauthorized',
      'message' => 'You are requesting with an invalid credential.',
      'code' => 0,
      'status' => 401,
    ];
  }
}
