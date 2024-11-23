export const validationErrors = (email: string, password: string) => {
  const errors: { [key: string]: string } = {}

  if (typeof email !== 'string' || !email.trim()) {
    errors.email = 'Email should not be empty and must be a string'
  }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format'
  }

  if (typeof password !== 'string' || !password.trim()) {
    errors.password = 'Password should not be empty and must be a string'
  }

  return errors
}
