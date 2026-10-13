const API_URL = "http://localhost:3000/api/auth";

const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");
const registerButton = document.getElementById("registerButton");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    message.textContent = "";

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    if (password.length < 8) {
        message.textContent =
            "Password must contain at least 8 characters.";
        return;
    }

    registerButton.disabled = true;
    registerButton.textContent = "Creating account...";

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed.");
        }

        message.textContent =
            "Account created successfully! You can now log in.";

        registerForm.reset();

    } catch (error) {
        console.error("Registration error:", error);

        message.textContent =
            error.message === "Failed to fetch"
                ? "Cannot connect to the backend. Make sure the server is running."
                : error.message || "Something went wrong.";

    } finally {
        registerButton.disabled = false;
        registerButton.textContent = "Create Account";
    }
});