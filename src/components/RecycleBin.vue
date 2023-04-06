<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>KOSZ</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon @click="emptyRecycleBin">
                        <v-icon>mdi-delete-empty</v-icon>
                    </v-btn>
                </template>
                <span>Usuń cały kosz</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon to="/">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </template>
                <span>Wróć</span>
            </v-tooltip>
        </v-toolbar>
        <v-list>
            <v-list-item v-for="document in recycledDocuments" :key="document.id">
                <v-list-item-title>{{ document.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ document.date }}</v-list-item-subtitle>
                <v-list-item-action>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon @click="restoreDocument(document.id)">
                                <v-icon>mdi-restore</v-icon>
                            </v-btn>
                        </template>
                        <span>Przywróć dokument</span>
                    </v-tooltip>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </div>
</template>


<script>
export default {
    name: "RecycleBin",
    props: ["recycledDocuments"],
    methods: {
        restoreDocument(documentId) {
            this.$emit("restore-document", documentId);
        },
        emptyRecycleBin() {
            this.$emit("empty-recycle-bin");
        }
    }
};
</script>

