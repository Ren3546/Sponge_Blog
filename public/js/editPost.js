// Get the pathname from the URL to extract the postId
const url = window.location.pathname;
const postId = url.split("/").pop();

// Function to handle updating a post
const postFormHandlerUpdate = async (event) => {
  event.preventDefault();

  // Get the updated title and content 
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  // Check if both title and content are provided
  if (title && content) {
    try {
      // Send a PUT request to update 
      const response = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      // Check if request successful
      if (response.ok) {
        // Redirect to the dashboard page
        window.location.replace("/dashboard");
      } else {
        // If the request fails, display an error
        alert("Failed to update.");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error updating post:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  }
};

// Function to handle deleting
const postFormHandlerDelete = async (event) => {
  event.preventDefault();

  try {
    // Send a DELETE request to delete 
    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    });

    // Check if the request successful
    if (response.ok) {
      // Redirect to the dashboard page
      window.location.replace("/dashboard");
    } else {
      // If the request fails, display an error 
      alert("Failed to delete.");
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error deleting post:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
};

// Add event listeners 
const updatePostButton = document.querySelector("#update");
if (updatePostButton) {
  updatePostButton.addEventListener("click", postFormHandlerUpdate);
}

const deletePostButton = document.querySelector("#delete");
if (deletePostButton) {
  deletePostButton.addEventListener("click", postFormHandlerDelete);
}
