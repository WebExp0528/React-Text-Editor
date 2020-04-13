<?php

namespace App\Email;

use App\Entity\PaymentData;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Twig\Environment;

class ExpiringTrialMail
{
    /**
     * @var \Swift_Mailer
     */
    private $mailer;
    /**
     * @var Environment
     */
    private $twig;
    /**
     * @var ParameterBagInterface
     */
    private $parameterBag;

    public function __construct(
        \Swift_Mailer $mailer,
        Environment $twig,
        ParameterBagInterface $parameterBag
    ) {
        $this->mailer = $mailer;
        $this->twig = $twig;
        $this->parameterBag = $parameterBag;
    }

    public function sendExpirationMail(PaymentData $paymentData)
    {
        $body = $this->twig->render(
            'email/expiring-trial.html.twig',
            []
        );

        $message = (new \Swift_Message('Trial expires tomorrow'))
            ->setFrom([
                $this->parameterBag->get('email.robot') => $this->parameterBag->get('email.robot.name')
            ])
            ->setTo($paymentData->getOwner()->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }
}
