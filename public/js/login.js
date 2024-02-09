const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get the username and password
  const username = document.querySelector('#userField').value.trim();
  const password = document.querySelector('#passField').value.trim();

  // Check if both username and password are given
  if (username && password) {
    try {
      // Send a POST request to log in
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if request was successful
      if (response.ok) {
        // Redirect to the homepage
        window.location.replace('/');
      } else {
        // If the request fails, display error 
        alert('Could not log in');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error logging in:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  }

  // Prevent the default form submission 
  return false;
};

// Add event listener 
const loginForm = document.querySelector('#loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', loginFormHandler);
}