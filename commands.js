// This script dynamically loads command data into the command grid

document.addEventListener('DOMContentLoaded', () => {
  fetch('commands.json')
    .then(response => response.json())
    .then(commands => {
      const commandsGrid = document.getElementById('commandsGrid');
      commands.forEach((command, index) => {
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
    })
    .catch(error => console.error('Error loading commands:', error));
});
