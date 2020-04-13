<?php


namespace App\Controller;

use App\Entity\Folder;
use App\Entity\Story;
use App\Repository\FolderRepository;
use App\Repository\StoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class SearchController extends AbstractController
{
    /**
     * @Route("/api/search", name="api_search")
     * @param Request $request
     * @param NormalizerInterface $normalizer
     * @return JsonResponse
     * @throws \Symfony\Component\Serializer\Exception\ExceptionInterface
     */
    public function search(Request $request, NormalizerInterface $normalizer)
    {
        $q = $request->query->get('q');

        if (!$q) {
            throw new BadRequestHttpException('No query specified!');
        }

        $user = $this->getUser();

        /** @var FolderRepository $folderRepository */
        $folderRepository = $this->getDoctrine()->getManager()->getRepository(Folder::class);

        /** @var StoryRepository $folderRepository */
        $storyRepository = $this->getDoctrine()->getManager()->getRepository(Story::class);

        $folders = $folderRepository->findByPartialName($q, $user);
        $stories = $storyRepository->findByPartialName($q, $user);

        return new JsonResponse(
            [
                'folders' => $normalizer->normalize($folders, 'json', ['groups' => ['get-search']]),
                'stories' => $normalizer->normalize($stories, 'json', ['groups' => ['get-search']])
            ]
        );
    }
}