const url = window.location.href;
const parts = url.split('/');
const id = parts[parts.length - 1];
const URL = `http://localhost:3000/blogs/${id}`

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
    title.value = data.title

    const updateForm = document.getElementById('updateForm')
    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(new FormData(updateForm)))
            });
            const updatedObject = await response.json();
            console.log('Updated object:', updatedObject);
            alert('Updated object:' + updatedObject)
        } catch (error) {
            console.error('Error updating object:', error);
        }
    });
}





document.onload = dataToUpdate