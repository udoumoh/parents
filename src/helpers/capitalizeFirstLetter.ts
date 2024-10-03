export const capitalizeFirstLetter = (name: any) => {
    if (name?.length === 0) {
      return name;
    }
    const newName = name?.[0]?.toUpperCase() + name?.substring(1);
    return newName;
  };

export const capitalizeFirstLetterOfEachWord = (str: any) => {
  return str
  ?.split(' ') // Split the string into an array of words
    ?.map((word: any) => word?.charAt(0)?.toUpperCase() + word?.slice(1)) // Capitalize the first letter of each word
    ?.join(' '); // Join the words back into a single string
}
