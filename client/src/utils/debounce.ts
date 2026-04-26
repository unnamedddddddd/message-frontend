const debounce = (func: (text: string) => void, delay: number) => {
  let timeout: NodeJS.Timeout;

  return (text: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(text), delay)
  }
}

export default debounce;