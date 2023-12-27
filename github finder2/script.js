document.getElementById('searchButton').addEventListener('click', function () {

  var username = document.getElementById('searchUser').value;
  

  fetch('https://api.github.com/users/' + username)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {

          var name = data.name || data.login;

          var profileHTML = '<div class="profile-stats">';
          profileHTML += '<img src="' + data.avatar_url + '" width="120" height="120">';

          profileHTML +=  '<div class="profileHTML2">';
          profileHTML +=  '<div class="profileHTML">';
          profileHTML += '<span>Public Repos:' + data.public_repos + '</span>';
          profileHTML += '<span>Public Gists' + data.public_gists + '</span>';
          profileHTML += '<span>Followers: ' + data.followers + '</span>';
          profileHTML += '<span>Following: ' + data.following + '</span>';
          profileHTML += '</div>';
          profileHTML += '<p>Company: : ' + null + '</p>';
          profileHTML += '<p>Html Url: ' + data.html_url + '</p>';
          profileHTML += '<p>Location: ' + (data.location || 'Not available') + '</p>';
          profileHTML += '<p>Member Since: ' + new Date(data.created_at).toDateString() + '</p>';
          profileHTML += '</div>';
          profileHTML += '</div>';
          document.getElementById('profile').innerHTML = profileHTML;

          return fetch(data.repos_url);

      })
        .then(function (response) {
            return response.json();
        })
        .then(function (repos) {
            var reposHTML = '<h3>Latest Repos</h3>';
            repos.forEach(function (repo) {
                reposHTML += '<div class="repo-item">';
                reposHTML += '<div class="repo-name"><a href="' + repo.html_url + '" target="_blank">' + repo.name + '</a></div>';
                reposHTML += '<div class="repo-stats">';
                reposHTML += '<span>Stars: ' + repo.stargazers_count + '</span>';
                reposHTML += '<span>Watchers: ' + repo.watchers_count + '</span>';
                reposHTML += '<span>Forks: ' + (repo.forks_count || '0') + '</span>';
                reposHTML += '</div></div>';
            });
            document.getElementById('repos').innerHTML = reposHTML;
        })
        .catch(function (error) {
            console.log(error);
        });
    });
