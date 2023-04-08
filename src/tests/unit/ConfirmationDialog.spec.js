// tests/unit/ConfirmationDialog.spec.js
import { shallowMount } from '@vue/test-utils';
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";

describe('ConfirmationDialog.vue', () => {
    it('renders confirmation dialog component', () => {
        const wrapper = shallowMount(ConfirmationDialog, {
            propsData: {
                value: false
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});
