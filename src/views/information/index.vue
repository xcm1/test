<template>
  <div class="app-container page-container">
    <div class="myTable">
      <information-details />
    </div>
  </div>
</template>

<script>
import InformationDetails from '../components/information-details.vue'
export default {
  name: 'Information',
  components: { InformationDetails },
  data() {
    return {
      info: '',
      imageUrl: require('@/assets/images/photo.png'),
      qrcodeUrl: require('@/assets/images/qrcode.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #fff;
  min-height: 100%;
  .myTable {
    width: 940px;
    margin: 0 auto;
  }
  // 签名
  .autograph {
    padding-left: 300px;
    .date {
      padding-left: 80px;
    }
    .date2 {
      padding-left: 20px;
    }
  }
  .photo-wrap {
    font-size: 0px;
    padding: 0;
    width: 120px;
  }
  .experience-wrap {
    text-align: left;
    padding-left:100px;
  }
  .success {
    color: rgb(19, 206, 102);
  }
  .error {
    color: rgb(255, 0, 0);
  }

}
</style>
