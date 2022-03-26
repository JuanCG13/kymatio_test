<template>
  <b-list-group class="listGroup thin-scroll" >
    <template v-for="notification in notifications">

      <b-list-group-item class="listGroupItem" :key="notification.type">
        <span class="notificationIcon thumb-sm">
          <i class="fa fa-bolt fa-lg" />
        </span>
        <p class="text-ellipsis m-0 overflow-hidden">
          {{notification.type}}
          <time class="help-block m-0" :class="notification.read ? 'text-success' : 'text-danger'">
          {{notification.read | read}}
          </time>
        </p>
        <p class="text-ellipsis m-0 overflow-hidden">
          {{notification.text}}
          <time class="help-block m-0">
          {{notification.date | moment}}
          </time>
        </p>
      </b-list-group-item>

    </template>

  </b-list-group>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment';


export default {
  name: 'NotificationsList',
  data() {
    return {
      notifications:[]
    };
  },
  mounted(){
    this.getUserData().then(() => {
      this.notifications = this.$store.state.user.userData.notifications
    })
  },
  methods:{
    ...mapActions({
      getUserData: 'user/getData',
    })
  },
  filters: {
  moment(date) {
    return moment(date).format("MMM Do YY");
  },
  read(data) {
    let result = ''
    if (data) {
      result = 'read'
    }else{
      result = 'unread'
    }
    return result
  }
}
};
</script>

<style src="./ListGroup.scss" lang="scss" />
