sessionStorage.setItem('QuizID' , 1)
sessionStorage.setItem('QuizId' , 1)


//Read Quiz All Name
const quizNA = document.querySelector('#qust');
let quizID = sessionStorage.getItem('QuizID');
    fetch('http://localhost/MasterPiece/Quizzes/ReadQuestions.php', {
        method: 'POST',
        body: JSON.stringify({ quizID: quizID }),
    })
        .then(response => response.json())
        .then(data => {
            data.questions.forEach(question => {
                const productRow = document.createElement('div');
                
                productRow.innerHTML = `
                <div>
                    <h4>Question : ${question.question}</h4>
                    <h4>Answer1 : ${question.answer1}</h4>
                    <h4>Answer2 : ${question.answer2}</h4>
                    <h4>Answer3 : ${question.answer3}</h4>
                    <h4>Answer4 : ${question.answer4}</h4>
                    <h4>Correct Answer : ${question.correctAnswer}</h4>
                </div>
                `;
                quizNA.appendChild(productRow);
                })
            });
            const vieoa = document.querySelector('#btn-close-qus');
            vieoa.addEventListener('click', () => {
                location.reload()
                qust.style.display = "none"
                container.style.filter = "blur(0px)";
            });

                  //------------------Start Read Quiz Name--------------------//
        const eventContainer = document.querySelector('#customers');
        let teacherID = sessionStorage.getItem("id");
        console.log(teacherID);
        sessionStorage.setItem("TeacherID", teacherID);
        sessionStorage.setItem('QuizID', question.QuizID);

fetch(`http://localhost/MasterPiece/Quizzes/ReadQuizName.php?teacherID=${teacherID}`, {
    method: 'GET',
})



.then(response => response.json())
.then(data => {
    data.questions.forEach(question => {
        const productRow = document.createElement('tr');

        productRow.innerHTML = `
            <td>${question.Quiz_Name}</td>
            <td>${question.QuizID}</td>
            <td>
                <button class="button vieo">VIEW</button>  
            </td>
        `;
        eventContainer.appendChild(productRow);
        sessionStorage.setItem('QuizId', question.CourseID);

        const vieo = productRow.querySelector('.vieo');
        vieo.addEventListener('click', () => {
            sessionStorage.setItem('QuizID', question.QuizID);
            qust.style.display = "flex"
            container.style.filter = "blur(20px)";
  });
    });
})
.catch(error => {
    console.error('Error fetching quiz data:', error);
});
        //------------------End Read Quiz Name--------------------//
        //------------------Start Add Questions--------------------//
        document.getElementById("addUserForm").addEventListener("submit", function (event) {
            event.preventDefault();
            
            const quizID = document.getElementById("Quiz").value;
            const question = document.getElementById("question").value;
            const answer1 = document.getElementById("answer1").value;
            const answer2 = document.getElementById("answer2").value;
            const answer3 = document.getElementById("answer3").value;
            const answer4 = document.getElementById("answer4").value;
            const correctAnswer = document.getElementById("answerC").value;

            const newQuestion = {
                quizID: quizID,
                question: question,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                answer4: answer4,
                correctAnswer: correctAnswer,
            };

            fetch('http://localhost/MasterPiece/Quizzes/CreateQuestions.php', {
    method: 'POST',
    body: JSON.stringify(newQuestion),

})

.then(response => {
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    console.log(newQuestion);
    return response.json();
})
.then(data => {
    console.log('Success:', data);

})
.catch(error => console.error('There was a problem with the fetch operation:', error));
});
//------------------End Add Questions--------------------//

//------------------Start Form--------------------//
        const container = document.getElementById('cont');
        const ListAll = document.getElementById('all');
        const addS = document.getElementById('adddd');
        const closeS = document.getElementById('ccccc');
        addS.addEventListener('click', () => {
            ListAll.style.transform = "translateY(0px)";
            container.style.filter = "blur(20px)";
        });

        closeS.addEventListener('click', () => {
            ListAll.style.transform = "translateY(-2000px)";
            container.style.filter = "blur(0px)";
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
//------------------End Form--------------------//
//------------------Start Form Two--------------------//
    const ListAllQ = document.getElementById('allq');
    const addQ = document.getElementById('addddd');
    const closeSQ = document.querySelector('.cccccq');
    addQ.addEventListener('click', () => {
            ListAllQ.style.transform = "translateY(0px)";
            container.style.filter = "blur(20px)";
        });

        closeSQ.addEventListener('click', () => {
            ListAllQ.style.transform = "translateY(-2000px)";
            container.style.filter = "blur(0px)";
        });

//------------------End Form Two--------------------//

//------------------Start Add Quiz--------------------//

        document.getElementById("addUserFormQ").addEventListener("submit", function (event) {
    event.preventDefault();
            const qid = sessionStorage.getItem('QuizId')
            const th = sessionStorage.getItem('TeacherID')
            const qn = document.getElementById('nqu').value
    const newCourse = {
        courseID: qid,
        teacherUserID: th,
        quizName: qn,
    };
    console.log(newCourse)
    fetch('http://localhost/MasterPiece/Quizzes/CreateQuiz.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(newCourse),
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
    .catch(error => console.error('There was a problem with the fetch operation:', error));
});
            //------------------End Add Quiz--------------------//
// Fetch quiz names and populate dropdown
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.getElementById('Quiz');
  const teachrID = sessionStorage.getItem('TeacherID'); // Replace with the actual teacher ID
  const teacherID = teachrID ;
  fetch(`http://localhost/MasterPiece/Quizzes/ReadQuizName.php?teacherID=${teacherID}`)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    const dropdown = document.getElementById('Quiz');
    data.questions.forEach(question => {
        let option = document.createElement('option');
        option.value = question.QuizID;
        option.textContent = question.Quiz_Name;
        dropdown.appendChild(option);
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});
nsole.error('Error fetching quiz names:', error);
    });