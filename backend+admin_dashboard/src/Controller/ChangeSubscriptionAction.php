<?php


namespace App\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\PaymentData;
use App\Service\Stripe\StripeServiceInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ChangeSubscriptionAction
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
     * @var NormalizerInterface
     */
    private $normalizer;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(
        ValidatorInterface $validator,
        StripeServiceInterface $stripeService,
        NormalizerInterface $normalizer,
        EntityManagerInterface $entityManager
    ) {
        $this->validator = $validator;
        $this->stripeService = $stripeService;
        $this->normalizer = $normalizer;
        $this->entityManager = $entityManager;
    }

    public function __invoke(PaymentData $data)
    {
        $this->validator->validate($data, ['groups' => ['change-subscription']]);

        $this->stripeService->changeSubscription($data);

        $this->entityManager->refresh($data);

        return new JsonResponse(
            $this->normalizer->normalize($data->getOwner(), 'json', ['groups' => ['get']]),
            200
        );
    }
}
