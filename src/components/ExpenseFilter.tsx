import categories from "../categories.module";
interface Props {
  onSelectCategory: (category: string) => void;
}
const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <select
      className="select form-select"
      name="category"
      id="category"
      onChange={(e) => onSelectCategory(e.target.value)}
    >
      <option value=''>All Categories</option>
      {categories.map(category => <option value={category} key={category}>{category}</option>)}

      {/* <option value="electronics">Electronics</option>
      <option value="grocery">Grocery</option>
      <option value="utilities">Utilities</option>
      <option value="others">Others</option> */}
    </select>
  );
};

export default ExpenseFilter;
