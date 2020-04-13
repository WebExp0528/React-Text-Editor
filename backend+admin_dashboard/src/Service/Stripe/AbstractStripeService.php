<?php


namespace App\Service\Stripe;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Stripe\Stripe;

abstract class AbstractStripeService implements StripeServiceInterface
{
    public function __construct(
        ParameterBagInterface $parameterBag
    )
    {
        Stripe::setApiKey($parameterBag->get('stripe.secret_key'));
    }
}
