// const button = document.querySelector('.loadDataFromBackendBtn');
// button.onclick = function () {
//     const xhr = new XMLHttpRequest();

//     // HTTP Methods - GET, POST, PUT, PATCH, DELETE
//     // HTTP Status Code - 100, 200, 300, 400, 500
//     xhr.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status == 200) {
//             document.querySelector('.container').innerHTML = xhr.responseText;
//         }
//     };

//     xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
//     xhr.send();
// }
const userListContainer = document.getElementById('user-list');


fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => {
        let resultHTML = '';
        users.forEach((user) => {
            // const cardElement = document.createElement('div');
            // cardElement.className = 'card';
            // cardElement.style.width = '18rem';

            // const cardBody = document.createElement('div');
            // cardBody.className = 'card-body';

            // const cardTitle = document.createElement('h5');
            // cardTitle.className = 'card-title';

            // const cardText = document.createElement('p');
            // cardText.className = 'card-text';

            // const link = document.createElement('a');
            // link.className = 'btn btn-primary';
            // link.innerText = 'Go Somewhere';

            // cardTitle.innerText = user.name;
            // cardText.innerHTML = `
            //     Username: ${user.username} <br/>
            //     Email: ${user.email} <br/>
            //     Address: ${user.address.suite} ${user.address.street} ${user.address.city}
            // `
            // cardBody.append(cardTitle, cardText, link);
            // cardElement.append(cardBody);
            const userElement = `<div class="card" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">
                        Username: ${user.username} <br/>
                        Email: ${user.email} <br/>
                        Address: ${user.address.suite} ${user.address.street} ${user.address.city}
                    </p>
                    <a class="btn btn-primary see-user-posts-btn" data-user-id="${user.id}">See this user's posts</a>
                </div>
            </div>`
            resultHTML += userElement;
        });
        userListContainer.innerHTML = resultHTML;
        const seeUserPostsButtons = document.querySelectorAll('.see-user-posts-btn');
        seeUserPostsButtons.forEach((button) => {
            button.onclick = function () {
                const userId = button.getAttribute('data-user-id');
                fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()).then(posts => {
                    let postElementsHTML = '';
                    posts.filter((post) => post.userId === Number(userId)).forEach(post => {
                        const postElement = `<div class="card" style="width: 18rem">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">
                                    ${post.body}
                                </p>
                                <a class="btn btn-primary see-this-posts-author-btn">See this author details</a>
                                <a class="btn btn-secondary see-this-post-details-btn">See details</a>
                            </div>
                        </div>`
                        postElementsHTML += postElement;
                    });
                    userListContainer.innerHTML = postElementsHTML;
                });
            }
        });
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        console.log('request is finally finished');
    });