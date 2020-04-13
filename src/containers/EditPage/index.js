import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import '../../styles/utils/icons.scss';
import './index.scss';
import RulesCustom from './RulesCustom';
import $ from "jquery";
import automatedReadability from 'automated-readability';
import './index.scss';
import {get, update} from '../../components/Story/logic/storyActions';
import {withRouter, Redirect} from 'react-router-dom';
import {show as showMoveModal} from '../../components/Story/MoveStory/logic/modalActions';
import {show as showDeleteModal} from '../../components/Story/StoryListItem/DeleteStoryModal/logic/modalActions';
import DeleteStoryModal from "../../components/Story/StoryListItem/DeleteStoryModal";
import MoveStoryModal from "../../components/Story/MoveStory";
import Thesaurus from "../../services/language/thesaurus";
import TextProcessor from '../../services/language/textProcessor';
import getEditor from '../../services/editor/editor';
import PassiveTooltip from '../../components/Editor/Tooltip/passiveTooltip';
import AdverbTooltip from "../../components/Editor/Tooltip/adverbTooltip";
import SimplerTooltip from "../../components/Editor/Tooltip/simplerTooltip";
import SynonymTooltip from "../../components/Editor/Tooltip/synonymTooltip";
import WrongTooltip from "../../components/Editor/Tooltip/wrongTooltip";
import TextSetting from "../../components/Editor/TextSetting";
import TextMistakes from "../../components/Editor/TextMistakes";
import BackBlock from "../../components/Editor/BackBlock";
import TitleInput from "../../components/Editor/TitleInput";
import { uniqueString } from '../../services/generator';
import writegood from 'write-good';
import {isUserActive} from "../../services/user";
import SubscriptionExpiredBlock from "../../components/Editor/SubscriptionExpiredBlock";
import './print.sass';
import BoldTooltip from "../../components/Editor/Tooltip/boldTooltip";
import Loader from '../../components/Loader';
import KeyboardEventHandler from 'react-keyboard-event-handler'

String.prototype.splice = function (start, delCount, newSubStr) { //eslint-disable-line
    return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

String.prototype.hashCode = function(){ //eslint-disable-line
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var character = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash;
    }
    return hash;
};

class EditPage extends React.Component {
    timers = [];
    editor = null;
    currentHash = null;
    caretPosition = 0;
    currentBlock = 0;
    datafornewaction = [];
    undoredo_index = 0;
    blockIndex = 0;
    offsetindex = 0;
    arrsave = true;
    saved = null;
    sel = null;
    state = {
        editMode: false,
        textInEditor: '',
        suggestionsOfSpellMistakes: [],
        htmlWithSpellCorrections: '',
        textWasChecked: false,
        replacements: {},
        story: {
            title: null
        },
        activeTab: 'write',
        loading: false
    };

    updateStory = (data) => {
        this.props.update({
            id: this.props.stories.single.id,
            ...data
        });
    };

    getNameOfDataAttribute = (reasonOfSpellMistake) => {
        if (reasonOfSpellMistake.split(" ").some(item => item === "wordy" || item === "unneeded"))
            return 'data-type="simpler"';
        if (reasonOfSpellMistake.split(" ").some(item => item === "weaken"))
            return 'data-type="adverb"';
        if (reasonOfSpellMistake.split(" ").some(item => item === "bold"))
            return 'data-type="bold"';
        if (reasonOfSpellMistake.split(" ").some(item => item === "passive"))
            return 'data-type="passive"';
    };

    extractFirstText = (str) => {
        const matches = str.match(/"(.*?)"/);
        return matches
            ? matches[1]
            : str;
    };

    isDisabledType = type => {
      return type === 'header';
    };

