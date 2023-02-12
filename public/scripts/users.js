// Client facing scripts here
// Client facing scripts here
const loadLoginForm = () => {
  const formObject = `
    <div>
      <h3>Log in</h3>
      <h3>Please fill in fields</h3>
      <form action="/login" method="POST" class="login">
          <label for="email">Email</label>
          <input type="email" name="email" class="email-form">
          <label for="password">Password</label>
          <input type="password" name="password" class="password-form">
        <button type="submit" class="btn btn-info" id="login" disabled="disabled">Submit</button>
      </form>
    </div>
  `;
  $("#content").append(formObject);
};

const loadRegisterForm = () => {
  const formObject = `
    <div>
      <div class="error-message"></div>
      <h3>Register</h3>
      <h3>Please fill in fields</h3>
      <form action="/login/account" method="post" class="register">
          <label for="username">Username</label>
          <input type="text" name="username" class="username-form">
          <label for="email">Email</label>
          <input type="email" name="email" class="email-form">
          <label for="password">Password</label>
          <input type="password" name="password" class="password">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" class="password-checker">
        <button type="button" class="btn btn-info" id="register" disabled="disabled">Submit</button>
      </form>
    </div>
  `;
  $("#content").append(formObject);
};

$(() => {
  loadLoginForm();
})

$(() => {
  $('form').on('submit', () => {
    event.preventDefault();
    $.post("login", {email : $('.email-form')[0].value})
      .done((response) => {
        loadRegisterForm();
      });
  });
});

$(() => {
  $('.register').on('submit', () => {
    event.preventDefault();
    $.post("login/account", {email : $('.email-form')[0].value, password : $('.password-form')[0].value, username: $('.username-form')[0].value})
      .done((response) => {
        console.log("load something");
      });
  });
});

$(() => {
  $('.login').on('keyup', () => {
    if ($('.email-form')[0].value && $('.password-form')[0].value) {
      $('#login').removeAttr('disabled');
    }
  });
});

$(() => {
  $('.register').on('keyup', () => {
    const firstPassword = $('.password')[0].value;
    const secondPassword = $('.password-checker')[0].value;
    if (firstPassword === secondPassword) {
      $(".error-message").empty();
    } else {
      $(".error-message").empty();
      $(".error-message").prepend("<h1>password doesn't match</h1>");
    }
    if (firstPassword === secondPassword && $('.email-form')[0].value && $('.username-form')[0].value) {
      $('#register').removeAttr('disabled');
    }
  });
});
