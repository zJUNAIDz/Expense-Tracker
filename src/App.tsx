import Form from "./components/Form";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import { useState } from "react";
import ExpenseFilter from "./components/ExpenseFilter";

// eslint-disable-next-line react-refresh/only-export-components

function App() {
  const [selectedCategory, setselectedCategory] = useState("");
  const [ITEMS, setITEMS] = useState([
    { id: 1, description: "Carrot", amount: 30, category: "grocery" },
    { id: 2, description: "Cat", amount: 30, category: "others" },
    { id: 3, description: "Chicken", amount: 30, category: "grocery" },
  ]);
  const visibleExpense = selectedCategory
    ? ITEMS.filter((item) => item.category === selectedCategory)
    : ITEMS;

  return (
    <>
      <div className="mb-5">
        <Form
          onSubmit={(newData) =>
            setITEMS([...ITEMS, { ...newData, id: ITEMS.length + 1 }])
          }
        />
      </div>
      <hr />
      <ExpenseFilter
        // onSelectCategory={(category) => {
        //   console.log(category,ITEMS);

        //   setITEMS(ITEMS.filter((item) => item.category == category));

        // }}
        onSelectCategory={(category) => setselectedCategory(category)}
      />
      <div className="mt-3">
        <ExpenseList
          expenses={visibleExpense}
          onDelete={(id) => setITEMS(ITEMS.filter((item) => item.id !== id))}
        />
      </div>
    </>
  );
}

export default App;
