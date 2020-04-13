<?php


namespace App\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class UpdatePasswordAction
{
    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $userPasswordEncoder;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
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

    public function __construct(
        ValidatorInterface $validator,
        UserPasswordEncoderInterface $userPasswordEncoder,
        EntityManagerInterface $entityManager,
        JWTTokenManagerInterface $tokenManager,
        ContainerInterface $container,
        NormalizerInterface $normalizer
    ) {
        $this->validator = $validator;
        $this->userPasswordEncoder = $userPasswordEncoder;
        $this->entityManager = $entityManager;
        $this->tokenManager = $tokenManager;
        $this->container = $container;
        $this->normalizer = $normalizer;
    }

    public function __invoke(User $data)
    {
        $this->validator->validate($data, ['groups' => ['put-update-password']]);
        /** @var User $user */
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['resetPasswordToken' => $data->getResetPasswordToken()]);

        if (!$user) {
            throw new BadRequestHttpException('Invalid token');
        }

        $user->setPassword(
            $this->userPasswordEncoder->encodePassword(
                $user,
                $data->getNewPassword()
            )
        );

        $user->setPasswordChangeDate(time());
        $user->setResetPasswordToken(null);

        $this->entityManager->flush();

        $token = $this->tokenManager->create($user);

        /** @var RefreshTokenManagerInterface $refreshTokenManager */
        $refreshTokenManager = $this->container->get('gesdinet.jwtrefreshtoken.refresh_token_manager');

        return new JsonResponse([
            'user' => $this->normalizer->normalize($user, 'json', ['groups' => ['get']]),
            'token' => $token,
            'refresh_token' => $refreshTokenManager->getLastFromUsername($user->getUsername())->getRefreshToken()
        ]);
    }
}