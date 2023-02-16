$(() => {
  //creates resource element
  const $viewResource = $(`<section id="single-resource-container" class="card-columns d-flex justify-content-center m-5">
    <p>Loading...</p>
    </section>`);
  window.$viewResource = $viewResource;
  window.viewResource = {};

  const checkIfRating = (value) => {
    return value === null ? "Not Rated" : value;
  };

  function createResourceArticle(resource) {
    return `<div class="card text-center border-0" style="width: 60rem;">
              <div class="hide-content">${resource.id}</div>
              <div>
               <h2 card="card-title">${resource.title}</h2>
              </div>
              <img class='card-img-top' src='${resource.cover_image_url}'>
              <div class="card-body d-flex justify-content-around">
                <div>
                  <span>${resource.author}</span>
                </div>
                <div>
                  <button type="button" class="btn btn-success copy-btn">Copy</button>
                </div>
                <div>
                  <span id="average">${checkIfRating(resource.rating)}</span>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div>
                  <form>
                    <div class=”rating”>
                      <i class="rating fa-regular fa-star" id="1"></i>
                      <i class="rating fa-regular fa-star" id="2"></i>
                      <i class="rating fa-regular fa-star" id="3"></i>
                      <i class="rating fa-regular fa-star" id="4"></i>
                      <i class="rating fa-regular fa-star" id="5"></i>
                    </div>
                  </form>
                </div>
              </div>
              <div>
                <h4>${resource.description}</h4>
              </div>
              <div "d-flex">
                <div class="mr-auto p-2"">Resource Link:</div>
                <a id="long-url" class="card-text p-2"" href='${resource.url}'>${resource.url}</a>
              </div>
            </div>`;
  }
  window.viewResource.createResourceArticle = createResourceArticle;

  // function that changes the number of liked stars to the amount of liked stars from user
  const highlightStars = function(value) {
    const stars = document.querySelectorAll('.rating');
    stars.forEach((star, index) => {
      if (value - 1 >= index) {
        star.classList.remove('fa-regular');
        star.classList.add('fa-solid');
        } else {
          star.classList.remove('fa-solid');
          star.classList.add('fa-regular');
        }
    });
  }

  function addResource(resource) {
    $viewResource.append(resource);
  }

  function clearResource(resource) {
    $viewResource.empty(resource);
  }
  window.viewResource.clearResource = clearResource;
  //appends resource to dom
  $(document).on("click", ".resource-card", function (event) {
    const resourceId = $(this).attr("id");
    getResourceById(resourceId).then(function (resource) {
      clearResource();
      article = window.viewResource.createResourceArticle(resource);
      addResource(article);
      views_manager.show("resource");
      return resource;
    })
    
    // loads up the number of stars the user has rated in the database
    .then((data) => {
      $.get('/api/resources/rating', {resource : data.id })
        .then((userData) => {
          if (userData) {
          // does not highlight stars if the data does not exist
          highlightStars(userData.rating)
          }
        });
      });
  });

  $(document).on("click", ".rating", function() {
    let newRating = $(this).attr('id');
    highlightStars(newRating);
    const resourcePost = $(this).parents();
    const resourceID = $(resourcePost).find('.hide-content')[0]
    // updates or adds new rating by the user
    $.post('/api/resources/rating', {info : parseInt(resourceID.innerText), rating : newRating})
      .then((data) => {
        if (data) {
          // changes the average of the rating based on new rating that user has given
          const resourceAverage = $(this).parents()[4];
          const averageValue = $(resourceAverage).find('#average')[0];
          averageValue.innerText = data.average_rating;
        }
    })
  })


  //uses copy button to copy url to clipboard
  $(document).on("click", ".copy-btn", function() {
    textToCopy = $('#long-url').html()

    navigator.clipboard.writeText(textToCopy).then(
      function() {
        /* clipboard successfully set */
       $('.copy-btn').html('Copied!')
      },
      function() {
        /* clipboard write failed */
        $('.copy-btn').html('Error')
      }
    )
  })


});
