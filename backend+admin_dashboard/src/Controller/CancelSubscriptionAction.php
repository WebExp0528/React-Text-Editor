<?php


namespace App\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\PaymentData;
use App\Service\Stripe\StripeServiceInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CancelSubscriptionAction
{
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var StripeServiceInterface
     */
    private $stripeService;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var NormalizerInterface
     */
    private $normalizer;

    public function __construct(
        ValidatorInterface $validator,
        StripeServiceInterface $stripeService,
        EntityManagerInterface $entityManager,
        NormalizerInterface $normalizer
    ) {
        $this->validator = $validator;
        $this->stripeService = $stripeService;
        $this->entityManager = $entityManager;
        $this->normalizer = $normalizer;
    }

    public function __invoke(PaymentData $data)
    {
        $this->validator->validate($data, ['groups' => ['cancel-subscription']]);

        if (!$data->getCancelled()) {
            $this->stripeService->cancelSubscription($data);
            $this->entityManager->refresh($data);
        }

        return new JsonResponse(
            $this->normalizer->normalize($data->getOwner(), 'json', ['groups' => ['get']]),
            200
        );
    }
}
