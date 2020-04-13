<?php


namespace App\Service;


use App\Entity\PaymentData;
use App\Entity\Plan;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserService implements UserServiceInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function activatePlanForUser(UserInterface $user, Plan $plan, \DateTime $expirationDate, bool $processReferral = true): void
    {
        /** @var PaymentData $data */
        $data = $user->getPaymentData();
        $oldPlan = $data->getPlan();

        $data->setPlan($plan);
        $data->setExpirationDate($expirationDate);
        $data->setCancelled(false);

        $referrer = $data->getOwner()->getReferralStats()->getReferrer();

        if ($processReferral && $referrer && !$oldPlan) {
            $referrer->getReferralStats()->setReferralsPaid($referrer->getReferralStats()->getReferralsPaid() + 1);

            if (!$referrer->getPaymentData()->getPlan()) {
                $date = clone $referrer->getPaymentData()->getExpirationDate();
                $date->add(\DateInterval::createFromDateString('1 month'));
                $referrer->getPaymentData()->setExpirationDate($date);
            } else {
                $referrer->getPaymentData()->setFreeMonthsLeft($referrer->getPaymentData()->getFreeMonthsLeft() + 1);
            }
        }

        $this->entityManager->flush();
    }
}
