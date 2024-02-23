import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import * as serviceWorker from './serviceWorker';
import DatePicker from '../../src';

const App = () => {
  const [selectedDay, setValue] = useState(null);
  return (
    <DatePicker
      type="year"
      value={selectedDay}
      onChange={val => {
        setValue(val);
      }}
      shouldHighlightWeekends
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
