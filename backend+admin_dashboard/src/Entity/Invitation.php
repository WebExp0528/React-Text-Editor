<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validator\Constraints\NewUserEmail;
use App\Api\Filter\UserFilter;

/**
 * @ApiResource(
 *     itemOperations={
            "get"
 *     },
 *     collectionOperations={
            "post",
 *          "get"
 *     },
 *     denormalizationContext={
            "groups"={"invitation:post"}
 *     },
 *     normalizationContext={
            "groups"={"invitation:get"}
 *     },
 *     validationGroups={"invitaion:post"},
 *     attributes={
 *          "filters"={UserFilter::class}
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\InvitationRepository")
 */
class Invitation implements OwnedEntityInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"invitation:get"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="invitations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $owner;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invitation:post", "invitation:get"})
     * @Assert\NotNull(groups={"invitation:post"})
     * @Assert\Email(groups={"invitation:post"})
     * @NewUserEmail(groups={"invitation:post"})
     */
    private $targetEmail;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?UserInterface
    {
        return $this->owner;
    }

    public function setOwner(?UserInterface $owner): OwnedEntityInterface
    {
        $this->owner = $owner;

        return $this;
    }

    public function getTargetEmail(): ?string
    {
        return $this->targetEmail;
    }

    public function setTargetEmail(string $targetEmail): self
    {
        $this->targetEmail = $targetEmail;

        return $this;
    }
}
