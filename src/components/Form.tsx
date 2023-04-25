import { z } from "zod";
import categories from "../categories.module";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Field must be atleast 3 charecters long" })
    .max(50, { message: "Field must be atmost 50 charecters long" }),
  amount: z
    .number({ invalid_type_error: "Amount is Required" })
    .min(0.01, { message: "Amount cannot be less than $0.01" })
    .max(100_000, { message: "Amount cannot be more than $100,000" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is Required" }),
  }),
});
type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
}
const Form = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description">Description: </label>
        <br />
        <input
          {...register("description")}
          id="description"
          className="form-control"
          type="text"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="price">Price: </label>
        <br />
        <input
          {...register("amount", { valueAsNumber: true })}
          id="price"
          className="form-control"
          type="number"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category">Category: </label> <br />
        <select
          {...register("category")}
          className="form-select"
          name="category"
          id="category"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
          {/* <option value="electronics">Electronics</option>
      <option value="grocery">Grocery</option>
      <option value="utilities">Utilities</option>
      <option value="others">Others</option> */}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <input className="btn btn-primary" type="submit" value="Submit" />
    </form>
  );
};

export default Form;
