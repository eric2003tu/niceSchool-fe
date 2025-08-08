export const validateField = (name: string, value: string): string | null => {
  switch (name) {
    case 'email':
      if (!value) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      return null;
    case 'password':
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return null;
    default:
      return null;
  }
};