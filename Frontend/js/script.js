// Register User
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { username, email, password };

    fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User registered successfully') {
                alert('Registration successful! You can now log in.');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// Login User
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { email, password };

    fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('jwtToken', data.token);
                window.location.href = 'dashboard.html';
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// Logout User
document.getElementById('logout-button').addEventListener('click', function () {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
});

// Display Welcome Message
if (window.location.pathname === '/dashboard.html') {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1]));  // Decode JWT to get user info
        document.getElementById('welcome-message').innerText = `Welcome, ${decoded.email}`;
    } else {
        window.location.href = 'login.html';  // Redirect to login if token doesn't exist
    }
}
