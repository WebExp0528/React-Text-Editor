<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Security\TokenGenerator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private const USERS = [
        [
            'password' => 'secretS1',
            'roles' => [User::ROLE_SUPERADMIN],
            'enabled' => true
        ],
        [
            'password' => 'secretS1',
            'roles' => [User::ROLE_ADMIN],
            'enabled' => true
        ],
        [
            'password' => 'secretS1',
            'roles' => [User::ROLE_WRITER],
            'enabled' => true
        ],
        [
            'password' => 'secretS1',
            'roles' => [User::ROLE_WRITER],
            'enabled' => true
        ],
        [
            'password' => 'secretS1',
            'roles' => [User::ROLE_EDITOR],
            'enabled' => true
        ],
        [
            'password' => 'secretS1',
            'roles' => [User::ROLE_USER],
            'enabled' => false
        ]
    ];

    /**
     * @var UserPasswordEncoderInterface $encoder
     */
    private $encoder;

    /** @var \Faker\Generator $faker */
    private $faker;

    /**
     * @var TokenGenerator
     */
    private $tokenGenerator;

    public function __construct(
        UserPasswordEncoderInterface $encoder,
        TokenGenerator $tokenGenerator
    ) {
        $this->encoder = $encoder;
        $this->faker = Factory::create();
        $this->tokenGenerator = $tokenGenerator;
    }

    public function load(ObjectManager $manager)
    {
        $this->loadUsers($manager);
    }

    public function loadUsers(ObjectManager $manager)
    {
        $this->loadAdminUser($manager);

        foreach (self::USERS as $userData) {
            $user = new User();
            $user->setFirstName($this->faker->firstName());
            $user->setLastName($this->faker->lastName);
            $user->setEmail($this->faker->email);
            $user->setPassword($this->encoder->encodePassword($user, $userData['password']));
            $user->setRoles($userData['roles']);
            $user->setEnabled($userData['enabled']);

            if (!$userData['enabled']) {
                $user->setConfirmationToken(
                    $this->tokenGenerator->getRandomSecureToken()
                );
            }

            $manager->persist($user);
        }

        $manager->flush();
    }

    public function loadAdminUser(ObjectManager $manager)
    {
        $user = new User();
        $user->setFirstName($this->faker->firstName());
        $user->setLastName($this->faker->lastName);
        $user->setEmail('admin@s.ho');
        $user->setPassword($this->encoder->encodePassword($user, 'pass'));
        $user->setRoles([User::ROLE_SUPERADMIN]);
        $user->setEnabled(true);

        $manager->persist($user);

        $manager->flush();
    }
}
