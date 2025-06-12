<?php

namespace app\components;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtHelper
{

  public static function generateToken($data, $expire = 3600)
  {
    $payload = [
      'iss' => $_ENV['API_URL'],   // issuer
      'aud' => $_ENV['FRONT_URL'], // audience
      'iat' => time(),             // issued at
      'exp' => time() + $expire,   // expiration
      'data' => $data              // payload customizado
    ];

    return JWT::encode($payload, $_ENV['JWT_KEY'], 'HS256');
  }

  public static function validateToken($token)
  {
    if (empty($token)) {
      return false;
    }

    try {
      $decoded = JWT::decode(
        $token,
        new Key($_ENV['JWT_KEY'], 'HS256')
      );

      if (!isset($decoded->data)) {
        return false;
      }

      return $decoded->data;
    } catch (\Exception $e) {
      return false;
    }
  }
}
