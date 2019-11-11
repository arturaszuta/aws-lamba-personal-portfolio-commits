const AXIOS = require('axios');

let repoData = [];

AXIOS.get('https://api.github.com/users/arturaszuta/repos', {
  headers: {
    auth: {
      'user': 'arturaszuta'
    }
  }
}).then(function(response) {
  response.data.forEach(element => {
    const obj = {
      name: element.name,
      htmlUrl: element.html_url,
      language: element.language,
      commitsLW: 0,
      commitsLM: 0
    }
    repoData.push(obj)
  });

  repoData.forEach((el) => {
    const url = `https://api.github.com/repos/arturaszuta/${el.name}/stats/commit_activity`;

    AXIOS.get(url, {
      headers: {
        auth: {
          'user': 'arturaszuta'
        }
      }
    }).then(function(response) {
      el.commitsLW = response.data[51].total;
      el.commitsLM = response.data[51].total + response.data[50].total + response.data[49].total +response.data[48].total;
    })
  })

})


// AXIOS.get('https://api.github.com/repos/arturaszuta/personal_portfolio/stats/commit_activity').then(function(response) {
//   console.log(response.data)
//   console.log(response.data.length)
// })