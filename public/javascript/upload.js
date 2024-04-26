let budgetFileData;

document.getElementById("fileToUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
        budgetFileData = JSON.parse(e.target.result);
    }

    reader.readAsText(file);
});


document.getElementById('create-butt').addEventListener('click', () => {
    // Remove prev id
    if(budgetFileData) {
        delete budgetFileData._id;
    }
    const budget = {
        budgetName: document.getElementById('budget-name').value,
        budgetFile: budgetFileData,
        budgetType: document.getElementById('budgetstyle').value,
    }
    console.log(budget);

    createBudgetPost(budget);

})

function createBudgetPost(budget) {
    const options = {
      method: 'POST',
      body: JSON.stringify(budget),
      headers: {
          'Content-Type': 'application/json' 
      },
    };

    const url = "/create-budget"

    fetch(url, options).then((res) => {
        if(res.status === 401) {
            alert("Must be logged in to upload."); 
            window.location.href = "/login";
        } 
        
    });
}
