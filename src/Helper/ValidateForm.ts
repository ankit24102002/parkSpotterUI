import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { AbstractControl, ValidatorFn } from '@angular/forms';


export default class ValidateForm{
static validateAllFormFeild(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(feild => {     //formGroup.controls return an array to validate control of every feild
      const control = formGroup.get(feild);              
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.validateAllFormFeild(control)       //Can't understand
      }
    })}
}


// Function to check if the input contains only one word
export function singleWordValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value as string;

  // Check if the value is empty or null
  if (!value) {
    return null; // No validation error if empty
  }

  // Remove leading and trailing spaces
  const trimmedValue = value.trim();

  // Split the string into words using the default word delimiter (whitespace)
  const words = trimmedValue.split(/\s+/);

  // Check if there is only one word
  if (words.length !== 1) {
    return { singleWord: true }; // Return an error object if more than one word
  }

  return null; // No error if valid (single word)
}
  

interface MobileNumberError {
  invalidMobileNumber: { value: string };
}

export function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // No validation error if empty
    }
  
    const mobileNumberRegex = /^\d{10}$/; // Assuming mobile number should have 10 digits
    const valid = mobileNumberRegex.test(control.value);
    return valid ? null : { ['invalidMobileNumber']: { value: control.value } } as MobileNumberError;  };
}

interface PasswordValidationError {
  weakPassword: boolean;
}


export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // No validation error if empty
    }
    const minLength = 6; // Minimum password length
   // const hasUppercase = /[A-Z]/.test(control.value);
   // const hasLowercase = /[a-z]/.test(control.value);
 const hasNumber = /[0-9]/.test(control.value);
  //  const hasSymbol = /[!@#$%^&*()]/.test(control.value);

    const valid = control.value.length >= minLength && hasNumber ;

    return valid ? null : { weakPassword: true } as PasswordValidationError;
  };
}



interface LongitudeError {
  invalidLongitude: boolean;
}
export function longitudeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // No validation error if empty
    }
    // Minimum and maximum valid longitude values
    const minLongitude = -180;
    const maxLongitude = 180;

    // Check if the value is a number
    if (isNaN(control.value)) {
      return { invalidLongitude: true };
    }

    // Check if the value is within the valid range
    const longitude = parseFloat(control.value);
    return longitude >= minLongitude && longitude <= maxLongitude ? null : { invalidLongitude: true };
  };
}




export function maxLengthValidator(maxLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.length > maxLength) {
      return { maxlength: true }; // Define the error object with details
    }
    return null;
  };
}


// export function ConfirmPasswordValidator( controlName : string,matchControlName: string){
// return (formGroup:FormGroup)=>{
//   const passwordControl=formGroup.controls[controlName];
//   const confirmPasswordControl=formGroup.controls[matchControlName];
//   if(confirmPasswordControl.errors&&confirmPasswordControl.errors['conformPasswordValidator']){
//     return ;
//   }
//   if(passwordControl.value!==confirmPasswordControl){
//     confirmPasswordControl.setErrors({confirmPasswordValidator:true})
//   }else{
//     confirmPasswordControl.setErrors(null)
//   }
// }
// }



export function confirmPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(passwordField);
    const confirmPasswordControl = control.get(confirmPasswordField);

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ confirmPasswordValidator: true });
      return { confirmPasswordValidator: true };
    } else {
      confirmPasswordControl?.setErrors(null);
      return null;
    }
  };
}


