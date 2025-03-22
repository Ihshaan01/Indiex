// components/Section.js
import React from "react";
import Card from "./Card";
import Button from "./Button";

const Section = ({
  title,
  items,
  onCreate,
  onViewAll,
  id,
  loading,
  noItemsMessage,
  SkeletonComponent,
}) => {
  return (
    <section id={id} className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="space-x-2">
          <Button onClick={onViewAll}>View All</Button>
          <Button onClick={onCreate}>Create New {title.slice(0, -1)}</Button>
        </div>
      </div>
      {loading ? (
        <SkeletonComponent />
      ) : items.length === 0 ? (
        <p className="text-gray-400 text-center py-4">{noItemsMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.slice(0, 5).map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Section;
