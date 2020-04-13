<?php


namespace App\Service;


use App\Entity\Plan;
use Symfony\Component\Security\Core\User\UserInterface;

interface UserServiceInterface
{
    public function activatePlanForUser(UserInterface $user, Plan $plan, \DateTime $expirationDate): void;
}