    setDataAttributesForSpellMistakes = (text, suggestionsOfSpellMistakes, type = false) => {
        // text = text.replace(/&nbsp;\s?/gi, '').trim();
        let sentences = TextProcessor.getSentences(text);
        let prevIndex = 0;

        if (!this.isDisabledType(type)) {
            sentences.forEach(item => {
                if (item.type === "Sentence") {
                    const countOfWords = TextProcessor.countWords(item.raw);
                    let readability;

                    if (countOfWords < 14) {
                        return;
                    }

                    readability = automatedReadability({
                        sentence: 1,
                        word: countOfWords,
                        character: item.raw.length
                    });

                    if (readability >= 15 && readability < 18) {
                        const index = text.indexOf(item.raw, prevIndex);
                        let openSpan = `<span data-type="hard">`;

                        if (index === -1) {
                            return;
                        }

                        text = text.splice(index + item.raw.length, 0, `</span>`);
                        text = text.splice(index, 0, openSpan);

                        prevIndex = index + openSpan.length + item.raw.length + 7;
                    }
                    if (readability >= 18) {
                        const index = text.indexOf(item.raw, prevIndex);
                        let openSpan = `<span data-type="poor">`;

                        if (index === -1) {
                            return;
                        }

                        text = text.splice(index + item.raw.length, 0, `</span>`);
                        text = text.splice(index, 0, openSpan);

                        prevIndex = index + openSpan.length + item.raw.length + 7;
                    }
                }
            });
        }

        prevIndex = 0;

        suggestionsOfSpellMistakes = [...new Set(suggestionsOfSpellMistakes.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));

        suggestionsOfSpellMistakes.sort((a, b) => {
            return a.index - b.index;
        });

        suggestionsOfSpellMistakes.forEach(item => {
            console.log("this is new console for updating", item)
            let attributes = this.getNameOfDataAttribute(item.reason);
            const mistakenWord = this.extractFirstText(item.reason);
            const excludeList = {
                adverb: ['things', 'unfortunately', 'many'],
                simpler: ['it was']
            };
            const re = new RegExp('\\b(' + mistakenWord + ')(?!\\B|-)', 'gi');
            let match = re.exec(text);
            let index = -1;

            while (match) {
                if (match.index >= prevIndex && text[match.index - 1] !== '-') {
                    index = match.index;

                    match = false;
                } else {
                    match = re.exec(text);
                }
            }

            if (attributes === 'data-type="simpler"' && ( index === -1 || excludeList.simpler.indexOf(mistakenWord.toLowerCase()) !== -1)) {
                return;
            }

            if (attributes === 'data-type="adverb"' && excludeList.adverb.indexOf(mistakenWord) !== -1) {
                return;
            }

            if (attributes === 'data-type="simpler"' && item.replacements && item.replacements.length > 0) {
                attributes += ` data-replacements="${item.replacements}"`;
            }

            if (typeof attributes === 'undefined' || index === -1) {
                return;
            }

            let openSpan = `<span ${attributes} id="${uniqueString()}">`;

            text = text.splice(index + mistakenWord.length, 0, `</span>`);
            text = text.splice(index, 0, openSpan);

            prevIndex = index + openSpan.length + mistakenWord.length + 7;
        });
        prevIndex = 0;

        return new Promise((resolve, reject) => {
           resolve({text, replacements: {}});
        });
    };

    getTextFromBlock = (block, compact = true) => {
        block = this.sanitizeBlock(block);

        switch (block.type) {
            case 'list':
                let items = block.data.items;

                return compact ? items.join(' ') : items;
            default:
                return block.data.text;
        }
    };

    sanitizeBlock = block => {
        switch (block.type) {
            case 'list':
                block.data.items = block.data.items.map(item => {
                    return this.editor.sanitizer.clean(item, this.editor.configuration.sanitizer)
                });

                break;
            default:
                block.data.text = this.editor.sanitizer.clean(block.data.text, this.editor.configuration.sanitizer);

                break;
        }

        return block;
    };

    sanitizeBlocks = blocks => {
        return blocks.map(block => this.sanitizeBlock(block));
    };

    saveTextInEditor = (data) => {
        let text = data.blocks.reduce((acc, cur) => acc + this.editor.sanitizer.clean(this.getTextFromBlock(cur), this.editor.configuration.sanitizer), '');
        let wordCount = TextProcessor.countWords(text);

        data.blocks = this.sanitizeBlocks(data.blocks);

        this.updateStory({
            text: JSON.stringify(data),
            wordCount: wordCount,
            readTime: TextProcessor.getReadTime(wordCount)
        });
    };

