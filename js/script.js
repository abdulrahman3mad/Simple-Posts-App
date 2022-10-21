// -- DOM ELEMENTS 
const postsContainer = document.querySelector("#posts").children[0];

// Form Inputs
const form = document.querySelector("#posts-form");
const postTitle = document.querySelector("#post-title-input");
const postWriterId = document.querySelector("#post-writer-input");

// -- EVENTS
window.addEventListener("load", async () => {
    posts = await getData("http://jsonplaceholder.typicode.com/posts");
    drawUI(posts);
})

postTitle.addEventListener("input", filter);
postWriterId.addEventListener("input", filter);

// -- General Functions 
function drawUI(posts) {
    postsContainer.innerHTML = ``;
    posts.forEach((post) => {
        postsContainer.innerHTML += setInHTMLForm(post);
    })
}

function setInHTMLForm(itemData) {
    let HTMLItem = `
    <div class="col-lg-4 col-sm-6">
        <div class="post bg-white p-4 shadow-sm rounded mb-4" id="post" data-id=${itemData.id}>
            <div class="colored-bars d-flex">
                <span class="red-bar bar bg-warning"></span>
                <span class="blue-bar bar bg-secondary"></span>
                <span class="green-bar bar bg-info"></span>
            </div>
            <h5 class="post-title">${itemData.title}</h5>
            <p class="post-desc text-secondary">
                ${itemData.body.substr(0, 70)}
            </p>
            <p class="post-writer">
                By Uesr: <span class="writer">${itemData.userId}</span>
            </p>
        </div>
    </div>`;

    return HTMLItem;
}


function filter() {
    filteredData = (!postWriterId.value && !postTitle.value) ? posts : posts.filter((post) => {
        return (
            (postTitle.value ? post.title.toLowerCase().includes(postTitle.value.trim().toLowerCase()) : true)
            && (postWriterId.value ? post.userId == postWriterId.value : true)
        )
    })
    drawUI(filteredData);
}