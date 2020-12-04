import { auth } from "../utils.js";
const $template = document.getElementById('navbar-template');

class Navbar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$menu = this.shadowRoot.getElementById('menu');
        this.$currentUserInfo = this.shadowRoot.getElementById('current-user-info');
        this.$currentUserName = this.shadowRoot.getElementById('current-user-name');
    }

    connectedCallback() {
        let currentUser = auth();
        if(currentUser) {
            this.$currentUserInfo.style.display = 'flex';
            this.$currentUserName.innerHTML = "Xin chào " + currentUser.name;
        } else {
            this.$menu.style.display = 'flex';
        }
    }
}

window.customElements.define('nav-bar', Navbar);