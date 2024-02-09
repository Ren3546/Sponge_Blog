async function logout() {
  try {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.replace('/');
    } else {
      throw new Error('Failed to log out.');
    }
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Failed to log out.');
  }
}

const logoutButton = document.querySelector('#logoutButton');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
