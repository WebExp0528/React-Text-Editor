<?php


namespace App\Service\Stripe;


use App\Entity\PaymentData;
use App\Exception\PaymentFailedException;
use App\Service\UserServiceInterface;
use Doctrine\ORM\EntityManagerInterface;
use Stripe\Customer;
use Stripe\Event;
use Stripe\Invoice;
use Stripe\PaymentIntent;
use Stripe\Plan;
use Stripe\Subscription;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class StripeService extends AbstractStripeService
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var UserServiceInterface
     */
    private $userService;

    public function __construct(
        ParameterBagInterface $parameterBag,
        EntityManagerInterface $entityManager,
        UserServiceInterface $userService
    )
    {
        parent::__construct($parameterBag);

        $this->entityManager = $entityManager;
        $this->parameterBag = $parameterBag;
        $this->userService = $userService;
    }

    public function createCustomer(PaymentData $data): Customer
    {
        $customer = Customer::create([
            'source' => $data->getStripeToken(),
            'email' => $data->getOwner()->getEmail(),
            'name' => $data->getOwner()->getFirstName() . ' ' . $data->getOwner()->getLastName()
        ]);

        $data->setStripeId($customer['id']);

        $this->entityManager->flush();

        return $customer;
    }

    public function changeCustomerSource(PaymentData $data): Customer
    {
        $customer = Customer::retrieve($data->getStripeId());

        Customer::deleteSource(
            $data->getStripeId(),
            $customer->sources->data[0]->id
        );

        $customer = Customer::update(
            $data->getStripeId(),
            [
                'source' => $data->getStripeToken()
            ]
        );

        $this->entityManager->flush();

        return $customer;
    }

    public function createSubscription(PaymentData $data): Subscription
    {
        $subscription = Subscription::create([
            "customer" => $data->getStripeId(),
            "items" => [
                [
                    "plan" => $data->getNewPlan()->getStripeId(),
                ],
            ]
        ]);

        $data->setStripeSubscriptionId($subscription['id']);

        $this->entityManager->flush();

        if (!$this->isSubscriptionSuccessful($subscription)) {
            $data->setPlan(null);
            $this->entityManager->flush();

            throw new PaymentFailedException();
        }

        $this->userService->activatePlanForUser($data->getOwner(), $data->getNewPlan(), (new \DateTime())->setTimestamp($subscription['current_period_end']));

        return $subscription;
    }

    public function changeSubscription(PaymentData $data): Subscription
    {
        $subscription = Subscription::retrieve($data->getStripeSubscriptionId());

        Subscription::update($subscription->id, [
            'cancel_at_period_end' => false,
            'items' => [
                [
                    'id' => $subscription->items->data[0]->id,
                    'plan' => $data->getNewPlan()->getStripeId(),
                ],
            ],
        ]);

        $data->setStripeSubscriptionId($subscription['id']);

        $this->entityManager->flush();

        if (!$this->isSubscriptionSuccessful($subscription)) {
            $data->setPlan(null);
            $this->entityManager->flush();

            throw new PaymentFailedException();
        }

        $this->userService->activatePlanForUser($data->getOwner(), $data->getNewPlan(), (new \DateTime())->setTimestamp($subscription['current_period_end']));


        return $subscription;
    }

    public function cancelSubscription(PaymentData $data): Subscription
    {
        $subscription =  Subscription::update(
            $data->getStripeSubscriptionId(),
            [
                'cancel_at_period_end' => true,
            ]
        );

        $data->setCancelled(true);

        $this->entityManager->flush();

        return $subscription;
    }

    public function getPlan(string $id): Plan
    {
        return Plan::retrieve($id);
    }

    public function getEvent(string $id): Event
    {
        return Event::retrieve($id);
    }

    public function getSubscription(string $id): Subscription
    {
        return Subscription::retrieve($id);
    }

    public function isSubscriptionSuccessful(Subscription $subscription): bool
    {
        $invoice = Invoice::retrieve($subscription->latest_invoice);
        $paymentIntent = PaymentIntent::retrieve($invoice->payment_intent);

        return $paymentIntent->status === PaymentIntent::STATUS_SUCCEEDED;
    }

    public function addFreeMonthToSubscription(Subscription $subscription, int $months = 1): Subscription
    {
        $date = (new \DateTime())->setTimestamp($subscription['current_period_end']);
        $date->add(\DateInterval::createFromDateString("$months month" . ($months > 1 ? 's' : '') ));

        return Subscription::update(
            $subscription->id,
            [
                'trial_end' => $date->getTimestamp(),
                'prorate' => false
            ]
        );
    }
}
