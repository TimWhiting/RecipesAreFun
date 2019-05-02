export default {
  namespaced: true,
  state: {
    messages: []
  },
  getters: {
    infoMessages(state) {
      return state.messages.filter(message => message.type == "info");
    },
    errorMessages(state) {
      return state.messages.filter(message => message.type == "error");
    },
    questions(state) {
      return state.messages.filter(message => message.type == "question");
    }
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message);
    }
  },

  actions: {
    addErrorMessage(context, message) {
      context.commit("addMessage", { message: message, type: "error" });
    },
    addInfoMessage(context, message) {
      context.commit("addMessage", { message: message, type: "info" });
    },
    addQuestion(context, message) {
      context.commit("addMessage", { message: message, type: "question" });
    }
  }
};
