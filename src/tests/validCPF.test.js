
 const validCPF = (cpf) => {
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

describe('validCPF', () => {
  test('returns false for invalid CPFs', () => {
    expect(validCPF('')).toBe(false); // CPF empty
    expect(validCPF('123')).toBe(false); // CPF with less than 11 digits
    expect(validCPF('11111111111')).toBe(false); // CPF with all the same digits
    expect(validCPF('12345678900')).toBe(false); // CPF invalid
  });

  test('returns true for valid CPFs', () => {
    expect(validCPF('529.982.247-25')).toBe(true); // Valid CPF with punctuation
    expect(validCPF('52998224725')).toBe(true); // Valid CPF without punctuation
  });
});