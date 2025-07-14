// firebase/firebaseConfig.js is already linked in HTML
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig.js'; // only if not already initialized

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch appointments
async function loadAppointments() {
  const appointmentsRef = collection(db, "appointments");
  const querySnapshot = await getDocs(appointmentsRef);

  const container = document.getElementById("appointmentsContainer");
  container.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${data.studentName} → ${data.teacherName}</h3>
      <p>Subject: ${data.subject}</p>
      <p>Date: ${data.date} | Time: ${data.time}</p>
      <p>Message: ${data.message}</p>
      <p>Status: <strong>${data.status}</strong></p>
      <button onclick="updateStatus('${docSnap.id}', 'approved')">Approve</button>
      <button onclick="updateStatus('${docSnap.id}', 'cancelled')">Cancel</button>
      <hr>
    `;
    container.appendChild(div);
  });
}

async function updateStatus(id, status) {
  const docRef = doc(db, "appointments", id);
  await updateDoc(docRef, { status });
  alert(`Appointment ${status}`);
  loadAppointments(); // Refresh list
}

window.onload = loadAppointments;
