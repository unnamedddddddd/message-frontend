const formatTime = (date?: Date | string ) => {
  const dateObj = date 
    ? (typeof date === 'string' ? new Date(date) : date)
    : new Date();

  return dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default formatTime;