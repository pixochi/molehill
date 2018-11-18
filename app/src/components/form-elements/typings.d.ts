import { FormProps, Form } from "redux-form";

export interface IFormProps extends FormProps<any, any> {
  loading?: boolean;
}