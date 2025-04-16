import { PersistStorage } from "zustand/middleware";

type StorageType = "localStorage" | "sessionStorage";

export const encryptedStore = <T>(
  storageType?: StorageType
): PersistStorage<Readonly<T>> => {
  if (storageType === "localStorage") {
    return {
      setItem: (name, value) => {
        return localStorage.setItem(name, encryptData(value));
      },
      getItem: (name) => {
        const value = localStorage.getItem(name);
        if (value) return decryptData(value);
        else return null;
      },
      removeItem: (name) => {
        return localStorage.removeItem(name);
      },
    };
  } else {
    return {
      setItem: (name, value) => {
        return sessionStorage.setItem(name, encryptData(value));
      },
      getItem: (name) => {
        const value = sessionStorage.getItem(name);
        if (value) return decryptData(value);
        else return null;
      },
      removeItem: (name) => {
        return sessionStorage.removeItem(name);
      },
    };
  }
};

const secretPass = "1234567890123456"; //
// You can use a more secure key management system in production or add this to env

function encryptData(data: any): string {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretPass
  ).toString();

  return encryptedData;

  // UNCOMMENT NEXT LINE TO OBSERVE ENCRYPETED STORES FOR TEST PURPOSES ONLY
  // return JSON.stringify(data);
}

function decryptData(data: string) {
  const bytes = CryptoJS.AES.decrypt(data, secretPass);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;

  // UNCOMMENT NEXT LINE TO OBSERVE ENCRYPETED STORES FOR TEST PURPOSES ONLY
  // return JSON.parse(data);
}
