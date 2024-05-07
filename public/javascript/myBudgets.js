function deleteSelectedBudgets(){
    const checkboxes = Array.from(document.getElementsByClassName("checkbox"));
    const selectedBudgets = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);

    fetch('/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({selectedBudgets}),
    }).then((response)=>{
        window.location.reload();
        console.log(response)
    }).catch((error)=>{
        console.error('Error:', error);
    })
}


// Makes it possible to click the row and go to the budget instance
const rows = Array.from(document.getElementsByClassName('budget-row'));

rows.forEach(row => {
    // Get the link to the budget instance from the a tag with id 'edit-a-tag'
    const link = Array.from(row.childNodes).find(child => child.childNodes[0]?.id === 'edit-a-tag').childNodes[0].href;

    // Add event listener to each child of the row, escept the first two
    row.childNodes.forEach((child,index) => {
        if(index > 1){
        child.addEventListener('click', () => {
            window.location.href =link
        })
        } 
    })
});

