document.addEventListener("DOMContentLoaded", () => {

    init();
});

function init() {
    setUserSession();
    initializeEvents();
}

function setUserSession() {
    let url = document.baseURI;
    let params = getParams(url);
    if(params) {
        sessionStorage.setItem('userData', JSON.stringify(params));
    }
    else {
        sessionStorage.clear();
    }
}

function getParams(url) {
    let indOfAnd = url.indexOf('?');
    let newUrl = url.slice(indOfAnd+1);
    let paramStr = newUrl.split('&');
    let userDetails = {};

    paramStr.forEach(data => {
        let dataArr = data.split('=');
        userDetails[dataArr[0]] = dataArr[1];
    });

    return userDetails;
}

function initializeEvents() {
    let logoutBtn = document.querySelector('.logout');

    logoutBtn.addEventListener('click', (e)=> {
        logout();
        e.preventDefault();
        e.stopPropagation();
    })
}

function logout() {
    sessionStorage.removeItem('userData');

    document.location.href = 'http://localhost:3000/signin'
}


function deleteToken() {
    console.log('deleting token')
}

// function initializzeEvents() {
//   let submitBtn = document.querySelector(".submit__btn");

//   submitBtn.addEventListener("click", (e) => {
//     let userId = document.querySelector(".userId").value;
//     let password = document.querySelector(".password").value;
//     let result = api.authenticateUser({userId, password});
//     console.log('in main')
//     location.replace("https://www.w3schools.com")
//     e.preventDefault();
//     e.stopPropagation();
//   });
// }
