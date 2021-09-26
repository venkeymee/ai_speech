const USER_INFO = 'USER_INFO';

export function setUserData(userData = {}) {
  localStorage.setItem(USER_INFO, JSON.stringify(userData))
}

export function getUserData() {
  const data = localStorage.getItem(USER_INFO);
  if (!data) { return null; }

  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

export function clearOutUserData() {
  console.log('Clearing out uesr info from Local-storage');
  localStorage.removeItem(USER_INFO);
}