    setTooltipPosition = (element, $tooltip) => {
        const tipWidth = 14;
        let width = $(element).width();
        let height = $(element).height();
        let {
            left,
            top
        } = $(element).offset();
        let right = $(window).width() - (left + width);
        let position = {
            left: 0,
            top: 0,
            right: 'auto'
        };
        let tooltipTop = 0;

        left = left - $(window).scrollLeft();
        top = top - $(window).scrollTop();
        right = right - $(window).scrollLeft();

        tooltipTop = top + height + 7;

        let calculatedLeft = left + (width / 2) - ($tooltip.width() / 2);

        if (calculatedLeft > 0) {
            position.left = calculatedLeft;
        } else {
            position.left = 0;
        }

        $tooltip.find('.c-tooltip__tip').css({
            left: left + (width / 2 - tipWidth / 2),
            top: tooltipTop
        });

        let calculatedRight = right + (width / 2) - ($tooltip.width() / 2);

        if (calculatedRight <= 0) {
            position.right = 0;
            position.left = 'auto';

            $tooltip.find('.c-tooltip__tip').css({
                right: right + (width / 2) - (tipWidth / 2),
                left: 'auto',
                top: tooltipTop
            });
        }

        position.top = top + height + 14;
        $tooltip.css(position);
        $tooltip.attr('data-initial', position.top);
    };

    setTooltipPositionRange = (range, $tooltip) => {
        const tipWidth = 14;
        let position = {
            left: 0,
            top: 0,
            right: 'auto'
        };
        let tooltipTop = 0;

        let rect = range.getClientRects()[0];

        if (typeof rect === 'undefined') {
            return;
        }

        let {left, top, width, height} = rect;
        let right = $(window).width() - (left + width);

        left = left - $(window).scrollLeft();
        top = top - $(window).scrollTop();
        right = right - $(window).scrollLeft();

        tooltipTop = top + height + 7;

        let calculatedLeft = left + (width / 2) - ($tooltip.width() / 2);

        if (calculatedLeft > 0) {
            position.left = calculatedLeft;
        } else {
            position.left = 0;
        }

        $tooltip.find('.c-tooltip__tip').css({
            left: left + (width / 2 - tipWidth / 2),
            top: tooltipTop
        });

        let calculatedRight = right + (width / 2) - ($tooltip.width() / 2);

        if (calculatedRight <= 0) {
            position.right = 0;
            position.left = 'auto';

            $tooltip.find('.c-tooltip__tip').css({
                right: right + (width / 2) - (tipWidth / 2),
                left: 'auto',
                top: tooltipTop
            });
        }

        position.top = top + height + 14;
        $tooltip.css(position);
        $tooltip.attr('data-initial', position.top);
    };

    PassivemouseOverEventForMistakes = () => {
        const self = this;

        $('#codex-editor').on('mouseup', '[data-type="passive"]', function () {
            let $tooltip = $('.passive-tooltip');
            self.setTooltipPosition(this, $tooltip);
            $tooltip.addClass('show');
        });
    };

    AdverbmouseOverEventForMistakes = () => {
        const self = this;

        $('#codex-editor').on('mouseup', '[data-type="adverb"]', function () {
            let $tooltip = $('.adverb-tooltip');

            self.setTooltipPosition(this, $tooltip);

            $tooltip.data('id', $(this).attr('id'));
            $tooltip.find('.adverb-insert').text($(this).text());
            $tooltip.addClass('show');
        });

        $('.adverb-omit').on('click', function() {
            const index = $(this).closest('.c-tooltip').data('id');
            $(`#${index}`).remove();
            $('.adverb-tooltip').removeClass('show');
        });
    };

    BoldmouseOverEventForMistakes = () => {
        const self = this;

        $('#codex-editor').on('mouseup', '[data-type="bold"]', function () {
            let $tooltip = $('.bold-tooltip');

            self.setTooltipPosition(this, $tooltip);

            $tooltip.data('id', $(this).attr('id'));
            $tooltip.addClass('show');
        });

        $('.bold-omit').on('click', function() {
            const index = $(this).closest('.c-tooltip').data('id');
            $(`#${index}`).remove();
            $('.bold-tooltip').removeClass('show');
        });
    };

