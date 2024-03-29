const url = window.location.href;
const parts = url.split('/');
const id = parts[parts.length - 2];
console.log(id)
const URL = `http://localhost:3000/blogs/${id}`

const titleValidation = document.getElementById("title-validation")
const contentValidation = document.getElementById("content-validation")

function dataToUpdate() {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayData(data)
        })
}

function displayData(data) {
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    title.value = data.title
    content.innerHTML = data.content


    const updateForm = document.getElementById('update-form')
    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        titleValidation.innerHTML = ""
        contentValidation.innerHTML = ""

        const putData = JSON.stringify(Object.fromEntries(new FormData(updateForm)))

        try {
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: putData
            });
            const responseJson = await response.json();

            if (response.status === 200) {
                alert("Post updated!")
                window.location.assign("/")
            } else if (response.status === 400) {
                const errorMessage = document.createElement("p")
                const errorResponse = responseJson.message.errors

                if (errorResponse.content && errorResponse.title) {
                    const errorTitleMessage = document.createElement("p")
                    errorTitleMessage.innerText = responseJson.message.errors.title.message
                    titleValidation.appendChild(errorTitleMessage)

                    errorMessage.innerText = responseJson.message.errors.content.message
                    contentValidation.appendChild(errorMessage)

                } else if (errorResponse.title) {
                    console.log(responseJson)
                    errorMessage.innerText = responseJson.message.errors.title.message
                    titleValidation.appendChild(errorMessage)

                } else if (errorResponse.content) {
                    errorMessage.innerText = responseJson.message.errors.content.message
                    contentValidation.appendChild(errorMessage)
                }
            }

        } catch (error) {
            console.error('Error updating object:', error);
        }
    });
}





window.onload = dataToUpdate