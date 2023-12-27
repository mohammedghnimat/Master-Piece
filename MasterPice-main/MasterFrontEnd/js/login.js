const comp = {
    btn: document.querySelector('.sign'),
    pass: document.getElementById('password'),
    email: document.getElementById('email'),
    textErEmail: document.getElementById('email-error'),
    textErPass: document.getElementById('pass-error'),
    textErrr: document.getElementById('em-errr'),
};

comp.btn.addEventListener('click', (event) => {
    event.preventDefault();

    const isEmailValid = comp.email.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi);
    const isPasswordValid = comp.pass.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    if (isEmailValid && isPasswordValid) {
        comp.textErEmail.style.display = "none";
        comp.textErPass.style.display = "none";
        comp.email.style.border = "1px solid #1B262C";
        comp.pass.style.border = "1px solid #1B262C";

        const email = comp.email.value;
        const password = comp.pass.value;

        const user = {
            email: email,
            password: password
        };

        fetch('http://localhost/MasterPiece/Authentication/login_oop.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);

                let idname = data.USER_ID;

                if (data.STATUS === true) {
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("id", idname);
                    sessionStorage.setItem("email", user.email);

                    // Store username, email, and password (not recommended)
                    sessionStorage.setItem("username", data.USER.Username);
                    sessionStorage.setItem("email", data.USER.Email);
                    sessionStorage.setItem("password", user.password);

                    if (data.ROLE === 2) {
                        window.location.href = "../dashbordTeacher/dashbordSt.html";
                    } else if (data.ROLE === 1) {
                        window.location.href = "../dashbord/dashbord.html";
                    } else if (data.ROLE === 3) {
                        window.location.href = "index.html";
                    } else {
                        alert('Error: Invalid user');
                    }
                } else {
                    comp.textErrr.style.display = "block";
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    } else {
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