<?php


namespace App\Service\Spell;

class Checker implements CheckerInterface
{
    /**
     * @var int
     */
    private $pspell;

    public function __construct()
    {
        $this->pspell = pspell_new('en');
    }

    public function check(array $text): array
    {
        $blocks = $text['annotation'];
        $result = [];
        $length = 0;

        foreach ($blocks as $block) {
            if (isset($block['markup'])) {
                $length += strlen($block['markup']);

                continue;
            }

            if (!isset($block['text'])) {
                continue;
            }

            $data = $this->checkText($block['text']);

            if (count($data) > 0) {
                foreach ($data as $item) {
                    $item['offset'] += $length;

                    $result[] = $item;
                }
            }

            $length += strlen($block['text']);
        }

        return $result;
    }

    public function checkText(string $text): array
    {
        $matches = $this->getWords($text);
        $result = [];

        foreach ($matches as $match) {
            list($word, $offset) = $match;

            if ($this->checkWord($word)) {
                continue;
            }

            $result[] = [
                'offset' => $offset,
                'length' => strlen($word),
                'replacements' => $this->getCorrections($word, true)
            ];
        }

        return $result;
    }

    public function getWords(string $text): array
    {
        preg_match_all("/\w+/", $text, $matches, PREG_OFFSET_CAPTURE);

        return array_pop($matches);
    }

    public function getCorrections(string $word, bool $single): array
    {
        $corrections = pspell_suggest($this->pspell, $word);

        if (count($corrections) === 0) {
            return $corrections;
        }

        return $single ? [$corrections[0]] : $corrections;
    }

    public function checkWord(string $word): bool
    {
        return pspell_check($this->pspell, $word);
    }
}
