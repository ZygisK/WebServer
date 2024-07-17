document.addEventListener('DOMContentLoaded', function() {
    const btnDashboard = document.getElementById('btnDashboard');
    const btnUsers = document.getElementById('btnUsers');
    const btnProducts = document.getElementById('btnProducts');
    const btnSettings = document.getElementById('btnSettings');

    const dashboardContent = document.getElementById('dashboardContent');

    btnDashboard.addEventListener('click', function() {
        dashboardContent.innerHTML = `
            <h3>Dashboard Overview</h3>
            <p>Summary of important data and statistics.</p>
        `;
        setActiveButton(btnDashboard);
    });

    btnUsers.addEventListener('click', function() {
        dashboardContent.innerHTML = `
            <h3>Users Management</h3>
            <p>List of users and their details.</p>
        `;
        setActiveButton(btnUsers);
    });

    btnProducts.addEventListener('click', function() {
        dashboardContent.innerHTML = `
            <h3>Products Management</h3>
            <p>List of products and their inventory.</p>
        `;
        setActiveButton(btnProducts);
    });

    btnSettings.addEventListener('click', function() {
        dashboardContent.innerHTML = `
            <h3>Settings</h3>
            <p>Manage your application settings.</p>
        `;
        setActiveButton(btnSettings);
    });

    function setActiveButton(activeBtn) {
        // Remove 'active' class from all buttons
        const buttons = document.querySelectorAll('.sidebar button');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to the clicked button
        activeBtn.classList.add('active');
    }

    // Initially load dashboard content
    btnDashboard.click();
});
