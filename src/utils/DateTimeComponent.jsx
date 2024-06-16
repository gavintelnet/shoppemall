import React from 'react';
import { format, parseISO } from 'date-fns';

const DateTimeComponent = ({ dateString }) => {
    const date = parseISO(dateString);
    const formattedDate = format(date, 'HH:mm:ss dd/MM/yyyy');

    return <div>{formattedDate}</div>;
};

export default DateTimeComponent;
