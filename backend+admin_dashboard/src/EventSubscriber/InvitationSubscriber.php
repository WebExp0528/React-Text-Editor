<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Email\InviteMail;
use App\Entity\Invitation;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class InvitationSubscriber implements EventSubscriberInterface
{
    /**
     * @var InviteMail
     */
    private $inviteMail;
    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(
        InviteMail $inviteMail,
        ValidatorInterface $validator
    ) {
        $this->inviteMail = $inviteMail;
        $this->validator = $validator;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['validate', EventPriorities::PRE_WRITE],
                ['inviteCreated', EventPriorities::POST_WRITE]
            ],
        ];
    }

    public function validate(GetResponseForControllerResultEvent $event)
    {
        /** @var Invitation $invite */
        $invite = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$invite instanceof Invitation ||
            !in_array($method, [Request::METHOD_POST])) {
            return;
        }

        $this->validator->validate($invite, ['groups' => ['invitation:post']]);
    }

    public function inviteCreated(GetResponseForControllerResultEvent $event)
    {
        /** @var Invitation $invite */
        $invite = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$invite instanceof Invitation ||
            !in_array($method, [Request::METHOD_POST])) {
            return;
        }

        $this->inviteMail->sendInviteMail($invite);
    }
}
