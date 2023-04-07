<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>Document Management Manager</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text to="/">Main</v-btn>
            <v-btn text to="/recycle-bin">Document basket</v-btn>
        </v-app-bar>
        <v-main>
            <router-view
                :documents="sortedDocuments"
                :recycled-documents="recycledDocuments"
                @add-document="addDocument"
                @delete-document="openConfirmationDialog"
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
import { mapState, mapActions } from 'vuex';
import ConfirmationDialog from './components/ConfirmationDialog.vue';

export default {
    components: {
        ConfirmationDialog,
    },
    computed: {
        ...mapState(['documents', 'recycledDocuments']),
        sortedDocuments() {
            return this.documents
                .filter((document) => document && document.title)
                .sort((a, b) => {
                    if (!a.title || !b.title) {
                        return 0;
                    }
                    return a.title.localeCompare(b.title);
                });
        },
    },
    methods: {
        ...mapActions([
            'addDocument',
            'deleteDocument',
            'restoreDocument',
            'emptyRecycleBin',
        ]),
        openConfirmationDialog(documentId) {
            this.dialog = true;
            this.selectedDocumentId = documentId;
        },
        confirmDeleteDocument() {
            this.deleteDocument(this.selectedDocumentId);
            this.dialog = false;
        },
        cancelDeleteDocument() {
            this.dialog = false;
        },
    },
    data() {
        return {
            dialog: false,
            selectedDocumentId: null,
        };
    },
    mounted() {
        // Save data to localStorage on every change
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('documents', JSON.stringify(this.documents));
            localStorage.setItem(
                'recycledDocuments',
                JSON.stringify(this.recycledDocuments),
            );
        });
    },
    created() {
        // Read data from localStorage and update the data state in the app
        const documents = localStorage.getItem('documents');
        const recycledDocuments = localStorage.getItem('recycledDocuments');
        if (documents) {
            this.$store.commit('setDocuments', JSON.parse(documents));
        }
        if (recycledDocuments) {
            this.$store.commit('setRecycledDocuments', JSON.parse(recycledDocuments));
        }
    },
};
</script>
