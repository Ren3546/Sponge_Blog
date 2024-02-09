const commentFormHandler = async (event) => {
    event.preventDefault();
    const postId = window.location.href.split('/').pop();
    console.log('postId:', postId);
    
    const content = document.querySelector('#content').value.trim();
    console.log('content:', content);

    if (content) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ content: content, postid: postId }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.reload(); 
      } else {
        alert('Could not comment.');
      }
    }
  };
  
  
  const commentForm = document.querySelector('#commentForm');
  if (commentForm) {
    commentForm.addEventListener('submit', commentFormHandler);
  }
  