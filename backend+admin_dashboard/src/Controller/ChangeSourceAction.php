<?php


namespace App\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\PaymentData;
use App\Service\Stripe\StripeServiceInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ChangeSourceAction
{
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var StripeServiceInterface
     */
    private $stripeService;

    public function __construct(
        ValidatorInterface $validator,
        StripeServiceInterface $stripeService
    ) {
        $this->validator = $validator;
        $this->stripeService = $stripeService;
    }

    public function __invoke(PaymentData $data)
    {
        $this->validator->validate($data, ['groups' => ['change-source']]);

        $this->stripeService->changeCustomerSource($data);

        return new JsonResponse(null, 200);
    }
}
