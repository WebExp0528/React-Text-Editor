<?php

namespace App\Service\Spell;


interface CheckerInterface
{
    public function check(array $text): array;
    public function checkText(string $text): array;
}
