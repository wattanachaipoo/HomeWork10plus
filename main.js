const usersList = document.querySelector('.user');
const postInfo = document.querySelector('.info');

function makeElement(tag, attr_n, attr_v, content) {
    let output = document.createElement(tag);
    (!!attr_n) && output.setAttribute(attr_n, attr_v);
    output.textContent = content;
    return output;
}

async function fetchUserData() {
    try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await resp.json();

        for (let el of data) {
            const li = makeElement('li', 'data-user', el.id, `${el.name} / ${el.email}`);
            usersList.append(li);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function fetchPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();

        postInfo.innerHTML = ''; // Clear previous posts

        posts.forEach(post => {
            const Item = document.createElement('div');
            Item.classList.add('item');
            Item.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.body}</p>
            `;
            postInfo.appendChild(Item);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

document.querySelector('.user').addEventListener('click', function (event) {
    const userId = event.target.getAttribute('data-user');
    if (userId) {
        fetchPosts(userId);
    }
});

// Fetch user data when the script runs
fetchUserData();
