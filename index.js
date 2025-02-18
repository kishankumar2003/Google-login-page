// Add event listener for the Next button
document.getElementById('next_button').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('input_box').value;
    
    if (email.length === 0) {
        alert('Please enter your email');
        return;
    }

    // Store email in localStorage before redirecting
    localStorage.setItem('userEmail', email);
    
    // Redirect to password page
    window.location.href = 'password_page.html';
});

// Add event listener for Enter key
document.getElementById('input_box').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('next_button').click();
    }
});
