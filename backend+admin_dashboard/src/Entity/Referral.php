<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ReferralRepository")
 */
class Referral
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", inversedBy="referralStats", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $owner;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $refcode;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="referrals")
     */
    private $referrer;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $referralsPaid = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getRefcode(): ?string
    {
        return $this->refcode;
    }

    public function setRefcode(string $refcode): self
    {
        $this->refcode = $refcode;

        return $this;
    }

    public function getReferrer(): ?User
    {
        return $this->referrer;
    }

    public function setReferrer(?User $referrer): self
    {
        $this->referrer = $referrer;

        return $this;
    }

    public function getReferralsPaid(): ?int
    {
        return $this->referralsPaid ?? 0;
    }

    public function setReferralsPaid(?int $referralsPaid): self
    {
        $this->referralsPaid = $referralsPaid;

        return $this;
    }
}
