<template>
  <b-navbar class="header d-print-none app-header">
    <b-nav>
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class='fi flaticon-menu' />
        </a>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <i class='fi flaticon-menu' />
        </a>
      </b-nav-item>
    </b-nav>
    <a class="navbarBrand d-md-none">
      <i class="fa fa-circle text-danger" />
      &nbsp;
      sing
      &nbsp;
      <i class="fa fa-circle text-primary" />
    </a>
    <b-nav class="ml-auto">
      <b-nav-item-dropdown
        class="notificationsMenu d-sm-down-none mr-2"
        menu-class="notificationsWrapper py-0 animate__animated animate__animated-fast animate__fadeIn"
        right>
        <template slot="button-content">
          <span class="avatar rounded-circle thumb-sm float-left mr-2">
            <span>{{formatName}}</span>
          </span>
          <span class="px-2">{{userData.first_name}} {{userData.last_name}}</span>
          <span class="ml-1 mr-2 circle text-white fw-bold avatar-badge">{{notificationsCount}}</span>
          <i class='fi flaticon-arrow-down px-2' />
          <span class="px-2" @click="logout">
            <i class="fi flaticon-power-1 px-3 mr-3" /> Log Out
          </span>
        </template>
        <Notifications />
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Notifications from '@/components/Notifications/Notifications';

export default {
  name: 'Header',
  components: { Notifications },
  data() {
    return {
      notificationsCount:0,
      userData:{},
      formatName:{}
    };
  },
  computed: {
    ...mapState('layout', ['sidebarClose', 'sidebarStatic']),
  },
  mounted(){
    this.getUserData().then(() => {
      this.notificationsCount = this.$store.state.user.userData.notifications.length;
      this.userData = this.$store.state.user.userData;
      this.setformatName()
    })
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),
    ...mapActions({
      getUserData: 'user/getData',
    }),
    setformatName(){
      let firstName = this.userData.first_name
      let lastName = this.userData.last_name

      let formatName = firstName.split('')[0] + lastName.split('')[0]  

      this.formatName = formatName
    },
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    logout() {
      window.localStorage.setItem('authenticated', false);
      this.$router.push('/login');
    },
  }
};
</script>

<style src="./Header.scss" lang="scss"></style>
