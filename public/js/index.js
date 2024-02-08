function fetchData() {
    fetch('http://localhost:3000/blogs')
        .then(response => response.json())
        .then(data => {
            displayList(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayList(data) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    const reversedData = data.slice().reverse()

    reversedData.forEach(item => {
        const postContainer = document.createElement('a');
        postContainer.classList.add("post-container");

        postContainer.addEventListener('click', () => {
            window.location.href = `/${item._id}`;
        });

        const postTitle = document.createElement('h1');
        postTitle.classList.add("post-title");
        postTitle.textContent = item.title;
        postContainer.href = `/${item._id}`;

        postContainer.appendChild(postTitle);

        const postContent = document.createElement('p');
        postContent.classList.add("post-content");
        postContent.textContent = item.content;

        postContainer.appendChild(postContent);
        postList.appendChild(postContainer);
    });
}

window.onload = fetchData;