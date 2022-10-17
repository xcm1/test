<template>
  <div v-loading="loading" class="errPage-container" />
</template>

<script>
import { setToken, setUserIsRegister, setSumUserRoleId } from '@/utils/auth'
import { thirdLogin } from '@/api/train'

export default {
  name: 'Page',
  data() {
    return {
      code: this.$route.query.code,
      url: 'http://zsjhbz.shedu.net.cn/callback',
      loading: true
    }
  },
  created() {
    this.thirdLogin()
  },
  methods: {
    thirdLogin() {
      const params = {
        code: this.code,
        redirectUri: this.url
      }
      thirdLogin(params).then(res => {
        this.loading = false
        const reslut = res.data
        const token = res.data.token
        if (res.code === 200) {
          setToken(token)
          setUserIsRegister(reslut.sysSumUserIsRegister)
          setSumUserRoleId(reslut.sysSumUserRoleId)
          if (reslut.sysSumUserIsRegister === '0') {
            this.$router.push({
              path: '/registe/index',
              query: {
                id: '1'
              }
            })
          } else if (reslut.sysSumUserIsRegister === '1') {
            if (reslut.sysSumUserRoleId === '1' || reslut.sysSumUserRoleId === '3' || reslut.sysSumUserRoleId === '4') {
              this.$router.push({
                path: '/dashboard',
                query: {
                  id: '1'
                }
              })
            } else if (reslut.sysSumUserRoleId === '2') {
              this.$router.push({
                path: '/dashboard',
                query: {
                  id: '2'
                }
              })
            }
          }
        } else {
          setToken('')
          setUserIsRegister('')
          setSumUserRoleId('')
          window.location.href = 'https://mobile.cloud.sh.edu.cn/oauth/v1/login?response_type=code&client_id=0822e44173ff484f&state=xyz&redirect_uri=https://mobile.cloud.sh.edu.cn/idp/Authn/External?conversation=e1s2'
        }
      })
    }
  }
}
</script>
