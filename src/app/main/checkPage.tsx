"use client";

interface checkPageType {
  type: "outGoing" | "homecoming";
}

const CheckPage: React.FC<checkPageType> = ({ type }) => {
  return <div>{type === "outGoing" ? (<div></div>) : (<div></div>)}</div>;
};
