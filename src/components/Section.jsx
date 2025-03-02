// components/Section.js
import React from "react";
import Card from "./Card";
import Button from "./Button";

const Section = ({ title, items, onCreate, onViewAll, id }) => {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.slice(0, 5).map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button onClick={onViewAll}>View All</Button>
        <Button onClick={onCreate}>Create New {title}</Button>
      </div>
    </section>
  );
};

export default Section;
