import Paragraph from "@editorjs/paragraph";
import FirstQuoteBlockTool from "./CodexTools/FirstQuoteBlock";
import SecondQuoteBlockTool from "./CodexTools/SecondQuoteBlock";
import LargeHeaderTool from "./CodexTools/LargeHeaderTool";
import FirstQuoteTool from "./CodexTools/FirstQuote";
import SecondQuoteTool from "./CodexTools/SecondQuote";
import SmallHeaderTool from "./CodexTools/SmallHeader";
import List from './CodexTools/List';
import Header from './CodexTools/Header';
import EditorJS from "@editorjs/editorjs";
import Mousetrap from 'mousetrap';
import $ from 'jquery';

export default config => {
    const initialConfig = {
        holder: 'codex-editor',
        placeholder: 'One word at a time...',
        sanitizer: {
            span: false,
            a: {
                href: true
            },
            b: true,
            i: true
        },
        tools: {
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
                config: {
                    placeholder: 'One word at a time...'
                }
            },
            header: {
                class: Header,
                inlineToolbar: [
                    'largeHeaderTool',
                    'smallHeaderTool',
                    'firstQuoteTool',
                    'secondQuoteTool'
                ]
            },
            firstQuote: {
                class: FirstQuoteBlockTool,
                inlineToolbar: [
                    'largeHeaderTool',
                    'smallHeaderTool',
                    'firstQuoteTool',
                    'secondQuoteTool',
                    'link'
                ]
            },
            secondQuote: {
                class: SecondQuoteBlockTool,
                inlineToolbar: true
            },
            largeHeaderTool: {
                class: LargeHeaderTool,
                shortcut: 'CMD+ALT+1'
            },
            firstQuoteTool: FirstQuoteTool,
            secondQuoteTool: SecondQuoteTool,
            smallHeaderTool: {
                class: SmallHeaderTool,
                shortcut: 'CMD+ALT+2'
            },
            list: {
                class: List,
                inlineToolbar: true
            }
        },
        data: {}
    };

    config = {
        ...initialConfig,
        ...config
    };

    if (null === document.getElementById(config.holder)) {
        return null;
    }

    const editor =  new EditorJS(config);

    editor.isReady.then(() => {
        $('.ce-inline-tool--bold').html(`
            <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1366 8.86053V9.03402C13.3176 9.52971 14.7551 10.9176 14.7551 13.0491C14.7551 16.8659 11.2605 18.3034 7.64201 18.3034C5.28749 18.3034 2.18944 18.2043 0.0827637 18.1299C0.132333 17.6342 0.305824 16.7668 0.479315 16.3454C0.875865 16.2215 1.79289 16.0728 2.28858 15.9984V2.83791C1.74332 2.81313 1.04936 2.73877 0.528883 2.66442C0.45453 2.14395 0.429746 1.32606 0.504099 0.780803C2.68513 0.632097 4.94051 0.532959 6.89848 0.532959C10.7896 0.532959 13.8381 1.99524 13.8381 5.11808C13.8381 6.90256 12.7724 8.38962 11.1366 8.86053ZM5.28749 10.075V16.2711C5.95667 16.3454 6.67542 16.3702 7.31982 16.3702C10.0709 16.3702 11.6571 15.4532 11.6571 13.2226C11.6571 11.0663 9.82305 10.075 7.36939 10.075H5.28749ZM5.28749 2.51571V8.19135H7.27025C9.52563 8.19135 10.8144 7.39825 10.8144 5.29157C10.8144 3.40795 9.12908 2.44136 6.62585 2.44136C6.30366 2.44136 5.68405 2.46614 5.28749 2.51571Z" fill="white"/>
            </svg>
        `);

        $('.ce-inline-tool--italic').html(`
            <svg width="7" height="19" viewBox="0 0 7 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.1597 7.42788L0.216309 7.61C0.216309 7.27179 0.513216 6.12708 0.810124 5.8409C1.5389 5.45066 2.67254 5.1905 3.83318 5.1905C4.21107 5.1905 4.88586 5.26855 5.20976 5.34659L3.94115 15.5189C3.94115 15.623 4.02212 15.8831 4.07611 15.9612L6.07349 15.753C6.07349 16.2734 5.77658 17.2099 5.50666 17.6522C4.61594 17.9904 2.8075 18.3026 1.8628 18.3026C1.34996 17.7823 0.783132 16.6896 0.783132 16.1433L2.1597 7.42788ZM4.23803 0C5.34468 0 6.07345 0.676419 6.07345 1.82113C6.07345 3.04389 5.2907 3.77234 4.23803 3.77234C3.0234 3.77234 2.34861 3.12193 2.34861 1.82113C2.34861 0.780484 3.18535 0 4.23803 0Z" fill="white"/>
            </svg>
        `);

        $('.ce-inline-tool--link').html(`
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6799 0.13479C14.8038 0.100313 15.9423 0.505028 16.8271 1.35597L16.827 1.35583C18.5967 3.0579 18.684 5.90361 17.022 7.71197L14.1351 10.8498C14.2186 10.4322 14.2574 10.0074 14.2408 9.58423C14.2337 9.35415 14.2062 9.12471 14.1679 8.89682C14.1164 8.59051 14.0409 8.28989 13.9379 7.99502L15.5241 6.27026C16.4076 5.30971 16.361 3.79142 15.4191 2.88561C14.9637 2.4476 14.3688 2.21585 13.7431 2.23505C13.1175 2.25424 12.5379 2.5208 12.109 2.98715L8.79777 6.58759C8.79353 6.59219 8.79028 6.5971 8.78715 6.60182C8.78426 6.60619 8.78147 6.6104 8.77811 6.61405C8.53358 6.88755 8.3687 7.20541 8.27176 7.53967C8.18343 7.84041 8.15561 8.15036 8.18433 8.45859C8.23761 9.01728 8.47105 9.56061 8.90164 9.97352C9.31985 10.3757 9.85642 10.592 10.4243 10.6128C10.3682 10.7068 10.3035 10.7963 10.2265 10.8799L9.81397 11.3285L9.41535 11.7607L8.84308 12.3829C8.35875 12.1798 7.9006 11.8897 7.49605 11.5006C7.09148 11.1116 6.78022 10.6618 6.55226 10.1798C6.42484 9.91284 6.32603 9.6363 6.2547 9.35278C6.1724 9.02525 6.12242 8.69181 6.11216 8.35715C6.10374 8.08278 6.12179 7.80759 6.16282 7.5354C6.24295 7.00584 6.41862 6.4906 6.68452 6.01077C6.85338 5.7051 7.05638 5.41316 7.3023 5.14576L10.6123 1.54663C11.4434 0.643045 12.5549 0.169302 13.6799 0.13479ZM12.0931 6.50476C12.4976 6.89258 12.8089 7.34361 13.0369 7.82554L13.0371 7.82548C13.1633 8.09252 13.2621 8.36906 13.3346 8.65131C13.4169 8.97884 13.4681 9.31225 13.4771 9.64694C13.4855 9.92131 13.4675 10.1965 13.4265 10.4687C13.3476 10.9982 13.1719 11.5135 12.906 11.9933C12.7371 12.299 12.5341 12.5909 12.2882 12.8583L8.97697 16.4587C8.14594 17.3623 7.03438 17.8361 5.90937 17.8706C4.78554 17.905 3.64706 17.5003 2.76223 16.6494C0.992605 14.9473 0.905305 12.1016 2.56728 10.2945L5.45302 7.15673C5.36948 7.57431 5.33073 7.99913 5.34732 8.42228C5.35438 8.65236 5.3831 8.88177 5.4202 9.10969C5.47171 9.41477 5.54721 9.71662 5.65016 10.0103L4.06514 11.735C3.63619 12.2001 3.4116 12.8092 3.43123 13.449C3.45082 14.0875 3.71234 14.6817 4.16777 15.1197C4.62442 15.5577 5.22047 15.7894 5.84493 15.7703C6.47059 15.7511 7.05016 15.4845 7.47906 15.0182L10.3205 11.9286L10.7902 11.4191C10.793 11.4155 10.7953 11.4117 10.7975 11.4079C10.8007 11.4025 10.8038 11.3972 10.8087 11.3927C11.0532 11.1192 11.2169 10.8013 11.315 10.467C11.4033 10.1663 11.4311 9.85509 11.4012 9.54567C11.348 8.98943 11.1146 8.44733 10.6852 8.03439C10.267 7.63342 9.7304 7.41589 9.16252 7.39514C9.21865 7.30105 9.28335 7.21163 9.36027 7.12799L9.77401 6.67812L10.1726 6.24595L10.7461 5.62244C11.2304 5.82556 11.6885 6.11694 12.0931 6.50476Z" fill="white"/>
            </svg>
        `);

        Mousetrap(document.getElementById(editor.configuration.holder)).bind("- space", function(e) {
            let $block = $(e.target).closest('.ce-block');

            if ($block.length === 0) {
                return;
            }

            editor.events.emit('inline-list', {
                index: $block.index(),
                style: 'unordered'
            });
        });

        Mousetrap(document.getElementById(editor.configuration.holder)).bind("1 . space", function(e) {
            let $block = $(e.target).closest('.ce-block');

            if ($block.length === 0) {
                return;
            }

            editor.events.emit('inline-list', {
                index: $block.index(),
                style: 'ordered'
            });
        });

        Mousetrap(document.getElementById(editor.configuration.holder)).bind(["command+alt+3", "ctrl+alt+3"], function(e) {
            let $block = $(e.target).closest('.ce-block');

            if ($block.length === 0) {
                return;
            }

            editor.events.emit('shortcut-quote', {
                index: $block.index()
            });
        });

        Mousetrap($(`#${editor.configuration.holder}`).get(0)).bind(["command+b", "ctrl+b", "command+i", "ctrl+i", "command+k", "ctrl+k"], function(e) {
            let $header = $(e.target).closest('.ce-header');

            if ($header.length > 0) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        });

        Mousetrap($(`#${editor.configuration.holder}`).get(0)).bind(["command+b", "ctrl+b", "command+i", "ctrl+i"], function(e) {
            let $quote = $(e.target).closest('.ce-firstquote');

            if ($quote.length > 0) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        });

        $(`#${editor.configuration.holder}`).on('mouseup', 'a', function () {
            if (document.body.createTextRange) {
                const range = document.body.createTextRange();
                range.moveToElementText(this);
                range.select();
            } else if (window.getSelection) {
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(this);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                console.warn("Could not select text in node: Unsupported browser.");
            }
        });

        $('body').on('keypress', function (e) {
            if (e.which === 32 && !$(e.target).is('[contenteditable=true], input, textarea')) {
                e.preventDefault();
            }
        });
    });

    return editor;
};
