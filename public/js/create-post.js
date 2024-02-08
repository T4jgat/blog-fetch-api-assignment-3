// async function submitPost() {
const URL = "http://localhost:3000/blogs"
const postForm = document.getElementById("post-form")
console.log("postform" + postForm)

if (postForm) {
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(new FormData(postForm))),
            })
            const responseJson = await response.json()

            if (response.status === 200) {
                alert("Post created!")
                console.log(responseJson)
                window.location.assign("/")
            } else if (response.status === 409) {
                alert("post already exists")
                console.log(responseJson)
            }


        } catch (err) {
            console.log(err.message)
        }
    })
}

