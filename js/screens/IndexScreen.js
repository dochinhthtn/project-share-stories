import fakeData from "../../data/fakeData.js";

const $template = document.getElementById('index-screen');

class IndexScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$storyList = this.shadowRoot.getElementById('story-list');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.$storyList.setAttribute('stories', fakeData);
    }
}

window.customElements.define('index-screen', IndexScreen);