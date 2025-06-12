<?php

namespace app\models;

use yii\db\ActiveRecord;

class Client extends ActiveRecord
{
  public static function tableName()
  {
    return 'clients';
  }

  public function rules()
  {
    return [
      [['name', 'email'], 'required'],
      [['email'], 'email'],
      [['active'], 'integer'],
      [['picture'], 'safe'],
      [['created_at', 'updated_at'], 'safe'],
      [['name'], 'string', 'max' => 250],
      [['email'], 'string', 'max' => 50],
      [['email'], 'unique'],
    ];
  }

  public function extraFields()
  {
    return ['clientProducts'];
  }

  public function getCustomerProducts()
  {
    return $this->hasMany(CustomerProduct::class, ['client' => 'id']);
  }

  public function getProducts()
  {
    return $this->hasMany(Product::class, ['id' => 'product'])
      ->via('customerProducts');
  }

  public function getClientProducts()
  {
    return $this->hasMany(CustomerProduct::class, ['client' => 'id'])
      ->with('product') // Carrega o relacionamento
      ->asArray();
  }
}
