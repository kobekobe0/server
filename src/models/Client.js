import { model } from "mongoose";
import clientSchema from "./schemas/clientSchema.js";

const AppClient = model("AppClient", clientSchema);

export default AppClient;
