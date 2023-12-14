document.addEventListener('DOMContentLoaded', function () {
    const openPopupButton = document.getElementById('openPopupButton');
    const closePopupButton = document.getElementById('closePopupButton');
    const loginPopup = document.getElementById('loginPopup');
    const googleLoginButton = document.getElementById('googleLoginButton');
    const siteLoginForm = document.getElementById('siteLoginForm');

    // Open the popup
    openPopupButton.addEventListener('click', function () {
        loginPopup.style.display = 'block';
    });

    // Close the popup
    closePopupButton.addEventListener('click', function () {
        loginPopup.style.display = 'none';
    });

    // Close the popup if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (event.target === loginPopup) {
            loginPopup.style.display = 'none';
        }
    });

    // Handle form submission (replace this with your own login logic)
    siteLoginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Your login logic goes here
    });

    // Handle Google OAuth login (replace this with your own Google OAuth logic)
    googleLoginButton.addEventListener('click', function () {
        // Your Google OAuth logic goes here
    });
});
