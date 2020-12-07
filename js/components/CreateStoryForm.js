import { auth } from "../utils.js";
const $template = document.getElementById('create-story-form-template');

class CreateStoryForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$createStoryForm = this.shadowRoot.getElementById('create-story-form');
        this.$content = this.shadowRoot.getElementById('content');
    }

    connectedCallback() {
        ClassicEditor.create(this.$content);
        // CKEDITOR.replace( this.$content );
        this.$createStoryForm.onsubmit = async (event) => {
            event.preventDefault();

            let currentUser = auth();
            console.log('aaaaa');
            if (!currentUser) return;
            console.log('ok');
            await firebase.firestore().collection('stories').add({
                content: this.$content.value,
                dateModified: new Date().toISOString(),
                owner: currentUser.id
            });

            router.navigate('/index');
        }
    }
}

window.customElements.define('create-story-form', CreateStoryForm);