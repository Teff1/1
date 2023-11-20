// Date and Time for shopping list
function updateDateTime() {
    const dateTimeElement = document.getElementById("date-time");
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    dateTimeElement.textContent = dateTimeString;
}

// Update the date and time every second
setInterval(updateDateTime, 1000);


document.getElementById("createButton").addEventListener("click", function () {
    // Redirect to index.html
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", function () {
    loadShoppingList();
});

document.getElementById("add-button").addEventListener("click", function () {
    var itemName = document.getElementById('item').value.trim();
    var itemQuantity = document.getElementById('quantity').value.trim();
    var itemPrice = document.getElementById('price').value.trim();

    if (itemName && itemQuantity && itemPrice) {
        var newItem = {
            name: itemName,
            quantity: parseInt(itemQuantity),
            price: parseFloat(itemPrice),
            checked: false
        };

        addItemToShoppingList(newItem);
        saveShoppingList();
        loadShoppingList();

        // Clear input fields after adding an item
        document.getElementById('item').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('price').value = '';
    } else {
        alert("Please fill in all fields before adding an item.");
    }
});

var archiveButton = document.getElementById("archive-button");
if (archiveButton) {
    archiveButton.addEventListener("click", function () {
        archiveCurrentList();
    });
}


function addItemToShoppingList(item) {
    var shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

    // Save checkbox state in localStorage
    var checkboxState = {};
    shoppingList.forEach(function (item, index) {
        checkboxState[index] = item.checked;
    });
    localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
}

function saveShoppingList() {
    var shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function loadShoppingList() {
    var shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    var checkboxState = loadCheckboxState();

    // Merge checkbox state with shopping list
    shoppingList.forEach(function (item, index) {
        item.checked = checkboxState[index] || false;
    });

    displayShoppingList(shoppingList);
}

function displayShoppingList(shoppingList) {
    var shoppingListBody = document.getElementById("shopping-list-body");

    if (!shoppingListBody) {
        console.error("Element with id 'shopping-list-body' not found.");
        return;
    }

    shoppingListBody.innerHTML = "";

    shoppingList.forEach(function (item, index) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="true" class="edit-input">${item.name}</td>
            <td contenteditable="true" class="edit-input">${item.quantity}</td>
            <td contenteditable="true" class="edit-input">$${item.price.toFixed(2)}</td>
            <td><input type="checkbox" ${item.checked ? 'checked' : ''} onchange="updateCheckboxState(${index})"></td>`;
        shoppingListBody.appendChild(row);
    });
}


function archiveCurrentList() {
    var shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    if (shoppingList.length > 0) {
        var timestamp = new Date().getTime();
        var listKey = 'shoppingList_' + timestamp;

        localStorage.setItem(listKey, JSON.stringify(shoppingList));

        var allLists = JSON.parse(localStorage.getItem('allShoppingLists')) || [];
        allLists.push(listKey);
        localStorage.setItem('allShoppingLists', JSON.stringify(allLists));

        clearCurrentList();

        alert("Current list archived successfully!");
    } else {
        alert("The current list is empty. Add items before archiving.");
    }
}

function clearCurrentList() {
    localStorage.removeItem('shoppingList');
    loadShoppingList();
}



function loadCheckboxState() {
    return JSON.parse(localStorage.getItem('checkboxState')) || {};
}


function updateCheckboxState(index) {
    var checkboxState = loadCheckboxState();
    console.log('Before update:', checkboxState);
    
    checkboxState[index] = !checkboxState[index];
    localStorage.setItem('checkboxState', JSON.stringify(checkboxState));

    console.log('After update:', checkboxState);

    // Reload the shopping list to reflect the updated checkbox state
    loadShoppingList();
}


function openLoginPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("login-popup").style.display = "block";
}

function closeLoginPopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("login-popup").style.display = "none";
}

function performLogin() {
    // Add your login logic here
    // For simplicity, let's just close the popup for now
    closeLoginPopup();
}