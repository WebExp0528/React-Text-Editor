import './index.scss';

export default class FirstQuoteBlockTool {
  data = null;

  constructor({data}){
    this.data = data;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('cdx-block');
    wrapper.classList.add('ce-firstquote');
    wrapper.innerHTML = this.data.text;
    wrapper.contentEditable = true;
    wrapper.spellcheck = false;

    return wrapper;
  }

  save(blockContent) {
    return {
      text: blockContent.innerHTML
    }
  }
}
