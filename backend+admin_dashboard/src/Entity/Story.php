<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;
use App\Api\Filter\UserFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     collectionOperations={
 *          "post",
 *          "get"
 *     },
 *     itemOperations={
 *          "get"={
 *              "access_control"="object.getOwner() == user"
 *          },
 *          "put"={
 *              "access_control"="object.getOwner() == user",
 *              "denormalization_context"={
 *                  "groups"={"put"}
 *              }
 *          },
 *          "delete"={
 *              "access_control"="object.getOwner() == user"
 *          }
 *     },
 *     normalizationContext={
 *          "groups"={"get"},
 *          "enable_max_depth"=true
 *     },
 *     denormalizationContext={
 *          "groups"={"post"},
 *          "enable_max_depth"=true
 *     },
 *     attributes={
 *          "filters"={UserFilter::class},
 *          "force_eager"=false,
 *          "order"={"updated": "DESC"}
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\StoryRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Story implements OwnedEntityInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get", "get-search"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get", "post", "put", "get-search"})
     * @Assert\Length(max=255)
     * @ApiFilter(SearchFilter::class, strategy="exact")
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"get", "post", "put"})
     */
    private $text;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Folder", inversedBy="stories", cascade={"persist"})
     * @Groups({"get", "put", "get-search"})
     * @MaxDepth(2)
     */
    private $folder;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="stories")
     * @ORM\JoinColumn(nullable=false)
     */
    private $owner;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Gedmo\Timestampable(on="create")
     * @Groups({"get"})
     */
    private $created;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Gedmo\Timestampable(on="change", field={"text", "title"})
     * @Groups({"get", "get-search"})
     */
    private $updated;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"get", "get-search", "post", "put"})
     * @Assert\Type("integer")
     */
    private $wordCount;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"get", "get-search", "post", "put"})
     * @Assert\Type("integer")
     */
    private $readTime;

    public function __toString()
    {
        return $this->title ?? 'Story';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getFolder(): ?Folder
    {
        return $this->folder;
    }

    public function setFolder(?Folder $folder): self
    {
        $this->folder = $folder;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?UserInterface $owner): OwnedEntityInterface
    {
        $this->owner = $owner;

        return $this;
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

    public function setUpdated(?\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * @ORM\PrePersist()
     */
    public function setUpdatedTime()
    {
        $this->updated = new \DateTime();
    }

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function checkOwnerShip()
    {
        if ($this->getFolder() && $this->getOwner() !== $this->getFolder()->getOwner()) {
            throw new \LogicException('Story and folder cannot have different owners');
        }
    }

    public function getWordCount(): ?int
    {
        return $this->wordCount;
    }

    public function setWordCount(?int $wordCount): self
    {
        $this->wordCount = $wordCount;

        return $this;
    }

    public function getReadTime(): ?int
    {
        return $this->readTime;
    }

    public function setReadTime(?int $readTime): self
    {
        $this->readTime = $readTime;

        return $this;
    }
}
