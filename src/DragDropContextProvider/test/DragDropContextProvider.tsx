import * as React from "react";
import DragDropContextProvider from '..';

function dragDropContextProviderWithMandatoryProps() {
  return <DragDropContextProvider />;
}

function dragDropContextProviderWithAllProps() {
  return (
    <DragDropContextProvider
      backend={()=>{}}
    />
  );
}
