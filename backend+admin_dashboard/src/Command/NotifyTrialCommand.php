<?php

namespace App\Command;

use App\Email\ExpiringTrialMail;
use App\Repository\PaymentDataRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class NotifyTrialCommand extends Command
{
    protected static $defaultName = 'app:notify-trial';
    /**
     * @var PaymentDataRepository
     */
    private $paymentDataRepository;
    /**
     * @var ExpiringTrialMail
     */
    private $trialMail;

    public function __construct(
        PaymentDataRepository $paymentDataRepository,
        ExpiringTrialMail $trialMail
    ) {
        parent::__construct();

        $this->paymentDataRepository = $paymentDataRepository;
        $this->trialMail = $trialMail;
    }

    protected function configure()
    {
        $this
            ->setDescription('Notify customers that have expiring trial')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $data = $this->paymentDataRepository->findExpiring();

        foreach ($data as $paymentData) {
            $this->trialMail->sendExpirationMail($paymentData);
        }
    }
}
