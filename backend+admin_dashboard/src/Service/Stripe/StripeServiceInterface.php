<?php


namespace App\Service\Stripe;


use App\Entity\PaymentData;
use Stripe\Event;
use Stripe\Plan;
use Stripe\Subscription;
use Stripe\Customer;

interface StripeServiceInterface
{
    public function createCustomer(PaymentData $data): Customer;
    public function changeCustomerSource(PaymentData $data): Customer;
    public function createSubscription(PaymentData $data): Subscription;
    public function changeSubscription(PaymentData $data): Subscription;
    public function cancelSubscription(PaymentData $data): Subscription;
    public function getPlan(string $id): Plan;
    public function getEvent(string $id): Event;
    public function getSubscription(string $id): Subscription;
    public function addFreeMonthToSubscription(Subscription $subscription, int $months = 1): Subscription;
}
