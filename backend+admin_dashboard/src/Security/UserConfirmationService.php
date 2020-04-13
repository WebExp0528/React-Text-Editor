<?php


namespace App\Security;

use App\Entity\User;
use App\Exception\InvalidConfirmationTokenException;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Event\UserConfirmedEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class UserConfirmationService
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var EventDispatcherInterface
     */
    private $eventDispatcher;

    public function __construct(
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher
    ) {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
    }

    public function confirmUser(string $confirmationToken)
    {
        /** @var User $user */
        $user = $this->userRepository->findOneBy(['confirmationToken' => $confirmationToken]);

        if (!$user) {
            throw new InvalidConfirmationTokenException();
        }

        $user->setEnabled(true);
        $user->setConfirmationToken(null);

        $this->entityManager->flush();

        $event = new UserConfirmedEvent($user);
        $this->eventDispatcher->dispatch(UserConfirmedEvent::NAME, $event);

        $this->entityManager->refresh($user);

        return $user;
    }
}
