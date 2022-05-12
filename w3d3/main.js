"use strict";
/*eslint-disable */
window.onload = function () {
    let employees = document.getElementById('employees');
    employees.innerHTML = ""
    fetch('https://randomuser.me/api/?results=5')
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach(employee => {
                employees.innerHTML += `
                <div class="card mb-1" style="width: 640px;">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src=${employee.picture.large} class="img-fluid rounded-start" alt=${employee.name.last} photo>
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">${employee.name.first}  ${employee.name.last}</h5>
                            <p class="card-text">phone: ${employee.phone}</p>
                            <p class="card-text">${employee.email}</p>
                        </div>
                    </div>
                </div>
            </div>
                `;
            });
        });
    document.getElementById("refreshBtn").onclick = function () {
        let employees = document.getElementById('employees');
        employees.innerHTML = ""
        fetch('https://randomuser.me/api/?results=5')
            .then((response) => response.json())
            .then((data) => {
                data.results.forEach(employee => {
                    employees.innerHTML += `
                <div class="card mb-1" style="width: 640px;">
                <div class="row gx-1">
                    <div class="col-md-3">
                        <img src=${employee.picture.large} class="img-fluid rounded-start" alt=${employee.name.last} photo>
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">${employee.name.first}  ${employee.name.last}</h5>
                            <p class="card-text">phone: ${employee.phone}</p>
                            <p class="card-text">${employee.email}</p>
                        </div>
                    </div>
                </div>
            </div>
                `;
                });
            });
    }
}