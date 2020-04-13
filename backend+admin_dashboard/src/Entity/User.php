<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\ResetPasswordAction;
use App\Controller\UpdatePasswordAction;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(
 *     itemOperations={
 *         "get"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY')",
 *              "normalization_context"={
 *                 "groups"={"get"}
 *             }
 *         },
 *         "put"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object == user",
 *              "denormalization_context"={
 *                  "groups"={"put"}
 *             },
 *             "validation_groups"={"put"}
 *         },
 *         "put-reset-password"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object == user",
 *              "method"="PUT",
 *              "path"="/users/{id}/update-password",
 *              "controller"=ResetPasswordAction::class,
 *              "denormalization_context"={
 *                  "groups"={"put-reset-password"}
 *             },
 *             "validation_groups"={"put-reset-password"}
 *         }
 *     },
 *     collectionOperations={
 *         "post"={
 *              "path"="/register",
 *              "denormalization_context"={
 *                  "groups"={"post"}
 *              },
 *              "validation_groups"={"post"}
 *         },
 *          "put-update-password"={
 *              "method"="PUT",
 *              "path"="/users/update-password",
 *              "controller"=UpdatePasswordAction::class,
 *              "denormalization_context"={
 *                  "groups"={"put-update-password"}
 *             },
 *             "validation_groups"={"put-update-password"}
 *         },
 *     },
 *     normalizationContext={"groups"={"get"}}
 * )
 * @UniqueEntity("email", groups={"post", "put"}, message="The email is already used")
 */
