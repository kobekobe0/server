import {model} from "mongoose";
import linksSchema from "./schemas/linksSchema.js";

const Link = model("Link", linksSchema);

export default Link;