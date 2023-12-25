import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../../src/DatePicker.css';
import * as serviceWorker from './serviceWorker';
import { CalendarYearMonth } from '../../src';

const App = () => {
  const [selectedDay, setValue] = useState(null);
  return <CalendarYearMonth value={selectedDay} onChange={setValue} shouldHighlightWeekends />;
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
