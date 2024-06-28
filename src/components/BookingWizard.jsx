import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useServices } from '../integrations/supabase/index.js';
import { sendEmail, sendSMS } from '../utils/notifications.js';

const BookingWizard = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const { data: services, error: servicesError } = useServices();

  useEffect(() => {
    if (selectedDate) {
      // Fetch available slots for the selected date from an API or predefined list
      // For demonstration, using a predefined list
      const slots = [
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '01:00 PM - 02:00 PM',
        '02:00 PM - 03:00 PM',
      ];
      setAvailableSlots(slots);
    }
  }, [selectedDate]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    handleNext();
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    handleNext();
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    handleNext();
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleConfirm = async () => {
    try {
      // Handle booking confirmation logic here

      // Send email notification
      await sendEmail(contactInfo.email, 'Booking Confirmation', `Your booking for ${selectedService.description} on ${selectedDate.toString()} at ${selectedSlot} has been confirmed.`);

      // Send SMS notification
      await sendSMS(contactInfo.phone, `Your booking for ${selectedService.description} on ${selectedDate.toString()} at ${selectedSlot} has been confirmed.`);
      onClose();
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('There was an error confirming your booking. Please try again.');
    }
  };

  if (servicesError) {
    return <div>Error loading services: {servicesError.message}</div>;
  }

  return (
    <div className="booking-wizard">
      {step === 1 && (
        <div>
          <h2>Select a Service</h2>
          <ul>
            {services?.map((service) => (
              <li key={service.id}>
                <Button onClick={() => handleServiceSelect(service)}>{service.description}</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Choose a Date</h2>
          <Calendar onSelect={handleDateSelect} />
          <Button onClick={handlePrevious}>Previous</Button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Select a Time Slot</h2>
          <ul>
            {availableSlots.map((slot, index) => (
              <li key={index}>
                <Button onClick={() => handleSlotSelect(slot)}>{slot}</Button>
              </li>
            ))}
          </ul>
          <Button onClick={handlePrevious}>Previous</Button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Contact Information</h2>
          <Input name="name" placeholder="Name" value={contactInfo.name} onChange={handleContactInfoChange} />
          <Input name="email" placeholder="Email" value={contactInfo.email} onChange={handleContactInfoChange} />
          <Input name="phone" placeholder="Phone" value={contactInfo.phone} onChange={handleContactInfoChange} />
          <Button onClick={handlePrevious}>Previous</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      )}
      {step === 5 && (
        <div>
          <h2>Confirm Booking</h2>
          <p>Service: {selectedService?.description}</p>
          <p>Date: {selectedDate?.toString()}</p>
          <p>Time Slot: {selectedSlot}</p>
          <p>Name: {contactInfo.name}</p>
          <p>Email: {contactInfo.email}</p>
          <p>Phone: {contactInfo.phone}</p>
          <Button onClick={handlePrevious}>Previous</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      )}
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default BookingWizard;