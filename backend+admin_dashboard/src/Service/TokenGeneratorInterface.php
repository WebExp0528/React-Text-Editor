<?php


namespace App\Service;


interface TokenGeneratorInterface
{
    public function getRandomToken(int $length = 30): string;
}
