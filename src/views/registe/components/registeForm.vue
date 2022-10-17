<template>
  <div class="registe-container">
    <div class="form-wrap myTable">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <table class="customTable">
          <tbody>
            <tr>
              <td class="td-width-01">
                <el-image
                  style="width: 120px; height: 160px"
                  :src="imageUrl"
                  fit="fill"
                />
              </td>
              <td colspan="3" class="td-width-auto">
                <div class="table-photo-wrap">
                  <div class="left">
                    提供6个月内拍摄的正面免冠彩色相片，要求人像清晰，表情自然。<br>
                    要求相片背景为纯白色。<br>
                    文件大小介于1MB左右。<br>
                    分辨率300dpi<br>
                    宽：600px<br>
                    高：800px
                  </div>
                  <div class="right">
                    <el-button type="primary" @click="imagecropperShow=true"><i class="el-icon-upload el-icon--right" />上传照片</el-button>
                  </div>

                </div>

              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">姓名<span class="required">*</span></div></td>
              <td class="td-width-auto">
                <div class="input">
                  <el-form-item prop="sysUserName" style="margin-bottom: 0px">
                    <el-input
                      v-model="ruleForm.sysUserName"
                      placeholder="请输入内容"
                      clearable
                    />
                  </el-form-item>
                </div>
              </td>
              <td class="td-width-03"><div class="title">身份证号<span class="required">*</span></div></td>
              <td class="td-width-auto">
                <div class="input">
                  <!-- <el-input
                    v-model="ruleForm.sysUserIdentity"
                    placeholder="请输入内容"
                    clearable
                  /> -->
                  <el-form-item prop="sysUserIdentity" style="margin-bottom: 0px">
                    <el-input
                      v-model="ruleForm.sysUserIdentity"
                      placeholder="请输入内容"
                      clearable
                    />
                  </el-form-item>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">性别<span class="required">*</span></div></td>
              <td class="td-width-auto">
                <div class="input">
                  <el-form-item prop="sysUserSex" style="margin-bottom: 0px">
                    <el-radio-group v-model="ruleForm.sysUserSex">
                      <el-radio label="男" />
                      <el-radio label="女" />
                    </el-radio-group>
                  </el-form-item>
                </div>
              </td>
              <td class="td-width-03"><div class="title">手机号<span class="required">*</span></div></td>
              <td class="td-width-auto">
                <div class="input">
                  <el-form-item prop="sysUserPhone" style="margin-bottom: 0px">
                    <el-input
                      v-model="ruleForm.sysUserPhone"
                      placeholder="请输入内容"
                      clearable
                    />
                  </el-form-item>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">工作所属区域</div></td>
              <td class="td-width-auto">
                <div class="input align-left">
                  <el-select v-model="ruleForm.sysUserJobCounty" placeholder="请选择所属区域">
                    <el-option v-for="item in regionList" :key="item.sysRegionId" :label="item.sysRegionName" :value="item.sysRegionId" />

                  </el-select>
                </div>
              </td>
              <td class="td-width-03"><div class="title">学历<span class="required">*</span></div></td>
              <td class="td-width-auto">
                <div class="input align-left">
                  <el-form-item prop="sysUserEducation" style="margin-bottom: 0px">
                    <el-select v-model="ruleForm.sysUserEducation" placeholder="请选择学历">
                      <el-option v-for="item in educationList" :key="item.sysEducationalId" :label="item.sysEducationalName" :value="item.sysEducationalId" />
                    </el-select>
                  </el-form-item>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">执教学科</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">
                  <el-select v-model="ruleForm.sysTeachingPid" placeholder="请选择学段" @change="changeSysTeachingPid">
                    <el-option v-for="item in jobTeachingSectionList" :key="item.sysTeachingSectionId" :label="item.sysTeachingSectionName" :value="item.sysTeachingSectionId" />

                  </el-select>
                  <div v-for="item in jobTeachingSectionList" :key="item.sysTeachingSectionId">
                    <div v-if="item.sysJobTeachingSections.length > 0">
                      <div v-if="ruleForm.sysTeachingPid==item.sysJobTeachingSections[0].sysTeachingSectionPid">
                        <el-checkbox-group v-model="sysJobTeachingCheckList" style="width:100%">
                          <el-row style="width:100%">
                            <el-col v-for="item2 in item.sysJobTeachingSections" :key="item2.sysTeachingSectionId" :span="8" class="radio-padding"><el-checkbox :label="item2.sysTeachingSectionId">{{ item2.sysTeachingSectionName }}</el-checkbox></el-col>
                          </el-row>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </div>

                  <!-- <div v-if="ruleForm.discipline==='小学'" style="padding-top:10px">
                    <el-checkbox-group v-model="checkList" style="width:100%">
                      <el-row style="width:100%">
                        <el-col :span="8" class="radio-padding"><el-checkbox label="语文" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="数学" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="外语" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="自然" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="品德与社会" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="唱游/音乐" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="美术" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="体育与健身" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="信息科技" /></el-col>
                        <el-col :span="8" class="radio-padding"><el-checkbox label="劳动技术" /></el-col>
                      </el-row>
                    </el-checkbox-group>
                  </div> -->
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">工作性质<span class="required">*</span></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">
                  <el-form-item prop="sysUserNature" style="margin-bottom: 0px">
                    <el-radio-group v-model="ruleForm.sysUserNature" style="width:100%">
                      <el-row style="width:100%">
                        <el-col :span="8" class="radio-padding"><el-radio :label="1">在职</el-radio></el-col>
                        <el-col :span="8" class="radio-padding"><el-radio :label="0">退休</el-radio></el-col>
                      </el-row>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">职称[单选]</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">
                  <el-radio-group v-model="ruleForm.sysUserProfessional" style="width:100%">
                    <el-row style="width:100%">
                      <el-col v-for="item in jobTitleList" :key="item.sysJobTitleId" :span="8" class="radio-padding"><el-radio :label="item.sysJobTitleId">{{ item.sysJobTitleName }}</el-radio></el-col>
                    </el-row>
                  </el-radio-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">编制情况[单选]</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">
                  <el-radio-group v-model="ruleForm.sysUserAuthorized" style="width:100%">
                    <el-row style="width:100%">
                      <el-col v-for="item in compilingList" :key="item.sysCompilingId" :span="8" class="radio-padding"><el-radio :label="item.sysCompilingId">{{ item.sysCompilingName }}</el-radio></el-col>
                    </el-row>
                  </el-radio-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">其他荣誉</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="ruleForm.sysUserElseHonors" style="width:100%">
                    <el-row style="width:100%">
                      <el-col v-for="item in otherHonorsList" :key="item.sysOtherHonorsId" :span="8" class="radio-padding"><el-checkbox :label="item.sysOtherHonorsId" name="type">{{ item.sysOtherHonorsName }}</el-checkbox></el-col>
                      <!-- <el-col :span="8" class="radio-padding"><el-checkbox label="特级校（园）长" name="type" /></el-col> -->
                    </el-row>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">其他专技</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-input
                    v-model="ruleForm.sysUserElseSpeciality"
                    placeholder="多个用逗号分开"
                    clearable
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">工作单位<span class="required">*</span></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-form-item prop="sysUserOrganization" style="margin-bottom: 0px">
                    <el-input
                      v-model="ruleForm.sysUserOrganization"
                      placeholder="退休人员请填写原单位"
                      clearable
                    />
                  </el-form-item>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">职务</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-input
                    v-model="ruleForm.sysUserPosition"
                    placeholder="请填写职务"
                    clearable
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">师训号</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-input
                    v-model="ruleForm.sysUserQualifications"
                    placeholder=""
                    clearable
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">督学类别<span class="required">*</span></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">
                  <el-form-item prop="sysSupervisionPid" style="margin-bottom: 0px">
                    <el-radio-group v-model="ruleForm.sysSupervisionPid" style="width:100%">
                      <el-row style="width:100%">
                        <el-col v-for="item in superintendentList" :key="item.sysSupervisionClassId" :span="8" class="radio-padding" style="height:60px; line-height:60px">
                          <el-radio :label="item.sysSupervisionClassId">{{ item.sysSupervisionClassName }}</el-radio>

                          <el-select v-if="item.sysSupervisionClasses.length > 0" v-model="ruleForm.sysUserEducationalCategoryId" placeholder="请选择兼职类型" style="width: 150px;">
                            <el-option v-for="item2 in item.sysSupervisionClasses" :key="item2.sysSupervisionClassId" :label="item2.sysSupervisionClassName" :value="item2.sysSupervisionClassId" />

                          </el-select>

                        </el-col>
                      <!-- <el-col :span="8" class="radio-padding"><el-radio label="专职" style="height:36px; padding-top: 10px;" /></el-col>
                      <el-col :span="8" class="radio-padding">
                        <el-radio label="兼职" />
                        <el-select v-model="ruleForm.pluralism" placeholder="请选择兼职类型" style="width: 150px;">
                          <el-option v-for="item in pluralismList" :key="item.value" :label="item.label" :value="item.value" />

                        </el-select>
                      </el-col>
                      <el-col :span="8" class="radio-padding"><el-radio label="未聘任" style="height:36px; padding-top: 10px;" /></el-col> -->
                      </el-row>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">邮箱Email<span class="required">*</span></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-form-item prop="sysUserMailbox" style="margin-bottom: 0px">
                    <el-input
                      v-model="ruleForm.sysUserMailbox"
                      placeholder=""
                      clearable
                    />
                  </el-form-item>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">通讯地址<span class="required">*</span></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-row style="width:100%; padding-bottom:10px">
                    <el-col :span="8" style="text-align:left">
                      <el-form-item
                        :prop="'sysUserTxdzs.sysUserTxdzPid'"
                        :rules="[
                          { type: 'number', required: true, message: '请选择', trigger: 'change' }
                        ]"
                        style="margin-bottom: 10px"
                      >
                        <el-select v-model="ruleForm.sysUserTxdzs.sysUserTxdzPid" placeholder="请选择市">
                          <el-option label="上海" :value="1" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :prop="'sysUserTxdzs.sysRegionId'"
                        style="margin-bottom: 10px"
                      >
                        <el-select v-model="ruleForm.sysUserTxdzs.sysRegionId" placeholder="请选择区">
                          <el-option v-for="item in regionList" :key="item.sysRegionId" :label="item.sysRegionName" :value="item.sysRegionId" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" style="text-align:right; display:flex">
                      <span style="padding-right:20px; line-height: 36px;" class="title">邮政编码</span>
                      <el-form-item
                        :prop="'sysUserTxdzs.sysUserTxdzYzbm'"
                        style="margin-bottom: 10px; width: 150px"
                      >
                        <el-input
                          v-model="ruleForm.sysUserTxdzs.sysUserTxdzYzbm"
                          placeholder="请输入邮政编码"
                          clearable
                          style="width: 150px"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="width:100%">
                    <el-form-item
                      :prop="'sysUserTxdzs.sysUserTxdzXxdz'"
                      style="margin-bottom: 10px"
                    >
                      <el-input
                        v-model="ruleForm.sysUserTxdzs.sysUserTxdzXxdz"
                        placeholder="请输入通讯地址"
                        clearable
                      />
                    </el-form-item>
                  </el-row>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">家庭地址</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-row style="width:100%; padding-bottom:10px">
                    <el-col :span="8" style="text-align:left">
                      <el-select v-model="ruleForm.sysUserJtdzs.sysUserJtdzPid" placeholder="请选择市">
                        <el-option label="上海" :value="1" />
                      </el-select>
                    </el-col>
                    <el-col :span="8">
                      <el-select v-model="ruleForm.sysUserJtdzs.sysRegionId" placeholder="请选择区">
                        <el-option v-for="item in regionList" :key="item.sysRegionId" :label="item.sysRegionName" :value="item.sysRegionId" />
                      </el-select>
                    </el-col>
                    <el-col :span="8" style="text-align:right">
                      <span style="padding-right:20px; line-height: 36px;" class="title">邮政编码</span>
                      <el-input
                        v-model="ruleForm.sysUserJtdzs.sysUserJtdzXxdz"
                        placeholder="请输入邮政编码"
                        clearable
                        style="width: 150px"
                      />
                    </el-col>
                  </el-row>
                  <el-row style="width:100%">
                    <el-input
                      v-model="ruleForm.sysUserJtdzs.sysUserJtdzYzbm"
                      placeholder="请输入家庭地址"
                      clearable
                    />
                  </el-row>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div><el-radio v-model="ruleForm.sysUserMajors.specialtyNum" :label="professionalCategoryList[0].sysProfessionalCategoryId"><span class="title">{{ professionalCategoryList[0].sysProfessionalCategoryName }}</span></el-radio></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">
                  <el-checkbox-group v-model="ruleForm.sysUserMajors.managementClass" style="width:100%" :disabled="ruleForm.sysUserMajors.specialtyNum!==professionalCategoryList[0].sysProfessionalCategoryId">
                    <el-row style="width:100%">
                      <el-col v-for="item in professionalCategoryList[0].sysProfessionalCategories" :key="item.sysProfessionalCategoryId" :span="8" class="radio-padding"><el-checkbox :label="item.sysProfessionalCategoryId">{{ item.sysProfessionalCategoryName }}</el-checkbox></el-col>
                    </el-row>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title"><el-radio v-model="ruleForm.sysUserMajors.specialtyNum" :label="professionalCategoryList[1].sysProfessionalCategoryId"><span class="title">{{ professionalCategoryList[1].sysProfessionalCategoryName }}</span></el-radio></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">

                  <el-select v-model="ruleForm.sysUserMajors.subjectClass" placeholder="请选择学科" :disabled="ruleForm.sysUserMajors.specialtyNum!==professionalCategoryList[1].sysProfessionalCategoryId" @change="changeProfessionalSecondB">
                    <el-option v-for="item in professionalCategoryList[1].sysProfessionalCategories" :key="item.sysProfessionalCategoryId" :label="item.sysProfessionalCategoryName" :value="item.sysProfessionalCategoryId" />

                  </el-select>
                  <div v-for="item in professionalCategoryList[1].sysProfessionalCategories" :key="item.sysProfessionalCategoryId">
                    <div v-if="item.sysProfessionalCategories.length > 0">
                      <div v-if="ruleForm.sysUserMajors.subjectClass==item.sysProfessionalCategories[0].sysProfessionalCategoryPid">
                        <el-checkbox-group v-model="ruleForm.sysUserMajors.subjectClassThree" style="width:100%">
                          <el-row style="width:100%">
                            <el-col v-for="item2 in item.sysProfessionalCategories" :key="item2.sysProfessionalCategoryId" :span="8" class="radio-padding"><el-checkbox :label="item2.sysProfessionalCategoryId">{{ item2.sysProfessionalCategoryName }}</el-checkbox></el-col>
                          </el-row>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </div>
                  <!-- <div v-if="ruleForm.subject==='小学'" style="padding-top:10px">
                    <el-checkbox-group v-model="checkList" style="width:100%">
                      <el-row style="width:100%">
                        <el-col :span="8" class="radio-padding"><el-checkbox label="语文" /></el-col>
                      </el-row>
                    </el-checkbox-group>
                  </div> -->

                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title"><el-radio v-model="ruleForm.sysUserMajors.specialtyNum" :label="professionalCategoryList[2].sysProfessionalCategoryId"><span class="title">{{ professionalCategoryList[2].sysProfessionalCategoryName }}</span></el-radio></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input align-left">

                  <el-checkbox-group v-model="ruleForm.sysUserMajors.safeguardClass" style="width:100%" :disabled="ruleForm.sysUserMajors.specialtyNum!==professionalCategoryList[2].sysProfessionalCategoryId">
                    <el-row style="width:100%">
                      <el-col v-for="item in professionalCategoryList[2].sysProfessionalCategories" :key="item.sysProfessionalCategoryId" :span="8" class="radio-padding"><el-checkbox :label="item.sysProfessionalCategoryId">{{ item.sysProfessionalCategoryName }}</el-checkbox></el-col>
                    </el-row>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">特长</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-input
                    v-model="ruleForm.sysUserElseSkill"
                    placeholder="多个用逗号分开"
                    clearable
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">任职经历<span class="required">*</span></div></td>
              <td colspan="3" class="td-width-auto">
                <div class="job-wrap">
                  <div class="head-text">注：请填写近十年的工作经历，若是退休人员，请填写退休前十年内的工作经历。</div>
                  <table class="customTable">
                    <tbody>
                      <tr
                        v-for="(data, index) in jobData"
                        :key="index"
                      >
                        <td class="job-td-01">{{ index + 1 }}</td>
                        <td>
                          <div>
                            <div class="date-wrap">
                              <el-date-picker v-model="data.sysUserExperienceBeginTime" type="date" placeholder="选择日期" style="width: 30%;" value-format="yyyy-MM-dd" />
                              <span>至</span>
                              <el-date-picker v-model="data.sysUserExperienceFinishTime" type="date" placeholder="选择日期" style="width: 30%;" value-format="yyyy-MM-dd" />
                              <el-checkbox v-model="data.isNow" class="m-l-10" @change="isNow(index)">至今</el-checkbox>
                            </div>
                            <div class="job-row">
                              <div class="left">工作单位</div>
                              <div class="right"><div class="input">
                                <el-input
                                  v-model="data.sysUserExperienceWorkUnit"
                                  placeholder="请输入工作单位"
                                  clearable
                                />
                              </div></div>
                            </div>
                            <div class="job-row">
                              <div class="left">职务</div>
                              <div class="right"><div class="input">
                                <el-input
                                  v-model="data.sysUserExperiencePost"
                                  placeholder="请输入职务"
                                  clearable
                                />
                              </div></div>
                            </div>
                          </div>
                        </td>
                        <td class="job-td-03"><el-link type="danger" @click.prevent="removeJob(index)">删除</el-link></td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="job-footer"><el-button type="primary" icon="el-icon-document-add" @click="addJob">新增任职经历</el-button></div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01"><div class="title">获奖情况</div></td>
              <td colspan="3" class="td-width-auto">
                <div class="input">
                  <el-input
                    v-model="ruleForm.sysUserAwards"
                    type="textarea"
                    placeholder="多个用逗号分开"
                    clearable
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td class="td-width-01" colspan="4"><div class="input align-left">发表的论文或从事课题研究的内容</div></td>
            </tr>
            <tr>
              <td class="td-width-01" colspan="4">
                <div class="input" style="text-align: left">
                  <!-- <el-input
                    v-model="ruleForm.name"
                    type="textarea"
                    :rows="10"
                    placeholder="若没有，请填“无”"
                    clearable
                  /> -->
                  <tinymce v-model="content" :height="300" />
                </div>
              </td>
            </tr>
          <!-- <tr>
            <td rowspan="2" class="attr" width="180"><div>行政复议次数</div></td>
            <td class="attr" width="190"><div>数量</div></td>
          </tr> -->
          </tbody>
        </table>
        <div class="form-foot">
          <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button>
          <el-button type="success" @click="submitFormStorage('ruleForm')">临时保存</el-button>
        </div>
      </el-form>
    </div>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="400"
      :url="'/login/sysUser/pictureUpload'"
      lang-type="zh"
      no-circle
      @close="cropClose"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import { apiJobTeachingSectionList, apiSysRegionList, apiJobEducationalList, apiOtherHonorsList, apiSuperintendentListCategoryList, apiJobTitleList, apiCompilingList, apiProfessionalCategoryList } from '@/api/common'
