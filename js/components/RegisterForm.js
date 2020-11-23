import { checkInputWrapperValue, validateEmail, validateStrongPassword, md5 } from "../utils.js";

const $template = document.getElementById('register-form-template');

class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$registerForm = this.shadowRoot.getElementById('register-form');

        console.log(this);

        this.$name = this.shadowRoot.getElementById('name');
        this.$email = this.shadowRoot.getElementById('email');
        this.$password = this.shadowRoot.getElementById('password');
        this.$passwordConfirmation = this.shadowRoot.getElementById('password-confirmation');
    }

    // khi register-form được thêm vào DOM Tree thì gọi phương thức này 😂
    connectedCallback() {
        // console.log(this);
        this.$registerForm.onsubmit = async (event) => {
            event.preventDefault();

            // kiểm tra dữ liệu
            // console.log(this);
            let name = this.$name.value;
            let email = this.$email.value;
            let password = this.$password.value;
            let passwordConfirmation = this.$passwordConfirmation.value;

            let isPassed = checkInputWrapperValue(this.$name, function (value) {
                return value == "";
            }, "Nhập vào tên") & checkInputWrapperValue(this.$email, function (value) {
                return value == "" || !validateEmail(value);
            }, "Email không hợp lệ") & checkInputWrapperValue(this.$password, function (value) {
                return value == "" || !validateStrongPassword(value);
            }, "Mật khẩu không hợp lệ") & checkInputWrapperValue(this.$passwordConfirmation, function (value) {
                return value == "" || value != password;
            }, "Xác nhận mật khẩu không hợp lệ");

            // kiểm tra tổng thể
            if(isPassed) {
                // thực hiện check email trùng
                let result = await firebase
                    .firestore()
                    .collection('users')
                    .where('email', '==', email)
                    .get();
                
                console.log(result);
                if(result.empty) {
                    // lưu dữ liệu
                    await firebase.firestore().collection('users').add({
                        name: name,
                        email: email,
                        password: md5(password)
                    });

                    alert("Đăng kí tài khoản thành công");
                } else {
                    alert("Email " + email + " đã có người sử dụng!");
                }

            }

            // A, B, C, D
            // A && B && C && D
            // A & B & C & D
            // Chinh@1234
        }
    }
}

window.customElements.define('register-form', RegisterForm);