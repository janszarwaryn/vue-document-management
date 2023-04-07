import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


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

async function addDocumentToAPI(document, numberOfDocuments) {
  // Dodaj dokument do API i zaktualizuj dane w odpowiedni sposób
  // Zwróć dodany dokument
  return {
    ...document,
    title: `Document ${numberOfDocuments + 1}`,
    id: Math.floor(Math.random() * 10000),
    date: getCurrentDateTime(),
  };
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
    async addDocument({ commit, state }, document) {
      const addedDocument = await addDocumentToAPI(document, state.documents.length);
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
