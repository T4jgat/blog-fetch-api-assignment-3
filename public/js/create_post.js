// async function submitPost() {
const URL = "http://localhost:3000/blogs"
const postForm = document.getElementById("post-form")

const titleValidation = document.getElementById("title-validation")
const contentValidation = document.getElementById("content-validation")

if (postForm) {
    postForm.addEventListener("submit", async (event) => {
        titleValidation.innerHTML = ""
        contentValidation.innerHTML = ""

        event.preventDefault()
        const postData = JSON.stringify(Object.fromEntries(new FormData(postForm)))
         try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: postData,
            })

            const responseJson = await response.json()

            if (response.status === 200) {
                alert("Post created!")
                window.location.assign("/")
            } else if (response.status === 409) {
                alert("post already exists")
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


        } catch (err) {
            console.log(err.message)
        }
    })
}

