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
            value: 'http://www.didihu.com.cn/ddhpc/images/footer_logo.png'
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
          preDefineColors: '#409EFF,#FF0000'
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
      maxWidth: 200,
      minWidth: 36,
      sidebar: {
        visible: true,
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
      height: 30
    },
    app: {
      defaultColor: '#409EFF',
      axios: {
        baseURL: 'http://192.168.3.171:7300/mock/5b0ed7dbf189006180803286/standard',
        'whiteList': ['user/login', 'user/info', 'user/logout', 'user/getInfo'],
        'timeout': 15000
      }
    }
  }
  