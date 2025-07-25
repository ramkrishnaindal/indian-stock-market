export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export class ValidationService {
  static validateEmail(email: string): ValidationResult {
    const errors: string[] = []
    
    if (!email) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address')
    }
    
    return { isValid: errors.length === 0, errors }
  }

  static validatePassword(password: string): ValidationResult {
    const errors: string[] = []
    
    if (!password) {
      errors.push('Password is required')
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long')
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errors.push('Password must contain at least one lowercase letter')
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push('Password must contain at least one uppercase letter')
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push('Password must contain at least one number')
      }
    }
    
    return { isValid: errors.length === 0, errors }
  }

  static validateName(name: string): ValidationResult {
    const errors: string[] = []
    
    if (name && name.length < 2) {
      errors.push('Name must be at least 2 characters long')
    }
    
    return { isValid: errors.length === 0, errors }
  }
}