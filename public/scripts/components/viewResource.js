$(() => {
  //creates resource element
  const $viewResource = $(`<section class="card-columns">
    <p>Loading...</p>
    </section>`);
  window.$viewResource = $viewResource;
  window.viewResource = {};

  function createResourceArticle(resource) {
    return `<article>
              <header>
                <img src='${resource.cover_image_url}'>
              </header>
              <div>
                <div>
                  <span>${resource.author}</span>
                </div>
                <div>
                  <span>${resource.rating}</span>
                </div>
              </div>
              <div>
                <h2>${resource.title}</h2>
              </div>
              <footer>
                <span>Resource Link:<span>
                <a href='${resource.url}'>${resource.url}</a>
              </footer>
            </article>`;
  }
  window.viewResource.createResourceArticle = createResourceArticle;

  console.log(window.viewResource);

  function addResource(resource) {
    $viewResource.append(resource);
  }

  function clearResource(resource) {
    $viewResource.empty(resource);
  }
  window.viewResource.clearResource = clearResource;
  //appends resource to dom

  $(document).on("click", ".resource-card", function (event) {
    getResourceById(2).then(function (resource) {
      console.log(resource.id)
      clearResource();
      article = window.viewResource.createResourceArticle(resource);
      addResource(article);
      views_manager.show("resource");
    });
  });
});