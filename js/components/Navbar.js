const $template = document.getElementById('navbar-template');

class Navbar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define('nav-bar', Navbar);