import styles from './AccessibleSwitch.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AccessibleSwitch = ({ id, label, checked, ...props }: Props) => {
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        type="checkbox"
        id={id}
        style={{ display: 'none' }}
        {...props}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      />
      <span className={`${styles.switch} ${checked ? styles.checked : ''}`}>
        <span className={`${styles.knob} ${checked ? styles.checked : ''}`} />
      </span>
    </label>
  );
};
