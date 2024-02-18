export const validCPF = (cpf) => {
    // Remove non-numeric characters
    cpf = cpf.replace(/[^\d]/g, '');
  
    // Checks if the CPF has 11 digits
    if (cpf.length !== 11) return false;
  
    // Checks if all digits are equal, which is invalid
    if (/^(\d)\1+$/.test(cpf)) return false;
  
    // Calculates the first check digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = 11 - (sum % 11);
    let digitVerifier1 = rest === 10 || rest === 11 ? 0 : rest;
  
    // Checks the first check digit
    if (parseInt(cpf.charAt(9)) !== digitVerifier1) return false;
  
    // Calculates the second check digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = 11 - (sum % 11);
    let digitVerifier2 = rest === 10 || rest === 11 ? 0 : rest;
  
    // hecks the second check digit
    if (parseInt(cpf.charAt(10)) !== digitVerifier2) return false;
  
    // CPF valid
    return true;
  }

  export const verifyCep = (val) => {
    if(val.length != 8 ){ 
      return false
    }
  
    return true
  }