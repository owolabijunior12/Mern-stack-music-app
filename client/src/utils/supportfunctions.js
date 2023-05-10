import { deleteObject, ref } from "firebase/storage";
import { storage } from "../configuration/firebase.configuration";

export const filters = [
  { id: 2, name: "HIP HOP", value: "jasp" },
  { id: 3, name: "ROCK", value: "rock" },
  { id: 4, name: "AFRO BEAT", value: "melody" },
  { id: 5, name: "REGGAE", value: "REGGAE" },
  { id: 6, name: "R&B", value: "R&B" },
  { id: 7, name: "GOSPEL", value: "GOSPEL" },
  // { id: 8, name: "", value: "R&B" },
];

export const filterByLanguage = [
  { id: 1, name: "Spainish", value: "Spainish" },
  { id: 2, name: "English", value: "english" },

];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
