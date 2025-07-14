// Reference Firebase Auth
const auth = firebase.auth();

// Register a new user
function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Registration Successful ✅");
      // Redirect or clear form here
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
}

// Login existing user
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Login Successful 🎉");
      window.location.href = "dashboard.html"; // Redirect after login
    })
    .catch(error => {
      alert("Login Failed ❌: " + error.message);
    });
}
