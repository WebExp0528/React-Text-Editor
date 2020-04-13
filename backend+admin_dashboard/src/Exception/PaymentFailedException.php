<?php


namespace App\Exception;


use Throwable;

class PaymentFailedException extends \Exception
{
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct('Payment failed!', $code, $previous);
    }
}
