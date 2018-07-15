export default{
  header: {
    visible: true,
    height: 60,
    navbar: {
      visible: true,
      height: 60,
      user: {
        visible: true,
        avatar: {
          visible: true,
          value: 'https://avatars3.githubusercontent.com/u/21699459?s=460&v=4'
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
        preDefineColors: [
          '#409EFF',
          '#FF0000'
        ]
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
    sidebar: {
      visible: true,
      maxWidth: 200,
      minWidth: 36,
      textColor: '#fff',
      activeTextColor: '#ffd04b',
      backgroundColor: '#304156'
    },
    logo: {
      visible: true,
      height: 100,
      image: '../../static/logo.png',
      backgroundColor: 'transparent'
    }
  },
  footer: {
    visible: true,
    color: '',
    backgroundColor: 'transparent',
    height: 60
  },
  app: {
    defaultColor: '#409EFF'
  }
}
