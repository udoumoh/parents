export const capitalizeFirstLetter = (name: any) => {
    if (name?.length === 0) {
      return name;
    }
    const newName = name[0]?.toUpperCase() + name?.substring(1);
    return newName;
  };