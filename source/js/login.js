const formLogin = document.querySelector('#authorization');
if (formLogin) {
  formLogin.addEventListener('submit', prepareAuth);
}
function prepareAuth(e) {
  e.preventDefault();
  var resultContainer = document.querySelector('.status');
  var data = {
    login: formLogin.login.value,
    password: formLogin.password.value
  };
}