document.getElementById("appointmentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let date = document.getElementById("date").value;
    let department = document.getElementById("department").value;

    alert(
        "Appointment Booked!\n\n" +
        "Name: " + name +
        "\nAge: " + age +
        "\nDate: " + date +
        "\nDepartment: " + department
    );

    console.log({ name, age, date, department });

    this.reset();
});
