$(() => {
  window.header = {};

  const $pageHeader = $("#page-header");

  function updateHeader(isLoggedIn) {
    console.log("test header");
    let header;

    if (!isLoggedIn) {
      header = `
        <nav id="header-user-links" class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                Logo
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li  class="nav-item">
                    <a id="login-btn" class="nav-link active" href="#">Log in</a>
                </li>
                <li class="nav-item">
                    <a id="register-btn" class="nav-link active" href="#">Register</a>
                </li>
                </ul>
            </div>
        </nav>
    `;
    } else {
      // IF USER LOGGED IN NAVBAR
      header = `
        <nav id="header-user-links" class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                Logo
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a id="create-resource-btn" class="nav-link">Create resource</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">My resources</a>
                </li>
                <form action="/search" method="GET" id="search-resource-form" class="form-inline my-2 my-lg-0">
                    <input class="js-keyword-search form-control mr-sm-2" type="search" placeholder="Search resource" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <li class="nav-item">
                    <a class="nav-link active" href="#">Log out</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="#">Profile</a>
                </li>
                </ul>
            </div>
        </nav>
    `;
    }

    $pageHeader.append(header);
  }

  window.header.update = updateHeader;

  //Check whether or not the user is logged in
  const isLoggedIn = $.ajax({
    url: "/",
    type: "GET",
  });

  isLoggedIn.done(function (response) {
    //success code here
    console.log("success");
    const isLoggedIn = response.email;
    updateHeader(isLoggedIn);
  });

  isLoggedIn.fail(function (error) {
    //failure code here
    console.log("failed");
    updateHeader(isLoggedIn);
  });

  $("#search-resource-form").on("submit", function (e) {
    e.preventDefault();

    //Retrieves search input value
    const keywordSearch = $(e.currentTarget).find(".js-keyword-search");

    //Make an ajax GET call giving the keyword (search input value)
    const request = $.ajax({
      url: "/search",
      type: "GET",
      data: { keyword: keywordSearch.val() },
      contentType: "application/json; charset=utf-8",
    });

    request.done(function (data) {
      //success code here
      console.log("success");
    });

    request.fail(function (error) {
      //failure code here
      console.log("failed");
    });
  });

  //TO DO: add on click events for navbar options which allows for views_manager.show('component')

  /* If user is NOT logged in*/
  //Render Log in page on click
  $("header").on("click", "#login-btn", function () {
    views_manager.show("loginForm");
  });
  //Render register on click
  $("header").on("click", "#register-btn", function () {
    views_manager.show("registerForm");
  });

  /* If user is logged in*/
  //Render Home page (main content) on Logo click

  //Render Create resource page on click
  $("header").on("click", "#create-resource-btn", () => {
    views_manager.show("submissionForm");
  });

  //Render My resources page on click

  //Render Logout on click

  //Render Profile page on click

});
