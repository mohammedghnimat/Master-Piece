document.addEventListener("DOMContentLoaded", function () {
    const eventContainer = document.querySelector('#customers');
    async function fetchData() {
try {
const response = await fetch('http://localhost/MasterPiece/AdminDashboard/CrudStudent/ReadAllStudents.php', {
    method: "GET"
});

if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();
console.log(data.Username);
} catch (error) {
console.error('Error:', error);
}
}

// Call the async function
fetchData();
    // Read Students
    fetch('http://localhost/MasterPiece/AdminDashboard/CrudStudent/ReadAllStudents.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(student => {
                if (student.role_id == 3) {
                    const productRow = document.createElement('tr');

                    productRow.innerHTML = `
                        <td>${student.Username}</td>
                        <td>${student.Email}</td>
                        <td style="display: flex; align-items: center;">***********</td>
                    `;

                    eventContainer.appendChild(productRow);
                }
            });
        })
        .catch(error => console.error('Error:', error));
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
