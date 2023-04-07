import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

async function fetchDocuments() {
  // Pobierz dokumenty z API
  return [
    { id: 1, title: "Document 1", content: "Content of document 1", date: "2023-04-08 12:34:56" },
    { id: 2, title: "Document 2", content: "Content of document 2", date: "2023-04-07 15:23:11" },
  ];
}

async function fetchRecycledDocuments() {
  // Pobierz usunięte dokumenty z API
  return [
    { id: 3, title: "Recycled Document 1", content: "Content of recycled document 1", date: "2023-04-05 08:42:37" },
  ];
}

function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString();
}

async function addDocumentToAPI(document) {
  // Dodaj dokument do API i zaktualizuj dane w odpowiedni sposób
  // Zwróć dodany dokument
  return { ...document, id: Math.floor(Math.random() * 10000), date: getCurrentDateTime() };
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
    restoreDocument(state, id) {
      const index = state.recycledDocuments.findIndex((doc) => doc.id === id);
      if (index !== -1) {
        const document = state.recycledDocuments.splice(index, 1)[0];
        state.documents.push(document);
      }
    },
    emptyRecycleBin(state) {
      state.recycledDocuments = [];
    },
  },
  actions: {
    async fetchDocuments({ commit }) {
      const documents = await fetchDocuments();
      commit("setDocuments", documents);
    },
    async fetchRecycledDocuments({ commit }) {
      const recycledDocuments = await fetchRecycledDocuments();
      commit("setRecycledDocuments", recycledDocuments);
    },
    async addDocument({ commit }, document) {
      const addedDocument = await addDocumentToAPI(document);
      commit("addDocument", addedDocument);
    },
    deleteDocument({ commit }, documentId) {
      commit("deleteDocument", documentId);
    },
    restoreDocument({ commit }, documentId) {
      commit("restoreDocument", documentId);
    },
    emptyRecycleBin({ commit }) {
      commit("emptyRecycleBin");
    },
  },
  modules: {},
});
