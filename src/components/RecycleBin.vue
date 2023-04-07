<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>Recycle bin</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon @click="emptyRecycleBin">
                        <v-icon>mdi-delete-empty</v-icon>
                    </v-btn>
                </template>
                <span>Delete the entire basket</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon to="/">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </template>
                <span>Back</span>
            </v-tooltip>
        </v-toolbar>
        <v-list>
            <v-list-item v-for="document in recycledDocuments" :key="document.id">
                <v-list-item-title>{{ document.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ document.date }}</v-list-item-subtitle>
                <v-list-item-action>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon @click="restoreDocument(document.id)">
                                <v-icon>mdi-restore</v-icon>
                            </v-btn>
                        </template>
                        <span>Restore Document</span>
                    </v-tooltip>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
export default {
  name: 'RecycleBin',
  props: ['recycledDocuments'],
  methods: {
    restoreDocument(documentId) {
      this.$emit('restore-document', documentId);
    },
    emptyRecycleBin() {
      this.$emit('empty-recycle-bin');
    },
  },
};
</script>
