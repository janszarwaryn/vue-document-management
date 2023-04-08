// tests/unit/DocumentList.spec.js
import { shallowMount } from '@vue/test-utils';
import DocumentList from "../src/components/DocumentList.vue";

describe('DocumentList.vue', () => {
    it('renders document list component', () => {
        const wrapper = shallowMount(DocumentList, {
            propsData: {
                documents: []
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});
