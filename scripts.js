// This script dynamically loads commands based on selected category and populates the command grid

document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.nav-btn');
  const commandsGrid = document.getElementById('commandsGrid');

  // Load commands from the commands.json file
  fetch('commands.json')
    .then(response => response.json())
    .then(data => {
      // Function to display commands based on selected category
      function displayCommands(category) {
        commandsGrid.innerHTML = ''; // Clear previous content
        const categoryCommands = data.filter(command => command.category === category);
        categoryCommands.forEach(command => {
          const commandBox = document.createElement('div');
          commandBox.classList.add('command-box');
          commandBox.innerHTML = `
            <h3>${command.name.charAt(0).toUpperCase() + command.name.slice(1)} Command</h3>
            <p>${command.description}</p>
            <code>Syntax: ${command.syntax}</code>
            <code>Example: ${command.example}</code>
          `;
          commandsGrid.appendChild(commandBox);
        });
      }

      // Initially load commands for the first category (e.g., 'antinuke')
      displayCommands('antinuke');

      // Event listener for category selection
      categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const category = e.target.getAttribute('data-category');
          displayCommands(category);
        });
      });
    })
    .catch(error => console.error('Error loading commands:', error));
});
