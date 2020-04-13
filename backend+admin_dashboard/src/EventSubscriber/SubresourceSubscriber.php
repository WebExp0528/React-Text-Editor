<?php


namespace App\EventSubscriber;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\OwnedEntityInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class SubresourceSubscriber implements EventSubscriberInterface
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => ['handleSubresourceRequest', EventPriorities::PRE_READ]
        ];
    }

    public function handleSubresourceRequest(GetResponseEvent $event)
    {
        if (!$event->getRequest()->attributes->has('_api_subresource_operation_name')) {
            return;
        }

        $resourceClass = $event->getRequest()->attributes->get('_api_resource_class');

        if (!in_array(OwnedEntityInterface::class, class_implements($resourceClass))) {
            return;
        }

        if ((int)$event->getRequest()->attributes->get('id') !== $this->tokenStorage->getToken()->getUser()->getId()) {
            throw new AccessDeniedHttpException('Access denied.');
        }
    }
}
