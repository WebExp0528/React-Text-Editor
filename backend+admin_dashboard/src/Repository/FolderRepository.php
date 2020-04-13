<?php

namespace App\Repository;

use App\Entity\Folder;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Folder|null find($id, $lockMode = null, $lockVersion = null)
 * @method Folder|null findOneBy(array $criteria, array $orderBy = null)
 * @method Folder[]    findAll()
 * @method Folder[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FolderRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Folder::class);
    }

    /**
     * @param string $name
     * @param User $user
     * @return Folder[] Returns an array of Folder objects
     */
    public function findByPartialName(string $name, User $user): array
    {
        $qb =  $this->createQueryBuilder('f');

        $qb->andWhere("LOWER(f.name) LIKE :name")
            ->andWhere($qb->expr()->eq('f.owner', ':user'))
            ->setParameter('name', strtolower("%$name%"))
            ->setParameter('user', $user)
            ->orderBy('f.id', 'DESC');

        return $qb->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }
}
