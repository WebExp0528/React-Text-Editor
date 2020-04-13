<?php

namespace App\Email;

use App\Entity\Invitation;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Twig\Environment;

class InviteMail
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

    public function sendInviteMail(Invitation $invitation)
    {
        $body = $this->twig->render(
            'email/invitation.html.twig',
            [
                'user' => $invitation->getOwner()
            ]
        );

        $message = (new \Swift_Message('Invitation for you'))
            ->setFrom([
                $this->parameterBag->get('email.robot') => $this->parameterBag->get('email.robot.name')
            ])
            ->setTo($invitation->getTargetEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }
}
