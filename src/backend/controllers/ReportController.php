<?php

namespace app\controllers;

use app\components\JwtHttpBearerAuth;
use Yii;

class ReportController extends ApiController
{
  public $modelClass = '';

  public function behaviors()
  {
    $behaviors = parent::behaviors();

    $behaviors['authenticator'] = [
      'class' => JwtHttpBearerAuth::class,
      'except' => ['options'],
    ];

    $behaviors['access'] = [
      'class' => \yii\filters\AccessControl::class,
      'rules' => [
        [
          'allow' => true,
          'roles' => ['@'],
          'actions' => ['index', 'all', 'view', 'products-performance', 'sales-by-period', 'clients-report'],
          'matchCallback' => function ($rule, $action) {
            $role = Yii::$app->user->identity->role;
            return in_array($role, ['admin', 'seller']);
          }
        ]
      ]
    ];

  
    $behaviors['corsFilter'] = [
      'class' => \yii\filters\Cors::class,
      'cors' => [
        'Origin' => ['*'],
        'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        'Access-Control-Request-Headers' => ['*'],
        'Access-Control-Allow-Credentials' => true,
        'Access-Control-Max-Age' => 86400,
        'Access-Control-Expose-Headers' => [],
      ],
    ];

    return $behaviors;
  }


  public function beforeAction($action)
  {
    if (\Yii::$app->request->isOptions) {
      return true;
    }
    return parent::beforeAction($action);
  }

  private function getSalesData($startDate = null, $endDate = null, $type = 'table')
  {
    $query = (new \yii\db\Query())
      ->select([
        "DATE_FORMAT(created_at, '%b') as month",
        "DATE_FORMAT(created_at, '%m') as month_num",
        "COUNT(id) as sales"
      ])
      ->from('customer_products');

    if ($startDate && $endDate) {
      $query->where(['between', 'created_at', $startDate, $endDate]);
    }

    $data = $query
      ->groupBy('month, month_num')
      ->orderBy('month_num')
      ->all();

    if ($type === 'chart') {
      return [
        'labels' => array_column($data, 'month'),
        'values' => array_column($data, 'sales'),
      ];
    }

    return $data;
  }

  private function getProductsPerformanceData($minSales = null)
  {
    $query = (new \yii\db\Query())
      ->select(['p.id', 'p.name', 'p.sale_price', 'COUNT(cp.id) as sales'])
      ->from('customer_products cp')
      ->leftJoin('products p', 'cp.product = p.id')
      ->groupBy('p.id');

    if ($minSales) {
      $query->having(['>=', 'COUNT(cp.id)', $minSales]);
    }

    $data = $query->all();

    return $data;
  }

  private function getClientsReportData($startDate = null, $endDate = null)
  {
    $startDate = $startDate ?: date('Y-m-01', strtotime('-6 months'));
    $endDate = $endDate ?: date('Y-m-d');

    $data = (new \yii\db\Query())
      ->select([
        'c.id',
        'c.name',
        'COUNT(cp.id) as purchases',
        'MAX(cp.created_at) as last_purchase'
      ])
      ->from('customer_products cp')
      ->leftJoin('clients c', 'cp.client = c.id')
      ->where(['between', 'cp.created_at', $startDate, $endDate])
      ->groupBy('c.id')
      ->orderBy('purchases DESC')
      ->all();

    foreach ($data as &$item) {
      $item['last_purchase'] = Yii::$app->formatter->asDate($item['last_purchase'], 'php:d/m/Y');
    }

    return $data;
  }


  public function actionSalesByPeriod($startDate = null, $endDate = null, $type = 'chart')
  {
    return $this->asJson($this->getSalesData($startDate, $endDate, $type));
  }

  public function actionProductsPerformance($minSales = null)
  {
    return $this->asJson($this->getProductsPerformanceData($minSales));
  }

  public function actionClientsReport($startDate = null, $endDate = null)
  {
    return $this->asJson($this->getClientsReportData($startDate, $endDate));
  }

  public function actionAll($startDate = null, $endDate = null, $minSales = null, $type = 'chart')
  {
    return $this->asJson([
      'sales' => $this->getSalesData($startDate, $endDate, $type),
      'products' => $this->getProductsPerformanceData($minSales),
      'clients' => $this->getClientsReportData($startDate, $endDate),
    ]);
  }
}
