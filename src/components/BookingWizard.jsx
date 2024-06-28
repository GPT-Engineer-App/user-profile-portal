import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { useServices } from '../integrations/supabase/index.js';

const BookingWizard = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const { data: services } = useServices();

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

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleConfirm = () => {
    // Handle booking confirmation logic here
    onClose();
  };

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
          <h2>Choose a Date and Time</h2>
          <Calendar onSelect={handleDateSelect} />
          <Button onClick={handlePrevious}>Previous</Button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Contact Information</h2>
          <Input name="name" placeholder="Name" value={contactInfo.name} onChange={handleContactInfoChange} />
          <Input name="email" placeholder="Email" value={contactInfo.email} onChange={handleContactInfoChange} />
          <Input name="phone" placeholder="Phone" value={contactInfo.phone} onChange={handleContactInfoChange} />
          <Button onClick={handlePrevious}>Previous</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Confirm Booking</h2>
          <p>Service: {selectedService?.description}</p>
          <p>Date: {selectedDate?.toString()}</p>
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