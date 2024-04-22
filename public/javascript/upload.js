
document.getElementById("fileToUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const contents = e.target.result;
        const jsonData = JSON.parse(contents);
        
        // Tjek //fix data i download først 
        console.log(jsonData);
    };
    
    reader.readAsText(file);
});

document.getElementById("upload-button").addEventListener("click", function(event) {
   
    event.preventDefault(); 
});



