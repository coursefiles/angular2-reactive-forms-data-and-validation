export class CustomValidators {
  static requiredWhen(requiredControlName, controlToCheckName) {
    return (control) => {
      let required = control.get(requiredControlName).value;
      let toCheck = control.get(controlToCheckName).value;
      return (required || (toCheck && !required))
        ? null
        : {requiredwhen: true};
    };
  }
};