class User implements UserInterface
{
    const ROLE_USER = 'ROLE_USER';
    const ROLE_WRITER = 'ROLE_WRITER';
    const ROLE_EDITOR = 'ROLE_EDITOR';
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_SUPERADMIN = 'ROLE_SUPERADMIN';
    const DEFAULT_ROLES = [self::ROLE_USER];

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"post"})
     * @Assert\Regex(
     *     pattern="/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/",
     *     message="Password must be seven characters long and contain one digit, one uppercase letter and one lowercase letter",
     *     groups={"post"}
     * )
     * @Groups({"post"})
     */
    private $password;

    /**
     * @Assert\NotBlank(groups={"post"})
     * @Assert\Expression(
     *     "this.getPassword() === this.getRetypedPassword()",
     *     message="Passwords do not match",
     *     groups={"post"}
     * )
     * @Groups({"post"})
     */
    private $retypedPassword;

    /**
     * @Assert\NotBlank(groups={"put-reset-password"})
     * @Assert\Regex(
     *     pattern="/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/",
     *     message="Password must be seven characters long and contain one digit, one uppercase letter and one lowercase letter",
     *     groups={"put-reset-password", "put-update-password"}
     * )
     * @Groups({"put-reset-password", "put-update-password"})
     */
    private $newPassword;

    /**
     * @Assert\NotBlank(groups={"put-reset-password"})
     * @Assert\Expression(
     *     "this.getNewPassword() === this.getNewRetypedPassword()",
     *     message="Passwords do not match",
     *     groups={"put-reset-password", "put-update-password"}
     * )
     * @Groups({"put-reset-password", "put-update-password"})
     */
    private $newRetypedPassword;

    /**
     * @Groups({"put-reset-password"})
     * @Assert\NotBlank(groups={"put-reset-password"})
     * @UserPassword(groups={"put-reset-password"}, message="Incorrect current password.")
     */
    private $oldPassword;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get", "post", "put"})
     * @Assert\NotBlank(groups={"post"})
     * @Assert\Length(
     *     min=3,
     *     max=255,
     *     groups={"post", "put"}
     * )
     */
    private $firstName;


    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get", "post", "put"})
     * @Assert\NotBlank(groups={"post"})
     * @Assert\Length(
     *     min=3,
     *     max=255,
     *     groups={"post", "put"}
     * )
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(groups={"post"})
     * @Assert\Email(groups={"post", "put"})
     * @Groups({"post", "put", "get-admin", "get-owner"})
     */
    private $email;

    /**
     * @ORM\Column(type="simple_array", length=200)
     * @Groups({"get-admin"})
     */
    private $roles;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $passwordChangeDate;

    /**
     * @ORM\Column(type="boolean")
     */
    private $enabled;

    /**
     * @ORM\Column(type="string", length=40, nullable=true)
     */
    private $confirmationToken;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Gedmo\Timestampable(on="create")
     */
    private $created;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Gedmo\Timestampable(on="update")
     */
    private $updated;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Folder", mappedBy="owner", orphanRemoval=true, cascade={"remove"})
     */
    private $folders;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Story", mappedBy="owner", orphanRemoval=true, cascade={"remove"})
     */
    private $stories;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\NotBlank(groups={"put-update-password"})
     * @Assert\Length(min="30", max="30", groups={"put-update-password"})
     * @Groups({"put-update-password"})
     */
    private $resetPasswordToken;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\PaymentData", mappedBy="owner", cascade={"persist", "remove"})
     * @Groups({"get"})
     */
    private $paymentData;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Referral", mappedBy="owner", cascade={"persist", "remove"})
     */
    private $referralStats;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Referral", mappedBy="referrer")
     * @Groups({"get"})
     */
    private $referrals;

    /**
     * @Groups({"post"})
     * @ApiProperty(swaggerContext={
            "type"="string"
     * })
     */
    private $referrerCode;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Invitation", mappedBy="owner", orphanRemoval=true)
     * @Groups({"get"})
     */
    private $invitations;

    /**
     * @var string
     * @Groups({"get"})
     * @ApiProperty(swaggerContext={
        "type"="string"
     * })
     */
    private $refcode;

    /**
     * @var int
     * @Groups({"get"})
     * @ApiProperty(swaggerContext={
        "type"="integer"
     * })
     */
    private $referralsPaid;

    public function __construct()
    {
        $this->roles = self::DEFAULT_ROLES;
        $this->enabled = false;
        $this->confirmationToken = null;
        $this->folders = new ArrayCollection();
        $this->stories = new ArrayCollection();
        $this->referrals = new ArrayCollection();
        $this->invitations = new ArrayCollection();
    }

    public function __toString()
    {
        return ($this->firstName && $this->lastName && $this->id) ? $this->firstName . ' ' . $this->lastName . " ({$this->id})": 'User';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getRoles()
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials()
    {
        return null;
    }

    public function getRetypedPassword(): ?string
    {
        return $this->retypedPassword;
    }

    public function setRetypedPassword(?string $retypedPassword): self
    {
        $this->retypedPassword = $retypedPassword;

        return $this;
    }

    public function getNewPassword(): ?string
    {
        return $this->newPassword;
    }

    public function setNewPassword($newPassword): void
    {
        $this->newPassword = $newPassword;
    }

    public function getNewRetypedPassword(): ?string
    {
        return $this->newRetypedPassword;
    }

    public function setNewRetypedPassword($newRetypedPassword): void
    {
        $this->newRetypedPassword = $newRetypedPassword;
    }

    public function getOldPassword(): ?string
    {
        return $this->oldPassword;
    }

    public function setOldPassword($oldPassword): void
    {
        $this->oldPassword = $oldPassword;
    }


    public function getPasswordChangeDate()
    {
        return $this->passwordChangeDate;
    }

    public function setPasswordChangeDate($passwordChangeDate): void
    {
        $this->passwordChangeDate = $passwordChangeDate;
    }

    public function getEnabled()
    {
        return $this->enabled;
    }

    public function setEnabled($enabled): void
    {
        $this->enabled = $enabled;
    }

    public function getConfirmationToken()
    {
        return $this->confirmationToken;
    }

    public function setConfirmationToken($confirmationToken): void
    {
        $this->confirmationToken = $confirmationToken;
    }

    public function getUsername()
    {
        return $this->email;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * @return Collection|Folder[]
     */
    public function getFolders(): Collection
    {
        return $this->folders;
    }

    public function addFolder(Folder $folder): self
    {
        if (!$this->folders->contains($folder)) {
            $this->folders[] = $folder;
            $folder->setOwner($this);
        }

        return $this;
    }

    public function removeFolder(Folder $folder): self
    {
        if ($this->folders->contains($folder)) {
            $this->folders->removeElement($folder);
            // set the owning side to null (unless already changed)
            if ($folder->getOwner() === $this) {
                $folder->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Story[]
     */
    public function getStories(): Collection
    {
        return $this->stories;
    }

    public function addStory(Story $story): self
    {
        if (!$this->stories->contains($story)) {
            $this->stories[] = $story;
            $story->setOwner($this);
        }

        return $this;
    }

    public function removeStory(Story $story): self
    {
        if ($this->stories->contains($story)) {
            $this->stories->removeElement($story);
            // set the owning side to null (unless already changed)
            if ($story->getOwner() === $this) {
                $story->setOwner(null);
            }
        }

        return $this;
    }

    public function getResetPasswordToken(): ?string
    {
        return $this->resetPasswordToken;
    }

    public function setResetPasswordToken(?string $resetPasswordToken): self
    {
        $this->resetPasswordToken = $resetPasswordToken;

        return $this;
    }

    public function getPaymentData(): ?PaymentData
    {
        return $this->paymentData;
    }

    public function setPaymentData(PaymentData $paymentData): self
    {
        $this->paymentData = $paymentData;

        // set the owning side of the relation if necessary
        if ($this !== $paymentData->getOwner()) {
            $paymentData->setOwner($this);
        }

        return $this;
    }

    public function getReferralStats(): ?Referral
    {
        return $this->referralStats;
    }

    public function setReferralStats(Referral $referralStats): self
    {
        $this->referralStats = $referralStats;

        // set the owning side of the relation if necessary
        if ($this !== $referralStats->getOwner()) {
            $referralStats->setOwner($this);
        }

        return $this;
    }

    /**
     * @return Collection|Referral[]
     */
    public function getReferrals(): Collection
    {
        return $this->referrals;
    }

    public function addReferral(Referral $referral): self
    {
        if (!$this->referrals->contains($referral)) {
            $this->referrals[] = $referral;
            $referral->setReferrer($this);
        }

        return $this;
    }

    public function removeReferral(Referral $referral): self
    {
        if ($this->referrals->contains($referral)) {
            $this->referrals->removeElement($referral);
            // set the owning side to null (unless already changed)
            if ($referral->getReferrer() === $this) {
                $referral->setReferrer(null);
            }
        }

        return $this;
    }

    public function getReferrerCode()
    {
        return $this->referrerCode;
    }

    public function setReferrerCode($referrerCode): void
    {
        $this->referrerCode = $referrerCode;
    }

    /**
     * @return Collection|Invitation[]
     */
    public function getInvitations(): Collection
    {
        return $this->invitations;
    }

    public function addInvitation(Invitation $invitation): self
    {
        if (!$this->invitations->contains($invitation)) {
            $this->invitations[] = $invitation;
            $invitation->setOwner($this);
        }

        return $this;
    }

    public function removeInvitation(Invitation $invitation): self
    {
        if ($this->invitations->contains($invitation)) {
            $this->invitations->removeElement($invitation);
            // set the owning side to null (unless already changed)
            if ($invitation->getOwner() === $this) {
                $invitation->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return int
     */
    public function getReferralsPaid(): int
    {
        return $this->getReferralStats()->getReferralsPaid();
    }

    /**
     * @return string
     */
    public function getRefcode(): string
    {
        return $this->getReferralStats()->getRefcode();
    }
}
