const $template = document.getElementById('story-list-template');

class StoryList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$storyList = this.shadowRoot.getElementById('story-list');
    }

    static get observedAttributes() {
        return ["stories"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'stories') {
            this.render();
        }
    }

    render() {
        // lấy dữ liệu từ thuộc tính
        let stories = this.getAttribute("stories");
        
        stories.forEach((story) => {
            // tạo 1 <story-container>
            let $story = document.createElement('story-container');
            $story.setAttribute('id', story.id);
            $story.setAttribute('content', story.content);
            $story.setAttribute('owner', story.owner);
            $story.setAttribute('date-modified', story.dateModified);
            
            // thêm <story-container> vừa tạo vào trong #story-list
            this.$storyList.appendChild($story);
        });
    }
}

window.customElements.define('story-list', StoryList);