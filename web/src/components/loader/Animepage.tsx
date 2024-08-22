import Card from "./Card";

export const AnimepageLoader = () => {
  return (
    <div className="flex ">
      <div className="flex flex-wrap gap-4 p-5 ">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i}>
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
};
