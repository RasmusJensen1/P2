
document.getElementById("fileToUpload").addEventListener("change", function(event) {
    event.preventDefault();
    const file = event.target.files[0];
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const jsonData = e.target.result;
    
        
        // check in console for the right data
        console.log(jsonData);

        uploadBugetJson(jsonData);
        


    };
    
    reader.readAsText(file);
});



function uploadBugetJson(budget) {

    const options = {
      method: 'POST',
      body: JSON.stringify(budget),
      headers: {
          'Content-Type': 'application/json' 
      },
    };

    const url = "/upload-budget"

    fetch(url, options).then((res) => {
        if(res.status === 401) {
            alert("Must be logged in to upload."); 
        }
    });
}
