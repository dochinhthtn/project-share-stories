console.log("Router");
var root = null
var useHash = true; // Defaults to: false
// Mặc định  : hash = "#"
// var hash = "#!"
var router = new Navigo(root, useHash);

// http://127.0.0.1:5500/index.html/#<link-uri>

//http://127.0.0.1:5500/index.html#/sign-up
router.on('/sign-up', function() {
    console.log("Đăng kí");
    document.getElementById("mainBody").innerHTML = "<register-screen></register-screen>";
}).resolve()

router.on("/sign-in", function() {
    console.log("Đăng nhập");
    document.getElementById("mainBody").innerHTML = "<login-screen></login-screen>";

}).resolve();

router.notFound(function () {
    document.getElementById("mainBody").innerText = "Đường dẫn không tồn tại";
});

router.on('/index', function () {
    // router.navigate("/sign-in")
    document.getElementById("mainBody").innerHTML = "<index-screen></index-screen>";
}).resolve();

window.router = router;