let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson")) || [];

function update() {
  const tit = document.getElementById("title").value;
  const desc = document.getElementById("description").value;

  if (tit && desc) {
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    // Clear input fields after adding an item
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  }

  const tableBody = document.getElementById("tb");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
            <tr>
                <td>${index + 1}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-danger" onclick="deleteItems(${index})">Delete</button></td>
            </tr>
        `;
  });
  tableBody.innerHTML = str;
}

function deleteItems(itemIndex) {
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

// Initial update to populate the table
update();

// Event listener for the "Add Item" button
const add = document.getElementById("add");
add.addEventListener("click", update);

function clearList() {
  if (confirm("Do you really want to clear?")) {
    localStorage.removeItem("itemsJson"); // Clear the specific key
    itemJsonArray = []; // Reset the array
    update();
  }
}
