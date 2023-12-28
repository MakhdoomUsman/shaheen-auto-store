import layout from "./layout";
import loader from "./loader";
import confirmation from "./services/common/confirmation.module";
import invoices from "@/pages/invoice/store/store";
import brands from "@/pages/users/store/store";
import category from "@/pages/category/store/store";

const rootReducer = {
  loader,
  layout,
  invoices,
  brands,
  category,
  confirmation,
};
export default rootReducer;
