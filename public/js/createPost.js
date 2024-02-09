const createPostFormHandler = async (event) => {
  event.preventDefault();

  // Get the values of the title and content 
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  // Check if both title and content 
  if (title && content) {
    try {
      // Retrieve user's info
      const userResponse = await fetch('/api/user');
      const userData = await userResponse.json();
      const { username, userid } = userData;

      // Create the post with the user's info
      const response = await fetch('/api/post/', {
        method: 'POST',
        body: JSON.stringify({ title, content, username, userid }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the request was successful
      if (response.ok) {
        // Redirect to the dashboard page
        document.location.replace('/dashboard');
      } else {
        // If the request fails, display an error message
        alert('Failed to create a new post.');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error creating post:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  }

  // Prevent the default form submission 
  return false;
};

// Get the form for creating a new post
const newPostForm = document.querySelector('.postForm');

// Add an event listener
if (newPostForm) {
  newPostForm.addEventListener('submit', createPostFormHandler);
}
