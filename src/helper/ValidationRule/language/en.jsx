const message = (rule) => {
  return {
    'required': ['Required'],
    'email': ['Invalid email address'],
    'length': ['The length must be ' + rule + ' characters'],
    'minLength': ['Minimum ' + rule + ' characters required'],
    'maxLength': ['Maximum ' + rule + ' characters allowed'],
    'minValue': ['Minimum value is ' + rule],
    'maxValue': ['Maximum value is ' + rule],
    'equals': ['Fields do not match'],
    'matches': ['Incorrect field'],
    'phone': ['Invalid phone number'],
    'letterNumber': ['Only letters and numbers allowed'],
    'letterNumberSp': ['Only letters, numbers and spaces allowed'],
    'decimal': ['Only decimal (3 digits behind the comma)'],
    'number': ['Only numbers'],
    'numberSp': ['Only numbers and spaces allowed'],
    'numberColon': ['Only numbers and colon allowed'],
    'letter': ['Only letters'],
    'letterSp': ['Only letters and spaces allowed'],
    'npwp': ['Incorrect npwp format'],
    'password': ['Please use a combination of letters,  numbers and symbols'],
    'strictPassword': ['Must contain a special character combination, uppercase, and numeric'],
    'fileSize': ['File size too large'],
    'fileType': ['Incorrect file type'],
    'moneyLackOfNumber': [`price must be a multiple of ${rule}`],
    'diskonRate': [`Discount must not be more than ${rule} percent`],
    'attribute': [`Only lower case letter and underscore allowed`],
    'passwordWithCharacter': [`Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one symbol`]
  }
}

export default message;
