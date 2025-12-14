// src/utils/auth.js

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) return null;

    return JSON.parse(user);
  } catch (err) {
    console.error("❌ Corrupted user data. Clearing storage.");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    return token && token.length > 10;
  } catch {
    return false;
  }
};

export const setAuth = (token, user) => {
  if (token) localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

export const updateStoredUser = (newUserData) => {
  try {
    const oldUser = JSON.parse(localStorage.getItem("user"));
    const mergedUser = { ...oldUser, ...newUserData };
    localStorage.setItem("user", JSON.stringify(mergedUser));
  } catch {
    console.warn("Resetting corrupted user");
    localStorage.setItem("user", JSON.stringify(newUserData));
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
