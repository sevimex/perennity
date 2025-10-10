// src/api/form.ts

// Ayudante: setear errores de campo (usa el setError del form)
const setErrors = ({ setError, errors }: SetErrorsProps) => {
  Object.keys(errors).forEach((errorKey) => {
    setError(errorKey, { type: 'custom', message: errors[errorKey] })
  })
};

// Lo que espera/recibe tu backend
type FormResponse =
  | Record<string, never>               // éxito: {}
  | { error: true }                     // error general
  | { errors: Record<string, string> }; // errores por campo

type Props = {
  endpoint: string
  locale: string
  methods: any
  data: Record<string, string>

  // OJO: este setError es el **setter de estado** global (boolean), no el de campos
  setSuccess: (v: boolean) => void
  setError: (v: boolean) => void
};

// función principal (misma firma que usas en tu UI)
export default async function send({
  endpoint,
  locale,
  methods,
  data,
  setSuccess,
  setError: setErrorState, // <-- alias para evitar confusión con el setError de campos
}: Props): Promise<void> {
  try {
    // limpia estados
    setSuccess(false);
    setErrorState(false);

    const payload = { ...data, locale };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' }, // buena práctica
      body: JSON.stringify(payload),
    });

    const response = (await res.json()) as FormResponse;

    // 1) Errores por campo
    if ('errors' in response) {
      if (methods?.setError) {
        setErrors({ setError: methods.setError, errors: response.errors });
      }
      setSuccess(false);
      setErrorState(false);
      return;
    }

    // 2) Error general
    if ('error' in response) {
      setSuccess(false);
      setErrorState(true);
      return;
    }

    // 3) Éxito ({})
    setErrorState(false);
    setSuccess(true);

    // resetea formulario si el método existe
    if (typeof methods?.reset === 'function') {
      methods.reset();
    }
  } catch {
    // Network u otro error inesperado
    setSuccess(false);
    setErrorState(true);
  }
}

type SetErrorsProps = {
  // ESTE setError es el del form (para marcar campos), no el setter de estado global
  setError: (name: string, options: { type: string; message: string }) => void
  errors: Record<string, string>
};