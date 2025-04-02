document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Get values from form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    let valid = true;

    // Username validation: must be at least 8 characters
    if (username.length < 8) {
        document.getElementById("usernameError").textContent = "Username must be at least 8 characters long.";
        valid = false;
    } else {
        document.getElementById("usernameError").textContent = "";
    }

    // Password validation: must contain at least one capital letter, one special character, and one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById("passwordError").textContent = "Password must have at least 1 uppercase letter, 1 special character, and 1 number.";
        valid = false;
    } else {
        document.getElementById("passwordError").textContent = "";
    }

    // Phone number validation: must be 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById("phoneError").textContent = "Phone number must be exactly 10 digits.";
        valid = false;
    } else {
        document.getElementById("phoneError").textContent = "";
    }

    // If all validations pass, proceed with form submission
    if (valid) {
        const formData = {
            username: username,
            email: document.getElementById("email").value,
            password: password,
            address: document.getElementById("address").value,
            phone: phone
        };

        fetch("https://script.google.com/macros/s/AKfycbzt3tS6QzpOjDCczkYhMdOu4F_QYG9Jao-88eD1K2XlUSOamkCQzDEY1ceqEQsOR5sF/exec", {
            method: "POST",
            mode: "no-cors", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            showAlert("Registration Successful!");
            document.getElementById("registerForm").reset();
        })
        .catch(error => {
            console.error("Error:", error);
            showAlert("Registration Failed!");
        });
    }
});

// Custom Alert Functions
function showAlert(message) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    alertBox.style.display = "flex";
}

document.getElementById("alertClose").addEventListener("click", function () {
    document.getElementById("customAlert").style.display = "none";
    window.location.href = 'index.html';
});