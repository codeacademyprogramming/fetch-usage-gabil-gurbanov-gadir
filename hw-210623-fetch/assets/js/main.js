const tableBtn = document.getElementById('tableBtn');
const cardBtn = document.getElementById('cardBtn');

tableBtn.addEventListener('click', function() {
    GetUsers("table");
});
cardBtn.addEventListener('click', function() {
    GetUsers("card");
});

async function GetUsers(typeStr) {

    const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await responseUsers.json();
    const responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await responsePosts.json();
    const responseComments = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments = await responseComments.json();

    const tableContainer = document.querySelector('.table');
    const cardListsContainer = document.querySelector('.card-lists');

    if (typeStr === "table") {
        let usersTable = `<caption>Use user to see posts</caption>
                        <thead class="table-dark table_head">
                            <tr class="users_table_head">
                                <th scope="col">Id</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody class="users_table_body">`;

        users.forEach((user) => {
            const userTableTr = `<tr class="user_table_body_tr">
                                    <th scope="row" class="user_table_body_th">${user.id}</th>
                                    <td>${user.name}</td>
                                    <td>${user.username}</td>
                                    <td>${user.email}</td>
                                    <td>${user.address.city} ${user.address.street} ${user.address.suite}</td>
                                </tr>`;

            usersTable += userTableTr;
        });

        usersTable += `</tbody>`;

        cardListsContainer.innerHTML = '';
        tableContainer.innerHTML = usersTable;

        //#region GetPostsEvent of Users Table Trs

        const userTableBodyTrs = Array.from(document.querySelectorAll('.user_table_body_tr'));

        userTableBodyTrs.forEach(userTr => {
            userTr.addEventListener('click', function() {
                const userId = Number(userTr.children[0].innerText);
                let postsTable = `<thead class="table-dark table_head">
                                            <tr class="posts_table_head">
                                                <th scope="col">UserId</th>
                                                <th scope="col">Id</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Body</th>
                                                <th scope="col">Buttons</th>
                                            </tr>
                                        </thead>
                                        <tbody class="posts_table_body">`;
                posts.filter(post => post.userId === userId).forEach(post => {
                    let postTableTr = `<tr class="post_table_body_tr">
                                            <th scope="row" class="post_table_body_th">${post.userId}</th>
                                            <th scope="row" class="post_table_body_th">${post.id}</th>
                                            <td>${capitalizeFirstLetter(post.title)}</td>
                                            <td>${capitalizeFirstLetter(post.body)}</td>
                                            <td>
                                            <a class="btn see_post_author_table_btn mb-1"
                                            data-author-id="${post.userId}">See this post's author info</a>
                                            <a class="btn see_post_comments_table_btn"
                                            data-post-id="${post.id}">See this post's comments</a>
                                            </td>
                                        </tr>`;

                    postsTable += postTableTr;
                });

                postsTable += `</tbody>`;

                tableContainer.innerHTML = postsTable;

                //#region GetAuthorButton of Post Table

                const seePostAuthorTableBtns = document.querySelectorAll('.see_post_author_table_btn');

                seePostAuthorTableBtns.forEach(button => {
                    button.addEventListener('click', function() {
                        const authorId = Number(button.getAttribute('data-author-id'));
                        const foundUser = users.find(user => user.id === authorId);

                        const userTable = `<thead class="author_table_head">
                                                <tr class="author_table_head">
                                                    <th scope="col">Labels</th>
                                                    <th scope="col">User info</th>
                                                </tr>
                                            </thead>
                                            <tbody class="author_table_body">
                                                <tr class="author_table_body_tr">
                                                    <th scope="row" class="author_table_body_th">Username: </th>
                                                    <td>${foundUser.username}</td>
                                                </tr>
                                                <tr class="author_table_body_tr">
                                                    <th scope="row" class="author_table_body_th">Email: </th>
                                                    <td>${foundUser.email}</td>
                                                </tr>
                                                <tr class="author_table_body_tr">
                                                    <th scope="row" class="author_table_body_th">Address: </th>
                                                    <td>${foundUser.address.suite} ${foundUser.address.street} ${foundUser.address.city}</td>
                                                </tr>
                                                <tr class="author_table_body_tr">
                                                    <th scope="row" class="author_table_body_th">Zipcode: </th>
                                                    <td>${foundUser.address.zipcode}</td>
                                                </tr>
                                                <tr class="author_table_body_tr">
                                                    <th scope="row" class="author_table_body_th">Phone: </th>
                                                    <td>${foundUser.phone}</td>
                                                </tr>
                                                <tr class="author_table_body_tr">
                                                    <th scope="row" class="author_table_body_th">Website: </th>
                                                    <td>${foundUser.website}</td>
                                                </tr>
                                            </tbody>`;

                        tableContainer.innerHTML = userTable;

                    });
                });

                //#endregion

                //#region GetCommentsButton of Post Table

                const seePostCommentsTableBtns = document.querySelectorAll('.see_post_comments_table_btn');

                seePostCommentsTableBtns.forEach(button => {
                    button.addEventListener('click', function() {
                        const postId = Number(button.getAttribute('data-post-id'));
                        let commentsTable = `<thead class="comments_table_head">
                                                <tr class="comments_table_head">
                                                    <th scope="col">Post Id</th>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">E-mail</th>
                                                    <th scope="col">Body</th>
                                                </tr>
                                            </thead>
                                            <tbody class="comments_table_body">`;
                        comments.filter(comment => comment.postId === postId).forEach(comment => {
                            const commentTr = `<tr class="comment_table_body_tr">
                                                    <th scope="row" class="comment_table_body_th">${comment.postId}</th>
                                                    <th scope="row" class="comment_table_body_th">${comment.id}</th>
                                                    <td>${capitalizeFirstLetter(comment.name)}</td>
                                                    <td>${comment.email}</td>
                                                    <td>${capitalizeFirstLetter(comment.body)}</td>
                                                </tr>`;

                            commentsTable += commentTr;
                        });
                        commentsTable += `</tbody>`;

                        tableContainer.innerHTML = commentsTable;
                    });
                });
                //#endregion
            });
        });

        //#endregion

    } else if (typeStr === "card") {
        let usersCards = '';

        users.forEach((user) => {
            const userCard = `<div class="card user m-3 mt-0 ms-0 border-3" 
            style="width: 18rem">
                <div class="card-body d-flex flex-column justify-content-between">
                   <div>
                    <h5 class="card-title text-center">${user.name}</h5>
                    <p class="card-text">
                        <b>Username:</b> ${user.username} <br/>
                        <b>Email:</b> ${user.email} <br/>
                        <b>Address:</b> ${user.address.suite} ${user.address.street} ${user.address.city}
                    </p>
                    </div>
                    <a class="btn see-user-posts-card-btn mt-3"
                    data-user-id="${user.id}">See this user's posts</a>
                </div>
            </div>`;

            usersCards += userCard;
        });

        tableContainer.innerHTML = '';
        cardListsContainer.innerHTML = usersCards;

        //#region GetPostsButton of User Card 

        const seeUserPostsCardButtons = document.querySelectorAll('.see-user-posts-card-btn');

        seeUserPostsCardButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userId = Number(button.getAttribute('data-user-id'));
                let postsCards = '';
                posts.filter(post => post.userId === userId).forEach(post => {
                    const postCard = `<div class="card post m-2 mb-0" style="width: 18rem">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h5 class="card-title text-center">${capitalizeFirstLetter(post.title)}</h5>
                                <p class="card-text">
                                ${capitalizeFirstLetter(post.body)}
                                </p>
                                <div class="mt-1">
                                <a class="btn btn-primary w-100 see-post-author-card-btn mb-1" data-author-id="${post.userId}">See this post's author info</a>
                                <a class="btn btn-secondary w-100 see-post-comments-card-btn" 
                                data-post-id="${post.id}">See this post's comments</a>
                                </div>
                            </div>
                        </div>`
                    postsCards += postCard;
                });
                cardListsContainer.innerHTML = postsCards;

                //#region GetAuthorButton of Post Card 

                const seePostAuthorCardBtns = document.querySelectorAll('.see-post-author-card-btn');

                seePostAuthorCardBtns.forEach(button => {
                    button.addEventListener('click', function() {
                        const authorId = Number(button.getAttribute('data-author-id'));
                        const foundUser = users.find(user => user.id === authorId);
                        const userElement = `<div class="col-md-6">
                                                                <div class="h-100 p-5 text-white bg-dark rounded-3">
                                                                    <h2>${foundUser.name}</h2>
                                                                    <p>
                                                                        Username: ${foundUser.username} <br/>
                                                                        Email: ${foundUser.email} <br/>
                                                                        Address: ${foundUser.address.suite} ${foundUser.address.street} ${foundUser.address.city} <br/>
                                                                        Zipcode: ${foundUser.address.zipcode} <br/>
                                                                        Phone: ${foundUser.phone} <br/>
                                                                        Website: ${foundUser.website}
                                                                    </p>
                                                                    <button id="backToUserList" class="btn btn-outline-light" type="button">Back to Users List</button>
                                                                </div>
                                                            </div>`
                        cardListsContainer.innerHTML = userElement;

                        const backToUserList = document.getElementById('backToUserList');
                        backToUserList.addEventListener('click', function() {
                            GetUsers("card");
                        });
                    });
                });

                //#endregion

                //#region GetCommentsButton of Post Card 

                const seePostCommentsCardBtns = document.querySelectorAll('.see-post-comments-card-btn');

                seePostCommentsCardBtns.forEach(button => {
                    button.addEventListener('click', function() {
                        const postId = Number(button.getAttribute('data-post-id'));
                        let commentsCard = '';
                        comments.filter(comment => comment.postId === postId).forEach(comment => {
                            const commentCard = `<div class="card comment m-2 mb-0" style="width: 18rem">
                                                                <div class="card-body d-flex flex-column justify-content-start">
                                                                    <h5 class="comment_name card-title text-center">${capitalizeFirstLetter(comment.name)}</h5>
                                                                    <p class="comment_email card-text">
                                                                    E-mail: ${comment.email}
                                                                    </p>
                                                                    <p class="comment_body card-text">
                                                                     ${capitalizeFirstLetter(comment.body)}
                                                                    </p>
                                                                </div>
                                                            </div>`
                            commentsCard += commentCard;
                        });
                        cardListsContainer.innerHTML = commentsCard;
                    });
                });

                //#endregion
            });
        });

        //#endregion


    } else {
        alert('Sistem xetasi bas verdi');
    }


};

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};