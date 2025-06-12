<?php

namespace app\models;

use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use Yii;

use app\components\JwtHelper;

class User extends ActiveRecord implements IdentityInterface
{
  public static function tableName()
  {
    return 'users';
  }

  public function rules()
  {
    return [
      [['email', 'password'], 'required'],
      [['role'], 'string'],
      [['active'], 'integer'],
      [['created_at', 'updated_at'], 'safe'],
      [['name'], 'string', 'max' => 50],
      [['email'], 'string', 'max' => 50],
      [['password'], 'string', 'max' => 250],
      [['email'], 'unique'],
      ['role', 'in', 'range' => ['admin', 'seller']],
    ];
  }

  public static function findIdentity($id)
  {
    return static::findOne($id);
  }

  public static function findIdentityByAccessToken($token, $type = null)
  {
    try {
      $decoded = \Firebase\JWT\JWT::decode(
        $token,
        new \Firebase\JWT\Key($_ENV['JWT_KEY'], 'HS256')
      );

      return static::findOne($decoded->id);
    } catch (\Exception $e) {
      Yii::error("Token inválido: " . $e->getMessage());
      return null;
    }
  }

  public function getId()
  {
    return $this->id;
  }

  public function getRole()
  {
    return $this->role;
  }

  public function getAuthKey()
  {
    return $this->auth_key;
  }

  public function validateAuthKey($authKey)
  {
    return $this->auth_key === $authKey;
  }

  public function validatePassword($password)
  {
    return Yii::$app->security->validatePassword($password, $this->password);
  }

  public function beforeSave($insert)
  {
    if (parent::beforeSave($insert)) {
      if ($this->isNewRecord) {
        $this->password = Yii::$app->security->generatePasswordHash($this->password);
      }
      return true;
    }
    return false;
  }

  public function generateJwt($user)
  {
    $token = JwtHelper::generateToken(['id' => $user->id, 'email' => $user->email, 'role' => $user->role]);
    return $token;
  }
}
