<?php

namespace App\Repository;

use App\Entity\Story;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Story|null find($id, $lockMode = null, $lockVersion = null)
 * @method Story|null findOneBy(array $criteria, array $orderBy = null)
 * @method Story[]    findAll()
 * @method Story[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StoryRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Story::class);
    }

    /**
     * @param string $title
     * @param User $user
     * @return Story[] Returns an array of Folder objects
     */
    public function findByPartialName(string $title, User $user): array
    {
        $qb =  $this->createQueryBuilder('s');

        $qb->andWhere("LOWER(s.title) LIKE :title")
            ->andWhere($qb->expr()->eq('s.owner', ':user'))
            ->setParameter('title', strtolower("%$title%"))
            ->setParameter('user', $user)
            ->orderBy('s.id', 'DESC');

        return $qb
            ->setMaxResults(10)
            ->getQuery()
            ->useQueryCache(true)
            ->getResult();
    }}
