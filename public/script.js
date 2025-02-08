document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    console.log('Username:', username);
    console.log('Password:', password);

    // success login
    alert('Login successful! Welcome, ' + username + '!');
});

// Optional: Handle the sign-up link click
// document.getElementById('signupLink').addEventListener('click', function(event) {
//     event.preventDefault();
//     alert('Redirecting to sign-up page...'); // Replace this with actual redirection logic
// });