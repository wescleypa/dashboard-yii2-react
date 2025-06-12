<?php

namespace app\models;

use yii\db\ActiveRecord;

class Teste extends ActiveRecord
{
  public static function tableName()
  {
    return 'vaipraga';
  }

  public function rules()
  {
    return [
      [['name', 'sale_price'], 'required'],
      [['desc'], 'string'],
      [['picture'], 'safe'],
      [['active'], 'safe'],
      [['cost_price', 'sale_price'], 'number'],
      [['created_at', 'updated_at'], 'safe'],
      [['name'], 'string', 'max' => 50],
    ];
  }

/*   public function fields()
  {
    $fields = parent::fields();
    $fields['category_name'] = function ($model) {
      return $model->category ? $model->category->name : null;
    };

    return $fields;
  }
 */

  public function getCategory()
  {
    return $this->hasOne(Category::class, ['id' => 'categorie']);
  }

  public function getCategoryName()
  {
    return $this->category ? $this->category->name : null;
  }

  public function getCustomerProducts()
  {
    return $this->hasMany(CustomerProduct::class, ['product' => 'id']);
  }
}
