document.addEventListener("DOMContentLoaded", function () {
    displayAllShoppingLists();
});

function displayAllShoppingLists() {
    var allListsContainer = document.getElementById("all-lists");

    // Retrieve all shopping lists from localStorage
    var allShoppingLists = JSON.parse(localStorage.getItem('allShoppingLists')) || [];

    if (allShoppingLists.length === 0) {
        allListsContainer.innerHTML = "<p>No shopping lists available.</p>";
        return;
    }

    // Create HTML content for each shopping list
    var listsHTML = allShoppingLists.map(function (listKey) {
        var listData = JSON.parse(localStorage.getItem(listKey));
        return `<div class="shopping-list">
                    <h3 contenteditable="true" class="edit-input">${listKey}</h3>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Checkbox</th>
                        </tr>
                        ${listData.map(function (item) {
                            return `<tr>
                                        <td>${item.name}</td>
                                        <td>${item.quantity}</td>
                                        <td>${item.price}</td>
                                        <td>${item.checked ? '✔' : '❌'}</td>
                                    </tr>`;
                        }).join('')}
                    </table>
                    <button class="delete-list-button" onclick="deleteShoppingList('${listKey}')">Delete List</button>
                </div>`;
    }).join('');

    // Add the HTML content to the container
    allListsContainer.innerHTML = listsHTML;
}



function deleteShoppingList(listKey) {
    // Retrieve all shopping lists from localStorage
    var allShoppingLists = JSON.parse(localStorage.getItem('allShoppingLists')) || [];

    // Find the index of the listKey
    var index = allShoppingLists.indexOf(listKey);

    if (index !== -1) {
        // Remove the listKey from the array
        allShoppingLists.splice(index, 1);

        // Update the 'allShoppingLists' in localStorage
        localStorage.setItem('allShoppingLists', JSON.stringify(allShoppingLists));

        // Remove the specific list data
        localStorage.removeItem(listKey);

        // Redisplay the updated shopping lists
        displayAllShoppingLists();
    }
}

function deleteAllArchivedLists() {
    // Retrieve all shopping lists from localStorage
    var allShoppingLists = JSON.parse(localStorage.getItem('allShoppingLists')) || [];

    // Loop through all lists and remove them
    allShoppingLists.forEach(function (listKey) {
        localStorage.removeItem(listKey);
    });

    // Remove the 'allShoppingLists' key
    localStorage.removeItem('allShoppingLists');

    // Redisplay the updated shopping lists
    displayAllShoppingLists();
}


