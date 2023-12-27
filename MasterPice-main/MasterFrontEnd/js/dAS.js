const formUpdate = document.getElementById('update-done')
const ListAll = document.getElementById('all')
const addS = document.getElementById('adddd')
const closeS = document.getElementById('ccccc')
const container = document.getElementById('cont')
addS.addEventListener('click' , ()=> {
    ListAll.style.transform = "translateY(0px)"
    container.style.filter = "blur(20px)"
})
closeS.addEventListener('click' , ()=>{
    ListAll.style.transform = "translateY(-2000px)"
    container.style.filter = "blur(0px)"
})
document.addEventListener("DOMContentLoaded", function () {
const eventContainer = document.querySelector('#customers');
//Read Students
fetch('http://localhost/MasterPiece/AdminDashboard/CrudStudent/ReadAllStudents.php')
.then(response => response.json())
.then(data => {
    data.forEach(student => {
        if (student.role_id == 3) {
            const productRow = document.createElement('tr');

            productRow.innerHTML = `
                <td>${student.Username}</td>
                <td>${student.Email}</td>
                <td style="display: flex; align-items: center;">${student.Password}</td>
                <td>  
                    <button class="button del">delete</button>  
                    <button class="button upd">update</button>  
                </td>
            `;
            eventContainer.appendChild(productRow);

            const delButton = productRow.querySelector('.del');
            delButton.addEventListener('click', () => {
                deleteStudent(student.UserID);
                console.log(student.UserID)
            });
                const pr = document.getElementById('editProfileForm')
                const updateButton = productRow.querySelector('.upd');
                updateButton.addEventListener('click', () => {
                sessionStorage.setItem('UserID:', student.UserID);
                pr.style.display = "flex";
                container.style.filter = "blur(20px)"
                });
        }
    });
})
.catch(error => console.error('Error:', error));

document.getElementById("addUserForm").addEventListener("submit", function (event) {
event.preventDefault();

const username = document.getElementById("name-st").value;
const email = document.getElementById("email-em").value;
const password = document.getElementById("pass-ps").value;

const user = {
    username: username,
    email: email,
    password: password
};
fetch('http://localhost/MasterPiece/AdminDashboard/CrudStudent/CreateStudent.php', {
    method: 'POST',
    body: JSON.stringify(user)
})
.then(response => {
    console.log(user);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
})
.catch(error => {
    console.log('There was a problem with the fetch operation:');
});
});
// Delete student function
function deleteStudent(UserID) {
fetch(`http://localhost/MasterPiece/AdminDashboard/CrudStudent/DeleteStudent.php?id=${UserID}`, {
method: 'DELETE',
body: JSON.stringify({
    userID : UserID
})
})
.then(response => {
if (!response.ok) {
    throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
console.log('Student deleted successfully:', data);
})
.catch(error => {
console.error('Error deleting student:', error);
});
}
});


function toggleEditMode() {
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profilePassword = document.getElementById('profilePassword');
const profileCourse = document.getElementById('profileCourse');
const editProfileForm = document.getElementById('editProfileForm');

profileName.style.display = 'none';
profileEmail.style.display = 'none';
profilePassword.style.display = 'none';
profileCourse.style.display = 'none';
editProfileForm.style.display = 'block';

// Populate input fields with existing data
document.getElementById('profileNameInput').value = profileName.textContent;
document.getElementById('profileEmailInput').value = profileEmail.textContent;
document.getElementById('profilePasswordInput').value = ''; // Assuming you don't want to display the password
document.getElementById('profileCourseInput').value = profileCourse.textContent;
}


// Event listener for the "Save" button in edit mode
document.getElementById('saveProfileChanges').addEventListener('click', () => {
// Get the updated values from the input fields
const newName = document.getElementById('profileNameInput').value;
const newEmail = document.getElementById('profileEmailInput').value;
const newPassword = document.getElementById('profilePasswordInput').value;

sessionStorage.removeItem("username");
sessionStorage.removeItem("email");
sessionStorage.removeItem("password");

sessionStorage.setItem('username' , newName)
sessionStorage.setItem('email' , newName)
sessionStorage.setItem('password' , newPassword)

alert('Updated successfully')
// Use the Fetch API to send the updated data to your server using the provided API endpoint
const apiUrl = 'http://localhost/MasterPiece/AdminDashboard/CrudStudent/UpdateStudent.php';
const requestData = {
    UserID: sessionStorage.getItem('UserID:'), // Replace with the actual user ID
    Username: newName,
    Email: newEmail,
    Password: newPassword,
    // Image: '', // You can add the image field if needed
};
console.log(requestData);

fetch(apiUrl, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
})
.then(response => response.json())
.then(data => {
    // Handle the response from the server, e.g., show a success message
    console.log('Updated successfully:', data);
})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error updating data:', error);
});

// Hide the edit form and show the profile details with the updated data
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profilePassword = document.getElementById('profilePassword');
const profileCourse = document.getElementById('profileCourse');
const editProfileForm = document.getElementById('editProfileForm');

profileName.textContent = newName;
profileEmail.textContent = newEmail;
// Assuming you don't want to display the password
profilePassword.textContent = '********';
profileCourse.textContent = newCourse;

profileName.style.display = 'block';
profileEmail.style.display = 'block';
profilePassword.style.display = 'block';
profileCourse.style.display = 'block';
editProfileForm.style.display = 'none';


});
const cancelProfileEdit = document.getElementById('cancelProfileEdit');

cancelProfileEdit.addEventListener('click' , ()=>{
cont.style.filter = "blur(0px)"
editProfileForm.style.display = "none"
})
