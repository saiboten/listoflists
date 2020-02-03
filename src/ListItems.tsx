import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { DisplayItem } from "./DisplayItem";
import { Header } from "./Header";
import { firebase } from "./firebase";
import { useParams } from "react-router-dom";
import { Item, UpdateItemParams } from "./types";
import { StyledButton } from "./StyledButton";
import styled from "styled-components";
import { StyledPlusIcon } from "./Icons/StyledPlusIcon";
import { StyledBackIcon } from "./Icons/StyledBackIcon";

interface Document {
  items: Item[];
  id: string;
  parent: string;
  parentTopic: string;
}

const EmptyDocument: Document = {
  id: "",
  items: [],
  parent: "",
  parentTopic: ""
};

const StyledUl = styled.ul`
  margin-bottom: 1rem;
`;

const StyledBackLink = styled(Link)`
  position: absolute;
  left: 1rem;
  top: 1rem;
`;

const collectionName = "lists";

interface Props {
  user: firebase.User;
}

export const ListItems: React.FC<Props> = ({ user }) => {
  let { id } = useParams();
  const [document, setDocument] = useState<Document>(EmptyDocument);
  const [loading, setLoading] = useState(false);

  const documentId = id || user.uid;

  useEffect(() => {
    setLoading(true);
    setDocument(EmptyDocument);
    const db = firebase.firestore();
    const unsub = db
      .collection(collectionName)
      .doc(documentId)
      .onSnapshot(doc => {
        setLoading(false);

        if (!doc.exists) {
          db.collection(collectionName)
            .doc(documentId)
            .set({
              items: [],
              owner: user.uid
            });
        }

        const docData = doc.data();

        const document = {
          items: docData?.items || [],
          id: doc.id,
          parent: docData?.parent || "",
          parentTopic: docData?.parentTopic || ""
        };

        setDocument(document);
      });
    return () => {
      unsub();
    };
  }, [documentId, user.uid]);

  function addBlankItem() {
    const newItemListForFirebase = [
      ...(document?.items || []),
      { name: "", link: "" }
    ];

    const db = firebase.firestore();
    db.collection(collectionName)
      .doc(documentId)
      .update({
        items: newItemListForFirebase
      });

    const newItemListLocally = [
      ...(document?.items || []),
      { name: "", link: "", edit: true }
    ];

    setDocument({ ...document, items: newItemListLocally });
  }

  function store(input: UpdateItemParams) {
    const arrayCopy = [...(document?.items || [])];
    arrayCopy[input.index].name = input.value;

    const db = firebase.firestore();
    db.collection(collectionName)
      .doc(documentId)
      .update({
        items: arrayCopy
      });
  }

  function addSubLink(index: number) {
    const db = firebase.firestore();

    db.collection(collectionName)
      .add({
        items: [],
        parent: documentId === user.uid ? "" : documentId,
        parentTopic: document?.items[index].name || "ops",
        owner: user.uid
      })
      .then((docRef: any) => {
        const copy = [...(document?.items || [])];
        copy[index].link = docRef.id;

        db.collection(collectionName)
          .doc(documentId)
          .update({
            items: copy
          });
      });
  }

  if (loading) {
    return <></>;
  }

  return (
    <div style={{ position: "relative", marginTop: "1rem" }}>
      <Header style={{ marginBottom: "1rem" }}>
        {document.parentTopic !== "" ? document.parentTopic : "Lister"}
      </Header>

      <StyledUl>
        {document?.items.map((item, index) => (
          <DisplayItem
            key={index}
            item={item}
            index={index}
            store={store}
            addSubLink={addSubLink}
            editDefault={item.edit}
          />
        ))}
      </StyledUl>
      <StyledButton onClick={addBlankItem}>
        <StyledPlusIcon />
      </StyledButton>
      {id !== undefined && (
        <StyledBackLink to={document.parent}>
          <StyledBackIcon />
        </StyledBackLink>
      )}
    </div>
  );
};
