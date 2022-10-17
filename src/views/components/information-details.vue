<template>
  <div>
    <div class="myTable">
      <table class="customTable">
        <tbody>
          <tr>
            <td><div class="title">姓名</div></td>
            <td colspan="2">戴芳</td>
            <td><div class="title">性别</div></td>
            <td colspan="2">男</td>
            <td rowspan="3" class="photo-wrap"><el-image
              style="width: 120px; height: auto"
              :src="imageUrl"
              fit="fill"
            /></td>
          </tr>
          <tr>
            <td><div class="title">学历</div></td>
            <td colspan="2">硕士</td>
            <td><div class="title">职称</div></td>
            <td colspan="2">教授（正高）</td>
          </tr>
          <tr>
            <td><div class="title">专业类别</div></td>
            <td colspan="2">管理类 中小学教育</td>
            <td><div class="title">编制情况</div></td>
            <td colspan="2">教师编制</td>
          </tr>
          <tr>
            <td><div class="title">任教学段</div></td>
            <td colspan="3">小学</td>
            <td><div class="title">任教学科</div></td>
            <td colspan="2">数学</td>
          </tr>
          <tr>
            <td><div class="title">身份证号</div></td>
            <td colspan="3">804479200409157158</td>
            <td><div class="title">邮箱地址</div></td>
            <td colspan="2">n3--2@pixso.cn</td>
          </tr>
          <tr>
            <td><div class="title">工作单位及职务</div></td>
            <td colspan="3">上海市师资培训中心</td>
            <td><div class="title">手机号码</div></td>
            <td colspan="2">14767232383 </td>
          </tr>
          <tr>
            <td><div class="title">通讯地址</div></td>
            <td colspan="3">湖南省张家界市永定区后坪镇396号105室</td>
            <td><div class="title">邮政编码</div></td>
            <td colspan="2">121287</td>
          </tr>
          <tr>
            <td colspan="2"><div class="title">督学资格证书编号</div></td>
            <td colspan="3">202207024</td>
            <td colspan="2" rowspan="2"><el-image
              style="width: 80px; height: auto"
              :src="qrcodeUrl"
              fit="fill"
            /></td>
          </tr>
          <tr>
            <td colspan="2"><div class="title">首次注册时间</div></td>
            <td colspan="3">2021-09-26</td>
          </tr>
          <tr>
            <td><div class="text-vertical title">任职经历</div></td>
            <td colspan="6">
              <div class="experience-wrap">
                <p>2004-09-01 至 2018-06-01 上海市黄浦区教育学院德育研究部德研员、干训部研究员</p>
                <p>2013-03-01 至 2014-08-01 黄浦区教育局德体卫艺科挂职德育干部</p>
                <p>2018-07-01 至 2022-06-09 上海市师资培训中心德育与师德研究部副主任</p>
              </div>
            </td>
          </tr>
          <tr>
            <td><div class="text-vertical title">获奖情况</div></td>
            <td colspan="6">
              <div class="td-text-left">
                连续三届（2006年——2008、2009——2011、2012年——2014）获得“上海市学校心理健康教育先进个人”荣誉称号，2010年论文《中小学“温馨教室”幸福指数的实践研究》获第五届上海市中小幼心理健康教育优秀科研成果一等奖，2012年案例《家庭会诊---帮助学生的艺术》被评为上海市中小学学科德育优秀成果征集评选活动“浸润与成长”育人案例征集评选活动一等奖，2013年获黄浦区工人先锋号劳动竞赛先进个人，2014年上海市第三期“普教系统名校长名师培养工程”教心基地优秀学员，2017年市共享课程《教师心理成长工作坊》在“上海市基础教育教师培训课程展评活动”精品课程展示交流暨颁奖活动中获得“
              </div>
            </td>
          </tr>
          <tr>
            <td><div class="text-vertical title">发表的论文或从事课题研究的内容</div></td>
            <td colspan="6">
              <div class="td-text-left">
                <p>自2009年起至2014年，在《上海中学生报》心理专版开设专栏“心理卡片”和“心灵速度机”（全年连载，每周一则），累计发表专栏文章120多篇。</p>

                <p>2012年，参与上海市教委主编、上海教育出版社出版的中小学心理学科教材《心理健康自助手册》的编写，独立撰写第五模块《寻找金苹果》。</p>

                <p>2012年，论文《家庭会诊：拓宽育人的环境》发表于核心期刊《思想理论教育》11月刊。</p>

                <p>2013年，《心灵成长你我相伴——黄浦区校园心理剧展演纪实》发表于《中小学心理健康》2013/17。</p>

                <p>2013年，特约稿《高考前学几招“考子兵法”》刊登于《新闻晚报》5月23日B16版。</p>

                <p>2014年，特约稿《高考心理减压与自我调节》刊登于《文汇报》5月30日第十版。</p>

                <p>2021年《中小学艺术育德一体化建设的目标序列研究研究报告》</p>

              </div>
            </td>
          </tr>
          <tr>
            <td><div class="text-vertical title">区教育督导室初审意见</div></td>
            <td colspan="6">
              <div class="td-text-left">
                <p>1.曾参加的教育督导活动（时间、地点、督导活动名称）</p>

                <div>（1）2020年9月起担任松江区专职督学并任立达中学、松江四中的责任督学；<br>
                  （2）2020年10月至11月松江区2020年学区化集团化办学调研式督导<br>
                  （3）2021年03月至04月松江区义务教育阶段公办学校发展规划（2016--2021）实施终结性督导评估。</div>

                <p> 2.是否同意申报：同意</p>

                <div class="autograph">（单位盖章）负责人签名：夏长来<br>

                  <p class="date">2021 年5月6日</p></div>
              </div>
            </td>
          </tr>
          <tr>
            <td><div class="text-vertical title">区教育督导室复检意见</div></td>
            <td>
              <!-- <div class="success">通过</div> -->
              <div class="error">不通过</div>
            </td>
            <td colspan="5">
              <div class="td-text-left">
                <p> 是否同意复检：不同意</p>

                <div class="autograph">负责人签名：夏长来<br>

                  <p class="date2">2021 年5月6日</p></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InformationDetails',
  components: { },
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
  // .myTable {
  //   width: 940px;
  //   margin: 0 auto;
  // }
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
