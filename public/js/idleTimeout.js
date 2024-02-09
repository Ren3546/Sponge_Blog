let timeoutId;

function resetTimer() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(logout, 30000); // 5 minutes in milliseconds
}

function logout() {
  fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => {
    if (response.ok) {
      alert("You have been logged out due to inactivity. Please log in again to make posts.");
      window.location.replace('/');

    } else {
      alert('Failed to log out.');
    }
  })
  .catch(error => {
    console.error('Error', error);
    alert('Failed to log out.');
  });
};


document.addEventListener("mousemove", resetTimer);
document.addEventListener("mousedown", resetTimer);
document.addEventListener("keypress", resetTimer);
document.addEventListener("touchstart", resetTimer);

document.addEventListener("DOMContentLoaded", resetTimer);