import { apiRegiste, apiTemporaryStorage } from '@/api/registe'
import ImageCropper from '@/components/ImageCropper'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'RegisteForm',
  components: { ImageCropper, Tinymce },
  data() {
    // 验证身份证
    var checkIdNum = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!value) {
        return callback(new Error('证件号码不能为空'))
      } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'))
      } else {
        callback()
      }
    }
    return {
      jobTeachingSectionList: [], // 执教学科
      superintendentList: [], // 督学类别
      jobTitleList: [], // 职称列表
      compilingList: [], // 编制列表
      professionalCategoryList: [
        {
          sysProfessionalCategoryId: null,
          sysProfessionalCategoryName: ''
        },
        {
          sysProfessionalCategoryId: null,
          sysProfessionalCategoryName: ''
        },
        {
          sysProfessionalCategoryId: null,
          sysProfessionalCategoryName: ''
        }
      ], // 专业类别
      otherHonorsList: [], // 其他荣誉
      checkList: [], // 复选框
      sysJobTeachingCheckList: [], // 执教学科复选框
      content: '',
      ruleForm: {
        sysUserImage: '', // 照片
        sysUserName: '', // 姓名
        sysUserIdentity: '', // 身份证号
        sysUserSex: '', // 性别
        sysUserPhone: '', // 手机号
        sysUserJobCounty: '', // 工作所属区域
        sysUserEducation: '', // 学历
        // 执教学科
        sysTeachingPid: '', // 执教学科父编号

        sysUserNature: null, // 工作性质
        sysUserProfessional: '', // 职称
        sysUserAuthorized: '', // 编制情况
        // 其他荣誉
        sysUserElseHonors: [],
        sysUserElseSpeciality: '', // 其他专技
        sysUserOrganization: '', // 工作单位
        sysUserPosition: '', // 职务
        sysUserQualifications: '', // 师训号
        // 督学类别
        sysSupervisionPid: null, // 督学类别父级
        sysUserEducationalCategoryId: null, // 督学类别子级

        sysUserMailbox: '', // 邮箱Email
        // 通讯地址
        sysUserTxdzs: {
          sysUserTxdzPid: null, // 市id
          sysRegionId: null, // 区id
          sysUserTxdzXxdz: '', // 详细地址
          sysUserTxdzYzbm: '' // 邮政编码

        },
        // 家庭地址
        sysUserJtdzs: {
          sysUserJtdzPid: null, // 市id
          sysRegionId: null, // 区id
          sysUserJtdzXxdz: '', // 详细地址
          sysUserJtdzYzbm: '' // 邮政编码

        },
        // 管理类，学科类，保障类
        // professionalRadio: null, // 一级
        // professionalSecondA: [], //  管理类二级 数组
        // professionalSecondB: [], //  学科类二级 数组
        // professionalSecondC: [], //  保障类二级 数组
        // professionalSecondBThree: [], //  学科类三级 数组
        sysUserMajors: {
          specialtyNum: null, // 专业类别 一级
          managementClass: [], //  管理类 二级
          subjectClass: null, //    学科类 二级
          safeguardClass: [], // 保障类 二级
          subjectClassThree: [] //  学科类三级

        },

        // end 管理类
        sysUserElseSkill: '', // 特长
        // 任职经历
        sysUserAwards: '', // 获奖情况
        sysUserPaper: '' // 发表的论文或从事课题研究的内容

        // type: []
        // discipline: '', // 执教学科
        // pluralism: '', // 兼职类型
        // subject: '' // 学科类
      },
      rules: {
        sysUserName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sysUserIdentity: [
          { validator: checkIdNum, trigger: 'blur' }
        ],
        sysUserSex: [
          { required: true, message: '请输入性别', trigger: ['blur', 'change'] }
        ],
        sysUserPhone: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] }
        ],
        sysUserMailbox: [
          { required: true, message: '请输入邮箱Email', trigger: ['blur', 'change'] },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        'sysUserTxdzs.sysRegionId': [
          { type: 'number', required: true, message: '请选择区', trigger: ['blur', 'change'] }
        ],
        'sysUserTxdzs.sysUserTxdzYzbm': [
          { required: true, message: '请输入邮政编码', trigger: ['blur', 'change'] }
        ],
        'sysUserTxdzs.sysUserTxdzXxdz': [
          { required: true, message: '请输入通讯地址', trigger: ['blur', 'change'] }
        ],
        sysUserNature: [
          { required: true, message: '请输入工作性质', trigger: ['blur', 'change'] }
        ],
        sysUserOrganization: [
          { required: true, message: '请输入工作单位', trigger: ['blur', 'change'] }
        ],
        sysUserEducation: [
          { required: true, message: '请选择工作学历', trigger: ['blur', 'change'] }
        ],
        sysSupervisionPid: [
          { required: true, message: '请选择督学类别', trigger: ['blur', 'change'] }
        ]
      },
      jobData: [
        {
          sysUserExperienceBeginTime: '',
          sysUserExperienceFinishTime: '',
          isNow: false,
          sysUserExperienceWorkUnit: '',
          sysUserExperiencePost: ''
        }
      ],
      imagecropperShow: false,
      imagecropperKey: 0,
      imageUrl: require('@/assets/images/photo.png'),
      imageData: '',
      // 学历
      educationList: [
        { value: '大专', label: '大专' },
        { value: '本科', label: '本科' },
        { value: '硕士', label: '硕士' },
        { value: '博士', label: '博士' }
      ],
      // 工作所属区域
      regionList: [
        { value: '全市', label: '全市' },
        { value: '徐汇区', label: '徐家汇' },
        { value: '黄浦区', label: '徐家汇' },
        { value: '市级', label: '市级' }
      ],
      // 执教学科
      teachingDisciplineList: [
        { value: '幼儿园', label: '幼儿园' },
        { value: '小学', label: '小学' }
        // { value: '初中', label: '初中' },
        // { value: '高中', label: '高中' },
        // { value: '职校', label: '职校' },
        // { value: '其它', label: '其它' }
      ],
      // 学科类
      subjectList: [
        { value: '幼儿园', label: '幼儿园' },
        { value: '小学', label: '小学' },
        { value: '初中', label: '初中' },
        { value: '高中', label: '高中' },
        { value: '其它', label: '其它' }
      ],
      // 兼职
      pluralismList: [
        { value: '责任督学', label: '责任督学' },
        { value: '市督学', label: '市督学' },
        { value: '国家督学', label: '国家督学' },
        { value: '区兼职督学', label: '区兼职督学' }
      ]
    }
  },
  mounted() {
    this.getJobTeachingSectionList()
    console.log(this.baseURL, 'baseURL')
  },
  methods: {
    // 查询所有的任教学科
    getJobTeachingSectionList() {
      apiJobTeachingSectionList().then(res => {
        console.log(res, '查询所有的任教学科')
        this.jobTeachingSectionList = res.data
      })
      apiSysRegionList().then(res => {
        console.log(res, '查询所有区')
        this.regionList = res.data
      })
      apiJobEducationalList().then(res => {
        console.log(res, '查询学历')
        this.educationList = res.data
      })
      apiOtherHonorsList().then(res => {
        console.log(res, '其他荣誉')
        this.otherHonorsList = res.data
      })
      apiSuperintendentListCategoryList().then(res => {
        console.log(res, '督学列表类别')
        this.superintendentList = res.data
      })
      apiJobTitleList().then(res => {
        console.log(res, '职称列表')
        this.jobTitleList = res.data
      })
      apiCompilingList().then(res => {
        console.log(res, '编制列表')
        this.compilingList = res.data
      })
      apiProfessionalCategoryList().then(res => {
        console.log(res, '专业类别')
        this.professionalCategoryList = res.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'apiRegiste')
          // 任职经历
          this.ruleForm.sysUserExperiences = this.jobData
          // 其它荣誉
          this.ruleForm.sysUserElseHonors = this.ruleForm.sysUserElseHonors.map(item => {
            return { sysOtherHonorsId: item }
          })
          // 用户图片
          this.ruleForm.sysUserImage = this.imageData
          const param = {
            sysUser: this.ruleForm
          }
          apiRegiste(param).then(res => {
            console.log(res, '注册')
            if (res.success) {
              this.$message({
                type: 'success',
                message: '注册成功'
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请填写必填项'
          })

          console.log('error submit!!')
          return false
        }
      })
    },
    // 临时保存
    submitFormStorage(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm, 'apiRegiste')
          // 任职经历
          this.ruleForm.sysUserExperiences = this.jobData
          // 其它荣誉
          this.ruleForm.sysUserElseHonors = this.ruleForm.sysUserElseHonors.map(item => {
            return { sysOtherHonorsId: item }
          })
          // 用户图片
          this.ruleForm.sysUserImage = this.imageData
          const param = {
            sysUser: this.ruleForm
          }
          apiTemporaryStorage(param).then(res => {
            console.log(res, '注册')
            if (res.success) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请填写必填项'
          })

          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增任职经历
    addJob() {
      this.jobData.push({
        sysUserExperienceBeginTime: '',
        sysUserExperienceFinishTime: '',
        isNow: false,
        sysUserExperienceWorkUnit: '',
        sysUserExperiencePost: ''
      })
    },
    // 删除
    removeJob(index) {
      // if (index !== -1) {
      this.jobData.splice(index, 1)
      // }
    },
    isNow(index) {
      if (this.jobData[index].isNow) {
        this.jobData[index].sysUserExperienceFinishTime = ''
      }
    },
    // 照片
    cropSuccess(resData) {
      console.log(resData, '图片')
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.imageData = resData
    },
    cropClose() {
      this.imagecropperShow = false
    },
    // 执教学科
    changeSysTeachingPid() {
      this.sysJobTeachingCheckList = []
    },
    // 学科
    changeProfessionalSecondB() {
      this.ruleForm.sysUserMajors.subjectClassThree = []
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.registe-container {
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0;
  .form-wrap {
    width:100%;
    // margin:10px 20px;
    // padding: 20px;
    background-color: #fff;
  }

.td-width-01, .td-width-03{
  width:200px
}
.td-width-auto {
  width: auto
}
.table-photo-wrap {
  display: flex;
  width: 100%;
  justify-content:space-between;
  .left {
    text-align: left;
    vertical-align: top;
    padding-left:20px;
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgb(223, 230, 236);
    padding: 0 30px !important;
    margin-top: -10px;
    margin-bottom: -10px;
    height: 190px;
  }

}
.radio-padding {
    padding:10px;
  }
  .form-foot {
    text-align: center;
    .el-button {
      margin:0 30px;
    }
  }
  .job-wrap {
    margin-left:-1px;
    margin-right:-1px;
    text-align: left;
      color: #888;
    .head-text {
      color: #888;
      padding-left:10px;
    }
    .job-td-01 {
      width:100px;
    }
    .job-td-03 {
      width:100px;
    }
    .date-wrap {
      display: flex;
      line-height: 36px;
      padding-left: 10px;
      span {
        margin:0 10px;
      }
      .m-l-10 {
        margin-left:10px;
      }
    }
    .job-row {
      display: flex;
      width:100%;
      align-items: center;
      padding-top:10px;
      .left {
        width: 80px;
        text-align: right;
      }
      .right {
         flex-grow: 1;
      }

    }
    .job-footer {
      text-align: center;
    }
  }
}
</style>
