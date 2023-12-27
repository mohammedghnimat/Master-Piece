document.addEventListener("DOMContentLoaded", function () {
    const eventContainer = document.querySelector('#customers');

    // Read Courses
    fetch('http://localhost/MasterPiece/TeacherDashboard/CrudCourse/ReadCourses.php')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            data.forEach(function(course) {
                if (course.courseID !== "4" && course.courseID !== "5") {
                    const courseRow = document.createElement('tr');
                    courseRow.innerHTML = `
                        <td>${course.coursename}</td>
                        <td>${course.course_video}</td>
                        <td>${course.course_pdf}</td>
                        <td><button style="display:none;" class="del" data-course-id="${course.courseID}">Delete</button></td>
                    `;
                    eventContainer.appendChild(courseRow);
                    const delButton = courseRow.querySelector('.del');
                    delButton.addEventListener('click', function() {
                        const courseId = delButton.getAttribute('data-course-id');
                        deleteCourse(courseId, courseRow);
                    });
                }
            });
        })
        .catch(function(error) {
            console.error('Error:', error);
        });

    function deleteCourse(courseID, courseRow) {
        fetch(`http://localhost/MasterPiece/TeacherDashboard/CrudCourse/DeleteCourses.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseID: courseID,
            }),
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Course deleted successfully:', data);
            courseRow.remove();
        })
        .catch(function(error) {
            console.error('Error deleting course:', error);
        });
    }

    function searchStudents() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toUpperCase();
        const rows = document.querySelectorAll('#customers tr');

        rows.forEach(function(row) {
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
});
