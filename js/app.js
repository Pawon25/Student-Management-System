import { db } from './firebase-config.js';
import { 
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
let editingId = null;

// Add/Edit Student
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const studentData = {
        name: document.getElementById('studentName').value,
        studentId: document.getElementById('studentId').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value
    };

    try {
        if (editingId) {
            await updateDoc(doc(db, 'students', editingId), studentData);
            editingId = null;
        } else {
            await addDoc(collection(db, 'students'), studentData);
        }
        
        studentForm.reset();
        loadStudents();
    } catch (error) {
        alert('Error saving student: ' + error.message);
    }
});

// Load Students
async function loadStudents() {
    try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        studentTableBody.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const student = doc.data();
            const row = `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.studentId}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td class="action-buttons">
                        <button onclick="editStudent('${doc.id}')">Edit</button>
                        <button onclick="deleteStudent('${doc.id}')">Delete</button>
                    </td>
                </tr>
            `;
            studentTableBody.innerHTML += row;
        });
    } catch (error) {
        alert('Error loading students: ' + error.message);
    }
}

// Edit Student
window.editStudent = async (id) => {
    try {
        const docSnap = await getDoc(doc(db, 'students', id));
        const student = docSnap.data();
        
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentPhone').value = student.phone;
        
        editingId = id;
    } catch (error) {
        alert('Error loading student: ' + error.message);
    }
};

// Delete Student
window.deleteStudent = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            await deleteDoc(doc(db, 'students', id));
            loadStudents();
        } catch (error) {
            alert('Error deleting student: ' + error.message);
        }
    }
};

// Initial load
loadStudents(); 