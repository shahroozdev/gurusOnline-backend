export const ApiSchemas = {
  signIn: {
    summary: 'User Login',
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'cohober236@minduls.com' },
        password: { type: 'string', example: 'SecurePass123!' },
      },
      required: ['email', 'password'],
    },
    responsesArr: [
      {
        status: 200,
        description: 'Successful login',
        schema: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 2 },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-02-13T11:46:50.492Z',
                },
                updated_at: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-02-13T12:00:32.328Z',
                },
                deleted_at: { type: 'string', nullable: true, example: null },
                fName: { type: 'string', example: 'John' },
                lName: { type: 'string', example: 'Doe' },
                email: { type: 'string', example: 'cohober236@minduls.com' },
                status: { type: 'boolean', example: true },
                dob: { type: 'string', format: 'date', example: '1995-08-15' },
                gender: { type: 'string', example: 'Male' },
                roleId: { type: 'number', example: 1 },
                role: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'user' },
                    permissions: {
                      type: 'string',
                      nullable: true,
                      example: null,
                    },
                  },
                },
                profile: { type: 'string', nullable: true, example: null },
              },
            },
            accessToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            message: { type: 'string', example: 'Sign-in successful.' },
          },
        },
      },
      {
        status: 422,
        description: 'Unprocessable Entity',
        content: {
          'application/json': {
            examples: {
              userNotFound: {
                summary: 'User Not Found',
                value: { status: 422, message: 'User not found.' },
              },
              emailNotVerified: {
                summary: 'Email Not Verified',
                value: { status: 422, message: 'Email is not verified yet.' },
              },
              invalidPassword: {
                summary: 'Invalid Password',
                value: { status: 422, message: 'Invalid password.' },
              },
            },
          },
        },
      },
      {
        status: 400,
        description: 'Bad Request (e.g., missing fields, invalid format)',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'number', example: 400 },
            message: { type: 'string', example: 'Invalid request data.' },
          },
        },
      },
    ],
  },
  signUp: {
    summary: 'User Registration',

    body: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'John' },
        email: { type: 'string', example: 'johndoe@example.com' },
        password: { type: 'string', example: 'StrongPass@123' },
        roleId: {
          type: 'number',
          example: 1,
          description: '1 = User, 2 = Teacher, 3= Manager, 4 = Admin',
        }, // Optional role ID
      },
      required: ['username', 'email', 'password'],
    },

    responsesArr: [
      {
        status: 200,
        description: 'User created successfully',
        content: {
          'application/json': {
            example: {
              status: 200,
              message:
                'User created successfully. Please verify your email before logging in.',
              user: {
                id: 1,
                email: 'johndoe@example.com',
                username: 'John',
                status: false,
                role: {
                  id: 1,
                  name: 'User',
                },
              },
            },
          },
        },
      },
      {
        status: 409,
        description: 'Conflict - Email already exists',
        content: {
          'application/json': {
            example: {
              status: 409,
              message: 'Email already exists.',
            },
          },
        },
      },
      {
        status: 400,
        description: 'Bad Request - Invalid input',
        content: {
          'application/json': {
            examples: {
              invalidEmail: {
                summary: 'Invalid Email Format',
                value: { status: 400, message: 'Invalid email format.' },
              },
              missingFields: {
                summary: 'Missing Required Fields',
                value: {
                  status: 400,
                  message:
                    'firstName, lastName, email, and password are required.',
                },
              },
            },
          },
        },
      },
    ],
  },
  forgetPasswordSendEmail: {
    summary: 'Forgot Password - Send Reset Email',

    body: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'johndoe@example.com' },
      },
      required: ['email'],
    },

    responsesArr: [
      {
        status: 200,
        description: 'Password reset email sent successfully',
        content: {
          'application/json': {
            example: {
              status: 200,
              message:
                'Reset password request sent successfully. Please check your email box.',
            },
          },
        },
      },
      {
        status: 422,
        description: 'Unprocessable Entity - User not found',
        content: {
          'application/json': {
            example: {
              status: 422,
              message: 'User not found.',
            },
          },
        },
      },
      {
        status: 400,
        description: 'Bad Request - Invalid input',
        content: {
          'application/json': {
            examples: {
              invalidEmail: {
                summary: 'Invalid Email Format',
                value: { status: 400, message: 'Invalid email format.' },
              },
              missingEmail: {
                summary: 'Email Field Required',
                value: { status: 400, message: 'Email is required.' },
              },
            },
          },
        },
      },
    ],
  },
  emailVerification: {
    summary: 'Email Verification',

    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'User ID',
        schema: {
          type: 'string',
          example: '2',
        },
      },
    ],

    responsesArr: [
      {
        status: 200,
        description: 'Email verification successful',
        content: {
          'application/json': {
            example: {
              status: 200,
              message: 'Email is verified successfully.',
            },
          },
        },
      },
      {
        status: 404,
        description: 'User not found',
        content: {
          'application/json': {
            example: {
              status: 404,
              message: 'User not found.',
            },
          },
        },
      },
      {
        status: 400,
        description: 'Bad Request - Invalid ID',
        content: {
          'application/json': {
            examples: {
              invalidId: {
                summary: 'Invalid ID Format',
                value: { status: 400, message: 'Invalid user ID format.' },
              },
              missingId: {
                summary: 'ID is required',
                value: { status: 400, message: 'User ID is required.' },
              },
            },
          },
        },
      },
    ],
  },
  createNewPassword: {
    summary: 'Create New Password',

    body: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsIn...' },
        password: { type: 'string', example: 'NewSecurePassword123!' },
      },
      required: ['token', 'password'],
    },

    responsesArr: [
      {
        status: 200,
        description: 'Password updated successfully',
        content: {
          'application/json': {
            example: {
              status: 200,
              message: 'Password updated successfully.',
            },
          },
        },
      },
      {
        status: 400,
        description: 'Invalid or Expired Token',
        content: {
          'application/json': {
            examples: {
              expiredToken: {
                summary: 'Token Expired',
                value: {
                  status: 400,
                  message: 'Token has expired. Please request a new one.',
                },
              },
              invalidToken: {
                summary: 'Invalid Token',
                value: {
                  status: 400,
                  message: 'Invalid token or other error occurred.',
                },
              },
            },
          },
        },
      },
      {
        status: 404,
        description: 'User not found',
        content: {
          'application/json': {
            example: {
              status: 404,
              message: 'User not found.',
            },
          },
        },
      },
      {
        status: 422,
        description: 'Password validation failed',
        content: {
          'application/json': {
            example: {
              status: 422,
              message: 'Password must be at least 8 characters long.',
            },
          },
        },
      },
    ],
  },
  changePassword: {
    summary: 'Change Password (Authenticated User)',

    body: {
      type: 'object',
      properties: {
        oldPassword: { type: 'string', example: 'OldSecurePassword!' },
        newPassword: { type: 'string', example: 'NewSecurePassword123!' },
      },
      required: ['oldPassword', 'newPassword'],
    },

    responsesArr: [
      {
        status: 200,
        description: 'Password updated successfully',
        content: {
          'application/json': {
            example: {
              status: 200,
              message: 'Password updated successfully.',
            },
          },
        },
      },
      {
        status: 400,
        description: 'Bad Request',
        content: {
          'application/json': {
            example: {
              status: 400,
              message: 'New password must be at least 8 characters long.',
            },
          },
        },
      },
      {
        status: 401,
        description: 'Unauthorized',
        content: {
          'application/json': {
            example: {
              status: 401,
              message: 'Unauthorized request. Please log in again.',
            },
          },
        },
      },
      {
        status: 404,
        description: 'User Not Found',
        content: {
          'application/json': {
            example: {
              status: 404,
              message: 'User not found.',
            },
          },
        },
      },
      {
        status: 422,
        description: 'Invalid Old Password',
        content: {
          'application/json': {
            example: {
              status: 422,
              message: 'Invalid password.',
            },
          },
        },
      },
    ],
  },
  getUsers: {
    summary: 'Get All Users',
    responsesArr: [
      {
        status: 200,
        description: 'Successfully retrieved users list',
        content: {
          'application/json': {
            example: {
              status: 200,
              users: [
                {
                  id: 1,
                  fName: 'John',
                  lName: 'Doe',
                  email: 'john.doe@example.com',
                  gender: 'Male',
                  dob: '1990-05-15',
                  status: true,
                  role: { name: 'Admin', permissions: ['READ', 'WRITE'] },
                },
                {
                  id: 2,
                  fName: 'Jane',
                  lName: 'Smith',
                  email: 'jane.smith@example.com',
                  gender: 'Female',
                  dob: '1992-08-20',
                  status: true,
                  role: { name: 'User', permissions: ['READ'] },
                },
              ],
            },
          },
        },
      },
      {
        status: 500,
        description: 'Internal Server Error',
        content: {
          'application/json': {
            example: {
              status: 500,
              message: 'An unexpected error occurred.',
            },
          },
        },
      },
    ],
  },
};
