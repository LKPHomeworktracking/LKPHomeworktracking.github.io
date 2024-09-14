document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[userId];

    if (user && user.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user.role === 'teacher') {
            window.location.href = 'teacher.html';
        } else if (user.role === 'student') {
            window.location.href = 'student.html';
        } else if (user.role === 'admin') {
            window.location.href = 'admin.html';
        }
    } else {
        errorMessage.textContent = 'User ID หรือ Password ไม่ถูกต้อง';
    }
});
