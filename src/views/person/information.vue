<template>
  <div>
    <div class="box">
      <div style="font-weight: bolder">个人信息</div>
      <div class="content">
        <img src="@/assets/logo.png" />
        <div style="margin-left: 2.5rem">
          <div class="name">{{ userName }}</div>
          <div>姓名：{{ name }}</div>
          <div>职务：{{ roles }}</div>
          <div>手机号：{{ phone }}</div>
          <div>创建日期：{{ createAt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        userName: "",
        name: "",
        roles: "",
        phone: "",
        createAt: "",
      };
    },
    mounted() {
      this.userName = this.$store.state.user.userInfo.username;
      this.name = this.$store.state.user.userInfo.name;
      this.roles = this.$store.state.user.userInfo.roles[0];
      this.phone = this.$store.state.user.userInfo.phone;
      this.createAt = this.$store.state.user.userInfo.createdAt;
    },
    methods: {},
  };
</script>
<style lang="scss" scoped>
  .box {
    width: 42rem;
    padding: 0.8rem 0.8rem 2.7rem 0.8rem;
    border-radius: 8px;
    background-color: #fff;
  }
  .content {
    margin: 3.2rem 0 0 3.4rem;
    display: flex;
    img {
      width: 6rem;
      height: 6rem;
    }
  }
  .name {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1.6rem;
  }
  .name ~ div {
    margin-top: 0.7rem;
  }
</style>
