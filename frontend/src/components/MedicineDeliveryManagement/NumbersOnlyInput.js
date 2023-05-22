import React, { useState } from 'react';

function CustomNumberInput() {
  const [phone, numberValue] = useState('');

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/; // regular expression to match only numbers
    if (e.target.value === '' || re.test(e.target.value)) {
        numberValue(e.target.value);
    }
  };

  return (
    <div className="mb-3">
      {/* <label className="form-label">Phone:</label> */}
      <input
        type="tel"
        name="phone"
        className="form-control"
        value={phone}
        maxLength="10"
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default CustomNumberInput;
