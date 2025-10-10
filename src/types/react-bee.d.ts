// src/types/react-bee.d.ts
// Shim mínimo de tipos para 'react-bee' sin alterar tu flujo actual.

declare module 'react-bee' {
  import * as React from 'react';

  // Lo que devuelve useForm; lo dejamos abierto para no romper tu código
  export type UseFormReturn<T = any> = T & {
    setErrors?: (errs: any) => void;
    reset?: () => void;
    [k: string]: any;
  };

  export function useForm<T = any>(...args: any[]): UseFormReturn<T>;

  // El Form de react-bee llama onSubmit({ data }) (no pasa el FormEvent del DOM)
  export type SubmitPayload = { data: Record<string, string> };

  export interface FormProps
    extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    methods?: UseFormReturn<any>;
    onSubmit?: (payload: SubmitPayload) => void | Promise<void>;
  }

  export const Form: React.FC<FormProps>;
}