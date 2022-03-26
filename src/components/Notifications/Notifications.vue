<template>
  <section class="notifications navbar-notifications">
    <header class="cardHeader card-header">
      <div class="text-center mb-sm">
        <strong>You have {{notificationsCount}} notifications</strong>
      </div>
    </header>
    <NewNotifictionsList v-if="newNotifications" />
    <NotifictionsList v-else-if="notificationsTabSelected === 1" />
    <Messages v-else-if="notificationsTabSelected === 2" />
    <Progress v-else-if="notificationsTabSelected === 3" />
    <NotifictionsList v-else />
    <footer class="cardFooter text-sm card-footer">
    </footer>
  </section>
</template>

<script>
import Vue from "vue";

import NotifictionsList from "./NotificationsDemo/NotificationsList";
import NewNotifictionsList from "./NotificationsDemo/NewNotificationsList";
import Messages from "./NotificationsDemo/Messages";
import Progress from "./NotificationsDemo/Progress";
import { mapActions } from 'vuex'


export default {
  name: "Notification",
  components: {
    NotifictionsList,
    NewNotifictionsList,
    Messages,
    Progress,
  },
  data() {
    return {
      notificationsTabSelected: 1,
      newNotifications: null,
      isLoad: false,
      notificationsCount:0
    };
  },
  mounted(){
    this.getUserData().then(() => {
      this.notificationsCount = this.$store.state.user.userData.notifications.length;
    })
  },
  methods: {
    ...mapActions({
      getUserData: 'user/getData',
    }),
    changeNotificationsTab(tab) {
      Vue.set(this, "notificationsTabSelected", tab);
      Vue.set(this, "newNotifications", null);
    },
    loadNotifications() {
      Vue.set(this, "isLoad", true);

      setTimeout(() => {
        Vue.set(this, "newNotifications", "new notifications component");
        Vue.set(this, "isLoad", false);
        this.changeNotificationsTab(1);
      }, 1500);
    },
  },
};
</script>

<style src="./Notifications.scss" lang="scss" />
