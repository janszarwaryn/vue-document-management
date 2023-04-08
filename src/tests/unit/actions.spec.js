// tests/unit/actions.spec.js
import { actions } from "../src/store";
import {
    ADD_DOCUMENT,
    DELETE_DOCUMENT,
    RESTORE_DOCUMENT,
    EMPTY_RECYCLE_BIN
} from "@/store/mutation-types";

const {
    addDocument,
    deleteDocument,
    restoreDocument,
    emptyRecycleBin
} = actions;

describe("actions", () => {
    let commit;

    beforeEach(() => {
        commit = jest.fn();
    });

    // AddDocument
    it("addDocument", async () => {
        const newDocument = { title: "Document 4", content: "Content 4", date: "2023-04-08" };
        await addDocument({ commit }, newDocument);
        expect(commit).toHaveBeenCalledWith(ADD_DOCUMENT, newDocument);
    });

    // DeleteDocument
    it("deleteDocument", async () => {
        const documentId = "1";
        await deleteDocument({ commit }, documentId);
        expect(commit).toHaveBeenCalledWith(DELETE_DOCUMENT, documentId);
    });

    // RestoreDocument
    it("restoreDocument", async () => {
        const documentId = "3";
        await restoreDocument({ commit }, documentId);
        expect(commit).toHaveBeenCalledWith(RESTORE_DOCUMENT, documentId);
    });

    // EmptyRecycleBin
    it("emptyRecycleBin", async () => {
        await emptyRecycleBin({ commit });
        expect(commit).toHaveBeenCalledWith(EMPTY_RECYCLE_BIN);
    });
});
