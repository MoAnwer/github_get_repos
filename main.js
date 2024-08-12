const account = document.querySelector("#account"),
    search_btn = document.querySelector("#search"),
    repos_search = document.querySelector("#repos_search"),
    repos_list = document.querySelector(".repos_list"),
    content = document.querySelector(".content");

search_btn.addEventListener("click", (e) => {
  getData(account.value);
  e.preventDefault();
});


async function getData(account) {

  content.innerHTML = "";
  document.querySelector(".total").innerHTML = "";

  try {
    let Data = await fetch(`https://api.github.com/users/${account}/repos`);
    let res = await Data.json();
    // Create Repo Item
    for (let i = 0; i < res.length; i++) {
      document.querySelector(".total").innerHTML = `Total Repos is : ${res.length}`;
      let repo = `
      <div class="repo">
        <div class="repo-head">
        <img src="${res[i].avatar_url}" />
          <h2 class="title"><a href="${res[i].contents_url}">${res[i].name}</a></h2>
        </div>
        <p class="description">${res[i].description}</p>
        <a href="${res[i].download_url}" id="download">Download Repo</a>
      </div>
      `;
    // Add Repo Item to Page
      content.insertAdjacentHTML("beforeend", repo);
    }
  } catch (error) {
    content.innerHTML = "<h1>Data Not Found</h1>";
    console.log(`Error : ${error}`);
  }
}


// https://api.github.com/user/${account}/repos/