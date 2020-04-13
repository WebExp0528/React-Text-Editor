<?php


namespace App\Serializer;

use App\Entity\Plan;
use App\Service\Stripe\StripeServiceInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class PlanNormalizer implements NormalizerInterface
{
    /**
     * @var StripeServiceInterface
     */
    private $stripeService;
    /**
     * @var ObjectNormalizer
     */
    private $normalizer;

    public function __construct(
        ObjectNormalizer $normalizer,
        StripeServiceInterface $stripeService
    ) {
        $this->stripeService = $stripeService;
        $this->normalizer = $normalizer;
    }

    public function supportsNormalization($data, $format = null, array $context = [])
    {
        return $this->normalizer->supportsNormalization($data, $format) && $data instanceof Plan;
    }

    public function normalize($object, $format = null, array $context = [])
    {
        $normalized = $this->normalizer->normalize($object, $format, $context);

        if (!isset($normalized['title'])) {
            $data = $this->stripeService->getPlan($normalized['stripeId']);

            unset($normalized['stripeId']);

            $normalized['title'] = '$' . $data['amount'] / 100 . '/' . $data['interval'];
        }

        return $normalized;
    }
}
