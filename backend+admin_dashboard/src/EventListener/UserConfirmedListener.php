<?php


namespace App\EventListener;

use App\Entity\PaymentData;
use Doctrine\ORM\EntityManagerInterface;
use App\Event\UserConfirmedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class UserConfirmedListener
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onConfirmed(UserConfirmedEvent $event)
    {
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $date = new \DateTime();
        $interval = new \DateInterval('P14D');
        $date->add($interval);

        $data = new PaymentData();
        $data->setOwner($user);
        $data->setExpirationDate($date);

        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }
}
