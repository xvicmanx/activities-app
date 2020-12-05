import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './DatePicker.css';

import { DropDown } from '../';

const months = [
  { id: '01', name: 'Enero', value: '01' },
  { id: '02', name: 'Febrero', value: '02' },
  { id: '03', name: 'Marzo', value: '03' },
  { id: '04', name: 'Abril', value: '04' },
  { id: '05', name: 'Mayo', value: '05' },
  { id: '06', name: 'Junio', value: '06' },
  { id: '07', name: 'Julio', value: '07' },
  { id: '08', name: 'Agosto', value: '08' },
  { id: '09', name: 'Septiembre', value: '09' },
  { id: '10', name: 'Octubre', value: '10' },
  { id: '11', name: 'Noviembre', value: '11' },
  { id: '12', name: 'Diciembre', value: '12' }
];

const currentYear = +moment().format('YYYY');
const years = [...Array(100).keys()].map(x => ({
  id: (currentYear - 100 + x),
  name: (currentYear - 100 + x),
  value: (currentYear - 100 + x),
}));

const days = [...Array(31).keys()].map(x => ({
  id: x + 1,
  name: x + 1,
  value: x + 1,
}));

const DatePicker = ({ onChange }) => {
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    onChange(`${year}/${month}/${day}`);
  }, [day, year, month]);

  return (
    <div className="DatePicker">
      <div className="DatePicker__day">
        <DropDown data={days} onChange={({ value }) => setDay(value)} />
      </div>

      <div className="DatePicker__month">
        <DropDown data={months} onChange={({ value }) => setMonth(value)} />
      </div>

      <div className="DatePicker__year">
        <DropDown data={years} onChange={({ value }) => setYear(value)} />
      </div>
    </div>
  );
};

export default DatePicker;
