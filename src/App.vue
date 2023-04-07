<template>
    <v-app>
        <v-navigation-drawer app temporary v-model="drawer">
            <v-list>
                <v-list-item to="/" exact>
                    <v-list-item-title>Main</v-list-item-title>
                </v-list-item>
                <v-list-item to="/recycle-bin">
                    <v-list-item-title>Document basket</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark clipped-left shrink-on-scroll height="64">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Document Management</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="d-none d-md-inline-block ma-auto pt-3 mr-5" text to="/">
                Main
            </v-btn>
            <v-btn class="d-none d-md-inline-block ma-auto pt-3" text to="/recycle-bin">
                Document basket
            </v-btn>

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
            return this.$store.state.documents
                .filter((document) => document && document.title)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
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
            drawer: false,
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

<style>
.d-none {
    display: none ;
}

.d-md-inline-block {
    display: inline-block;
}

@media (min-width: 768px) {
    .d-md-inline-block {
        display: inline-block ;
    }
    .d-none.d-md-inline-block {
        display: inline-block ;
}}

</style>
