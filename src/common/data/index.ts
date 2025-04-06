export const rolesList = [
  { name: 'student' },
  { name: 'teacher' },
  { name: 'manager' },
  { name: 'admin' },
];

export const users = [
  {
    email: 'student@test.com',
    username: 'student',
    hash: '!234Abcd',
    roleId: 1,
  },
  {
    email: 'teacher@test.com',
    username: 'teacher',
    hash: '!234Abcd',
    roleId: 2,
  },
  {
    email: 'manager@test.com',
    username: 'manager',
    hash: '!234Abcd',
    roleId: 3,
  },
  {
    email: 'admin@test.com',
    username: 'admin',
    hash: '!234Abcd',
    roleId: 4,
  },
];

export const courses = [
  {
    title: 'International Baccalaureate',
    slug: 'intro-web-dev',
    desc: 'IB is a challenging, globally recognized program of study that prepares students for university and life beyond.',
    image: '/uploads/1.png',
  },
  {
    title: 'International General Certificate of Secondary Education (IGCSE)',
    slug: 'data-science-python',
    desc: 'IGCSE is a high school qualification that prepares students for further study at the university level. ',
    image: '/uploads/2.png',
  },
  {
    title: 'Youth Chinese Test (YCT)',
    slug: 'mobile-app-dev',
    desc: 'A standardized test of Chinese language proficiency for non-native speakers. It may also refer to YCT Global, a company that sells tapes and cutting rules. ',
    image: '/uploads/3.png',
  },
];
