const $template = document.getElementById('create-story-screen');

class CreateStoryScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define('create-story-screen', CreateStoryScreen);