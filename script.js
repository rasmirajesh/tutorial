document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you would typically send the username and password to your server for authentication
    // For demonstration, we'll just log them to the console
    console.log('Username:', username);
    console.log('Password:', password);

    // Simulate successful login
    alert('Login successful! Welcome, ' + username + '!');
});

// Optional: Handle the sign-up link click
document.getElementById('signupLink').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Redirecting to sign-up page...'); // Replace this with actual redirection logic
});