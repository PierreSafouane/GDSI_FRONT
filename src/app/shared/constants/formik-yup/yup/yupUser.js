import * as Yup from "yup";

export const schemaFormLogin = Yup.object().shape({
  username: Yup.string().required("Required input"),
  password: Yup.string().required("Required input"),
});

export const schemaFormSendingResetPsw = Yup.object().shape({
  mail: Yup.string().email().required("Mail requis"),
});

export const schemaFormConfirmPsw = Yup.object().shape({
  newPassword: Yup.string().required("Required input"),
  confNewPassword: Yup.string()
    .required("Required input")
    .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});

export const schemaFormUpdateUser = Yup.object({
  firstName: Yup.string().required("Le prénom est requis"),
  lastName: Yup.string().required("Le nom est requis"),
  email: Yup.string()
    .email("Entrez un mail valide")
    .required("Le mail est requis"),
});

export const schemaFormUpdatePsw = Yup.object().shape({
  currentPassword: Yup.string().required("champ requis"),
  newPassword: Yup.string().required("champ requis"),
  confNewPassword: Yup.string()
    .required("champ requis")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "vérifier que les mots de passe correspondent"
    ),
});
export const schemaFormCreateUser = Yup.object({
  firstName: Yup.string().required("Le prénom est requis"),
  login: Yup.string().required("Le login est requis"),
  lastName: Yup.string().required("Le nom est requis"),
  email: Yup.string()
    .email("Entrez un mail valide")
    .required("Le mail est requis"),
});
export const schemaFormUpdateBooking = Yup.object({
    title: Yup.string().required("Le titre est requis"),
    description: Yup.string().required("La description est requis"),
    startAt:"",
    finishAt:"",
});
