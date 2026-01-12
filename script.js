document.addEventListener('DOMContentLoaded', function() {
    const mainElement = document.getElementById('main');
    
    // Loop through each department
    departments.forEach(department => {
        // Create department section
        const section = document.createElement('section');
        section.className = 'department-section';
        
        // Create department heading
        const heading = document.createElement('h2');
        heading.textContent = department.name;
        section.appendChild(heading);
        
        // Create employee list
        const employeeList = document.createElement('ul');
        employeeList.className = 'employee-list';
        
        // Add each employee to the list
        department.employees.forEach(employee => {
            const listItem = document.createElement('li');
            listItem.textContent = `${employee.firstName} ${employee.lastName}`;
            employeeList.appendChild(listItem);
        });
        
        section.appendChild(employeeList);
        mainElement.appendChild(section);
    });
    
    // Update footer with current year
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footer.textContent = `Copyright Pixell River Financial ${currentYear}`;
});