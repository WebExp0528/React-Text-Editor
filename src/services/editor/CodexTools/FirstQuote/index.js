import './index.scss';
import $ from "jquery";

export default class FirstQuoteTool {
  
  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    $(this.button).toggleClass(this.api.styles.inlineToolButtonActive, state);     
  }

  constructor({api}) {
    this.api = api;
    this.button = null;
    this._state = false;
    this.class = 'cdx-firstQuote';
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = `<svg class="icon" width="10" height="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.0872 1.62786C6.64159 2.38244 5.54941 3.1768 4.80947 4.01014C4.04855 4.84587 3.74219 5.86482 3.87032 7.07022C3.987 8.16799 4.44606 9.00225 5.26946 9.57141C6.09287 10.1406 7.02363 10.486 8.06306 10.628C8.26197 10.6569 8.47092 10.7723 8.68581 10.9516C8.87958 11.1325 9.01982 11.4264 9.05636 11.7702C9.1433 12.5881 8.90253 13.1907 8.33554 13.5999C7.76854 14.0092 7.20297 14.2236 6.68415 14.2609L6.59721 14.268C5.94826 14.3148 5.26134 14.2126 4.56152 13.981C3.86084 13.7494 3.21465 13.4054 2.59702 12.9299C2.00137 12.4527 1.45926 11.8624 1.03508 11.1561C0.587457 10.4295 0.322741 9.5812 0.219815 8.61289C0.103129 7.51512 0.238499 6.52964 0.598529 5.61528C0.982765 4.7203 1.50625 3.90167 2.19252 3.18065C2.87869 2.45872 3.66257 1.83904 4.54479 1.31983C5.42706 0.800605 6.34197 0.388317 7.31223 0.0795898L8.0872 1.62786Z" /></svg>`;
    this.button.classList.add(this.api.styles.inlineToolButton, 'ce-inline-tool--firstQuote');
    return this.button;
  }

  surround(range) {
    if (this.state) {
      this.api.events.emit('inline-reset', {index: this.api.blocks.getCurrentBlockIndex()});
    } else {
      this.api.events.emit('inline-quote', {index: this.api.blocks.getCurrentBlockIndex(), type: 'firstQuote'});
    }

    this.api.inlineToolbar.close();
  }

  checkState(selection) {
    const mark = $(selection.focusNode).closest('div').hasClass('ce-firstquote')
    this.state = !!mark;
  }
}