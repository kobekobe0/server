import { Schema } from "mongoose";

const linksSchema = new Schema({
    website: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "AppClient",
        require: true,
    }
});

export default linksSchema;
