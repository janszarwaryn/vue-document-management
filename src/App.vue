<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>Menager zarządzania Dokumentami</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text to="/">Główna</v-btn>
            <v-btn text to="/recycle-bin">Kosz na dokumenty</v-btn>
        </v-app-bar>
        <v-main>
            <router-view
                :documents="sortedDocuments"
                :recycled-documents="recycledDocuments"
                @add-document="addDocument"
                @delete-document="deleteDocument"
                @restore-document="restoreDocument"
                @empty-recycle-bin="emptyRecycleBin"
            />
        </v-main>
        <ConfirmationDialog
            v-model="dialog"
            @confirm="confirmDeleteDocument"
            @cancel="cancelDeleteDocument"
        />
    </v-app>
</template>

<script>
import ConfirmationDialog from "./components/ConfirmationDialog.vue";

export default {
    components: {
        ConfirmationDialog,
    },
    data() {
        return {
            documents: [],
            recycledDocuments: [],
            dialog: false,
            selectedDocumentId: null,
        };
    },
    computed: {
        sortedDocuments() {
            return [...this.documents].sort((a, b) => b.date.localeCompare(a.date));
        },
    },
    methods: {
        addDocument() {
            const newDocument = {
                id: Date.now(),
                name: `Document ${this.documents.length + 1}`,
                date: new Date().toLocaleString(),
            };
            this.documents.push(newDocument);
        },
        deleteDocument(documentId) {
            this.openConfirmationDialog(documentId);
        },
        restoreDocument(documentId) {
            const index = this.recycledDocuments.findIndex((doc) => doc.id === documentId);
            if (index !== -1) {
                const restoredDocument = this.recycledDocuments.splice(index, 1)[0];
                this.documents.push(restoredDocument);
            }
        },
        emptyRecycleBin() {
            this.recycledDocuments = [];
        },
        openConfirmationDialog(documentId) {
            this.dialog = true;
            this.selectedDocumentId = documentId;
        },
        confirmDeleteDocument() {
            const index = this.documents.findIndex((doc) => doc.id === this.selectedDocumentId);
            if (index !== -1) {
                const removedDocument = this.documents.splice(index, 1)[0];
                this.recycledDocuments.push(removedDocument);
            }
            this.dialog = false;
        },
        cancelDeleteDocument() {
            this.dialog = false;
        },
    },
    mounted() {
        // zapisanie danych do localStorage po każdej zmianie
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('documents', JSON.stringify(this.documents));
            localStorage.setItem('recycledDocuments', JSON.stringify(this.recycledDocuments));
        });
    },
    created() {
        // odczytanie danych z localStorage i aktualizacja stanu danych w aplikacji
        const documents = localStorage.getItem('documents');
        const recycledDocuments = localStorage.getItem('recycledDocuments');
        if (documents) {
            this.documents = JSON.parse(documents);
        }
        if (recycledDocuments) {
            this.recycledDocuments = JSON.parse(recycledDocuments);
        }
    },
};
</script>
