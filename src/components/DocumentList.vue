<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>Documents</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon @click="addDocument">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>Add New</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon to="/recycle-bin">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Go to Trash</span>
            </v-tooltip>

        </v-toolbar>
        <v-list>
            <v-list-item v-for="document in documents" :key="document.id">
                <v-list-item-title>{{ document.title }}</v-list-item-title> <!-- Użyj 'title', a nie 'name' -->
                <v-list-item-subtitle>{{ document.creationDate }}</v-list-item-subtitle> <!-- Dodaj tę linię -->
                <v-list-item-action>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon @click="deleteDocument(document.id)">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete Document</span>
                    </v-tooltip>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
export default {
  name: 'DocumentList',
  props: ['documents'],
    methods: {
        addDocument() {
            const newDocument = {
                id: Date.now(),
                title: "New Document",
                creationDate: new Date().toLocaleString(), // Użyj toLocaleString() zamiast toLocaleDateString()
            };
            this.$emit("add-document", newDocument);
        },
        deleteDocument(documentId) {
            this.$emit("delete-document", documentId);
        },
    },
};
</script>
