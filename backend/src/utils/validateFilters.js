export const filterValidProperties = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value!='')
    );
};