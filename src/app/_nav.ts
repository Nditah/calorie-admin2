export const navItems = [
  { name: 'Dashboard', url: '/dashboard', icon: 'icon-speedometer', badge: { variant: 'info', text: 'NEW' } },
  { name: 'Exercise', url: '/exercise', icon: 'icon-bell' },
  { name: 'Food', url: '/food', icon: 'icon-calculator' },
  { name: 'Image', url: '/image', icon: 'icon-star' },
  { name: 'Activity Log', url: '/log', icon: 'icon-calculator' },
  { name: 'Feedback', url: '/feedback', icon: 'icon-calculator' },
  { name: 'Setting', url: '/setting', icon: 'icon-calculator' },
  { name: 'User', url: '/user', icon: 'icon-calculator' },
  { divider: true },

  { title: true, name: 'Extras' },
  {
    name: 'Pages', url: '/pages', icon: 'icon-star',
    children: [
      { name: 'Login', url: '/login', icon: 'icon-star' },
      { name: 'Register', url: '/register', icon: 'icon-star' },
      { name: 'Error 404', url: '/404', icon: 'icon-star' },
      { name: 'Error 500', url: '/500', icon: 'icon-star' }
    ]
  },
  {
    name: 'Download App',
    url: 'http://calorie-app.herokuapp.com/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'API Doc',
    url: 'http://calorie-api.herokuapp.com/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];
