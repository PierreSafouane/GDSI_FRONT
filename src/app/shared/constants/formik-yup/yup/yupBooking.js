import * as Yup from "yup";

export const schemaFormCreateBooking = Yup.object({
    title: Yup.string().required("Le titre est requis"),
    description: Yup.string().required("La description est requise"),
   startAt:Yup.string().required("L'heure de début est requise"),
   finishAt:Yup.string().required("L'heure de début est requise"),
   datePickerStart:Yup.date().required("La date est requise"),
   datePickerFinish:Yup.date().required("La date est requise").min(Yup.ref('datePickerStart'),"La date de fin ne peut pas être avant la date de début")
  });
  