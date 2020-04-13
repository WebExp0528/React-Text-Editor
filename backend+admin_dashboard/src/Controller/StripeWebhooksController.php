<?php


namespace App\Controller;

use App\Entity\PaymentData;
use App\Entity\Plan;
use App\Entity\User;
use App\Service\Stripe\StripeServiceInterface;
use App\Service\UserServiceInterface;
use Stripe\Event;
use Stripe\Invoice;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/stripe/webhooks", name="stripe_webhooks_")
 */
class StripeWebhooksController extends AbstractController
{
    /**
     * @Route("", name="index", methods={"POST"})
     */
    public function index(Request $request, StripeServiceInterface $stripeService, UserServiceInterface $userService)
    {
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            throw new \Exception('Bad JSON body from Stripe!');
        }

        $eventId = $data['id'];

        $stripeEvent = $stripeService->getEvent($eventId);

        switch ($stripeEvent->type) {
            case Event::INVOICE_PAYMENT_SUCCEEDED:
                $paymentData = $this->getDoctrine()->getRepository(PaymentData::class)->findOneBy(['stripeId' => $stripeEvent->data->object->customer]);

                if (!$paymentData) {
                    throw new \Exception('Incorrect customer');
                }

                $plan = $this->getDoctrine()->getRepository(Plan::class)->findOneBy(['stripeId' => $stripeEvent->data->object->lines->data[0]->plan->id]);

                if (!$plan) {
                    throw new \Exception('Incorrect plan');
                }

                $userService->activatePlanForUser(
                    $paymentData->getOwner(),
                    $plan,
                    (new \DateTime())->setTimestamp($stripeEvent->data->object->lines->data[0]->period->end),
                    false
                );

                break;

            case Event::INVOICE_UPCOMING:
                $paymentData = $this->getDoctrine()->getRepository(PaymentData::class)->findOneBy(['stripeId' => $stripeEvent->data->object->customer]);

                if (!$paymentData) {
                    throw new \Exception('Incorrect customer');
                }

                if (!$paymentData->getFreeMonthsLeft()) {
                    break;
                }

                $stripeService->addFreeMonthToSubscription($stripeService->getSubscription($stripeEvent->data->object->lines->data[0]->subscription));

                $paymentData->setFreeMonthsLeft($paymentData->getFreeMonthsLeft() - 1);
                $date = clone $paymentData->getExpirationDate();
                $date->add(\DateInterval::createFromDateString('1 month'));
                $paymentData->setExpirationDate($date);

                $this->getDoctrine()->getManager()->flush();

                break;
            default:
                throw new \Exception('Unexpected webhook type form Stripe! '.$stripeEvent->type);
        }

        return new Response();
    }
}
