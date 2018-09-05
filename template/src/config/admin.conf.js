export default{
  header: {
    visible: true,
    height: 40,
    navbar: {
      visible: true,
      height: 40,
      user: {
        visible: true,
        avatar: {
          visible: true,
          value: ''
        },
        name: {
          visible: true,
          value: ''
        }
      },
      screenfull: {
        visible: true,
        i18n: 'navbar.screenfull',
        value: ''
      },
      logout: {
        visible: true,
        i18n: 'navbar.logOut',
        value: ''
      },
      language: {
        visible: true,
        i18n: 'navbar.language',
        value: ''
      },
      settings: {
        visible: true,
        i18n: 'navbar.settings',
        value: ''
      },
      theme: {
        visible: true,
        i18n: 'navbar.theme',
        value: '',
        preDefineColors: '#409EFF,#FF0000,#066C3B'
      }
    },
    tagsView: {
      visible: true,
      height: 34,
      'activeColor': ''
    }
  },
  aside: {
    visible: true,
    state: 2,
    maxWidth: 180,
    minWidth: 36,
    sidebar: {
      visible: true,
      textColor: '#fff',
      activeTextColor: '#ffd04b',
      backgroundColor: '#304156'
    },
    logo: {
      visible: true,
      height: 75,
      image: '../../static/logo.png',
      backgroundColor: 'transparent'
    }
  },
  footer: {
    visible: true,
    color: '',
    backgroundColor: 'transparent',
    height: 30
  },
  app: {
    defaultColor: '#409EFF'
  }
}
