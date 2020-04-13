<?php


namespace App\Validator\Constraints;


use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class NewUserEmail extends Constraint
{
    public $message = 'The user "{{ email }}" is already registered.';
}
