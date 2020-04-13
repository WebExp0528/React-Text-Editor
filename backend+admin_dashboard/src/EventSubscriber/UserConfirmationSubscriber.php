<?php


namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\UserConfirmation;
use App\Security\UserConfirmationService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class UserConfirmationSubscriber implements EventSubscriberInterface
{
    /**
     * @var UserConfirmationService
     */
    private $userConfirmationService;
    /**
     * @var JWTTokenManagerInterface
     */
    private $tokenManager;
    /**
     * @var ContainerInterface
     */
    private $container;
    /**
     * @var NormalizerInterface
     */
    private $normalizer;
    /**
     * @var AuthenticationSuccessHandler
     */
    private $authenticationSuccessHandler;

    public function __construct(
        UserConfirmationService $userConfirmationService,
        JWTTokenManagerInterface $tokenManager,
        ContainerInterface $container,
        NormalizerInterface $normalizer,
        AuthenticationSuccessHandler $authenticationSuccessHandler
    ) {
        $this->userConfirmationService = $userConfirmationService;
        $this->tokenManager = $tokenManager;
        $this->container = $container;
        $this->normalizer = $normalizer;
        $this->authenticationSuccessHandler = $authenticationSuccessHandler;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['confirmUser', EventPriorities::POST_VALIDATE]
        ];
    }

    public function confirmUser(GetResponseForControllerResultEvent $event)
    {
        $request = $event->getRequest();

        if ('api_user_confirmations_post_collection' !== $request->get('_route')) {
            return;
        }

        /** @var UserConfirmation $confirmationToken */
        $confirmationToken = $event->getControllerResult();

        $user = $this->userConfirmationService->confirmUser($confirmationToken->confirmationToken);

        $token = $this->tokenManager->create($user);

        $response = $this->authenticationSuccessHandler->handleAuthenticationSuccess($user, $token);
        $decodedResponse = json_decode($response->getContent(), true);
        $refreshToken = $decodedResponse['refresh_token'];

        $event->setResponse(new JsonResponse([
            'user' => $this->normalizer->normalize($user, 'json', ['groups' => ['get']]),
            'token' => $token,
            'refresh_token' => $refreshToken
        ]));
    }
}