    SimplermouseOverEventForMistakes = () => {
        const self = this;

        $('#codex-editor').on('mouseup', '[data-type="simpler"]', async function () {
            let $tooltip = $('.simpler-tooltip');

            self.setTooltipPosition(this, $tooltip);

            $tooltip.data('id', $(this).attr('id'));
            $tooltip.find('.simpler-insert').text($(this).text());
            let replacements = $(this).data('replacements');

            if (typeof replacements !== 'undefined') {
                let $wrapper = $tooltip.find('.simpler-omitwrapper');
                let $template = $tooltip.find('.simpler-omit').first().clone();

                $tooltip.find('.simpler-omit').remove();

                replacements.split(',').forEach(item => {
                    $template.clone().text(item).appendTo($wrapper);
                });
            } else {
                let synonym = await Thesaurus.getShorterSynonym($(this).text());
                $tooltip.find('.simpler-omit').first().text(synonym);
                $tooltip.find('.simpler-omit').remove();
            }

            $tooltip.addClass('show');
        });

        $('body').on('click', '.simpler-omit', function() {
            const index = $(this).closest('.c-tooltip').data('id');
            $(`#${index}`).replaceWith($(this).text());
            $('.simpler-tooltip').removeClass('show');
        });
    };

    WrongmouseOverEventForMistakes = (replacements, type) => {
        const self = this;

        $('#codex-editor').on('mouseup', '[data-spell=' + type + ']', function () {
            let $tooltip = $('.wrong-tooltip');

            self.setTooltipPosition(this, $tooltip);

            $tooltip.data('id', $(this).attr('id'));

            $tooltip.find('.wrong-insert').text($(this).text());
            let mistake = $(this).text();
            $tooltip.find('.wrong-insert-correct').text(replacements[mistake]);
            if (type === "wrong") {
                $tooltip.find('.wrong-message').css('display', 'none');
            }
            if (type === "suggestion") {
                $tooltip.find('.wrong-message').css('display', 'block');
            }

            $tooltip.addClass('show');
        });

        $('.wrong-omit').on('click', function() {
            let $tooltip = $('.wrong-tooltip');
            const index = $tooltip.data('id');
            $(`#${index}`).replaceWith($tooltip.find('.wrong-insert-correct').text());
            $('.wrong-tooltip').removeClass('show');
        });
    };

    moveElementOfInlineTool = (element, moveCount) => {
        for (let i = 0; i < moveCount; i++) element.next().insertBefore(element);
    };

