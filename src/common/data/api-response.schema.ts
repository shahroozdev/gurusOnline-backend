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
  registerLead: {
    summary: 'Register a new lead',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          example: {
            fullName: 'Ahmed Ali',
            country: 'Pakistan',
            email: 'ahmed.ali@example.com',
            teamId: 'TEAM123',
            phoneNumber: '+923001234567',
            residenceNumber: '021-1234567',
            preferedTime: 'e.g Wed 2-3, Thur 3-4',
            purpose: 'Interested in course enrollment',
          },
        },
      },
    },
    responsesArr: [
      {
        status: 201,
        description: 'Lead registered successfully',
        content: {
          'application/json': {
            example: {
              status: 201,
              message: 'Lead registered successfully',
            },
          },
        },
      },
      {
        status: 409,
        description:
          'Unique constraint violation (email or teamId already exists)',
        content: {
          'application/json': {
            example: {
              status: 409,
              message:
                'A unique constraint violation occurred on field(s): email. Please check your input and try again.',
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
              message:
                'An error occurred. Please try again. Error: [error message]',
            },
          },
        },
      },
    ],
  },
  allLeads: {
    summary: 'Get All Student Leads',
    responsesArr: [
      {
        status: 200,
        description: 'Successfully retrieved all student leads',
        content: {
          'application/json': {
            example: {
              status: 200,
              message: 'All Students Leads List',
              students: [
                {
                  id: 1,
                  fullName: 'Ahmed Ali',
                  country: 'Pakistan',
                  email: 'ahmed.ali@example.com',
                  teamId: 'TEAM123',
                  phoneNumber: '+923001234567',
                  residenceNumber: '021-1234567',
                  purpose: 'Interested in course enrollment',
                  status: true,
                  createdAt: '2025-04-14T10:00:00.000Z',
                  updated_at: '2025-04-14T10:00:00.000Z',
                },
                {
                  id: 2,
                  fullName: 'Sara Khan',
                  country: 'UAE',
                  email: 'sara.khan@example.com',
                  teamId: 'TEAM456',
                  phoneNumber: '+971501234567',
                  residenceNumber: '04-1234567',
                  purpose: 'Looking for consultation',
                  status: true,
                  createdAt: '2025-04-13T09:30:00.000Z',
                  updated_at: '2025-04-13T09:30:00.000Z',
                },
              ],
            },
          },
        },
      },
      {
        status: 404,
        description: 'No student leads found',
        content: {
          'application/json': {
            example: {
              status: 404,
              message: 'Students Leads not found',
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
  leadById: {
    summary: 'Get Student Lead by ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'ID of the student lead to retrieve',
        schema: { type: 'integer', example: 1 },
      },
    ],
    responsesArr: [
      {
        status: 200,
        description: 'Successfully retrieved student lead',
        content: {
          'application/json': {
            example: {
              status: 200,
              message: 'Students fetch successfully',
              students: {
                id: 1,
                fullName: 'Ahmed Ali',
                country: 'Pakistan',
                email: 'ahmed.ali@example.com',
                teamId: 'TEAM123',
                phoneNumber: '+923001234567',
                residenceNumber: '021-1234567',
                purpose: 'Interested in course enrollment',
                status: true,
                createdAt: '2025-04-14T10:00:00.000Z',
                updated_at: '2025-04-14T10:00:00.000Z',
              },
            },
          },
        },
      },
      {
        status: 404,
        description: 'Student lead not found',
        content: {
          'application/json': {
            example: {
              status: 404,
              message: 'Student not found',
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
  registerTeacher: {
    summary: 'Register a new teacher',
    body: {
      type: 'object',
      properties: {
        fullName: { type: 'string', example: 'Ayesha Khan' },
        email: { type: 'string', example: 'ayesha.khan@example.com' },
        teamsId: { type: 'string', example: 'TEAM456' },
        phone: {
          type: 'string',
          example: '+923001234568',
          description: 'Optional phone number, 10-15 digits',
        },
        courses: {
          type: 'array',
          items: { type: 'string', example: '101' },
          example: ['101', '102'],
          description: 'At least one course ID must be provided',
        },
        gender: {
          type: 'string',
          enum: ['male', 'female', 'other'],
          example: 'female',
        },
        dob: {
          type: 'string',
          format: 'date',
          example: '1990-05-10',
        },
        password: {
          type: 'string',
          example: 'Secure@123',
          description:
            'Must be at least 8 characters long and include uppercase, lowercase, and special character',
        },
      },
      required: [
        'fullName',
        'email',
        'teamsId',
        'courses',
        'gender',
        'dob',
        'password',
      ],
    },
    requestBody: {
      required: true,
      content: {
        'application/json': {
          example: {
            fullName: 'Ayesha Khan',
            email: 'ayesha.khan@example.com',
            teamsId: 'TEAM456',
            phone: '+923001234568',
            courses: ['101', '102'],
            gender: 'female',
            dob: '1990-05-10',
            password: 'Secure@123',
          },
        },
      },
    },
    responsesArr: [
      {
        status: 200,
        description: 'Teacher registered successfully',
        content: {
          'application/json': {
            example: {
              status: 200,
              message: 'Teacher registered successfully',
            },
          },
        },
      },
      {
        status: 400,
        description: 'Bad request. Email or Teams ID already in use.',
        content: {
          'application/json': {
            example: {
              status: 400,
              message: 'Email or Teams ID already in use',
            },
          },
        },
      },
      {
        status: 409,
        description:
          'Unique constraint violation (email or teamsId already exists)',
        content: {
          'application/json': {
            example: {
              status: 409,
              message:
                'A unique constraint violation occurred on field(s): email. Please check your input and try again.',
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
              message:
                'An error occurred. Please try again. Error: [error message]',
            },
          },
        },
      },
    ],
  },
  
};
