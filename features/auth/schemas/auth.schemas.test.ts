import { forgotPasswordSchema, loginSchema, registerSchema } from './auth.schemas';

// Helper para crear datos válidos de registro
const createValidRegisterData = (overrides: Partial<any> = {}) => ({
  firstName: 'John',
  lastName: 'Doe',
  dni: '12345678',
  birthDate: '1990-01-01',
  address: 'Av. Siempre Viva 123, Lima',
  department: 'lima',
  province: 'lima',
  district: 'miraflores',
  phone: '1234567',
  mobile: '987654321',
  email: 'john@example.com',
  password: 'Password123',
  confirmPassword: 'Password123',
  ...overrides,
});

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('rejects empty email', () => {
      const invalidData = {
        email: '',
        password: 'password123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email es requerido');
      }
    });

    it('rejects invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido');
      }
    });

    it('rejects empty password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Contraseña es requerida');
      }
    });

    it('rejects password shorter than 6 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'La contraseña debe tener al menos 6 caracteres'
        );
      }
    });
  });

  describe('registerSchema', () => {
    it('validates correct registration data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        dni: '12345678',
        birthDate: '1990-01-01',
        address: 'Av. Siempre Viva 123, Lima',
        department: 'lima',
        province: 'lima',
        district: 'miraflores',
        phone: '1234567',
        mobile: '987654321',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
      };

      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('rejects empty firstName', () => {
      const invalidData = createValidRegisterData({
        firstName: '',
      });

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Nombre es requerido');
      }
    });

    it('rejects firstName shorter than 2 characters', () => {
      const invalidData = createValidRegisterData({
        firstName: 'J',
      });

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Nombre debe tener al menos 2 caracteres');
      }
    });

    it('rejects empty lastName', () => {
      const invalidData = {
        firstName: 'John',
        lastName: '',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Apellido es requerido');
      }
    });

    it('rejects lastName shorter than 2 characters', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'D',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
      };

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Apellido debe tener al menos 2 caracteres');
      }
    });

    it('rejects invalid email', () => {
      const invalidData = createValidRegisterData({
        email: 'invalid-email',
      });

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido');
      }
    });

    it('rejects password without uppercase letter', () => {
      const invalidData = createValidRegisterData({
        password: 'password123',
        confirmPassword: 'password123',
      });

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
        );
      }
    });

    it('rejects password without lowercase letter', () => {
      const invalidData = createValidRegisterData({
        password: 'PASSWORD123',
        confirmPassword: 'PASSWORD123',
      });

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
        );
      }
    });

    it('rejects password without number', () => {
      const invalidData = createValidRegisterData({
        password: 'Password',
        confirmPassword: 'Password',
      });

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
        );
      }
    });

    it('rejects empty confirmPassword', () => {
      const invalidData = createValidRegisterData({
        confirmPassword: '',
      });

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Confirmar contraseña es requerido');
      }
    });

    it('rejects when passwords do not match', () => {
      const invalidData = createValidRegisterData({
        password: 'Password123',
        confirmPassword: 'DifferentPassword123',
      });

      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Las contraseñas no coinciden');
        expect(result.error.issues[0].path).toEqual(['confirmPassword']);
      }
    });
  });

  describe('forgotPasswordSchema', () => {
    it('validates correct email', () => {
      const validData = {
        email: 'test@example.com',
      };

      const result = forgotPasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('rejects empty email', () => {
      const invalidData = {
        email: '',
      };

      const result = forgotPasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email es requerido');
      }
    });

    it('rejects invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
      };

      const result = forgotPasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email inválido');
      }
    });
  });
});
