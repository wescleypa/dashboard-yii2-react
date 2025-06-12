<?php

namespace app\models;

use yii\db\ActiveRecord;

class Category extends ActiveRecord
{
  public static function tableName()
  {
    return 'categories';
  }

  public function rules()
  {
    return [
      [['name'], 'required'],
      [['desc'], 'string'],
      [['active'], 'integer'],
      [['created_at', 'updated_at'], 'safe'],
      [['name'], 'string', 'max' => 255],
    ];
  }

  public function getProducts()
  {
    return $this->hasMany(Product::class, ['categorie' => 'id']);
  }
}
