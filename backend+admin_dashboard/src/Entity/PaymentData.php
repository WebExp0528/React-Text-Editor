<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\CancelSubscriptionAction;
use App\Controller\ChangeSubscriptionAction;
use App\Controller\CreateSubscriptionAction;
use App\Controller\ChangeSourceAction;

/**
 * @ApiResource(
 *     collectionOperations={},
 *     itemOperations={
 *          "get",
 *          "cancel-subscription"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object.getOwner() == user",
 *              "method"="POST",
 *              "path"="/payment_datas/{id}/cancel-subscription",
 *              "controller"=CancelSubscriptionAction::class,
 *              "denormalization_context"={
 *                  "groups"={"cancel-subscription"}
 *             },
 *             "validation_groups"={"cancel-subscription"}
 *         },
 *         "change-subscription"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object.getOwner() == user",
 *              "method"="PUT",
 *              "path"="/payment_datas/{id}/change-subscription",
 *              "controller"=ChangeSubscriptionAction::class,
 *              "denormalization_context"={
 *                  "groups"={"change-subscription"}
 *             },
 *             "validation_groups"={"change-subscription"}
 *         },
 *          "create-subscription"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object.getOwner() == user",
 *              "method"="PUT",
 *              "path"="/payment_datas/{id}/create-subscription",
 *              "controller"=CreateSubscriptionAction::class,
 *              "denormalization_context"={
 *                  "groups"={"payment-data:post"}
 *             },
 *             "validation_groups"={"payment-data:post"}
 *         },
 *          "create-source"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object.getOwner() == user",
 *              "method"="PUT",
 *              "path"="/payment_datas/{id}/change-source",
 *              "controller"=ChangeSourceAction::class,
 *              "denormalization_context"={
 *                  "groups"={"change-source"}
 *             },
 *             "validation_groups"={"change-source"}
 *         }
 *     },
 *     normalizationContext={
 *          "groups"={"payment-data:get"}
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\PaymentDataRepository")
 */
class PaymentData implements OwnedEntityInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"payment-data:get", "get"})
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", inversedBy="paymentData", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $owner;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stripeId;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"payment-data:post", "change-source"})
     * @Assert\NotBlank(groups={"payment-data:post", "change-source"})
     */
    private $stripeToken;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Plan")
     * @Groups({"payment-data:get", "get"})
     */
    private $plan;

    /**
     * @Groups({"payment-data:post", "change-subscription"})
     * @Assert\NotBlank(groups={"change-subscription", "payment-data:post"})
     */
    private $newPlan;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stripeSubscriptionId;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"payment-data:get", "get"})
     */
    private $expirationDate;

    /**
     * @Groups({"payment-data:get", "get"})
     * @ORM\Column(type="integer", nullable=true)
     */
    private $freeMonthsLeft;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Groups({"payment-data:get", "get"})
     */
    private $cancelled = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(UserInterface $owner): OwnedEntityInterface
    {
        $this->owner = $owner;

        return $this;
    }

    public function getStripeId(): ?string
    {
        return $this->stripeId;
    }

    public function setStripeId(?string $stripeId): self
    {
        $this->stripeId = $stripeId;

        return $this;
    }

    public function getStripeToken(): string
    {
        return $this->stripeToken;
    }

    public function setStripeToken(string $stripeToken): self
    {
        $this->stripeToken = $stripeToken;

        return $this;
    }

    public function getPlan(): ?Plan
    {
        return $this->plan;
    }

    public function setPlan(?Plan $plan): self
    {
        $this->plan = $plan;

        return $this;
    }

    public function getStripeSubscriptionId(): ?string
    {
        return $this->stripeSubscriptionId;
    }

    public function setStripeSubscriptionId(?string $stripeSubscriptionId): self
    {
        $this->stripeSubscriptionId = $stripeSubscriptionId;

        return $this;
    }

    public function getExpirationDate(): ?\DateTimeInterface
    {
        return $this->expirationDate;
    }

    public function setExpirationDate(?\DateTimeInterface $expirationDate): self
    {
        $this->expirationDate = $expirationDate;

        return $this;
    }

    public function getNewPlan(): Plan
    {
        return $this->newPlan;
    }

    public function setNewPlan(Plan $newPlan): self
    {
        $this->newPlan = $newPlan;

        return $this;
    }

    public function getFreeMonthsLeft(): ?int
    {
        return $this->freeMonthsLeft;
    }

    public function setFreeMonthsLeft(?int $freeMonthsLeft): self
    {
        $this->freeMonthsLeft = $freeMonthsLeft;

        return $this;
    }

    public function getCancelled(): ?bool
    {
        return $this->cancelled;
    }

    public function setCancelled(?bool $cancelled): self
    {
        $this->cancelled = $cancelled;

        return $this;
    }
}
