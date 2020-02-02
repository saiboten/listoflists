import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import { DisplayItem } from "./DisplayItem";
import { Header } from "./Header";
import { firebase } from "./firebase";
import { useParams } from "react-router-dom";
import { Item, UpdateItemParams } from "./types";
import { StyledButton } from "./StyledButton";
import styled from "styled-components";

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

export const ListItems: React.FC = () => {
  let { id } = useParams();
  const [document, setDocument] = useState<Document>(EmptyDocument);
  const [loading, setLoading] = useState(false);
  const [nextLocation, setNextLocation] = useState();

  const documentId = id || "top";

  useEffect(() => {
    setLoading(true);
    setDocument(EmptyDocument);
    const db = firebase.firestore();
    db.collection("items")
      .doc(documentId)
      .get()
      .then(doc => {
        setLoading(false);
        const docData = doc.data();

        const document = {
          items: docData?.items || [],
          id: doc.id,
          parent: docData?.parent || "",
          parentTopic: docData?.parentTopic || ""
        };

        setDocument(document);
      });
  }, [documentId]);

  function addBlankItem() {
    const newItemList = [
      ...(document?.items || []),
      { name: "Blank", link: "" }
    ];

    const db = firebase.firestore();
    db.collection("items")
      .doc(documentId)
      .set({
        items: newItemList
      });
    setDocument({ ...document, items: newItemList });
  }

  function store(input: UpdateItemParams) {
    const arrayCopy = [...(document?.items || [])];
    arrayCopy[input.index].name = input.value;

    const db = firebase.firestore();
    db.collection("items")
      .doc(documentId)
      .update({
        items: arrayCopy
      });
  }

  function addSublinkAndGoThere(index: number) {
    const db = firebase.firestore();

    db.collection("items")
      .add({
        items: [],
        parent: documentId === "top" ? "" : documentId,
        parentTopic: document?.items[index].name || "ops"
      })
      .then((docRef: any) => {
        const copy = [...(document?.items || [])];
        copy[index].link = docRef.id;

        db.collection("items")
          .doc(documentId)
          .update({
            items: copy
          })
          .then(() => {
            setNextLocation(`/${docRef.id}`);
          });
      });
  }

  if (nextLocation) {
    setNextLocation(null);
    return <Redirect to={nextLocation} />;
  }

  if (loading) {
    return <>Laster</>;
  }

  return (
    <div style={{ position: "relative" }}>
      <Header>
        {document.parentTopic !== "" ? document.parentTopic : "Lister"}
      </Header>

      <StyledUl>
        {document?.items.map((item, index) => (
          <DisplayItem
            key={index}
            item={item}
            index={index}
            store={store}
            addSublinkAndGoThere={addSublinkAndGoThere}
          />
        ))}
      </StyledUl>
      <StyledButton onClick={addBlankItem}>+</StyledButton>
      {id !== undefined && (
        <StyledBackLink to={document.parent}>Tilbake</StyledBackLink>
      )}
    </div>
  );
};
