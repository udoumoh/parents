const formatNumberWithCommas = (numberString: any) => {
  const formattedNumber = parseFloat(numberString).toLocaleString('en-US');
  return formattedNumber;
}

export default formatNumberWithCommas
