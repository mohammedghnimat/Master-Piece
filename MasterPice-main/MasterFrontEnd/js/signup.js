const comp = {
    btn: document.querySelector('.sign'),
    pass: document.getElementById('password'),
    email: document.getElementById('email'),
    user: document.getElementById('username'),
    textErEmail: document.getElementById('email-error'),
    textErPass: document.getElementById('pass-error'),
};

comp.btn.addEventListener('click', (event) => {
    event.preventDefault();

    const isNameValid = comp.user.value.trim() !== "";
    const isEmailValid = comp.email.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi);
    const isPasswordValid = comp.pass.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    if (isNameValid && isEmailValid && isPasswordValid) {
        comp.textErEmail.style.display = "none";
        comp.textErPass.style.display = "none";
        comp.email.style.border = "1px solid #1B262C";
        comp.pass.style.border = "1px solid #1B262C";
        comp.user.style.border = "1px solid #1B262C";

        const username = comp.user.value;
        const email = comp.email.value;
        const password = comp.pass.value;

        const user = {
            username: username,
            email: email,
            password: password
        };

        fetch('http://localhost/MasterPiece/files/signup_oop.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('password', password);

                window.location.href = "login.html";
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    } else {
        if (!isNameValid) {
            comp.user.style.border = "1px solid red";
        } else {
            comp.user.style.border = "1px solid #1B262C";
        }

        if (!isEmailValid) {
            comp.textErEmail.style.display = "block";
            comp.email.style.border = "1px solid red";
        } else {
            comp.textErEmail.style.display = "none";
            comp.email.style.border = "1px solid #1B262C";
        }

        if (!isPasswordValid) {
            comp.textErPass.style.display = "block";
            comp.pass.style.border = "1px solid red";
        } else {
            comp.textErPass.style.display = "none";
            comp.pass.style.border = "1px solid #1B262C";
        }
    }
});
