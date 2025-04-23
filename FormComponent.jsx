import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    rooms: [
      {
        roomType: 'Standard',
        guests: '1',
      },
    ],
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPastBookings, setShowPastBookings] = useState(false);

  const handleChange = (e, roomIndex = null) => {
    const { name, value } = e.target;
    if (roomIndex !== null) {
      const updatedRooms = [...formData.rooms];
      updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], [name]: value };
      setFormData({ ...formData, rooms: updatedRooms });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
    console.log('Form Data after change:', formData); // Log after each change
  };

  const addRoom = () => {
    setFormData({
      ...formData,
      rooms: [...formData.rooms, { roomType: 'Standard', guests: '1' }],
    });
    console.log('Form Data after adding room:', formData); // Log after adding a room
  };

  const removeRoom = (index) => {
    const updatedRooms = formData.rooms.filter((_, i) => i !== index);
    setFormData({ ...formData, rooms: updatedRooms });
    console.log('Form Data after removing room:', formData); // Log after removing a room
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required.';
    } else {
      const checkInDate = new Date(formData.checkIn);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (checkInDate < today) {
        newErrors.checkIn = 'Check-in date must be today or later.';
      }
    }
    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required.';
    } else {
      const checkOutDate = new Date(formData.checkOut);
      const checkInDate = new Date(formData.checkIn);
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'Check-out date must be after check-in date.';
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form Data before submission:', formData); // Log before submission
      setLoading(true);
      setTimeout(() => {
        const newBooking = {
          ...formData,
          id: Date.now(),
        };
        setBookings([...bookings, newBooking]);
        console.log('New Booking added:', newBooking); // Log the new booking
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          checkIn: '',
          checkOut: '',
          rooms: [{ roomType: 'Standard', guests: '1' }],
        });
        setErrors({});
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Luxury Hotel Reservations</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>
          </div>

          <div className="form-group">
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
          </div>

          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <label style={{ flex: 1 }}>
              Check-in Date:
              <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} />
              {errors.checkIn && <span className="error">{errors.checkIn}</span>}
            </label>
            <label style={{ flex: 1 }}>
              Check-out Date:
              <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} />
              {errors.checkOut && <span className="error">{errors.checkOut}</span>}
            </label>
          </div>

          {formData.rooms.map((room, index) => (
            <div key={index} className="form-group room-section">
              <h3>Room {index + 1}</h3>
              <div className="room-controls">
                <button type="button" onClick={() => removeRoom(index)} className="remove-btn">
                  Remove
                </button>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <label style={{ flex: 1 }}>
                  Room Type:
                  <select name="roomType" value={room.roomType} onChange={(e) => handleChange(e, index)}>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                  </select>
                </label>
                <label style={{ flex: 1 }}>
                  Number of Guests:
                  <select name="guests" value={room.guests} onChange={(e) => handleChange(e, index)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </label>
              </div>
            </div>
          ))}
          <button type="button" onClick={addRoom} style={{ marginBottom: '10px', background: '#27ae60', color: 'white' }}>
            Add Another Room
          </button>

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Book Now'}
          </button>
        </form>
      ) : (
        <div className="confirmation">
          <h3>Booking Confirmed! 🎉</h3>
          <div className="confirmation-details">
            <h4>Booking Details</h4>
            <p><strong>Guest Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Check-in Date:</strong> {formData.checkIn}</p>
            <p><strong>Check-out Date:</strong> {formData.checkOut}</p>
            <p><strong>Rooms:</strong></p>
            <ul>
              {formData.rooms.map((room, index) => (
                <li key={index}>
                  Room {index + 1}: {room.roomType}, {room.guests} guest(s)
                </li>
              ))}
            </ul>
            <p><strong>Booking Reference ID:</strong> {bookings.length > 0 ? bookings[bookings.length - 1].id : 'N/A'}</p>
            <p>Thank you for booking with us! We look forward to your stay.</p>
          </div>
          <button onClick={() => setSubmitted(false)} className="book-again-btn">
            Book Again
          </button>
          {bookings.length > 0 && (
            <div className="past-bookings">
              <button onClick={() => setShowPastBookings(!showPastBookings)} className="toggle-btn">
                {showPastBookings ? 'Hide Past Bookings' : 'Show Past Bookings'}
              </button>
              {showPastBookings && (
                <ul className="bookings-list">
                  {bookings.map((booking) => (
                    <li key={booking.id} className="booking-item">
                      {booking.name} - {booking.checkIn} to {booking.checkOut}, {booking.rooms.length} room(s)
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormComponent;