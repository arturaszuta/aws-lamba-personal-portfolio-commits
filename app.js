const AXIOS = require('axios');
  
  let repoData = [];
  let finalRepoData = [];
  let syncComplete = { status: false };
  
  AXIOS.get('https://api.github.com/users/arturaszuta/repos', {
    headers: {
      auth: {
        'username': 'arturaszuta'
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
    
    
    repoData.forEach((el, index) => {
      const url = `https://api.github.com/repos/arturaszuta/${el.name}/stats/commit_activity`;
      
      AXIOS.get(url, {
        headers: {
          auth: {
            'username': 'arturaszuta'
          }
        }
      }).then(function(response) {
        el.commitsLW = response.data[51].total;
        el.commitsLM = response.data[51].total + response.data[50].total + response.data[49].total +response.data[48].total;
        
        if (el.commitsLM !== 0 || el.commitsLW !== 0) {
          finalRepoData.push(el);
          console.log(finalRepoData)
        }
        
      });
      
      // if(index === repoData.length - 1) {
      //   console.log(finalRepoData);
      // }
      
    })
  })
  

  
  
  
  
  