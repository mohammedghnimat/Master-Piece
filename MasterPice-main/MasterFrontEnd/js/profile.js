const profile = document.getElementById('profile');
const clickProfile = document.getElementById('btn-pr');
const cont = document.getElementById('cont');
const editPr = document.getElementById('edit-pr');
const dBtn = document.querySelectorAll('.ccccc');
const txt = document.getElementById('txt-d');
const img = document.getElementById('img');
const closeProfile = document.getElementById('closeProfile');


profile.innerHTML +=
 `
 <div style="display:flex;">
 
<div id="txt-"  class="text-profile">
<h4>Teacher Profile</span></h4>
<h4>Name : <span>${sessionStorage.getItem('username')}</span></h4>
<h4>Email : <span>${sessionStorage.getItem('email')}</span></h4>
<h4>Password : <span>${sessionStorage.getItem('password')}</span></h4>
<div class="btn-a">
    <button id="edit-pr" class="ccccc">Edit Profile</button>
    <button id="closeProfile" class="ccccc">close</button>
</div>

</div>
<div id="img" class="img">
<img src="../img/pngtree-avatar-vector-icon-white-background-png-image_1870181.jpg" alt="user">
</div>

</div>

`;
document.addEventListener("DOMContentLoaded", function () {
    const profile = document.getElementById('profile');
    const clickProfile = document.querySelector('#btn-pr');
    const cont = document.getElementById('cont');
    const editPr = document.querySelector('#edit-pr');
    const closeProfile = document.querySelector('#closeProfile');
  
    if (clickProfile && closeProfile) {
      clickProfile.addEventListener('click', function () {
        profile.style.display = "block";
        cont.style.filter = "blur(20px)";
      });
  
      closeProfile.addEventListener('click', function () {
        profile.style.display = "none";
        cont.style.filter = "blur(0px)";
      });
    } else {
      console.error('One or more elements not found.');
    }
  });
  
  

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
      sessionStorage.setItem('email' , newEmail)
      sessionStorage.setItem('password' , newPassword)

      alert('Updated successfully')
      // Use the Fetch API to send the updated data to your server using the provided API endpoint
      const apiUrl = 'http://localhost/MasterPiece/AdminDashboard/CrudStudent/UpdateStudent.php';
      const requestData = {
          UserID: sessionStorage.getItem('id'), // Replace with the actual user ID
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
  const editPrButton = document.getElementById('edit-pr');
  const cancelProfileEdit = document.getElementById('cancelProfileEdit');
  editPrButton.addEventListener('click' , ()=>{
      editProfileForm.style.display = "flex"
      txtD.style.display = "none"
      img.style.display = "none"
      profile.style.display = "none"
      cont.style.filter = "blur(20px)"
      closeProfile.style.display = "none"
      editPr.style.display = "none"
  })
  cancelProfileEdit.addEventListener('click' , ()=>{
      cont.style.filter = "blur(0px)"
      profile.style.display = "none"
      editProfileForm.style.display = "none"
  })
  editPrButton.addEventListener('click' , ()=>{
    profile.style.display = "none"
  })