<?php

namespace App\Repository;

use App\Entity\PaymentData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method PaymentData|null find($id, $lockMode = null, $lockVersion = null)
 * @method PaymentData|null findOneBy(array $criteria, array $orderBy = null)
 * @method PaymentData[]    findAll()
 * @method PaymentData[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PaymentDataRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PaymentData::class);
    }

     /**
      * @return PaymentData[] Returns an array of PaymentData objects
      */
    public function findExpiring()
    {
        $date = (new \DateTime('tomorrow'))->add(\DateInterval::createFromDateString('23 hours + 59 minutes + 59 seconds'));
        $tomorrow = new \DateTime('tomorrow');

        $qb = $this->createQueryBuilder('p');
        $qb
            ->andWhere($qb->expr()->isNull('p.plan'))
            ->andWhere('p.expirationDate > :tomorrow')
            ->setParameter('tomorrow', $tomorrow)
            ->andWhere('p.expirationDate < :date')
            ->setParameter('date', $date)
        ;

        return $qb->getQuery()
            ->getResult()
        ;
    }

}