    initEditor = () => {
        if (!this.editor) {
            const editorConfig = {
                onChange: async () => {
                    if ($(`#codex-editor`).length === 0) {
                        return;
                    }

                    if (this.currentHash === this.getTextFromEditor().hashCode()) {
                        return;
                    }

                    this.currentHash = this.getTextFromEditor().hashCode();

                    if (this.state.editMode && !this.state.loading) {
                        // code here
                        this.sel = document.getSelection()
                        this.saved = [this.editor.blocks.getCurrentBlockIndex(), this.sel.focusOffset]

                        this.validateSingleBlock(this.editor.blocks.getCurrentBlockIndex());
                    }

                    this.timers = this.timers.filter(timer => {
                        clearTimeout(timer);
                        return false;
                    });

                    this.editor.save()
                        .then(data => {
                            this.timers.push(setTimeout(() => {
                                this.saveTextInEditor(data);
                            }, 1000));
                        })
                        .catch((error) => console.log('Saving failed: ', error));
                },
                onReady: (e) => {
                    this.moveElementOfInlineTool($('.ce-inline-tool--largeheader'), 6);
                    this.moveElementOfInlineTool($('.ce-inline-tool--smallheader'), 7);
                    this.moveElementOfInlineTool($('.ce-inline-tool--firstQuote'), 8);
                    this.moveElementOfInlineTool($('.ce-inline-tool--secondQuote'), 9);

                    $('#codex-editor .ce-inline-tool-input[placeholder="Add a link"]').attr('placeholder', 'Paste or type a link...');

                    $('#codex-editor').on('paste', () => {
                        setTimeout(() => {
                            this.validateText();
                        }, 0);
                    });

                    this.editor.on('inline-header', ({index, level}) => {
                        this.editor.save()
                            .then(async data => {
                                let blocks = data.blocks;
                                for (let i = 0; i < blocks.length; i++) {
                                    if (i === index) {
                                        blocks[i] = {
                                            type: 'header',
                                            data: {
                                                text: blocks[i].data.text,
                                                level: level
                                            }
                                        };
                                    }
                                }

                                blocks = this.updateBlock(data.blocks, await this.validateBlock(blocks[index]), index);

                                this.editor.render({
                                    ...data,
                                    blocks
                                })
                                    .then(() => {
                                        this.editor.caret.setToBlock(index, 'end');
                                    });
                            });
                    });

                    this.editor.on('inline-quote', ({index, type}) => {
                        this.editor.save()
                            .then(async data => {
                                let blocks = data.blocks;
                                for (let i = 0; i < blocks.length; i++) {
                                    if (i === index) {
                                        blocks[i] = {
                                            type: type,
                                            data: {
                                                text: blocks[i].data.text
                                            }
                                        };
                                    }
                                }

                                blocks = this.updateBlock(data.blocks, await this.validateBlock(blocks[index]), index);

                                this.editor.render({
                                    ...data,
                                    blocks
                                })
                                    .then(() => {
                                        this.editor.caret.setToBlock(index, 'end');
                                    });
                            });
                    });

                    this.editor.on('inline-reset', ({index}) => {
                        this.editor.save()
                            .then(async data => {
                                let blocks = data.blocks;
                                for (let i = 0; i < blocks.length; i++) {
                                    if (i === index) {
                                        blocks[i] = {
                                            type: 'paragraph',
                                            data: {
                                                text: blocks[i].data.text
                                            }
                                        };
                                    }
                                }

                                blocks = this.updateBlock(data.blocks, await this.validateBlock(blocks[index]), index);

                                this.editor.render({
                                    ...data,
                                    blocks
                                })
                                    .then(() => {
                                        this.editor.caret.setToBlock(index, 'end');
                                    });
                            });
                    });

                    this.editor.on('inline-list', ({index, style}) => {
                        this.editor.save()
                            .then(async data => {
                                let blocks = data.blocks;
                                // if (typeof blocks[index] === 'undefined') {
                                //     for (let i = blocks.length; i > 0; i--) {
                                //         if (typeof blocks[i] === 'undefined') {
                                //             continue;
                                //         }

                                //         if (blocks[i].data.text === '-' || blocks[i].data.text === '1.') {
                                //             index = i;
                                //             break;
                                //         }
                                //     }
                                // }
                                for (let i = 0; i < blocks.length; i++) {
                                    if (i === index && blocks[i].type !== 'list') {
                                        let text = this.getTextFromBlock(blocks[i]);
                                        if (text === '-' || text === '1.') {
                                            text = text.replace(/^(1\.|-)\s?/, '');                                        
                                            blocks[i] = {
                                                type: 'list',
                                                data: {
                                                    style: style,
                                                    items: [text]
                                                }
                                            };
                                        }
                                    }
                                }


                                blocks = this.updateBlock(data.blocks, await this.validateBlock(blocks[index]), index);

                                this.editor.render({
                                    ...data,
                                    blocks
                                })
                                    .then(() => {
                                        this.editor.caret.setToBlock(index, 'end');
                                    });
                            });
                    });

                    this.editor.on('shortcut-quote', ({index}) => {
                        this.editor.save()
                            .then(async data => {
                                let blocks = data.blocks;
                                for (let i = 0; i < blocks.length; i++) {
                                    if (i === index) {
                                        let type = blocks[i].type;
                                        let newType;

                                        switch (type) {
                                            case 'firstQuote':
                                                newType = 'secondQuote';
                                                break;
                                            case 'secondQuote':
                                                newType = 'paragraph';
                                                break;
                                            default:
                                                newType = 'firstQuote';
                                                break;
                                        }

                                        blocks[i] = {
                                            type: newType,
                                            data: {
                                                text: blocks[i].data.text || blocks[i].data.items.join('\n') || ''
                                            }
                                        };
                                    }
                                }

                                blocks = this.updateBlock(data.blocks, await this.validateBlock(blocks[index]), index);

                                this.editor.render({
                                    ...data,
                                    blocks
                                })
                                    .then(() => {
                                        this.editor.caret.setToBlock(index, 'end');
                                    });
                            });
                    });
                }
            };

            this.editor = getEditor(editorConfig);
        }
    };

    validateText = async () => {
        if (!this.state.editMode) {
            return;
        }

        this.setState({
            loading: true
        });

        this.editor.save()
            .then(async data => {
                let blocks = this.sanitizeBlocks(data.blocks);
                let i = 0;
                let length = blocks.length;
                let f = async () => {
                        let updatedBlocks = blocks;

                        updatedBlocks[i] = await this.validateBlock(blocks[i]);

                        await this.editor.render({
                            ...data,
                            blocks: updatedBlocks
                        });

                        if (i + 1 < length) {
                            i++;
                            setTimeout(f, 150);
                        } else {
                            this.setState({ loading: false });
                        }
                };

                f();
            })
            .catch((error) => console.log('Saving failed: ', error));
    };

