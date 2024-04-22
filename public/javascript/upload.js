
document.getElementById("fileToUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
        const budget = JSON.parse(e.target.result);
        
        uploadBugetJson(budget);
    }

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
        } else if (res.status === 200) {
            window.location.href = "/my-budgets";
        }
    });
}
