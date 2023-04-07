import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

async function fetchDocuments() {
  // Pobierz dokumenty z API
  return [
    { id: 1, title: 'Document 1', content: 'Content of document 1' },
    { id: 2, title: 'Document 2', content: 'Content of document 2' },
  ];
}

async function fetchRecycledDocuments() {
  // Pobierz usunięte dokumenty z API
  return [
    { id: 3, title: 'Recycled Document 1', content: 'Content of recycled document 1' },
  ];
}

async function addDocumentToAPI(document) {
  // Dodaj dokument do API i zaktualizuj dane w odpowiedni sposób
  // Zwróć dodany dokument
  return { ...document, id: Math.floor(Math.random() * 10000) };
}

export default new Vuex.Store({
  state: {
    documents: [],
    recycledDocuments: [],
  },
  mutations: {
    setDocuments(state, documents) {
      state.documents = documents;
    },
    setRecycledDocuments(state, recycledDocuments) {
      state.recycledDocuments = recycledDocuments;
    },
    addDocument(state, document) {
      state.documents.push(document);
    },
    deleteDocument(state, id) {
      const index = state.documents.findIndex((doc) => doc.id === id);
      if (index !== -1) {
        const document = state.documents.splice(index, 1)[0];
        state.recycledDocuments.push(document);
      }
    },
  },
  actions: {
    async fetchDocuments({ commit }) {
      const documents = await fetchDocuments();
      commit('setDocuments', documents);
    },
    async fetchRecycledDocuments({ commit }) {
      const recycledDocuments = await fetchRecycledDocuments();
      commit('setRecycledDocuments', recycledDocuments);
    },
    async addDocument({ commit }, document) {
      const addedDocument = await addDocumentToAPI(document);
      commit('addDocument', addedDocument);
    },
  },
  modules: {},
});