    validateSingleBlock = async index => {
        this.editor.save()
            .then(async data => {
                let blocks = data.blocks;

                if (typeof blocks[index] === 'undefined') {
                    return;
                }

                blocks = this.updateBlock(blocks, await this.validateBlock(blocks[index]), index);

                await this.editor.render({
                    ...data,
                    blocks: blocks
                });
                
                if(this.arrsave){      
                    if(this.undoredo_index > 0){
                        this.datafornewaction = this.datafornewaction.slice(0, this.undoredo_index)      
                    }   
                    // var blockIndex = this.saved[0]
                    // var caretElem = $($('#codex-editor > div > div > div')[blockIndex]).find('.cdx-block').first().get(0);

                    this.datafornewaction.push({"data":data, "index":index, "offsetindex": this.saved[1]})
                    this.undoredo_index = this.datafornewaction.length                     
                    this.editor.caret.setToBlock(index, "default", this.saved[1])

                }else if(!this.arrsave){
                    // var blockIndex = this.saved[0]
                    // var caretElem = $($('#codex-editor > div > div > div')[blockIndex]).find('.cdx-block').first().get(0);
                    this.editor.caret.setToBlock(this.blockIndex, "default", this.offsetindex)  
                } 


                this.forceUpdate();
            })
            .catch((error) => console.log('Saving failed: ', error));
    };

    // code here
    newEditiingActions = async (key, e) => {               
        if(key === "ctrl"&&e.code === "KeyZ"){
            this.arrsave = false
            let _arr = this.datafornewaction
            if(this.undoredo_index > 1){
                this.undoredo_index--
                let _data = _arr[this.undoredo_index-1].data
                this.blockIndex = _arr[this.undoredo_index-1].index
                this.offsetindex = _arr[this.undoredo_index-1].offsetindex
                this.editor.save()
                    .then(async () => {
                        await this.editor.render({
                            _data,
                            blocks: _data.blocks
                        })
                    })
            }            
        }
        else if(key === "ctrl"&&e.code === "KeyY"){ 
            this.arrsave = false
            let _arr = this.datafornewaction
            if(this.undoredo_index < this.datafornewaction.length){
                this.undoredo_index++
                let _data = _arr[this.undoredo_index-1].data
                this.blockIndex = _arr[this.undoredo_index-1].index
                this.offsetindex = _arr[this.undoredo_index-1].offsetindex
                this.editor.save()
                    .then(async () => {
                        await this.editor.render({
                            _data,
                            blocks: _data.blocks
                        })
                    })
            }            
        }    

        else if(key !== "ctrl"){
            this.arrsave = true
        }
        
    }

    updateBlock = (blocks, block, index) => {
        blocks.forEach((block, i) => {
            if (i === index) {
                return;
            }

            switch (block.type) {
                case 'list':
                    let items = this.getTextFromBlock(block, false);
                    let newItems = [];

                    for (let j = 0; j < items.length; j++) {
                        newItems.push($(`#codex-editor .ce-block:eq(${i}) .cdx-block li:eq(${j})`).html());
                    }

                    blocks[i] = {
                        ...block,
                        data: {
                            ...block.data,
                            items: newItems
                        }
                    };

                    break;
                case 'header':
                    blocks[i] = {
                        ...block,
                        data: {
                            ...block.data,
                            text: $(`#codex-editor .ce-block:eq(${i}) .ce-header`).html()
                        }
                    };

                    break;
                default:
                    blocks[i] = {
                        ...block,
                        data: {
                            ...block.data,
                            text: $(`#codex-editor .ce-block:eq(${i}) .cdx-block`).html()
                        }
                    };

                    break;
            }
        });

        blocks[index] = block;

        return blocks;
    };

    validateBlock = async block => {
        switch (block.type) {
            case 'list':
                let items = this.getTextFromBlock(block, false);
                let newItems = [];

                for (let j = 0; j < items.length; j++) {
                    let res = await this.getCorrections(items[j]);

                    newItems.push(res === '' ? '&nbsp;': res);
                }

                return {
                    ...block,
                    data: {
                        ...block.data,
                        items: newItems
                    }
                };
            default:
                let newText = await this.getCorrections(this.getTextFromBlock(block), block.type);

                return {
                    ...block,
                    data: {
                        ...block.data,
                        text: newText
                    }
                };
        }
    };

