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
                <span>Dodaj Nowy</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon to="/recycle-bin">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Przejdź do Kosza</span>
            </v-tooltip>

        </v-toolbar>
        <v-list>
            <v-list-item v-for="document in documents" :key="document.id">
                <v-list-item-title>{{ document.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ document.date }}</v-list-item-subtitle>
                <v-list-item-action>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon @click="deleteDocument(document.id)">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <span>Usuń Dokument</span>
                    </v-tooltip>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
export default {
    name: "DocumentList",
    props: ["documents"],
    methods: {
        addDocument() {
            this.$emit("add-document");
        },
        deleteDocument(documentId) {
            this.$emit("delete-document", documentId);
        }
    }
};
</script>
