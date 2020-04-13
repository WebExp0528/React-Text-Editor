<?php


namespace App\EventSubscriber;


use App\Entity\Referral;
use App\Service\TokenGeneratorInterface;
use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

class ReferralEntitySubscriber implements EventSubscriber
{
    /**
     * @var TokenGeneratorInterface
     */
    private $tokenGenerator;

    public function __construct(TokenGeneratorInterface $tokenGenerator)
    {
        $this->tokenGenerator = $tokenGenerator;
    }

    public function getSubscribedEvents()
    {
        return [
            Events::prePersist
        ];
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        /** @var Referral $entity */
        $entity = $args->getObject();

        if (!$entity instanceof Referral) {
            return;
        }

        $entity->setRefcode($this->tokenGenerator->getRandomToken());
    }
}
