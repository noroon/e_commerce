// import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
// import './index.scss';

// type FormInputProps = {
//   label: string;
//   inputoptions: {
//     required: boolean;
//     name: string;
//     type: any;
//     value: any;
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   };
// } & InputHTMLAttributes<HTMLInputElement>;

// const FormInput: FC<FormInputProps> = ({ label, ...inputoptions }) => {
//   return (
//     <div className="group">
//       <input className="form-input" autoComplete="off" {...inputoptions} />
//       {label && (
//         <label
//           className={`${
//             inputoptions.value &&
//             typeof inputoptions.value === 'string' &&
//             inputoptions.value.length
//               ? 'shrink'
//               : ''
//           } form-input-label`}
//         >
//           {label}
//         </label>
//       )}
//     </div>
//   );
// };

// export default FormInput;
import './index.scss';

export default function FormInput({ label, inputOptions }) {
  return (
    <div className="group">
      <input className="form-input" autoComplete="off" {...inputOptions} />
      {label && (
        <label
          className={`${
            inputOptions.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
}