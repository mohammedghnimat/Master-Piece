const ListAll = document.getElementById('all');
const addS = document.getElementById('adddd');
const closeS = document.getElementById('ccccc');
const container = document.getElementById('cont');
addS.addEventListener('click', () => {
    ListAll.style.transform = "translateY(0px)";
    container.style.filter = "blur(20px)";
});
closeS.addEventListener('click', () => {
    ListAll.style.transform = "translateY(-2000px)";
    container.style.filter = "blur(0px)";
});

document.addEventListener("DOMContentLoaded", function () {
    const eventContainer = document.querySelector('#customers');

    fetch('http://localhost/MasterPiece/AdminDashboard/CrudTeacher/ReadAllTeacher.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error('Invalid content type received');
            }
        })
        .then(data => {
            data.forEach(teacher => {
                const productRow = document.createElement('tr');

                productRow.innerHTML = `
                    <td>
                       <span class="text-read">${teacher.TeacherUsername}</span>
                        <input class="inp-upd" type="text">
                    </td>
                    <td>
                        <span class="text-read">${teacher.Email}</span>
                        <input class="inp-upd" type="text">
                    </td>
                    <td>
                        <span class="text-read">${teacher.Password}</span>
                        <input class="inp-upd" type="text">
                    </td>
                    <td style="display: flex; align-items: center;">
                        <span class="text-read">${teacher.CourseTeaching}</span>
                        <input class="inp-upd" type="text">
                    </td>
                    <td>  
                        <button class="button del">delete</button>  
                        <button class="button upd">update</button>  
                    </td>
                `;

                eventContainer.appendChild(productRow);
                const delButton = productRow.querySelector('.del');
                delButton.addEventListener('click', () => {
                    deleteTeacher(teacher.ID, productRow);
                });
                const pr = document.getElementById('editProfileForm')
                const updateButton = productRow.querySelector('.upd');
                updateButton.addEventListener('click', () => {
                sessionStorage.setItem('TeacherID:', teacher.ID);
                pr.style.display = "flex";
                container.style.filter = "blur(20px)"
                });
            });
        })
        .catch(error => console.error('Error:', error));

    document.getElementById("addUserForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("name-st").value;
        const email = document.getElementById("email-em").value;
        const password = document.getElementById("pass-ps").value;
        const coursID = document.getElementById("course-id").value;

        const user = {
            Username: username,
            Email: email,
            Password: password,
            course_id: coursID,
        };

        fetch('http://localhost/MasterPiece/AdminDashboard/CrudTeacher/CreateTeacher.php', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => console.error('Error:', error));
    });

    function deleteTeacher(teacher_id, rowToDelete) {
        fetch(`http://localhost/MasterPiece/AdminDashboard/CrudTeacher/DeleteTeachers.php?id=${teacher_id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                teacher_id: teacher_id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Teacher deleted successfully:', data);
            rowToDelete.remove();
        })
        .catch(error => {
            console.error('Error deleting teacher:', error);
        });
    }
});

function searchStudents() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const rows = document.querySelectorAll('#customers tr');

    rows.forEach(row => {
        const nameColumn = row.getElementsByTagName('td')[0];

        if (nameColumn) {
            const nameValue = nameColumn.textContent || nameColumn.innerText;

            if (nameValue.toUpperCase().indexOf(filter) > -1) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
// Fetch courses using fetch API
fetch('http://localhost/MasterPiece/TeacherDashboard/CrudCourse/ReadCourses.php') // Replace with the actual API endpoint
.then(response => response.json())
.then(data => {
    // Populate the dropdown with courses
    var dropdown = document.getElementById('course-id');
    data.forEach(course => {
        var option = document.createElement('option');
        option.value = course.courseID;
        option.text = course.coursename;
        dropdown.add(option);
    });
})
.catch(error => {
    console.error('Error fetching courses', error);
});
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


// Event listener for the "Cancel" button in edit mode
document.getElementById('cancelProfileEdit').addEventListener('click', () => {
// Hide the edit form and show the profile details
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profilePassword = document.getElementById('profilePassword');
const profileCourse = document.getElementById('profileCourse');
const editProfileForm = document.getElementById('editProfileForm');

profileName.style.display = 'block';
profileEmail.style.display = 'block';
profilePassword.style.display = 'block';
profileCourse.style.display = 'block';
editProfileForm.style.display = 'none';
});
// Event listener for the "Save" button in edit mode
document.getElementById('saveProfileChanges').addEventListener('click', (e) => {
e.preventDefault()
const newName = document.getElementById('profileNameInput').value;
const newEmail = document.getElementById('profileEmailInput').value;
const newPassword = document.getElementById('profilePasswordInput').value;
const idt = sessionStorage.getItem('TeacherID:')

console.log(idt)
const apiUrl = 'http://localhost/MasterPiece/AdminDashboard/CrudTeacher/UpdateTeachers.php';
const requestData = {
TeacherID: idt,
name: newName,
email: newEmail,
password: newPassword,
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

// profileName.textContent = newName;
// profileEmail.textContent = newEmail;
// // Assuming you don't want to display the password
// profilePassword.textContent = '********';
// profileCourse.textContent = newCourse;

// profileName.style.display = 'block';
// profileEmail.style.display = 'block';
// profilePassword.style.display = 'block';
// profileCourse.style.display = 'block';
// editProfileForm.style.display = 'none';
});

const cancelProfileEdit = document.getElementById('cancelProfileEdit');

cancelProfileEdit.addEventListener('click' , ()=>{
cont.style.filter = "blur(0px)"
editProfileForm.style.display = "none"
})