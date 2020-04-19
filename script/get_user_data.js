let userEmail = getCookie('email');
ajax('core/get_user_data.php', 'POST', getUserData, {"email": userEmail});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function getUserData(result) {
    result = JSON.parse(result);
    console.log(result);
    document.querySelector('#signup-name').value = result.name;
    document.querySelector('#signup-pass').value = result.password;
    document.querySelector('#signup-birthday').value = result.birthday;
    let sex = document.querySelectorAll('.sex');
    for(let i = 0; i < sex.length; i++) {
        if(sex[i].checked) {
            sex = sex[i].value;
        }
    }
    sex = result.sex
  }
document.querySelector('#signup-submit').onclick = function(event) {
    event.preventDefault();
    let sex = document.querySelectorAll('.sex');
    for(let i = 0; i < sex.length; i++) {
        if(sex[i].checked) {
            sex = sex[i].value;
        }
    }
    let updateData = {
        "email": userEmail,
        "name": document.querySelector('#signup-name').value,
        "pass": document.querySelector('#signup-pass').value,
        "birthday": document.querySelector('#signup-birthday').value,
        "sex": sex
    }
    ajax('core/update_user_data.php', 'POST', updateUserData, updateData);
}
function updateUserData(result) {
    console.log(result);
    if(result == 1) alert('Данные успешно обновлены!')
    else alert('Ошибка обновления!')
}