'use strict';

class Message {
    constructor(text) {
        const message = document.createElement('div');

        message.className = 'message';
        message.innerHTML = `
            <p class="message__text">${text}</p>
            <strong class="message__time">
                ${new Date().toLocaleTimeString()}
            </strong>
        `;

        return message;
    }
}

class Tools {
    constructor() {
        const tools = document.createElement('form');

        tools.className = 'tools';
        tools.autocomplete = 'off';
        tools.innerHTML = `
            <p class="tools__message"></p>

            <textarea class="tools__text"></textarea>

            <button class="tools__btn">Send</button>

        `;

        this.message = tools.firstElementChild;
        this.textarea = tools.querySelector('textarea');
        // this.textarea.addEventListener('input', this.onInputHandler.bind(this));
        this.textarea.addEventListener('input', e => this.onInputHandler(e));
        tools.addEventListener('submit', this.onSubmitHandler.bind(this));
        tools.addEventListener('keydown', this.onKeyDownHandler.bind(this));

        return tools;
    }

    onInputHandler(e) {
        const { value } = e.target;

        this.message.innerHTML = value;
    }

    onSubmitHandler(e) {
        e.preventDefault();

        this.sendMessage();
    }

    onKeyDownHandler(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            this.sendMessage();
        }
    }

    sendMessage() {
        const messagesContainer = document.querySelector('.workspace__messages');

        messagesContainer.append(new Message(this.textarea.value));

        this.message.innerHTML = '';
        this.textarea.value = '';

        this.textarea.focus();
    }
}

class Workspace {
    constructor() {
        const workspace = document.createElement('div');

        workspace.className = 'workspace';
        workspace.innerHTML =`
            <strong class="workspace__date">${new Date().toLocaleDateString()}</strong>
            <div class="workspace__messages"></div>
        `;
        
        return workspace;
    }
}

class Chat {
    constructor() {
        const chat = document.createElement('div');

        chat.className = 'chat';

        chat.append(new Tools(), new Workspace());

        return chat;
    }
}

const chat = new Chat();
document.querySelector('#root').append(chat);