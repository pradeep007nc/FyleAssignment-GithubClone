async function check_valid_user(userName) {
    const url = "https://api.github.com/users/" + userName;
    const token = "";
  
    try {
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        return true;
      }
  
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  
  async function handleSubmit(event) {
    console.log("working")
    event.preventDefault(); // Prevent the form from submitting immediately
  
    // Get the form element
    const form = document.getElementById("entryForm");
  
    // Validate the form data (you can add more validation as needed)
    const username = form.elements["username"].value;
  
    try {
      if (await check_valid_user(username)) {
        window.location.href = `../html/main_page.html?username=${username}`;
      } else {
        alert('Username does not exist');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while checking the username.');
    }
  }
  


  