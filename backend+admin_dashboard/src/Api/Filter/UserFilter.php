<?php

namespace App\Api\Filter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\FilterInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\OwnedEntityInterface;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

final class UserFilter implements FilterInterface
{
    private $denormalizer;

    private $authorizationChecker;

    private $tokenStorage;

    private $requestStack;

    public function __construct(
        DenormalizerInterface $denormalizer,
        AuthorizationCheckerInterface $authorizationChecker,
        TokenStorageInterface $tokenStorage,
        RequestStack $requestStack = null
    ) {
        $this->denormalizer = $denormalizer;
        $this->authorizationChecker = $authorizationChecker;
        $this->tokenStorage = $tokenStorage;
        $this->requestStack = $requestStack;
    }

    public function apply(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $request = $this->requestStack->getCurrentRequest();

        if ($request->query->has('user')) {
            $userId = $request->query->get('user');

            if ($this->authorizationChecker->isGranted('ROLE_ADMIN')) {
                if (!$userId) {
                    // Admin is searching for empty user - do not filter
                    return;
                }
            } else {
                // Only admins can specify a user
                throw new AccessDeniedException();
            }

            $user = $this->denormalizer->denormalize(['id' => $userId], User::class, null, ['resource_class' => User::class]);
        } else {
            $user = $this->getUser();

            if (!$user) {
                // User is not logged in
                throw new AccessDeniedException();
            }
        }

        if ($user && in_array(OwnedEntityInterface::class, class_implements($resourceClass))) {
            $queryBuilder->andWhere('o.owner = :user')
                ->setParameter('user', $user);
        }
    }

    // This function is only used to hook in documentation generators (supported by Swagger and Hydra)
    public function getDescription(string $resourceClass): array
    {
        $description['user'] = [
            'property' => 'user',
            'type' => 'string',
            'required' => false,
            'swagger' => [
                'description' => 'Filter using an user',
                'name' => 'user',
                'type' => 'User',
            ],
        ];

        return $description;
    }

    private function getUser(): ?UserInterface
    {
        if (!$token = $this->tokenStorage->getToken()) {
            return null;
        }

        $user = $token->getUser();

        if (!$user instanceof UserInterface) {
            return null;
        }

        return $user;
    }
}