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