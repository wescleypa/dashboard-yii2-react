<?php

namespace app\models;

use yii\db\ActiveRecord;

class CustomerProduct extends ActiveRecord
{
  public static function tableName()
  {
    return 'customer_products';
  }

  public function rules()
  {
    return [
      [['client', 'product'], 'required'],
      [['client', 'product'], 'integer'],
      [['created_at'], 'safe'],
      [['client'], 'exist', 'skipOnError' => true, 'targetClass' => Client::class, 'targetAttribute' => ['client' => 'id']],
      [['product'], 'exist', 'skipOnError' => true, 'targetClass' => Product::class, 'targetAttribute' => ['product' => 'id']],
    ];
  }

  public function getClient()
  {
    return $this->hasOne(Client::class, ['id' => 'client']);
  }

  public function getProduct()
  {
    return $this->hasOne(Product::class, ['id' => 'product']);
  }
}
