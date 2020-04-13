<?php


namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\ForgotPasswordRequest;
use App\Security\PasswordResetService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ForgotPasswordRequestSubscriber implements EventSubscriberInterface
{
    /**
     * @var PasswordResetService
     */
    private $passwordResetService;

    public function __construct(PasswordResetService $passwordResetService)
    {
        $this->passwordResetService = $passwordResetService;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['handleRequest', EventPriorities::POST_VALIDATE]
        ];
    }

    public function handleRequest(GetResponseForControllerResultEvent $event)
    {
        $request = $event->getRequest();

        if ('api_forgot_password_requests_post_collection' !== $request->get('_route')) {
            return;
        }

        /** @var ForgotPasswordRequest $forgotRequest */
        $forgotRequest = $event->getControllerResult();

        $this->passwordResetService->processRequest($forgotRequest);

        $event->setResponse(new JsonResponse(null, Response::HTTP_OK));
    }
}