async function fetch_user_info(username) {
  obj = {};

  const url = `https://api.github.com/users/${username}`;
  const token = "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";

  try {
    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      data = await response.json();
      obj["username"] = data.name;
      obj["bio"] = data.bio;
      obj["avatar_url"] = data.avatar_url;
      obj["twitter_username"] = data.twitter_username;
    }
  } catch (err) {
    console.log(err);
  }
  console.log(obj)
  return obj;
}

// Function to fetch the user data from GitHub API
async function fetch_user_data(username, pageSize) {
  const url = `https://api.github.com/users/${username}/repos?per_page=${pageSize}`;
  const token = "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";

  try {
    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const repoData = await response.json();
      const collectedDataArray = await Promise.all(
        repoData.map((data) => collect_repo_info(data, token))
      );
      console.log(collectedDataArray)
      return collectedDataArray;
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return null
  }
}

// Organize the data
async function collect_repo_info(data, token) {
  const obj = {};
  obj["name"] = data.name;
  obj["description"] = data.description;

  // Fetching languages
  try {
    let response = await fetch(data.languages_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const languagesData = await response.json();
      obj["languages"] = Object.keys(languagesData);
    }
  } catch (err) {
    console.error(`An error occurred: ${err}`);
  }
  return obj;
}

// Function to update profile section
function updateProfileSection(user) {
  const profileSection = document.getElementById("profileSection");
  profileSection.innerHTML = `
      <img class="avatar" src="${user.avatar_url}" alt="User Avatar" />
      <div class="user-info">
        <h2>${user.username}</h2>
        <p>${user.bio}</p>
        <p>${user.twitter_username ? `@${user.twitter_username}` : ""}</p>
      </div>
    `;
}

function updateRepositoriesSection(repositories) {
    const repositoriesSection = document.getElementById("repositoriesSection");
    repositoriesSection.innerHTML = "";
  
    repositories.forEach((repo) => {
      const repoElement = document.createElement("div");
      repoElement.classList.add("repository");
      repoElement.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <p>Languages: ${repo.languages.join(', ')}</p>
        `;
      repositoriesSection.appendChild(repoElement);
    });
  }

