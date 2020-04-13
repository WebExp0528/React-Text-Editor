import './index.scss';
import $ from "jquery";

export default class LargeHeaderTool {

  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({api}) {
    this.api = api;
    this.button = null;
    this._state = false;

    this.class = 'cdx-largeheader';
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29356 2.44729V15.8947C10.0655 15.9445 11.0617 16.0441 11.734 16.1686C11.8585 16.592 11.9083 17.5881 11.8336 17.9865H3.74028C3.76518 17.4885 4.0142 16.6667 4.18852 16.2434C4.68658 16.0939 5.68268 15.9196 6.28034 15.8698V2.44729H2.84378C2.79397 2.99515 2.61966 4.04106 2.52005 4.51421C1.89748 4.68853 1.00098 4.73833 0.353516 4.73833V0.529785H15.2204V4.83794C14.5231 4.83794 13.6515 4.76323 13.029 4.58892C12.9044 4.04106 12.755 3.04495 12.7052 2.44729H9.29356Z" fill="white"/></svg>`;
    this.button.classList.add(this.api.styles.inlineToolButton, 'ce-inline-tool--largeheader');
    return this.button;
  }

  surround() {
    if (this.state) {
      this.api.events.emit('inline-reset', {index: this.api.blocks.getCurrentBlockIndex()});
    } else {
      this.api.events.emit('inline-header', {index: this.api.blocks.getCurrentBlockIndex(), level: 2});
    }

    this.api.inlineToolbar.close();
  }

  checkState(selection) {
    const mark = $(selection.focusNode).closest('h2').hasClass('ce-header');
    this.state = !!mark;
  }
}