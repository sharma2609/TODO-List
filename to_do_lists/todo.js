        function getandupdate() {
            console.log("Updating List....");
            tit = document.getElementById("title").value;
            desc = document.getElementById("description").value;
            if (localStorage.getItem('itemsJson') == null) {
                itemJsonArray = [];
                itemJsonArray.push([tit, desc]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            }
            else {
                itemJsonArraystr = localStorage.getItem('itemsJson');
                itemJsonArray = JSON.parse(itemJsonArraystr);
                itemJsonArray.push([tit, desc]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            }
            update();
        }


        function update() {
            if (localStorage.getItem('itemsJson') == null) {
                itemJsonArray = [];
            }
            else {
                itemJsonArraystr = localStorage.getItem('itemsJson');
                itemJsonArray = JSON.parse(itemJsonArraystr);
            }
            //populate the table
            let tablebody = document.getElementById('tablebody');
            let str = ""
            itemJsonArray.forEach((element, index) => {
                str += `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${element[0]}</td>
                        <td>${element[1]}</td>
                        <td>
                            <button class="btn btn-outline-dark btn-sm" onclick = "deleted(${index + 1})">Delete</button>
                        </td>
                    </tr>`;
            });
            tablebody.innerHTML = str;
        }
        add = document.getElementById("add")
        add.addEventListener("click", getandupdate);
        update();

        //delete
        function deleted(itemIndex) {
            console.log("Delete", itemIndex)
            itemJsonArraystr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.splice(itemIndex, 1)
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            update();
        }

        // Clear All
        function clearAll() {
            if (confirm("Do you raelly want to clear the list")) {
                console.log("Clearing list....")
                localStorage.clear()
                update()
            }
        }
