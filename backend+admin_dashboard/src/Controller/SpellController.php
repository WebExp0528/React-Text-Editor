<?php

namespace App\Controller;

use App\Service\Spell\CheckerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/spell", name="spell_")
 */
class SpellController extends AbstractController
{
    /**
     * @Route("/check", name="check", methods={"POST"})
     */
    public function index(Request $request, CheckerInterface $checker)
    {
        $content = json_decode($request->getContent(), true);

        if (!isset($content['text'])) {
            return new JsonResponse('Text is required', 400);
        }

        $data = $checker->check($content['text']);

        return new JsonResponse($data);
    }
}