    getCorrections = async (text, type = false) => {
        if (!this.state.editMode) {
            return text;
        }

        const textWithoutHTMLTags = TextProcessor.extractText(text, true);
        const suggestionsOfSpellMistakes = [
            ...writegood(textWithoutHTMLTags, {
                passive: true,
                illusion: false,
                so: false,
                thereIs: false,
                weasel: false,
                adverb:false,
                tooWordy: false,
                cliches: false,
                eprime: false
            }),
            ...RulesCustom.customadverbs.fn(textWithoutHTMLTags),
            ...RulesCustom.customsimple.fn(textWithoutHTMLTags),
            ...RulesCustom.custombold.fn(textWithoutHTMLTags),
        ];
        let {replacements, text: newText} = await this.setDataAttributesForSpellMistakes(text, suggestionsOfSpellMistakes, type);
        if (Object.keys(replacements).length > 0) {
            this.WrongmouseOverEventForMistakes(replacements, 'wrong');
            this.WrongmouseOverEventForMistakes(replacements, 'suggestion');
        }

        return newText;
    };

    setUp = () => {
        this.initEditor();
        this.PassivemouseOverEventForMistakes();
        this.AdverbmouseOverEventForMistakes();
        this.BoldmouseOverEventForMistakes();
        this.SimplermouseOverEventForMistakes();
        // this.WrongmouseOverEventForMistakes();
        $('#codex-editor').on('mouseover', '.ce-inline-tool--secondQuote', function () {
            $(this).prev().addClass('ce-inline-toolbar--green');
        })
        $('#codex-editor').on('mouseleave', '.ce-inline-tool--secondQuote', function () {
            $(this).prev().removeClass('ce-inline-toolbar--green');
        })
        $('#codex-editor').on('DOMSubtreeModified', function () {
            $(this).find(':not([spellcheck="false"])').attr('spellcheck', false);
            $(this).find('[contenteditable="true"]').attr('data-gramm_editor', false);

            let $block = $(this).find('.cdx-list').closest('.ce-block');
            $block.toggleClass('ce-block--lah', $block.prev().find('.ce-header').length > 0);
        });

        $('#codex-editor').on('dblclick', e => {
            if (!this.state.editMode) {
                return;
            }

            $('.c-tooltip').removeClass('show');

            let sel, range, text, timer;

            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    text = sel.toString();
                    range = sel.getRangeAt(0);
                }
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                text = range.toString();
            }

            Thesaurus.getSynonyms(text, 5)
                .then(synonyms => {

                    if (synonyms.length === 0 || typeof range === 'undefined') {
                        return;
                    }

                    let $tooltip = $('.synonym-tooltip');

                    $tooltip.find('.synonym-tooltip__words').html(synonyms.map(syn => {
                        let $syn = $(`<span class="synonym-tooltip__word">${syn}</span>`);
                        $syn.on('click', () => {
                            if (window.getSelection && sel.rangeCount) {
                                range.deleteContents();
                                range.insertNode(document.createTextNode(syn));
                            } else if (document.selection && document.selection.createRange) {
                                range.text = syn;
                            }

                            $tooltip.removeClass('show');

                            this.currentHash = this.getTextFromEditor().hashCode();

                            this.validateSingleBlock($(range.endContainer).closest('.ce-block').index())
                                .then(() => {
                                    this.editor.save()
                                        .then(data => {
                                            this.saveTextInEditor(data);
                                        });
                                });
                        });

                        return $syn;
                    }));
                    $tooltip.on('mouseleave', function () {
                        timer = setTimeout(() => {
                            $(this).removeClass('show');
                        }, 1000);
                    });
                    $tooltip.on('mouseover', function () {
                        clearTimeout(timer);
                    });

                    this.setTooltipPositionRange(range, $tooltip);

                    $tooltip.addClass('show');
                })

        });
    };

    componentDidMount() {
        this.props.get(this.props.match.params.id);
        this.setUp();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.stories.single && !this.props.stories.loading) {
            this.props.get(this.props.match.params.id);
        }

        if (this.state.story.title === null && this.props.stories.single) {
            document.title = `Shosho - ${this.props.stories.single.title}`;

            this.editor.isReady
                .then(() => {
                    let data = JSON.parse(this.props.stories.single.text);

                    if (data.blocks.length > 0) {
                        this.editor.render(JSON.parse(this.props.stories.single.text));
                    } else {
                        $('#codex-editor .codex-editor').toggleClass('codex-editor--empty', true);
                    }
                });

            this.setState((state, props) => {
                return {
                    story: {
                        ...state.story,
                        ...props.stories.single
                    }
                }
            });
        }

        if (this.state.editMode && !prevState.editMode) {
            $('.codex-editor-editmode').toggleClass('codex-editor-editmode--animate', true);

            setTimeout(() => {
                $('.codex-editor-editmode').toggleClass('codex-editor-editmode--animate', false);
            }, 500);

            this.validateText();
        }
    }

    getTextFromEditor() {
        return $('.codex-editor').get(0).innerText;
    }

    render() {
        window.e = this.editor;
        if (!this.props.login.LoggedIn) {
            return <Redirect to="/login"/>;
        }

        let {editMode} = this.state;

        return (
            <div className={`edit-page ${this.state.activeTab === 'edit' ? 'edit-page--editmode' : ''}`}>
                <div className="edit-page__header">
                    <BackBlock/>
                    <div>
                        <div className="switch-buttons">
                            <button
                                onClick={() => {
                                    this.setState({
                                        activeTab: 'write',
                                        editMode: false
                                    });
                                }}
                                className={this.state.activeTab !== 'write' ? "switch-buttons__item" : "switch-buttons__item switch-buttons__item--active"}

                            >
                                Write
                            </button>
                            <button
                                onClick={() => {
                                    this.setState({
                                        activeTab: 'edit',
                                        editMode: isUserActive(this.props.login.user)
                                    });
                                }}
                                className={this.state.activeTab === 'edit' ? "switch-buttons__item switch-buttons__item--active" : "switch-buttons__item"}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="edit-page__main" id="editor-scroll-container">
                    <div className="edit-page__content">
                        <form className="editor-form">
                            <TitleInput onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();

                                    this.editor.blocks.insert('paragraph', {}, this.editor.configuration.tools.paragraph, 0, true);
                                    this.editor.caret.setToFirstBlock();
                                }
                            }}/>
                            {/* code here */}
                            <KeyboardEventHandler handleKeys={['all']} onKeyEvent={(key, e) => {this.newEditiingActions(key, e)}}>
                                <div
                                    id="codex-editor"
                                    placeholder="One word at a time..."
                                    name="comment"
                                    className={`editor-form__text ${editMode ? 'codex-editor-editmode' : ''}`}
                                />
                            </KeyboardEventHandler>    
                        </form>
                    </div>
                    <div className={`edit-page__main-right ${this.state.activeTab === 'edit' ? 'edit-page__main-right--showed' : ''}`}>
                        {
                            this.state.activeTab === 'edit'
                              ?
                              editMode
                                ? <>
                                    <TextSetting text={this.getTextFromEditor()}/>
                                    <TextMistakes
                                      sentences={TextProcessor.getSentences(this.getTextFromEditor()).length}
                                      paragraphs={this.editor.blocks.getBlocksCount()}
                                      config={{
                                          adverb: $('[data-type="adverb"]').length,
                                          passive: $('[data-type="passive"]').length,
                                          simpler: $('[data-type="simpler"]').length,
                                          hard: $('[data-type="hard"]').length,
                                          poor: $('[data-type="poor"]').length
                                      }}
                                    />
                                </>
                                : <SubscriptionExpiredBlock/>
                              : ''
                        }
                    </div>
                </div>
                <WrongTooltip show={editMode}/>
                <SimplerTooltip show={editMode}/>
                <SynonymTooltip show={editMode}/>
                <AdverbTooltip show={editMode}/>
                <PassiveTooltip show={editMode}/>
                <BoldTooltip show={editMode}/>
                <MoveStoryModal/>
                <DeleteStoryModal onDelete={() => {
                    this.props.history.push('/')
                }}/>
                { this.state.loading && <Loader /> }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stories: state.stories,
    login: state.login,
});

const mapDispatchToProps = dispatch => ({
    get: bindActionCreators(get, dispatch),
    update: bindActionCreators(update, dispatch),
    showMoveModal: bindActionCreators(showMoveModal, dispatch),
    showDeleteModal: bindActionCreators(showDeleteModal, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPage));
