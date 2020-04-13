import './index.scss';
import $ from "jquery";

export default class SmallHeaderTool {
  
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
    this.class = 'cdx-smallheader';
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = `<svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.77528 2.35179V12.4586C7.35548 12.496 8.10413 12.5709 8.60947 12.6644C8.70305 12.9826 8.74048 13.7313 8.68433 14.0307H2.60156C2.62027 13.6564 2.80744 13.0388 2.93845 12.7206C3.31278 12.6083 4.06142 12.4773 4.51061 12.4398V2.35179H1.92777C1.89034 2.76355 1.75933 3.54963 1.68446 3.90524C1.21656 4.03625 0.542774 4.07369 0.0561523 4.07369V0.910645H11.2297V4.14855C10.7057 4.14855 10.0506 4.0924 9.58271 3.96139C9.48913 3.54963 9.37683 2.80098 9.3394 2.35179H6.77528Z" fill="white"/></svg>`;
    this.button.classList.add(this.api.styles.inlineToolButton, 'ce-inline-tool--smallheader');
    return this.button;
  }

  surround() {
    if (this.state) {
      this.api.events.emit('inline-reset', {index: this.api.blocks.getCurrentBlockIndex()});
    } else {
      this.api.events.emit('inline-header', {index: this.api.blocks.getCurrentBlockIndex(), level: 3});
    }

    this.api.inlineToolbar.close();
  }

  checkState(selection) {
    const mark = $(selection.focusNode).closest('h3').hasClass('ce-header');
    this.state = !!mark;
  }
}