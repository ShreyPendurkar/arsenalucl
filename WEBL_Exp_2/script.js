document.getElementById('numRooms').addEventListener('input', function () {
    const numRooms = this.value;
    const roomsContainer = document.getElementById('roomsContainer');
    roomsContainer.innerHTML = ''; // Clear previous fields

    for (let i = 1; i <= numRooms; i++) {
        const roomDiv = document.createElement('div');
        roomDiv.classList.add('form-group');

        roomDiv.innerHTML = `
            <h3>Room ${i}</h3>
            <label for="guests${i}">Number of Guests:</label>
            <select id="guests${i}" name="guests${i}" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label for="roomType${i}">Room Type:</label>
            <select id="roomType${i}" name="roomType${i}" required>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
            </select>
        `;

        roomsContainer.appendChild(roomDiv);
    }
});

document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get common form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const numRooms = document.getElementById('numRooms').value;

    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Check if email already exists in the stored data
    if (bookings.some(booking => booking.email === email)) {
        alert("You have already made a booking with this email.");
        return;
    }

    let newBooking = {
        name,
        email,
        contact,
        checkin,
        checkout,
        numRooms,
        rooms: []
    };

    // Get room-specific details
    for (let i = 1; i <= numRooms; i++) {
        const guests = document.getElementById(`guests${i}`).value;
        const roomType = document.getElementById(`roomType${i}`).value;

        newBooking.rooms.push({
            guests,
            roomType
        });
    }

    // Save booking data to local storage
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Display confirmation
    alert(`Booking successful!\n\nName: ${name}\nEmail: ${email}\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nNumber of Rooms: ${numRooms}`);

    // Redirect or clear form after successful submission
    document.getElementById('bookingForm').reset();
});