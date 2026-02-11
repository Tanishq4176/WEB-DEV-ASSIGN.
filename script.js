let events = [];

const eventForm = document.getElementById('eventForm');
const eventsContainer = document.getElementById('eventsContainer');
const emptyMessage = document.getElementById('emptyMessage');
const clearAllBtn = document.getElementById('clearAllBtn');
const addSampleBtn = document.getElementById('addSampleBtn');

eventForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const category = document.getElementById('eventCategory').value;
    const description = document.getElementById('eventDescription').value;

    if (title === '' || date === '') {
        alert('Please enter a title and date.');
        return;
    }

    const newEvent = {
        id: Date.now(),
        title: title,
        date: date,
        category: category,
        description: description
    };

    events.push(newEvent);
    renderEvents();
    eventForm.reset();
});

function renderEvents() {
    eventsContainer.innerHTML = '';

    if (events.length === 0) {
        eventsContainer.innerHTML = '<p id="emptyMessage" class="empty-message">No events added yet.</p>';
        return;
    }

    events.forEach(function (event) {
        const card = document.createElement('div');
        card.className = 'event-card';

        card.innerHTML = `
            <h3>${event.title}</h3>
            <div class="meta-info">
                <span class="date">📅 ${event.date}</span>
                <span class="category category-${event.category}">${event.category}</span>
            </div>
            <p>${event.description}</p>
            <button class="delete-btn" onclick="deleteEvent(${event.id})" title="Delete">&times;</button>
        `;

        eventsContainer.appendChild(card);
    });
}

function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(function (event) {
            return event.id !== id;
        });

        renderEvents();
    }
}

clearAllBtn.addEventListener('click', function () {
    if (confirm('Clear all events?')) {
        events = [];
        renderEvents();
    }
});

addSampleBtn.addEventListener('click', function () {
    const sampleData = [
        { id: 1, title: 'Web Dev Class', date: '2024-01-15', category: 'Study', description: 'Learn about DOM manipulation.' },
        { id: 2, title: 'Grocery Run', date: '2024-01-16', category: 'Personal', description: 'Buy milk and eggs.' },
        { id: 3, title: 'Team Meeting', date: '2024-01-17', category: 'Work', description: 'Discuss project roadmap.' }
    ];

    sampleData.forEach(function (item) {
        const newItem = { ...item, id: Date.now() + Math.random() };
        events.push(newItem);
    });

    renderEvents();
});

document.addEventListener('keydown', function (e) {
    const display = document.getElementById('keyPressedDisplay');
    display.textContent = e.key;
    display.style.color = '#6a5acd';
    display.style.fontWeight = 'bold';

    setTimeout(function () {
        display.style.color = 'inherit';
        display.style.fontWeight = 'normal';
    }, 500);
});
