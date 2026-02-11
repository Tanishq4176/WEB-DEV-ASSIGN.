// Student Project: Smart Event Dashboard
// This script handles adding, deleting, and displaying events.

// Define an array to hold our events
let events = [];

// Get references to important DOM elements
const eventForm = document.getElementById('eventForm');
const eventsContainer = document.getElementById('eventsContainer');
const emptyMessage = document.getElementById('emptyMessage');
const clearAllBtn = document.getElementById('clearAllBtn');
const addSampleBtn = document.getElementById('addSampleBtn');

// 1. Function to handle form submission
eventForm.addEventListener('submit', function (event) {
    // Prevent the default form refresh behavior
    event.preventDefault();

    // Get values from the input fields
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const category = document.getElementById('eventCategory').value;
    const description = document.getElementById('eventDescription').value;

    // Basic validation
    if (title === '' || date === '') {
        alert('Please enter a title and date.');
        return;
    }

    // Create a new event object
    const newEvent = {
        id: Date.now(), // Use timestamp as a unique ID
        title: title,
        date: date,
        category: category,
        description: description
    };

    // Add to our events array
    events.push(newEvent);

    // Update the UI
    renderEvents();

    // Clear the form
    eventForm.reset();
});

// 2. Function to render events to the screen
function renderEvents() {
    // Clear the current list
    eventsContainer.innerHTML = '';

    // Check if we have events
    if (events.length === 0) {
        eventsContainer.innerHTML = '<p id="emptyMessage" class="empty-message">No events added yet.</p>';
        return;
    }

    // Loop through events and create HTML for each
    events.forEach(function (event) {
        // Create a div for the card
        const card = document.createElement('div');
        card.className = 'event-card';
        // We removed specific category classes for border color in CSS, 
        // but kept the border var(--primary-color). 
        // If we want dynamic border colors, we'd need to add them back to CSS.
        // For now, adhere to the "subtle" single color theme provided in CSS.

        // Set the inner HTML
        card.innerHTML = `
            <h3>${event.title}</h3>
            <div class="meta-info">
                <span class="date">📅 ${event.date}</span>
                <span class="category category-${event.category}">${event.category}</span>
            </div>
            <p>${event.description}</p>
            <button class="delete-btn" onclick="deleteEvent(${event.id})" title="Delete">&times;</button>
        `;

        // Add to container
        eventsContainer.appendChild(card);
    });
}

// 3. Function to delete a specific event
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        // Filter out the event with the given ID
        events = events.filter(function (event) {
            return event.id !== id;
        });

        // Re-render the list
        renderEvents();
    }
}

// 4. Function to clear all events
clearAllBtn.addEventListener('click', function () {
    if (confirm('Clear all events?')) {
        events = [];
        renderEvents();
    }
});

// 5. Function to add sample data
addSampleBtn.addEventListener('click', function () {
    const sampleData = [
        { id: 1, title: 'Web Dev Class', date: '2024-01-15', category: 'Study', description: 'Learn about DOM manipulation.' },
        { id: 2, title: 'Grocery Run', date: '2024-01-16', category: 'Personal', description: 'Buy milk and eggs.' },
        { id: 3, title: 'Team Meeting', date: '2024-01-17', category: 'Work', description: 'Discuss project roadmap.' }
    ];

    // Add unique IDs to samples to avoid conflicts
    sampleData.forEach(function (item) {
        const newItem = { ...item, id: Date.now() + Math.random() };
        events.push(newItem);
    });

    renderEvents();
});

// --- DOM Manipulation Demo ---
document.addEventListener('keydown', function (e) {
    const display = document.getElementById('keyPressedDisplay');
    display.textContent = e.key;
    display.style.color = '#6a5acd'; // Match primary color
    display.style.fontWeight = 'bold';

    setTimeout(function () {
        display.style.color = 'inherit';
        display.style.fontWeight = 'normal';
    }, 500);
});
