import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './AccessibleForm.module.css';
import { AccessibleSwitch } from './AccessibleSwitch';

const schema = z.object({
  firstName: z
    .string()
    .min(2)
    .regex(/^[a-zA-Z]+$/),
  lastName: z
    .string()
    .min(2)
    .regex(/^[a-zA-Z]+$/),
  email: z.string().email(),
  consent: z.boolean().refine((val) => val === true),
});

type FormData = z.infer<typeof schema>;

export const AccessibleForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.label}>
        Imię
        <input
          type="text"
          {...register('firstName')}
          placeholder="Imię"
          aria-required="true"
          className={styles.input}
        />
      </label>
      {errors.firstName && (
        <span role="alert" aria-live="assertive" className={styles.error}>
          Imię jest wymagane
        </span>
      )}
      <label className={styles.label}>
        Nazwisko
        <input
          type="text"
          {...register('lastName')}
          placeholder="Nazwisko"
          aria-required="true"
          className={styles.input}
        />
      </label>
      {errors.lastName && (
        <span role="alert" aria-live="assertive" className={styles.error}>
          Nazwisko jest wymagane
        </span>
      )}
      <label className={styles.label}>
        Email
        <input
          type="email"
          {...register('email')}
          placeholder="Email"
          aria-required="true"
          className={styles.input}
        />
      </label>
      {errors.email && (
        <span role="alert" aria-live="assertive" className={styles.error}>
          Podaj poprawny email
        </span>
      )}
      <Controller
        name="consent"
        control={control}
        render={({ field }) => (
          <AccessibleSwitch
            id="consent"
            label="Zgoda na przetwarzanie danych osobowych"
            checked={field.value}
            onChange={field.onChange}
            className={styles.switch}
          />
        )}
      />
      {errors.consent && (
        <span role="alert" aria-live="assertive" className={styles.error}>
          Musisz wyrazić zgodę
        </span>
      )}
      <button type="submit" className={styles.button}>
        Wyślij
      </button>
    </form>
  );
};
