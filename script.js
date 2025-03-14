document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    const form = document.getElementById("pizzaForm");
    const liveInUSCheckbox = document.getElementById("liveInUS");
    const zipCodeContainer = document.getElementById("zipCodeContainer");
    const successMessage = document.getElementById("successMessage");

    // Ensure success message is hidden on page load
    successMessage.classList.add("hidden");

    // Toggle ZIP Code field based on checkbox
    liveInUSCheckbox.addEventListener("change", function () {
        if (this.checked) {
            zipCodeContainer.classList.remove("hidden");
        } else {
            zipCodeContainer.classList.add("hidden");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop default form submission
        let valid = true;

        // Hide success message before checking validation
        successMessage.classList.add("hidden");

        // Name validation (only letters allowed)
        const name = document.getElementById("name").value.trim();
        const nameError = document.getElementById("nameError");

        const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
        if (!nameRegex.test(name) || name.length < 3) {
            nameError.textContent = "Name must contain only letters and be at least 3 characters.";
            valid = false;
        } else {
            nameError.textContent = "";
        }

        // Year of Birth validation
        const year = parseInt(document.getElementById("yearOfBirth").value, 10);
        const currentYear = new Date().getFullYear();
        const yearError = document.getElementById("yearError");
        if (isNaN(year) || year < 1901 || year >= currentYear) {
            yearError.textContent = `Enter a valid year (1901 - ${currentYear - 1}).`;
            valid = false;
        } else {
            yearError.textContent = "";
        }

        // Zip Code validation (only if checkbox is checked)
        if (liveInUSCheckbox.checked) {
            const zipCode = document.getElementById("zipCode").value.trim();
            const zipCodeError = document.getElementById("zipCodeError");
            if (!/^[1-9]\d{4}$/.test(zipCode)) {
                zipCodeError.textContent = "Invalid Zip Code (must be a valid 5-digit US zip code).";
                valid = false;
            } else {
                zipCodeError.textContent = "";
            }
        }

        // Password validation
        const password = document.getElementById("password").value;
        const passwordError = document.getElementById("passwordError");
        if (password.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters.";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        // Pizza preference validation
        const pizzaError = document.getElementById("pizzaError");
        const pizzaSelected = document.querySelector('input[name="pizzaType"]:checked');
        if (!pizzaSelected) {
            pizzaError.textContent = "Please select a pizza preference.";
            valid = false;
        } else {
            pizzaError.textContent = "";
        }

        // If all validations pass, show success message
        if (valid) {
            successMessage.classList.remove("hidden");
        }
    });
});
