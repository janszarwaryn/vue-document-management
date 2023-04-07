<template>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title class="text-h5">{{ title }}</v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="cancel">{{ cancelText }}</v-btn>
                <v-btn color="green darken-1" text @click="confirm">{{ confirmText }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Deleting a Document',
    },
    message: {
      type: String,
      default: 'Are you sure you want to remove this item?',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
      this.dialog = false;
    },
    confirm() {
      this.$emit('confirm');
      this.dialog = false;
    },
  },
};
</script>
