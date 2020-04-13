<?php

namespace App\Email;

use App\Entity\User;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Twig\Environment;

class Mailer
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

    public function sendConfirmationEmail(User $user)
    {
        $body = $this->twig->render(
            'email/confirmation.html.twig',
            [
                'user' => $user
            ]
        );

        $message = (new \Swift_Message('Please, confirm you account!'))
            ->setFrom([
                $this->parameterBag->get('email.robot') => $this->parameterBag->get('email.robot.name')
            ])
            ->setTo($user->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }
}
