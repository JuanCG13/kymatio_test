import axios from "axios";

export default {
  namespaced: true,
  state: {
      userData: {}
  },
  mutations: {
    getData(state,data) {
        state.userData = data[0]
    },
  },
  actions: {
    async getData({ commit }) {
        let response = await axios.get("https://618404bd91d76c00172d1d23.mockapi.io/api/profile")
        let data = response.data
        console.log(data)
        commit('getData',data);
    },
  },
};
