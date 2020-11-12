// Load Sale Data 
function loadSales() {
    // Generate AJAX request for collecting All Sale Details
    $.ajax({
        type: "GET",
        url: 'api/Sales',
        cache: false,
        success: function (data) {
            // Select 
            const tableBody = $("#saleData");

            $(tableBody).empty(); // Empty the content of Previous Table Body 

            if (data.length == 0) { // If there is no data present
                // Prepare a row for display no data
                const tr = $("<tr></tr>")
                    .append('<td colspan="6" align="center">No Sale Data</td>');
                // Add table row in table body
                tr.appendTo(tableBody);
            } else {
                // Iterate all JSON data
                $.each(data, function (key, item) {
                    // prepare a row with table column with data 
                    const tr = $("<tr></tr>")
                        .append($("<td></td>").text(item.productName))
                        .append($("<td></td>").text(item.quantity))
                        .append($("<td></td>").text(item.date))
                        .append($("<td></td>").text(item.soldBy))
                        .append($("<td></td>").append('<button class="btn btn-secondary" data-toggle="modal" data-target="#saleForm">Edit Record</button>')
                            .on("click", function () {
                                // Call get Sale Data Details For Edit
                                fetchSale(item.saleID);
                            })
                        )
                        .append($("<td></td>").append('<button class="btn btn-warning">Delete Record</button>')
                            .on("click", function () {
                                // Call remove Sale Data from Database
                                deleteSale(item.saleID);
                            })
                        );
                    // Add The table row at the end of table body
                    tr.appendTo(tableBody)
                });
            }
        }
    });
}

// This function used to save Sale Details using Web API
function saveDetails() {
    // Fetch Sale Form Data

    let pname = $('#productname').val();
    let qty = parseInt($('#quantity').val());
    let saledate = $('#saledate').val();
    let person = $("#person").val();

    // Fetch Sale ID Details
    let saleid = $("#saleid").val();
    let updateForm = false;

    if (saleid != "") {
        updateForm = true;
        saleid = parseInt(saleid)
    }

    // Save Details in Sale JSON Data
    let saledata = {
        productname: pname,
        quantity: qty,
        date: saledate,
        soldby: person
    };

    let requestType = "POST";
    let apiUrl = 'api/Sales'
    if (updateForm) {
        saledata['saleid'] = saleid;
        requestType = "PUT";
        apiUrl = 'api/Sales/' + saleid;
    }

    console.log(saledata);
    // Request the Web API for Insertion
    $.ajax({
        type: requestType,
        url: apiUrl,
        data: JSON.stringify(saledata),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Success Message        
        $("#saleForm").modal("hide");
        clearForm();
        let message = "Sale Details are Saved in System";
        if (updateForm) {
            message = "Sale Details are Updated in System";
        }
        alert(message);
        // Load Sale Details
        loadSales();        
    }).fail(function (xhr, status) {
        // Error Message
        alert("Sale Details are not Saved in System")
        clearForm();
        $("#save_movie").modal("hide");        
    });
}

// Function to Clear Form
function clearForm() {
    $('#productname').val("Choclate");
    $('#quantity').val("0");
    $('#saledate').val('');
    $('#person').val("John");
    $("#saleid").val("");
}

// Fetch Details of Sale based upon its Sale ID using Web API
function fetchSale(saleid) {
    $.ajax({
        type: "GET",
        url: 'api/Sales/' + saleid,
        contentType: "application/json"
    }).done(function (data) {
        // Update the Form data for edit tutorial details
        console.log(data);
        $('#saleid').val(data.saleID);
        $('#productname').val(data.productName);
        $('#quantity').val(data.quantity);
        $('#saledate').val(data.date);
        $('#person').val(data.soldBy);
    });
}

// Function to delete Sale Details
function deleteSale(saleid) {
    // Confirm The Decision
    let result = confirm("Are Your Sure to Remove this Sale Details?");

    if (result) {
        // Request Web API to Delete Sale
        $.ajax({
            type: "DELETE",
            url: 'api/Sales/' + saleid,
        }).done(function (response) {
            // Refresh Sale Details
            loadSales();
        });
    }
}