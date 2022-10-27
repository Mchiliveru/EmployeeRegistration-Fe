export const getSessionVariable = (sessionVariable = "") => {
  if (!sessionVariable) return;
  return sessionStorage.getItem(sessionVariable);
};

export const setSessionVariable = (variableKey = "", value = "") => {
  if (!variableKey) return;
  return sessionStorage.setItem(variableKey, value);
};

export const deleteSessionVariable = (variableKey = "") => {
    if(!variableKey) return;
    sessionStorage.removeItem(variableKey);
}