// tests/unit/mutations.spec.js
import { mutations } from "@/store";
import {
    ADD_DOCUMENT,
    DELETE_DOCUMENT,
    RESTORE_DOCUMENT,
    EMPTY_RECYCLE_BIN,
    SET_DOCUMENTS,
    SET_RECYCLED_DOCUMENTS
} from "@/store/mutation-types";

const { [ADD_DOCUMENT]: addDocument, [DELETE_DOCUMENT]: deleteDocument, [RESTORE_DOCUMENT]: restoreDocument, [EMPTY_RECYCLE_BIN]: emptyRecycleBin, [SET_DOCUMENTS]: setDocuments, [SET_RECYCLED_DOCUMENTS]: setRecycledDocuments } = mutations;

describe("mutations", () => {
    // Test data
    const documents = [
        { id: "1", title: "Document 1", content: "Content 1", date: "2023-04-07" },
        { id: "2", title: "Document 2", content: "Content 2", date: "2023-04-06" },
    ];
    const recycledDocuments = [
        { id: "3", title: "Document 3", content: "Content 3", date: "2023-04-05" },
    ];
    const newDocument = { title: "Document 4", content: "Content 4", date: "2023-04-08" };

    // AddDocument
    it("ADD_DOCUMENT", () => {
        const state = { documents: [] };
        addDocument(state, newDocument);
        expect(state.documents).toEqual([newDocument]);
    });

    // DeleteDocument
    it("DELETE_DOCUMENT", () => {
        const state = { documents, recycledDocuments };
        deleteDocument(state, "1");
        expect(state.documents).toEqual([documents[1]]);
        expect(state.recycledDocuments).toEqual([...recycledDocuments, documents[0]]);
    });

    // RestoreDocument
    it("RESTORE_DOCUMENT", () => {
        const state = { documents, recycledDocuments };
        restoreDocument(state, "3");
        expect(state.documents).toEqual([...documents, recycledDocuments[0]]);
        expect(state.recycledDocuments).toEqual([]);
    });

    // EmptyRecycleBin
    it("EMPTY_RECYCLE_BIN", () => {
        const state = { recycledDocuments };
        emptyRecycleBin(state);
        expect(state.recycledDocuments).toEqual([]);
    });

    // SetDocuments
    it("SET_DOCUMENTS", () => {
        const state = { documents: [] };
        setDocuments(state, documents);
        expect(state.documents).toEqual(documents);
    });

    // SetRecycledDocuments
    it("SET_RECYCLED_DOCUMENTS", () => {
        const state = { recycledDocuments: [] };
        setRecycledDocuments(state, recycledDocuments);
        expect(state.recycledDocuments).toEqual(recycledDocuments);
    });
});

