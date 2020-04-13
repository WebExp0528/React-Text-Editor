<?php


namespace App\Entity;

use Symfony\Component\Security\Core\User\UserInterface;

interface OwnedEntityInterface
{
    public function setOwner(UserInterface $user): OwnedEntityInterface;
}