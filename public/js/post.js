const url = window.location.href;
const parts = url.split('/');
const id = parts[parts.length - 1];
const URL = `http://localhost:3000/blogs/${id}`
document.getElementById("update-link").href = `/${id}/edit`

function fetchPost() {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayData(data)
        })
}

function displayData(data) {
    const deleteButton = document.getElementById("delete-button")
    const postTitle = document.getElementById("post-title")
    const postContent = document.getElementById("post-content")

    const title = data.title
    const content = data.content

    postTitle.textContent = title
    postContent.textContent = content

    deleteButton.addEventListener("click", () => {
        fetch(URL, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => {
                alert(res)
                window.location.assign("/")
            })
            .catch(err => console.log(err))
    })
}

window.onload = fetchPost