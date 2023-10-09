initiateUI();

function initiateUI() {
    clearAll();
    $("#customerContent").css("display", "block");

    setTheLastView();
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "ordersContent":
            localStorage.setItem("view", "ORDERS");
            break;
        case "placeOrdersContent":
            localStorage.setItem("view", "PLACEORDERS");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "CUSTOMER":
            setView($("#customerContent"));
            break;
        case "ITEM":
            setView($("#itemContent"));
            break;
        case "ORDERS":
            setView($("#ordersContent"));
            break;
        case "PLACEORDERS":
            setView($("#placeOrdersContent"));
            break;
        default:
            setView($("#customerContent"));
    }
}

function clearAll() {
    $("#customerContent,#itemContent,#ordersContent,#placeOrdersContent").css('display', 'none');
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

$("#customers").click(function () {
    setView($("#customerContent"));
});

$("#items").click(function () {
    setView($("#itemContent"));
});

$("#orders").click(function () {
    setView($("#ordersContent"));
});

$("#placeOrders").click(function () {
    setView($("#placeOrdersContent"));
});


//var customers=[];

$("#btnCusSave").click(function (){
    saveCustomer();
});

function saveCustomer(){
    let cusId=$("#txtCustomerID").val();
    if (searchCustomer(cusId.trim()) == undefined) {
    let cusName=$("#txtCustomerName").val();
    let cusAddress=$("#txtCustomerAddress").val();
    let cusSalary=$("#txtCustomerSalary").val();

    /* var customerObject={
         id:cusId,
         name:cusName,
         address:cusAddress,
         salary:cusSalary

     }*/
    let newCustomer= Object.assign({},customerObject);
    newCustomer.id=cusId;
    newCustomer.name=cusName;
    newCustomer.address=cusAddress;
    newCustomer.salary=cusSalary;

    customers.push(newCustomer);

    loadAllCustomers();
    loadAllCustomerId();
    bindRowClickEvents();
    clearCustomerInputFields();
    } else {
        alert("Customer already exits.!");
    }
}


function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let salary = $(this).children(":eq(3)").text();

        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerSalary').val(salary);

    });
}


function loadAllCustomers() {

    $("#tblCustomer").empty();

    for (var customer of customers) {
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;

        $("#tblCustomer").append(row);
    }
}


$("#btnCusDelete").click(function (){

    let deleteId=$("#txtCustomerID").val();

    let option=confirm("Do you Sure?"+deleteId);
    if (option){
        if (deleteCustomer(deleteId)) {
            alert("Customer Successfully Deleted..");
            setTextfieldValues("", "", "", "");
        } else {
            alert("No such customer to delete");
        }
    }
});


$("#btnCusClear").click(function (){
    $('#txtCustomerID').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerSalary').val("");
});

$("#btnCusUpdate").click(function () {

    let customerID = $("#txtCustomerID").val();
    let response = updateCustomer(customerID);
    if (response) {
        alert("Customer Updated Successfully");
        setTextfieldValues("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});


$("#txtCustomerID").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#txtCustomerID").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            setTextfieldValues(customer.id, customer.name, customer.address, customer.salary);
        } else {
            alert("There is no cusotmer available for that " + typedId);
            setTextfieldValues("", "", "", "");
        }
    }
});

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function setTextfieldValues(id, name, address, salary) {
    bindRowClickEvents();
    $("#txtCustomerID").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerSalary").val(salary);
}


function searchCustomer(id) {
    for (let customer of customers) {
        if (customer.id == id) {
            return customer;
        }
    }
    return null;
}

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#txtCustomerID").val();
        customer.name = $("#txtCustomerName").val();
        customer.address = $("#txtCustomerAddress").val();
        customer.salary = $("#txtCustomerSalary").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }

}
function trCusSelector() {

    $("#tblCustomer>tr").click(function (){
        let id=$(this).children(':eq(0)').text();
        let name=$(this).children(':eq(1)').text();
        let address=$(this).children(':eq(2)').text();
        let salary=$(this).children(':eq(3)').text();

        console.log(id+"  "+name+"  "+address+" "+salary);

        $('#txtCustomerID').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerSalary').val(salary);



    });

}


