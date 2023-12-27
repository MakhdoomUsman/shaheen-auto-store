import layout from "./layout";
import loader from "./loader";
import confirmation from "./services/common/confirmation.module";
import invoices from "@/pages/invoice/store/store";

const rootReducer = {
  loader,
  layout,
  invoices,
  confirmation,
};
export default rootReducer;
