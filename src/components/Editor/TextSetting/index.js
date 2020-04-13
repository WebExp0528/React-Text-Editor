import React from 'react';
import PropTypes from 'prop-types';
import TextProcessorInstance, { TextProcessor } from "../../../services/language/textProcessor";
import automatedReadability from "automated-readability";
import './index.scss';

const TextSetting = ({ text }) => {
    let sentences = TextProcessorInstance.getSentences(text);

    const countOfWords = TextProcessorInstance.countWords(text);
    const readTime = TextProcessorInstance.getReadTime(countOfWords);

    const readability = automatedReadability({
        sentence: sentences.length,
        word: countOfWords,
        character: text.length
    });

    let { levelOfReadability, scoreOfReadability } = TextProcessorInstance.getReadabilityInfo(readability);

    return (
        <>
            <div className="text-settings">
                <div className="text-settings__item text-settings__item--first">
                    <p className="text-settings__key">
                        Readability
                    </p>
                    <p className="text-settings__value" style={{ color: levelOfReadability.color }}>
                        {levelOfReadability.name}
                    </p>
                </div>
                <div className="text-settings__item">
                    <p className="text-settings__key">
                        Grade
                    </p>
                    <p className="text-settings__value">
                        {scoreOfReadability}<span className="text-settings__value--max">/{TextProcessor.maxScore}</span>
                    </p>
                </div>
                <div className="text-settings__item">
                    <p className="text-settings__key">
                        Words
                    </p>
                    <p className="text-settings__value">
                        {countOfWords}
                    </p>
                </div>
                <div className="text-settings__item">
                    <p className="text-settings__key">
                        Reading Time
                    </p>
                    <p className="text-settings__value">
                        {readTime} min
                    </p>
                </div>
            </div>
        </>
    );
};

TextSetting.propTypes = {
    text: PropTypes.string.isRequired
};

export default TextSetting;
