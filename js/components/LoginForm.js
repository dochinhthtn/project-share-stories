import { checkInputWrapperValue, validateEmail, md5, makeAuth, getDataFromDoc } from "../utils.js";

const $template = document.getElementById('login-form-template');

class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$loginForm = this.shadowRoot.getElementById('login-form');
        this.$email = this.shadowRoot.getElementById('email');
        this.$password = this.shadowRoot.getElementById('password');
    }

    connectedCallback() {
        this.$loginForm.onsubmit = async (event) => {
            event.preventDefault();

            // lấy dữ liệu mà người dùng nhập
            let email = this.$email.value;
            let password = this.$password.value;

            // kiểm tra dữ liệu vừa lấy
            let isPassed = checkInputWrapperValue(this.$email, function (value) {
                return value == "";
            }, "Nhập vào email") & checkInputWrapperValue(this.$email, function (value) {
                return !validateEmail(value);
            }, "Email không hợp lệ") & checkInputWrapperValue(this.$password, function (value) {
                return value == "";
            }, "Nhập vào mật khẩu");

            if (isPassed) {
                // kiểm tra thông tin trong csdl
                let result = await firebase
                    .firestore()
                    .collection('users')
                    .where('email', '==', email)
                    .where('password', '==', md5(password))
                    .get();

                if (result.empty) {
                    alert("Email hoặc mật khẩu không chính xác");
                } else {
                    // chuyển trang khi đăng nhập thành công
                    makeAuth(getDataFromDoc(result.docs[0], ['password']));
                    router.navigate("/index");
                    
                    // console.log(getDataFromDoc(result.docs[0], ['password']));
                }
            }
        }
    }

}

window.customElements.define('login-form', LoginForm);