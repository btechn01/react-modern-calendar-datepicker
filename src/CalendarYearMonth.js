import React, { useState, useRef, useEffect } from 'react';

import { shallowClone, getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_RANGE, TYPE_MUTLI_DATE } from './shared/constants';
import { useLocaleUtils, useLocaleLanguage } from './shared/hooks';

import { Header, MonthSelector, YearSelector } from './components';

const CalendarYearMonth = ({
  value,
  onChange,
  calendarClassName,
  colorPrimary,
  colorPrimaryLight,
  slideAnimationDuration,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  locale,
  renderFooter,
}) => {
  const calendarElement = useRef(null);
  const [mainState, setMainState] = useState({
    activeDate: null,
    monthChangeDirection: '',
    isYearSelectorOpen: false,
  });

  useEffect(() => {
    const handleKeyUp = ({ key }) => {
      /* istanbul ignore else */
      if (key === 'Tab') calendarElement.current.classList.remove('-noFocusOutline');
    };
    calendarElement.current.addEventListener('keyup', handleKeyUp, false);
    return () => {
      calendarElement.current.removeEventListener('keyup', handleKeyUp, false);
    };
  });

  const { getToday } = useLocaleUtils(locale);
  const { isRtl } = useLocaleLanguage(locale);
  const today = getToday();

  const createStateToggler = property => () => {
    setMainState({ ...mainState, [property]: !mainState[property] });
  };

  const toggleYearSelector = createStateToggler('isYearSelectorOpen');

  const getComputedActiveDate = () => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE && value.length) return shallowClone(value[0]);
    if (valueType === TYPE_SINGLE_DATE && value) return shallowClone(value);
    if (valueType === TYPE_RANGE && value.from) return shallowClone(value.from);
    return shallowClone(today);
  };

  const activeDate = mainState.activeDate
    ? shallowClone(mainState.activeDate)
    : getComputedActiveDate();

  const handleMonthChange = direction => {
    setMainState({
      ...mainState,
      monthChangeDirection: direction,
    });
  };

  const selectMonth = newMonthNumber => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, month: newMonthNumber },
    });

    onChange({ year: activeDate.year, month: newMonthNumber });
  };

  const selectYear = year => {
    setMainState({
      ...mainState,
      activeDate: { ...activeDate, year },
      isYearSelectorOpen: false,
    });
  };

  return (
    <div
      className={`Calendar -noFocusOutline ${calendarClassName} -${isRtl ? 'rtl' : 'ltr'}`}
      role="grid"
      style={{
        '--cl-color-primary': colorPrimary,
        '--cl-color-primary-light': colorPrimaryLight,
        '--animation-duration': slideAnimationDuration,
      }}
      ref={calendarElement}
    >
      <Header
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        activeDate={activeDate}
        onMonthChange={handleMonthChange}
        onYearSelect={toggleYearSelector}
        monthChangeDirection={mainState.monthChangeDirection}
        isYearSelectorOpen={mainState.isYearSelectorOpen}
        locale={locale}
      />

      <MonthSelector
        isOpen
        activeDate={activeDate}
        onMonthSelect={selectMonth}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      />

      <YearSelector
        isOpen={mainState.isYearSelectorOpen}
        activeDate={activeDate}
        onYearSelect={selectYear}
        selectorStartingYear={selectorStartingYear}
        selectorEndingYear={selectorEndingYear}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
      />

      <div className="Calendar__footer">{renderFooter()}</div>
    </div>
  );
};

CalendarYearMonth.defaultProps = {
  minimumDate: null,
  maximumDate: null,
  colorPrimary: '#0eca2d',
  colorPrimaryLight: '#cff4d5',
  slideAnimationDuration: '0.4s',
  calendarClassName: '',
  locale: 'en',
  value: null,
  renderFooter: () => null,
  customDaysClassName: [],
};

export { CalendarYearMonth };
