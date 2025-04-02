document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'AIzaSyBUhaXQyv_PMXwU6lpLKjBcNxpLTTeNzFw'; // Replace with your actual API Key
    const sheetId = '1WHCkEOMIV0WuQgxfU0qQZICAEFY5QGBob9zxEtwA9fA'; // Google Sheet ID
    const range = 'Sheet1!A1:C'; // Specify a valid range (Username and Password columns)

    function showError(element) {
        element.classList.add('error');
        element.style.border = '1px solid red';
        document.getElementById('error-message').innerText = "";
        document.getElementById('error-message').style.display = 'none';
        element.offsetWidth;
        element.classList.add('shake');6
        setTimeout(() => element.classList.remove('shake'), 500);
    }

    function clearError(element) {
        element.classList.remove('error');
        element.style.border = '';
    }

    async function fetchUserData() {
        try {
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            if (!data.values || data.values.length === 0) throw new Error("No user data found.");
            return data.values;
        } catch (error) {
            console.error('Error fetching data:', error);
            document.getElementById('error-message').innerText = "Failed to load user data. Please try again.";
            document.getElementById('error-message').style.display = 'block';
            return null;
        }
    }

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

        clearError(usernameInput);
        clearError(passwordInput);
        document.getElementById('error-message').style.display = 'none';

        if (username.length <= 8) {
            showError(usernameInput);
            alert("Username must be more than 8 characters!");
            return;
        }

        if (!passwordPattern.test(password)) {
            showError(passwordInput);
            alert("Password must contain at least 1 uppercase, 1 lowercase, 1 special character, and 1 number");
            return;
        }

        if (!username || !password) {
            showError(usernameInput);
            showError(passwordInput);
            document.getElementById('error-message').innerText = "Please enter both username and password.";
            document.getElementById('error-message').style.display = 'block';
            return;
        }

        const users = await fetchUserData();
        if (!users) return;

        const [header, ...userData] = users;
        const usernameIndex = header.indexOf('Username');
        const passwordIndex = header.indexOf('Password');

        if (usernameIndex === -1 || passwordIndex === -1) {
            console.error("Missing 'Username' or 'Password' column.");
            document.getElementById('error-message').innerText = "Error: Missing required columns.";
            document.getElementById('error-message').style.display = 'block';
            return;
        }

        const user = userData.find(row => row[usernameIndex] === username && row[passwordIndex] === password);

        if (user) {
            document.getElementById('error-message').innerText = "";
            document.getElementById('error-message').style.display = 'none';
            document.getElementById('loginForm').reset();
            window.location.href = "index.html";
        } else {
            const userExists = userData.some(row => row[usernameIndex] === username);
            showError(userExists ? passwordInput : usernameInput);
        }
    });
});