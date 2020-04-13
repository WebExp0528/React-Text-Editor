<?php


namespace App\Security;

use App\Email\ResetPasswordMail;
use App\Entity\ForgotPasswordRequest;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class PasswordResetService
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
     * @var TokenGenerator
     */
    private $tokenGenerator;
    /**
     * @var ResetPasswordMail
     */
    private $passwordMail;

    public function __construct(
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        TokenGenerator $tokenGenerator,
        ResetPasswordMail $passwordMail
    ) {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
        $this->tokenGenerator = $tokenGenerator;
        $this->passwordMail = $passwordMail;
    }

    public function processRequest(ForgotPasswordRequest $request)
    {
        /** @var User $user */
        $user = $this->userRepository->findOneBy(['email' => $request->getEmail()]);

        if (!$user) {
            throw new BadRequestHttpException('Invalid email');
        }

        $user->setResetPasswordToken($this->tokenGenerator->getRandomSecureToken());
        $this->passwordMail->sendResetPasswordEmail($user);

        $this->entityManager->flush();
    }
}