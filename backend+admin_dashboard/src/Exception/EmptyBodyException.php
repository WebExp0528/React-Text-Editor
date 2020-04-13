<?php


namespace App\Exception;


use Throwable;

class EmptyBodyException extends \Exception
{
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct('The body of the request cannot be empty!', $code, $previous);
    }
}