const AXIOS = require('axios');

exports.handler = async (event, context, callback) => {

function getCommitData() {
  
  let repoData = [];
  let finalRepoData = [];

  AXIOS.get('https://api.github.com/users/arturaszuta/repos', {
    headers: {
      'Authorization': `Bearer ${token.value}`
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
      return repoData;
    });
    
    
    
    repoData.forEach((el, index) => {
      const url = `https://api.github.com/repos/arturaszuta/${el.name}/stats/commit_activity`;
      
      AXIOS.get(url, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      }).then(function(response) {
        el.commitsLW = response.data[51].total;
        el.commitsLM = response.data[51].total + response.data[50].total + response.data[49].total +response.data[48].total;
        
        if (el.commitsLM !== 0 || el.commitsLW !== 0) {
          finalRepoData.push(el);
        }
        
        if(index === repoData.length -1) {

          if(finalRepoData.length < 5) {
            getCommitData();
          }

          callback(null, finalRepoData);
        } 
      });
    })
  })
  
}

getCommitData();

}
  
  
  
  
  
  