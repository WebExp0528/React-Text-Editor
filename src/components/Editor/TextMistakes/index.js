import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const TextMistakes = ({ sentences, paragraphs, config }) => {
    return (
        <>
            <div className="count-mistakes">
                <div className="count-mistakes__item count-mistakes__item--first">
                    <p className="count-mistakes__key count-mistakes__key--red">
                        {config.poor}
                    </p>
                    <p className="count-mistakes__value">
                        {
                            config.poor > 0
                                ? `out of ${sentences} sentences are very hard to read.`
                                : 'sentences are very hard to read. Great!'
                        }
                    </p>
                </div>
                <div className="count-mistakes__item">
                    <p className="count-mistakes__key count-mistakes__key--yellow">
                        {config.hard}
                    </p>
                    <p className="count-mistakes__value">
                        {
                            config.hard > 0
                              ? `out of ${sentences} sentences are hard to read.`
                              : 'sentences are hard to read. Pure clarity!'
                        }
                    </p>
                </div>
                <div className="count-mistakes__item">
                    <p className="count-mistakes__key count-mistakes__key--violet">
                        {config.simpler}
                    </p>
                    <p className="count-mistakes__value">
                        {
                            config.simpler > 0
                              ? 'phrases have a simpler alternative.'
                              : 'phrases have a simpler alternative. Masterful!'
                        }
                    </p>
                </div>
                <div className="count-mistakes__item">
                    <p className="count-mistakes__key count-mistakes__key--blue">
                        {config.adverb}
                    </p>
                    <p className="count-mistakes__value">
                        {
                            config.adverb > 0
                              ? `adverbs. Aim for ${ Math.round(paragraphs / 3) }.`
                              : 'adverbs. Clean work!'
                        }
                    </p>
                </div>
                <div className="count-mistakes__item">
                    <p className="count-mistakes__key count-mistakes__key--green">
                        {config.passive}
                    </p>
                    <p className="count-mistakes__value">
                        {
                            config.passive > 0
                              ? `uses of passive voice. Aim for ${ Math.round(sentences / 5) } or fewer.`
                              : 'uses of passive voice. Is that even possible?'
                        }
                    </p>
                </div>
            </div>
        </>
    )
};

TextMistakes.propTypes = {
    sentences: PropTypes.number.isRequired,
    paragraphs: PropTypes.number.isRequired,
    config: PropTypes.shape({
        adverb: PropTypes.number.isRequired,
        passive: PropTypes.number.isRequired,
        simpler: PropTypes.number.isRequired,
        hard: PropTypes.number.isRequired,
        poor: PropTypes.number.isRequired
    })
};

export default TextMistakes;
